import { IUser, LocationType } from "@/interfaces/user.interface";
import { haversineDistance } from "@/lib/helper";

export const poiPopupHTML = (
  user: IUser,
  poiCoordinates: LocationType,
  image: any,
  title: string,
  id: string
) => `
<div class="flex items-center gap-3 cursor-pointer" id=${id}>
  <img 
    src="${image}" 
    alt="${title}" 
    class="w-[50px] h-[50px] rounded-full"
    onerror="this.onerror=null; this.src='/assets/images/placeholderyolo.svg';"
  >
  <div>
    <a href="#">
      <h3 class="text-[#7F4DEA] text-lg leading-5 ">${title}</h3>
    </a>
   ${
     user?.location &&
     `<p class="text-xs text-[#666666]">Distance: <span class="text-[#7F4DEA]"> ${haversineDistance(
       user?.location,
       poiCoordinates
     )?.toFixed(2)} KM</span></p>`
   } 
  </div>
</div>
`;
