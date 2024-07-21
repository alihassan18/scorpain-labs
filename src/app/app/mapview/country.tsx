import React from 'react'

export default function country() {

    const data = [
        {
            id: 0,
            tittle: "🚩 Country",
            description: "United Kingdom",
        },
        {
            id: 1,
            tittle: "📡 Internet speed (avg)",
            description: "29 Mbps",
        },
        {
            id: 2,
            tittle: "💨 Air quality (annual avg) ",
            description: "👍 32 US AQI  ",
        },
        {
            id: 3,
            tittle: "🚕 Best taxi app ",
            description: "Uber",
        },
        {
            id: 4,
            tittle: "🏧 Suggested ATM take out",
            description: "GBP 100 = USD 126",
        },
        {
            id: 5,
            tittle: "💳 Cashless",
            description: "💳 Yes, cards OK almost everywhere",
        },
        {
            id: 6,
            tittle: "🚰 Tap water",
            description: "👌 Yes, safe to drink",
        },
        {
            id: 7,
            tittle: "👫 Gender ratio (population)",
            description: "👨 52% 👱‍♀️ 48%",
        },
        {
            id: 8,
            tittle: "👫 Gender ratio (nomads)",
            description: "👨 83% 👱‍♀️ 17%",
        },
        {
            id: 9,
            tittle: "⛪️ Religious government",
            description: "Non-religious",
        },
        {
            id: 10,
            tittle: "🏠 Apartment listings  ",
            description: "Gumtree",
        },
        {
            id: 11,
            tittle: "✈️ Best int'l air carrier ",
            description: "British Airways",
        },

    ]


  return (
    <>
            {data.map((e, i) => {
                return (
                    <>
                        <div className='flex  pb-10 justify-between items-center font-normal text-sm'>

                            <h1 className='font-normal text-sm'>{e.tittle}</h1>
                            {e.description}
                        </div>
                    </>
                )
            })}
        </>
  )
}
