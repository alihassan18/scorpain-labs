export interface Poi {
  _id: string;
  title: string;
  short_desc: string;
  long_desc: string;
  images: any[];
  google_rating: string;
  google_reviews: string;
  yolo_score: number;
  location: {
    type: string;
    coordinates: [number, number];
  };
  [key: string]: any;
}

export interface ApplyFormInputs {
  projectName: string;
  website: string;
  companyName: string;
  telegram: string;
}
