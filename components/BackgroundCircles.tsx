"use client"
import React from 'react'
import { motion } from "framer-motion"

export default function BackgroundCycles() {
  return (
    <motion.div 
        className='relative flex justify-center items-center'
        initial={{
            opacity: 0,
        }}

        animate={{
            borderRadius: ['20%', '20%', '50%', '80%', '20%'],
            opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 0.1],
            scale: [1, 2, 2, 3, 1]
        }}

        transition={{
            duration: 2.5,
        }}
    >
        <div className='absolute border-4 border-secondary rounded-full mt-52 h-[400px] w-[400px] animate-ping' />
        <div className='absolute border border-white rounded-full mt-52 h-[300px] w-[300px]' />
        <div className='absolute border border-white rounded-full mt-52 h-[500px] w-[500px]' />
        <div className='absolute border border-white rounded-full mt-52 h-[650px] w-[650px]' />
        <div className='absolute border-2 border-secondary rounded-full mt-52 h-[800px] w-[800px] animate-pulse' />
    </motion.div>
  )
}