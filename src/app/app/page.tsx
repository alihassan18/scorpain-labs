"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axiosInstance from "@/api/http";
import { useSelector } from "react-redux";
import { selectfilters } from "@/redux/slice/filters";
import ClusterListPopUp from "@/components/common/ClustersListPopUp";
import DetailPopup from "@/components/common/DetailPopup";
import { Poi } from "@/types";
import { Loader } from "@/components/common";
import { useQuery } from "react-query";
import { MAP_DATA } from "@/utils/constants";
import createCustomMarkerElement from "@/components/common/CustomMarker";
import { poiPopupHTML } from "@/components/common/MapPopupHTML";
import { getObjectFromLocalStorage } from "@/utils/storage";
import useDebounce from "@/hooks/useDebounce";
import { generateCloudinaryImageUrl } from "@/utils/generateCloudinaryImageUrl";

const fetchPois = async (
  filterValues: any,
  ne: mapboxgl.LngLat | null,
  sw: mapboxgl.LngLat | null
) => {
  let queryString = "";
  if (filterValues.length > 0) {
    const simplifiedObject = filterValues.reduce((acc: any, curr: any) => {
      // Check if the type property exists in the current object
      if (curr.type) {
        // Create a new property in the accumulator if it doesn't exist
        if (!acc[curr.type]) {
          acc[curr.type] = "";
        }
        // Append the value to the corresponding property in the accumulator
        acc[curr.type] = acc[curr.type]
          ? `${acc[curr.type]},${curr.value}`
          : curr.value;
      }
      return acc;
    }, {});

    Object.keys(simplifiedObject).forEach((key) => {
      simplifiedObject[key] = simplifiedObject[key].replace(/^,|,$/g, ""); // Remove leading or trailing commas
    });

    queryString = [
      simplifiedObject?.rating &&
        `rating=${encodeURIComponent(simplifiedObject.rating)}`,
      simplifiedObject?.city &&
        `city=${encodeURIComponent(simplifiedObject.city)}`,
      simplifiedObject?.country &&
        `country=${encodeURIComponent(simplifiedObject.country)}`,
      simplifiedObject?.type &&
        `type=${encodeURIComponent(simplifiedObject.type)}`,
      simplifiedObject?.search &&
        `search=${encodeURIComponent(simplifiedObject.search)}`,
    ]
      .filter(Boolean)
      .join("&");
  }
  const { data } = await axiosInstance.get(
    `/poi/markers?ne=${ne?.lat},${ne?.lng}&sw=${sw?.lat},${sw?.lng}&${queryString}`
  );

  return data;
};

const DashBoard = () => {
  const filterValues = useSelector(selectfilters);

  const [neBounds, setNEBounds] = useState<mapboxgl.LngLat | null>(null);
  const [swBounds, setSWBounds] = useState<mapboxgl.LngLat | null>(null);
  const [pois, setPois] = useState<Poi[]>([]);

  const mapContainer = useRef<HTMLDivElement>(null);

  const [clickedCluster, setClickedCluster] = useState<any[]>([]);
  const [poiDetails, setPoiDetails] = useState<Poi | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef: any = useRef([]);
  const clusterMaxZoom = 16; // NOTE: to handle clusters and un-clusters occurances, just need to change this clusterMaxZoom

  const user = getObjectFromLocalStorage("user");

  const debouncedNE_bounds = useDebounce(neBounds, 1000);
  const debouncedSW_bounds = useDebounce(swBounds, 1000);

  mapboxgl.accessToken = MAP_DATA.accessToken;

  const { data, isLoading } = useQuery(
    ["fetchPois", filterValues, debouncedNE_bounds, debouncedSW_bounds],
    () => fetchPois(filterValues, neBounds, swBounds),
    {
      keepPreviousData: true,
      enabled: neBounds !== null && swBounds !== null,
      onSuccess(data) {
        if (mapInstance?.current && data?.data) {
          const idsInPois = new Set(pois.map((item) => item._id));
          const newPois = data.data.filter(
            (item: Poi) => !idsInPois.has(item._id)
          );

          const updatedPois = [...pois, ...newPois];
          setPois(updatedPois);
          loadDataAndAddMarkers(mapInstance?.current, updatedPois);
        }
      },
    }
  );

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
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
          clusterMaxZoom: clusterMaxZoom, // Max zoom level at which clustering occurs
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
        if (!mapInstance?.current?.loaded()) {
          // loadDataAndAddMarkers(mapInstance?.current, filteredPois);
          setEWNSBounds();
        }
      });
    }
    return () => {
      if (mapInstance.current) { 
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      const onMoveEnd = () => {
        if (!filterValues.find((f: any) => f.type === "search")?.value) {
          setEWNSBounds();
        }
      };

      mapInstance.current.on("moveend", onMoveEnd);

      return () => {
        if (mapInstance.current) mapInstance.current.off("moveend", onMoveEnd);
      };
    }
  }, [mapInstance.current]);

  useEffect(() => {
    if (pois.length > 0) {
      setPois([]);
    }
  }, [filterValues]);

  const setEWNSBounds = () => {
    if (mapInstance.current) {
      const bounds = mapInstance.current.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();

      setNEBounds(ne);
      setSWBounds(sw);
    }
  };

  const loadDataAndAddMarkers = (map: any, poisToShow?: Poi[]) => {
    if (poisToShow) {
      markersRef.current.forEach((marker: any) => marker.remove());
      markersRef.current = [];
      const features = poisToShow.map((location: any) => ({
        id: "unclustered-point",
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: location.map_coordinates
            ? location.map_coordinates.split(",").reverse()
            : [], // reverse is used to manage the format of coordinates
        },
        properties: {
          ...location,
        },
      }));

      // Update the marker source data with the fetched data
      map.getSource("markers")?.setData({
        type: "FeatureCollection",
        features: features,
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
              zoom: clusterMaxZoom + 1,
              duration: 2000,
            });
          });

        map
          .getSource("markers")
          .getClusterLeaves(clusterId, 500, 0, (err: any, leaves: any) => {
            if (err) return;
            const clickedPoiIds = leaves.map(
              (item: any) => item.properties._id
            );
            setClickedCluster(clickedPoiIds);
            setPoiDetails(null);
          });
      });

      // Add custom markers
      let markers =
        poisToShow &&
        poisToShow.map((location: any) => {
          const marker = new mapboxgl.Marker({
            element: createCustomMarkerElement(location?.images[0]),
          })
            .setLngLat(location?.map_coordinates?.split(",").reverse()) // reverse is used to manage the format of coordinates
            .addTo(map);
          // Showing popup on hover
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeOnClick: false,
            closeButton: false,
          });

          marker.setPopup(popup);

          marker.getElement().addEventListener("mouseenter", () => {
            const [lat, long] = location?.map_coordinates?.split(",");
            popup
              .setLngLat(location?.map_coordinates?.split(",").reverse())
              .setHTML(
                poiPopupHTML(
                  user,
                  {
                    longitude: lat,
                    latitude: long,
                  },
                  generateCloudinaryImageUrl(
                    location.images[0],
                    100,
                    100,
                    100,
                    true
                  ),
                  location.title,
                  "pop-container"
                )
              )
              .addTo(map);
          });

          markersRef.current.push(marker);

          marker.getElement().addEventListener("mouseleave", () => {
            popup.remove();
          });

          marker.getElement().addEventListener("click", (e: any) => {
            setClickedCluster([]);
            setPoiDetails(location);
          });

          // marker.on("click", (a) => {
          //   // Add onclick event to the button
          //   // const button = document.getElementById("pop-container");
          //   // if (button) {
          //   //   button.addEventListener("click", () => {
          //   router.push(`/app/gallerydetail/${location._id}`);
          //   // });
          //   // }
          // });
          marker.getElement().style.display = "none";
          return marker;
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

      map.on("click", "unclustered-point", (e: any) => {
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure the popup appears over the point
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Zoom to the clicked point
        map.flyTo({
          center: coordinates,
          zoom: clusterMaxZoom + 1,
        });
      });

      const updateMarkerVisibility = () => {
        const zoom = map.getZoom();

        if (zoom < clusterMaxZoom + 1) {
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
    }
    // })
    // .catch((error) => {
    //   // setIsLoading(false);
    //   console.error("Error fetching data:", error);
    // });
  };

  useEffect(() => {
    if (clickedCluster.length > 0) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [clickedCluster]);

  return (
    <>
      {isLoading && (
        <div className="w-full  flex justify-center items-center ">
          <Loader />
        </div>
      )}
      <div
        ref={mapContainer}
        className="h-screen !absolute inset-y-0 left-0 pr-5 w-full"
      />
      {poiDetails && (
        <DetailPopup
          poi={poiDetails}
          onClose={() => setPoiDetails(null)}
          from="mapView"
        />
      )}
      {clickedCluster.length > 0 && (
        <div>
          <ClusterListPopUp
            poiIds={clickedCluster}
            onCross={() => setClickedCluster([])}
            onClickItem={(item: Poi) => {
              setPoiDetails(item);
              setClickedCluster([]);
            }}
          />
        </div>
      )}
    </>
  );
};

export default DashBoard;
