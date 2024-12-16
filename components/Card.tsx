import Link from 'next/link'
import React from 'react'
import { PublicEventProps } from '@/types'
import { urlFor } from '../sanity/lib/image'

type CardProps = {
  event: PublicEventProps,
  hasOrderLink?: boolean,
  hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {

  return (
    <div className="group relative flex min-h-[480px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md shadow-primary transition-all hover:shadow-lg hover:shadow-primary md:min-h-[438px]">
      <a 
        href={`#`}
        style={{backgroundImage: `url(${urlFor(event?.poster).url()})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />

      <div
        className="flex min-h-[130px] flex-col gap-3 p-5 md:gap-4"
      > 
       <div className="flex gap-2">
          <span className="text-[14px] font-semibold leading-[20px] rounded-full bg-green-100 px-4 py-1 text-green-60">
            {`Cover Charge: $${event.cost}`}
          </span>
        </div>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {event.date}
        </p>

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {event.startTime} - {event.endTime}
        </p>

        <Link href={`#`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black font-semibold">{event.title}</p>
        </Link>
      </div>
    </div>
  )
}

export default Card