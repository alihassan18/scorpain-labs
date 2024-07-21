import React from "react";
import Map from "./map";
const data = [
  {
    id: 0,
    title: "⭐️ Total score",
    rating: "3.6/5 (Rank #48)",
    ClassName: "w-[70%] bg-[#2BDE73]",
  },
  {
    id: 1,
    title: "❤️ Liked by members",
    rating: "👍100% liked it 👎0% disliked it",
    ClassName: "w-[100%] bg-[#2BDE73]",
  },
  {
    id: 2,
    title: "👍 Quality of life score",
    rating: "Good",
    ClassName: "w-[80%] bg-[#2BDE73]",
  },
  {
    id: 3,
    title: "👶 Family score",
    rating: "Good",
    ClassName: "w-[80%] bg-[#2BDE73]",
  },
  {
    id: 4,
    title: "🎒 Community score",
    rating: "Okay",
    ClassName: "w-[60%] bg-[#FFC924]",
  },
  {
    id: 5,
    title: "💵 Cost",
    rating: "🧐 Pricey: $3,948 / mo",
    ClassName: "w-[40%] bg-[#BF1E05]",
  },
  {
    id: 6,
    title: "📡 Internet",
    rating: "🏎 Fast: 29Mbps (avg)",
    ClassName: "w-[65%] bg-[#2BDE73]",
  },
  {
    id: 7,
    title: "😝 Fun",
    rating: "Okay",
    ClassName: "w-[70%] bg-[#FFC924]",
  },
  {
    id: 8,
    title: "⛅️ Temperature (now)",
    rating: "🥶 Too cold: 6°C (feels 4°C)",
    ClassName: "w-[70%] bg-[#BF1E05]",
  },
  {
    id: 9,
    title: "💦 Humidity (now)",
    rating: "💦 Damp: 82%",
    ClassName: "w-[50%] bg-[#FFC924]",
  },
  {
    id: 10,
    title: "💨 Air quality (annual)",
    rating: "🌱 Great: 32 US AQI",
    ClassName: "w-[70%] bg-[#2BDE73]",
  },
  {
    id: 8,
    title: "⛅️ Temperature (now)",
    rating: "🥶 Too cold: 6°C (feels 4°C)",
    ClassName: "w-[70%] bg-[#BF1E05]",
  },
  {
    id: 9,
    title: "💦 Humidity (now)",
    rating: "💦 Damp: 82%",
    ClassName: "w-[50%] bg-[#FFC924]",
  },
  {
    id: 10,
    title: "💨 Air quality (annual)",
    rating: "🌱 Great: 32 US AQI",
    ClassName: "w-[70%] bg-[#2BDE73]",
  },
];

export default function score() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 p-5 max-h-[62vh] overflow-auto AtScrollStyle">
  <div className="md:col-span-3">
    <div className="flex flex-col gap-4">
      {data.map((e, i) => {
        return (
          <div key={i} className="flex justify-between items-center">
            <div className="py-[10px]">
              <h1 className="font-normal text-sm">{e.title}</h1>
            </div>
            <div className="w-[189px] h-[30px] overflow-hidden bg-[#EDEDED] relative rounded-full">
              <span className={`${e.ClassName} h-full absolute font-normal text-xs px-3 flex whitespace-nowrap text-white items-center`}>
                {e.rating}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  <div className="md:col-span-4 flex justify-center">
    <Map />
  </div>
</div>

  );
}
