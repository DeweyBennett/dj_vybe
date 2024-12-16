"use client"

import React from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import BackgroundCycles from './BackgroundCircles';
import Image from 'next/image';


function Hero() {
    const [text] = useTypewriter({
        words: [
            'Book us today for your special event!'
        ],
        loop: true,
        delaySpeed: 1000
    })

    return (
        <div className='relative h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden pt-48'>
            <div className='absulute top-0'>
                <BackgroundCycles />
            </div>

            <div className='z-20'>
                <Image
                    src="/bg.png"
                    className='rounded-full h-64 w-64 mx-auto object-cover'
                    width='256'
                    height='256'
                    alt='Dewey Web Development and Security hero image'
                />

                <div className='z-20'>
                    <h2 className='text-sm uppercase text-white font-semibold pb-2 tracking-[15px]'>DJ Vybe Entertainment</h2>
                    <div className='min-h-[100px] px-10 flex items-center'>
                        <h1 className='text-3xl md:text-5xl lg:text-6xl font-semibold w-full'>
                            <span className='mr-3 text-gradient'>{text}</span>
                            <Cursor cursorColor='#48fcfa' cursorStyle="_" />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero