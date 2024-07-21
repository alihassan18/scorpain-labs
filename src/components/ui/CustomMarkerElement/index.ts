export default function createCustomMarkerElement(markerIconUrl: string) {
  const imageURL = markerIconUrl ?? "/assets/images/placeholder.png";
  const markerElement = document.createElement("div");
  markerElement.id = "unclustered-point";
  markerElement.style.width = "60px";
  markerElement.style.height = "45px";
  markerElement.style.border = "3px solid #ff4581";
  markerElement.style.borderRadius = "5px";
  markerElement.style.backgroundImage = `url(${imageURL})`;
  markerElement.style.backgroundSize = "cover";
  const imageElement = document.createElement("img");
  imageElement.src = "/assets/images/dashboard/bottom.png";
  imageElement.className = "AtBottomImage";
  markerElement.appendChild(imageElement);
  return markerElement;
}
