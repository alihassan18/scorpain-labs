import React from 'react'

export default function continent() {

    const data = [
        {
            id: 0,
            tittle: "🌍 Continent",
            description: "Europe",
        },
        {
            id: 1,
            tittle: "🗓️ Average trip length",
            description: "5 days",
        },
        {
            id: 2,
            tittle: "⛅️ Weather (now)",
            description: "🌧 6°C + 💦 Damp (82%) = feels 4°C",
        },
        {
            id: 3,
            tittle: "🚑 Travel medical insurance",
            description: "Safetywing🏧",
        },
        {
            id: 4,
            tittle: "💸 Tipping",
            description: "No",
        },
        {
            id: 5,
            tittle: "💻 Best coworking space",
            description: "Campus North",
        },
        {
            id: 6,
            tittle: "♻️ Return rate",
            description: "👍18% of visitors return",
        },
        {
            id: 7,
            tittle: "👨‍👩‍👧‍👦 GDP per capita",
            description: "$40,249 / year",
        },
        {
            id: 8,
            tittle: "👫 Gender ratio (young adults)",
            description: "👨 52% 👱‍♀️ 48%",
        },
        {
            id: 9,
            tittle: "🏞 Foreign land ownership allowed",
            description: "Yes",
        },
        {
            id: 10,
            tittle: "💻 Online electronics shop",
            description: "Amazon🏠",
        },
        {
            id: 11,
            tittle: "✈️ Best short-haul air carrier",
            description: "Flybe",
        },

    ]
    return (
        <>
            {data.map((e, i) => {
                return (
                    <>
                        <div className='flex pb-10 justify-between items-center font-normal text-sm'>

                            <h1 className='font-normal text-sm'>{e.tittle}</h1>
                            {e.description}
                        </div>
                    </>
                )
            })}
        </>
    )
}
