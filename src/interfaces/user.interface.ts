import {
  WhoCanSeeLocation,
  WhoCanSeeTrip,
  WhoCanSendFriendRequest,
} from "@/app/enum/settings.enum";

export type LocationType = {
  latitude: any;
  longitude: any;
};
export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;
  image: string | null;
  friends: any[];
  friend_requests_to: any[];
  location: LocationType;
  settings: {
    who_see_my_location: WhoCanSeeLocation;
    who_send_friend_request: WhoCanSendFriendRequest;
    who_see_trip: WhoCanSeeTrip;
  };
  [key: string]: any;
}
