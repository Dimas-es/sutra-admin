import React from 'react';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const Sliders = ({ sliderList }) => {
    return (
        <Carousel>
            <CarouselContent>
                {sliderList.map((slider, index) => {
                    const image = slider.images[0]; // Ambil gambar pertama dari array images
                    const imageUrl = image ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${image.url}` : null;

                    return (
                        <CarouselItem key={index}>
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={image.name || 'slider'}
                                    width={1000}
                                    height={400}
                                    className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl' // Responsif dengan tinggi yang disesuaikan
                                />
                            ) : (
                                <div className='w-full h-[200px] md:h-[400px] bg-gray-300 flex justify-center items-center rounded-2xl'>
                                    <p className='text-gray-600'>No Image Available</p>
                                </div>
                            )}
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default Sliders;
