import React from "react";

let data = [
  { id: 0, filter: "❤️ Liked by members" },
  {
    id: 1,
    filter: "👍 Quality of life score",
  },
  {
    id: 2,
    filter: "🗓️Jan",
  },
  {
    id: 3,
    filter: "🗓️Aug",
  },
  {
    id: 4,
    filter: "👮‍ Lack of crime",
  },
  {
    id: 5,
    filter: "🚶 Walkability",
  },
  {
    id: 6,
    filter: "🗓️Feb",
  },
  {
    id: 7,
    filter: "🗓️Sep",
  },
  {
    id: 8,
    filter: "⚡️ Power grid",
  },
  {
    id: 9,
    filter: "🍸 Nightlife",
  },
  {
    id: 10,
    filter: "🗓️Mar",
  },
  {
    id: 11,
    filter: "🗓️Oct",
  },
  {
    id: 12,
    filter: "💰 Income level",
  },
  {
    id: 13,
    filter: "👩 Female friendly",
  },
  {
    id: 14,
    filter: "️🗓️April",
  },
  {
    id: 15,
    filter: "🗓️Nov",
  },
  {
    id: 16,
    filter: "✌️ Peace",
  },
  {
    id: 17,
    filter: "🎅 Startup Score",
  },
  {
    id: 18,
    filter: "🗓️May",
  },
  {
    id: 19,
    filter: "🗓️All Year long",
  },
  {
    id: 20,
    filter: "👌 Safety",
  },
  {
    id: 21,
    filter: "😝 Fun",
  },
  {
    id: 22,
    filter: "🗓️June",
  },
  {
    id: 23,
    filter: "❄️In Winter",
  },
  {
    id: 24,
    filter: "💨 Air quality ",
  },
  {
    id: 25,
    filter: "🚦 Traffic safety",
  },
  {
    id: 26,
    filter: "🗓️July",
  },
  {
    id: 27,
    filter: "🚭No Smoking",
  },
];

export default function SearchFilter() {
  return (
    <>
      <div className="max-w-[642px] bg-white  py-5 pl-6  rounded-[20px] grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <h1 key={item.id} className="font-normal text-sm ">
            {item.filter}
          </h1>
        ))}
      </div>
    </>
  );
}
