// export default function createCustomMarkerElement(
//   markerIconUrl: string | null | undefined
// ) {
//   const imageURL = markerIconUrl ?? "/assets/images/placeholder.png";
//   const markerElement = document.createElement("div");
//   markerElement.id = "unclustered-point";
//   markerElement.style.width = "60px";
//   markerElement.style.height = "45px";
//   markerElement.style.border = "3px solid #ff4581";
//   markerElement.style.borderRadius = "5px";
//   markerElement.style.backgroundImage = `url(${imageURL})`;
//   markerElement.style.backgroundSize = "cover";
//   const imageElement = document.createElement("img");
//   imageElement.src = "/assets/images/dashboard/bottom.png";
//   imageElement.className = "AtBottomImage";
//   markerElement.appendChild(imageElement);
//   return markerElement;
// }

import { generateCloudinaryImageUrl } from "@/utils/generateCloudinaryImageUrl";
import { IUser } from "@/interfaces/user.interface";
import { haversineDistance } from "@/lib/helper";
import { Poi } from "@/types";

export default function createCustomMarkerElement(
  markerIconUrlRaw: string | null | undefined
) {
  const markerIconUrl: string | null | undefined = markerIconUrlRaw
    ? generateCloudinaryImageUrl(
        markerIconUrlRaw as string,
        60 * 1.3,
        45 * 1.3,
        100,
        true
      )
    : null;

  const imageURL = markerIconUrl ?? "/assets/images/placeholderyolo.svg";
  const fallbackImageURL = "/assets/images/placeholderyolo.svg"; // Specify your fallback image path here

  const markerElement = document.createElement("div");
  markerElement.id = "unclustered-point";
  markerElement.style.width = "60px";
  markerElement.style.height = "45px";
  markerElement.style.border = "3px solid #ff4581";
  markerElement.style.borderRadius = "5px";
  markerElement.style.backgroundImage = `url(${imageURL})`;
  markerElement.style.backgroundSize = "cover";

  // Create an image element for bottom image
  const imageElement = document.createElement("img");
  imageElement.src = "/assets/images/dashboard/bottom.png";
  imageElement.className = "AtBottomImage";

  // Add error handling for the background image
  const backgroundImage = new Image();
  backgroundImage.src = imageURL;
  backgroundImage.onerror = () => {
    markerElement.style.backgroundImage = `url(${fallbackImageURL})`;
  };

  // Add error handling for the image element
  imageElement.onerror = () => {
    imageElement.src = fallbackImageURL; // Use the same fallback image or another if needed
  };

  markerElement.appendChild(imageElement);
  return markerElement;
}

export function poiCustomMarkerElement(user: IUser, poi: Poi) {
  const imageURL = poi.images[0] ?? "/assets/images/placeholderyolo.svg";
  const fallbackImageURL = "/assets/images/placeholderyolo.svg"; // Specify your fallback image path here

  // Create the main marker container
  const markerElement = document.createElement("div");
  // markerElement.style.position = "relative";
  markerElement.style.display = "flex";
  markerElement.style.flexDirection = "column";
  markerElement.style.alignItems = "center";
  markerElement.style.backgroundColor = "white";
  markerElement.style.width = "150px";
  markerElement.style.height = "50px";
  markerElement.style.border = "1px solid #ddd";
  markerElement.style.borderRadius = "10px";
  markerElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";

  // Create the circle element
  // Create the circle element
  const circle = document.createElement("div");
  circle.style.width = "30px";
  circle.style.height = "30px";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "#3A8FF0";
  circle.style.display = "flex";
  circle.style.alignItems = "center";
  circle.style.justifyContent = "center";
  circle.style.color = "white";
  circle.style.fontWeight = "bold";
  circle.innerText = "2.1";
  circle.style.position = "absolute";
  circle.style.left = "50%"; // Position at the horizontal center of markerElement
  circle.style.transform = "translate(-50%, -50%)"; // Adjust to center the circle properly

  // Create the content container
  const contentContainer = document.createElement("div");
  contentContainer.style.display = "flex";
  contentContainer.style.alignItems = "center";

  // Create the location image
  const locationImage = document.createElement("img");
  locationImage.src = imageURL;
  locationImage.style.width = "50px";
  locationImage.style.height = "50px";
  locationImage.style.objectFit = "cover";
  locationImage.style.borderRadius = "5px";
  locationImage.style.marginRight = "5px";
  locationImage.style.borderTopRightRadius = "0";
  locationImage.style.borderBottomRightRadius = "0";

  // Add error handling for the location image
  locationImage.onerror = () => {
    locationImage.src = fallbackImageURL;
  };

  // Create the location text
  const content = document.createElement("div");
  const locationText = document.createElement("div");
  locationText.innerText = poi.title;
  locationText.style.fontSize = "11px";
  locationText.style.color = "#000";
  locationText.style.fontWeight = "bold";
  locationText.style.marginTop = "16px";
  locationText.style.lineHeight = "0";

  const distance = document.createElement("div");
  distance.innerText = `Distance: ${haversineDistance(user?.location, {
    longitude: poi.map_coordinates.split(",")[1],
    latitude: poi.map_coordinates.split(",")[0],
  })?.toFixed(2)}KM`;
  distance.style.fontSize = "10px";
  distance.style.color = "#666666";
  distance.style.marginTop = "4px";

  // Append elements to the content container
  contentContainer.appendChild(locationImage);

  // Append elements to the marker container
  markerElement.appendChild(circle);
  markerElement.appendChild(contentContainer);
  contentContainer.appendChild(content);
  content.appendChild(locationText);
  content.appendChild(distance);

  return markerElement;
}
