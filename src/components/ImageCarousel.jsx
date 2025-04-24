import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function ImageCarousel({images}) {
    return (
        <Carousel className="w-[88%]">
            <CarouselContent>
                {images.map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="p-0">
                            <Card>
                                <CardContent className="flex aspect-video items-center justify-center p-6">
                                    <img src={images[index]} alt="Image" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
