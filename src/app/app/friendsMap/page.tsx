"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { GEO_LOCATION_STATE, MAP_DATA } from "@/utils/constants";
import { Button, Loader } from "@/components/common";
import axiosInstance from "@/api/http";
import * as Cookies from "js-cookie";
import { toast } from "react-toastify";
import { IUser, LocationType } from "@/interfaces/user.interface";
import { haversineDistance } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { getObjectFromLocalStorage } from "@/utils/storage";
import { useSelector } from "react-redux";
import createCustomMarkerElement from "@/components/common/CustomMarker";
import { duration } from "moment";
import { CiLocationArrow1 } from "react-icons/ci";
import { WhoCanSeeLocation } from "@/app/enum/settings.enum";

function FriendsMap() {
  const router = useRouter();
  const friendToSee = useSelector(
    (state: any) => state.user.wantToSeeFriendOnMap
  );
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef: any = useRef([]);

  const [error, setError] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [friends, setFriends] = useState([]);

  const user = getObjectFromLocalStorage("user");
  // const u: any = Cookies.default.get("user");
  // let user: IUser | null = null;
  // if (u !== undefined && u !== null) {
  //   try {
  //     user = JSON.parse(u);
  //   } catch (error) {
  //     console.error("Error parsing user JSON:", error);
  //   }
  // }

  mapboxgl.accessToken = MAP_DATA.accessToken;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === GEO_LOCATION_STATE.GRANTED) {
          setPermissionGranted(true);
        } else if (result.state === GEO_LOCATION_STATE.PROMPT) {
          getCurrentLocation();
          setPermissionGranted(false);
        } else if (result.state === GEO_LOCATION_STATE.DENIED) {
          setError("Location access denied.");
        }

        result.onchange = () => {
          if (result.state === GEO_LOCATION_STATE.GRANTED) {
            setPermissionGranted(true);
            getCurrentLocation();
          } else {
            setPermissionGranted(false);
          }
        };
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    fetchFriends();

    return () => {
      // unMounting
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Focus friend on map by searching
    if (friendToSee && mapInstance?.current) {
      mapInstance.current.flyTo({
        center: [friendToSee.location.longitude, friendToSee.location.latitude],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 18,
      });
    }
  }, [friendToSee, mapInstance?.current]);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current && permissionGranted) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: MAP_DATA.theme, // Example style, replace with your preferred style
        center: [24.7536, 59.437], // Tallinn city center coordinates
        zoom: 14,
      });

      mapInstance.current.addControl(
        new mapboxgl.NavigationControl(),
        "bottom-right"
      );

      mapInstance?.current.on("load", () => {
        // Add cluster layers
        mapInstance?.current?.addSource("markers", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
          cluster: true,
          clusterMaxZoom: 14, // Max zoom level at which clustering occurs
          clusterRadius: 50, // Pixel radius of each cluster
        });

        mapInstance?.current?.addLayer({
          id: "clusters",
          type: "circle",
          source: "markers",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#ff4581", // Color of cluster circles
            "circle-radius": 20, // Radius of cluster circles
          },
        });

        mapInstance?.current?.addLayer({
          id: "small-clusters",
          type: "circle",
          source: "markers",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#ffffff", // Color of cluster circles
            "circle-radius": 12, // Radius of cluster circles
          },
        });

        mapInstance?.current?.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "markers",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count}", // Display cluster count
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
            // "text-weight": "bold",
          },
          paint: {
            "text-color": "#ff4581", // Change the color of the text to red
          },
        });

        mapInstance?.current?.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "markers",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#ff4581",
            "circle-radius": 6,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // Load your data and update the marker source data
        // if (!mapInstance?.current?.loaded()) {
        //   loadDataAndAddMarkers(mapInstance?.current);
        // }
      });
    }
  }, [permissionGranted, user]);

  const loadDataAndAddMarkers = (
    map: any,
    friendsData: any = [],
    userData: IUser = user
  ) => {
    if (!userData?.location?.latitude && friendsData.length === 0) return;
    const friendsToShow =
      friendsData.length > 0
        ? friendsData?.filter(
            (f: IUser) =>
              f.location?.latitude !== "" &&
              f.location?.longitude !== "" &&
              f.settings?.who_see_my_location !== WhoCanSeeLocation.NOBODY
          )
        : friends?.filter(
            (f: IUser) =>
              f.location?.latitude !== "" &&
              f.location?.longitude !== "" &&
              f.settings?.who_see_my_location !== WhoCanSeeLocation.NOBODY
          ) || [];

    const popupHTML = (userProperties: any, id: string) => `

            <div class="flex items-center gap-3 cursor-pointer" id=${id}>
            <img src="${userProperties?.image}" alt="${
      userProperties?.name
    }" class="w-[50px] h-[50px] rounded-full" onerror="this.onerror=null; this.src='https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg';">
            <div>
           <Link href=""#>
              <h3 class="text-[#7F4DEA] text-lg leading-5 ">${
                userData._id === userProperties?._id
                  ? "Me"
                  : userProperties?.first_name + " " + userProperties?.last_name
              }</h3> 
           </Link>
            <p class="text-xs text-[#666666]">@${userProperties?.username}</p>
          ${
            userData._id !== userProperties?._id
              ? `<p class="text-xs text-[#666666]">Distance: <span class="text-[#7F4DEA]"> ${haversineDistance(
                  userData?.location,
                  userProperties?.location
                )?.toFixed(2)} KM</span></p>`
              : ""
          }  
          </div>
           </div>

          `;
    // remove previous
    markersRef.current.forEach((marker: any) => marker.remove());
    markersRef.current = [];

    const features = [...friendsToShow, userData].map(
      (friend: IUser, index: number) => {
        const { longitude, latitude } = friend.location;

        return {
          id: "unclustered-point",
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {
            ...friend,
          },
        };
      }
    );

    // Update the marker source data with the fetched data
    map?.getSource("markers")?.setData({
      type: "FeatureCollection",
      features: features,
    });

    // Add custom markers
    const markers = features.map((feature: any) => {
      // Create a HTML element for each marker
      const el = createCustomMarkerElement(
        feature.properties.image ??
          "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg"
      );

      // Add marker to map
      const marker = new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        // .setPopup(
        //   new mapboxgl.Popup({
        //     offset: 25,
        //     closeOnClick: false,
        //     closeButton: false,
        //   }).setText(feature.properties.name)
        // ) // Optional: Add popups
        .addTo(map);

      // Showing popup on hover
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeOnClick: false,
        closeButton: false,
      });

      marker.setPopup(popup);

      marker.getElement().addEventListener("mouseenter", () => {
        popup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(popupHTML(feature.properties, "pop-container"))
          .addTo(map);
      });

      marker.getElement().addEventListener("mouseleave", () => {
        popup.remove();
      });

      marker.getElement().addEventListener("click", () => {
        // Implement navigation or other actions here
      });

      marker.getElement().addEventListener("click", (e: any) => {
        router.push(
          `${
            user?._id
              ? `/app/profile`
              : `/app/profile/${feature.properties._id}`
          }`
        );
      });
      markersRef.current.push(marker);
      return marker;
    });

    // // Add click event listener for clusters
    map.on("click", "clusters", (e: any) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;

      map
        .getSource("markers")
        .getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
            duration: 2000, // for slow animated effect
          });
        });
    });

    // clusters cursor pointer
    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });

    // unclustered-point cursor pointer
    map.on("mouseenter", "unclustered-point", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "unclustered-point", () => {
      map.getCanvas().style.cursor = "";
    });

    const updateMarkerVisibility = () => {
      const zoom = map.getZoom();

      if (zoom < 9) {
        markers.forEach(
          (marker: any) => (marker.getElement().style.display = "none")
        );
      } else {
        markers.forEach(
          (marker: any) => (marker.getElement().style.display = "block")
        );
      }
    };
    map.on("zoomend", updateMarkerVisibility);
    map.on("render", updateMarkerVisibility);
  };

  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get(`users/${user?._id}/friends`);
      if (response?.data?.data) {
        setFriends(response?.data?.data);
        loadDataAndAddMarkers(mapInstance.current, response?.data?.data);
      }
    } catch (error) {
      console.log(error, "Error while fetching friends");
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  const requestLocationPermission = () => {
    setIsUpdatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissionGranted(true);
        updateUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
        setIsUpdatingUser(false);
        toast.error(error.message);
      }
    );
  };

  const updateUserLocation = async (location: LocationType) => {
    try {
      const payload = {
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };
      let existingUserRecord = { ...user };
      existingUserRecord["location"] = payload.location;
      Cookies.default.set("user", JSON.stringify(existingUserRecord));
      localStorage.setItem("user", JSON.stringify(existingUserRecord));

      loadDataAndAddMarkers(mapInstance.current, friends, existingUserRecord);

      if (user && mapInstance?.current) {
        mapInstance.current.flyTo({
          center: [
            existingUserRecord.location.longitude,
            existingUserRecord.location.latitude,
          ],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          zoom: 18,
        });
      }
      const response = await axiosInstance.put(`users/${user?._id}`, payload);
      setIsUpdatingUser(false);
    } catch (error) {
      console.log("Error while updaing user", error);
      toast.error("Error while updating location");
      setIsUpdatingUser(false);
    }
  };

  const onSeeMyLocation = () => {
    getCurrentLocation(); // get current location and update user in storage
  };

  // if (!user) {
  //   return (
  //     <div className="w-full flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <>
      {permissionGranted && (
        <>
          <div
            ref={mapContainer}
            className="h-screen !absolute inset-y-0 left-0 pr-5 w-full"
          />

          <div
            className=" fixed right-2 z-50 h-8 w-8  flex justify-center items-center cursor-pointer bg-white  border-2 border-borderColor rounded-full sm2:bottom-40  bottom-32"
            onClick={onSeeMyLocation}
          >
            <CiLocationArrow1 className="text-base" />
          </div>
        </>
      )}
      {!permissionGranted && error && (
        <div className=" h-screen flex justify-center items-center flex-col gap-2">
          <p className="text-center">
            You have previously denied location access. Please enable it in your
            browser settings.
          </p>
          {/* <Button
            onClick={requestLocationPermission}
            isLoading={isUpdatingUser}
          >
            Allow Location Access
          </Button> */}
        </div>
      )}
    </>
  );
}

export default FriendsMap;
