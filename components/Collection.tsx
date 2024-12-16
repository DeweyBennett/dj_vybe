import React from 'react'
import Card from './Card'
import { PublicEventProps } from '@/types'

type CollectionProps = {
  data?: PublicEventProps[],
  emptyTitle: string,
  emptyStateSubtext: string,
}

const Collection = ({ data, emptyTitle, emptyStateSubtext }: CollectionProps) => {

  const events = data

  // console.log("Events: ", events)

  return (
    <>
      {events!.length > 0 ? (
        <div className="flex flex-col items-centerbg-white lg:mx-auto p-5 md:px-10 xl:px-0 w-full min-h-[200px] rounded-xl shadow-lg shadow-secondary py-28 text-center">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {events!.map((event) => {

              return (
                <li key={event._id} className="flex justify-center">
                  <Card event={event} />
                </li>
              )
            })}
          </ul>
        </div>
      ): (
        <div className="flex-center bg-white lg:mx-auto p-5 md:px-10 xl:px-0 w-full min-h-[200px] flex-col gap-3 rounded-xl shadow-lg shadow-secondary py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )} 
    </>
  )
}

export default Collection