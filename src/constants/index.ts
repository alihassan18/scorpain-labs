import {
  Sightseeing,
  wellnessTypes,
  shopTypes,
  CusiniesTypes,
  Sleep,
  Nightlife,
} from "@/components/common/GallerySelect/flters";

export const sortingOptions = [
  { value: "google_reviews", label: "Google Reviews", type: "sort" },
  { value: "google_rating", label: "Google Rating", type: "sort" },
  { value: "yolo_score", label: "Yolo Score", type: "sort" },
];

export const sightseeingTags = [
  "Arts & Culture",
  "Architecture",
  "Beach 🐚",
  "Landmark",
  "Museum",
  "Park",
  "Spiritual Place 🕉️",
  "History",
];

export const wellnessTags = ["wellness", "gym", "health", "sauna", "spa"];

export const shopTags = ["design", "fashion", "food", "mall"];

export const sleepTags = Sleep.map((item) => item.value);

export const nightlifeTags = Nightlife.map((item) => item.value);

export const eatTags = ["restaurant"];

export const cafeTags = ["Café ☕"];

export const cusiniesTags = CusiniesTypes.map((item) => item.value);

export const filterTags = [
  {
    label: "Featured",
    value: "Featured",
    type: "type",
    nocall: false,
  },
  /* {
    label: "All",
    value: "All",
    type: "type",
    nocall: false,
  }, */
  {
    label: "☕ Cafés",
    value: "Café ☕",
    type: "type",
    nocall: false,
  },
  {
    label: "🍔 Eat",
    value: "Restaurant",
    type: "type",
    nocall: true,
  },

  {
    label: "🍸 Nightlife",
    value: "nightlife",
    type: "type",
    nocall: true,
  },
  {
    label: "🛍️ Shop",
    value: "shop",
    type: "type",
    nocall: false,
  },
  {
    label: "🛏️ Sleep",
    value: "hotel",
    type: "type",
    nocall: true,
  },
  {
    label: "🏞️ Sightseeing",
    value: "sightseeing",
    type: "type",
    nocall: true,
  },
  {
    label: "🌸 Wellness",
    value: "wellness",
    type: "type",
    nocall: false,
  },
];

export const userDummyImage =
  "https://res.cloudinary.com/dz7sec6n3/image/upload/v1720796429/user-dummy_rx6reo.jpg";
