import React from 'react'
import { ImageComponent } from '@/components/common';

export default function Cards({ poi }: { poi: any }) {
    const cards = [
        {
            id: 0,
            Name: "Prashant Kumar Singh",
            review: "Reviewed 45 restuarants",
            rating: "4.5",
            description: "If you wanna take a break from Varanasi you find a great location and hospitality in this rooftop in the heart of the town. Food is really tasty and staff really great!",
            img: "/assets/images/app/cake.svg",

        },
        {
            id: 1,
            Name: "Prashant Kumar Singh",
            review: "Reviewed 45 restuarants",
            rating: "4.5",
            description: "If you wanna take a break from Varanasi you find a great location and hospitality in this rooftop in the heart of the town. Food is really tasty and staff really great!",
            img: "/assets/images/app/cake.svg",

        },
        {
            id: 2,
            Name: "Prashant Kumar Singh",
            review: "Reviewed 45 restuarants",
            rating: "4.5",
            description: "If you wanna take a break from Varanasi you find a great location and hospitality in this rooftop in the heart of the town. Food is really tasty and staff really great!",
            img: "/assets/images/app/cake.svg",

        },
        {
            id: 3,
            Name: "Prashant Kumar Singh",
            review: "Reviewed 45 restuarants",
            rating: "4.5",
            description: "If you wanna take a break from Varanasi you find a great location and hospitality in this rooftop in the heart of the town. Food is really tasty and staff really great!",
            img: "/assets/images/app/cake.svg",

        },
    ]
    return (
        <>
            <div className='py-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {cards.map((e, i) => {
                        return (
                            <div key={i} className='p-5 gap-3  flex flex-col '>
                                <div className='flex justify-between'>
                                    <div className='flex gap-5 items-center'>
                                        <ImageComponent
                                            src="/assets/images/app/WhatsApp Image.svg"
                                            fill
                                            figClassName="w-[40px] h-[40px] "
                                            className="object-contain rounded-full"
                                            alt=""
                                        />
                                        <div className='flex flex-col gap-1'>
                                            <h1 className='font-semibold text-sm'>{e.Name}</h1>
                                            <p className='font-semibold text-xs text-[#7E7E7E]'>{e.review}</p>
                                        </div>
                                    </div>
                                    <div className='flex font-semibold text-xs text-[#007ACE] items-center gap-3'>
                                        {e.rating}
                                        <i className='icon-star1'></i>
                                    </div>
                                </div>
                                <p className='font-semibold text-xs text-[#7E7E7E]'>{e.description}</p>
                                <div className='flex gap-1 flex-wrap'>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div key={index} className='w-[70px] h-[61px] rounded-lg overflow-hidden'>
                                            <img src={e.img} alt="" className='w-full h-full object-cover' />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


        </>
    )
}
