"use client"

import { useRef, useState, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import HeroCards from '@/components/HeroCards';


export default function Hero() {


    return (

        <div className="">
            <section className="relative">

                <div className="relative z-10 px-4 py-12 sm:py-16 sm:px-6 lg:px-4 lg:max-w-5/6 lg:mx-auto lg:py-16 xl:py-24 lg:grid lg:grid-cols-2">

                    {/* LEFT SECTION */}
                    <div className="lg:pr-8">
                        <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                                Built for players
                                <span className="inline px-2">
                                    <img
                                        className="inline w-auto h-8 sm:h-10 lg:h-12"
                                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-1.svg" alt="shape-1"
                                    />
                                </span>
                                Made by players
                                <span className="inline px-2">
                                    <img
                                        className="inline w-auto h-8 sm:h-10 lg:h-11"
                                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/4/shape-2.svg" alt="shape-2"
                                    />
                                </span>
                            </h1>

                            <p className="mt-6 text-base font-normal leading-7 text-gray-900">
                            Book matches, join teams, and explore venues near you with Funturf.
                            </p>

                            <svg className="w-auto h-4 mt-8 text-gray-300" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"></line>
                                <line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"></line>
                            </svg>

                            <p className="mt-8 text-base font-bold text-gray-900">Search your favourite turf ground</p>

                            <form action="#" method="post" className="relative mt-4">
                                <div className="absolute transitiona-all duration-1000 opacity-30 inset-0 bg-gradient-to-r from-[#78e393] via-[#46d761] to-[#92ed7e] rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
                                <div className="relative space-y-4 sm:flex sm:space-y-0 sm:items-end">
                                    <div className="flex-1">
                                        <label htmlFor="search-text" className="sr-only">Turf Name</label>
                                        <div>
                                            <input
                                                type="text"
                                                name="search-text"
                                                id="search-text"
                                                className="block w-full px-4 py-3 sm:py-3.5 text-base font-medium text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none sm:text-sm focus:ring-gray-900 focus:border-gray-900"
                                                placeholder="Enter turf name"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 sm:text-sm text-base sm:py-3.5 font-semibold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-lg sm:rounded-r-lg sm:rounded-l-none hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>


                    {/* RIGHT SECTION */}
                    <div className="rounded-2xl overflow-auto ">
                        <Carousel
                            plugins={[
                                Autoplay({
                                    delay: 3000,
                                }),
                            ]}
                            opts={{
                                loop: true,
                                align: "start"
                            }}
                        >
                            <div className="absolute top-0 right-0 h-full w-4/5 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
                            <CarouselContent>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <CarouselItem
                                        className="basis-1/2 mx-2 px-4"
                                        key={index}>
                                        <div className="">
                                            <HeroCards key={index} activeIndex={index} />
                                            {/* <p>{index + 1}</p> */}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {/* <CarouselPrevious /> */}
                            {/* <CarouselNext /> */}
                        </Carousel>
                    </div>
                </div>

            </section>
        </div>
    )
}