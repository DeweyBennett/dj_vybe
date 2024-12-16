'use server'

import { revalidatePath } from 'next/cache'
import { groq } from 'next-sanity'
import { client } from "../../sanity/lib/client"
import { handleError } from '@/lib/utils'
import { PublicEventProps } from '@/types'


export async function createEvent() {
  try {

  } catch (error) {
    handleError(error)
  }
}

export async function getAllPublicEvents(date: string, price: string, search: string) {
  const priceOrder = price 
    ? `| order(price ${price})`
    : ''

  const dateOrder = date 
    ? `| order(_createdAt ${date})`
    : ''

  const order = `${priceOrder}${dateOrder}`
  const eventFilter = `_type == 'publicEvent'`
  const searchFilter = search ? `&& hostName match "${search}"` : ''
  const filter = `*[${eventFilter}${searchFilter}]`

  try {

    const events = await client.fetch<PublicEventProps[]>(
      groq`${filter} ${order}`
    )

    return {
      events: JSON.parse(JSON.stringify(events)),
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getPublicEventBySlug(slug: string) {
  console.log("Slug: ", slug)
  try {

    const event = await client.fetch<PublicEventProps>(
      groq`*[_type == 'event' && slug.current == "${slug}"][0]`
    )

    return {
      event: JSON.parse(JSON.stringify(event)),
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getPublicEventsByHost() {
  try {

  } catch (error) {
    handleError(error)
  }
}

export async function getRelatedPublicEventByCategory(category: string) {
  try {
    const eventFilter = `*[_type == 'category' && name == '${category}']`

    const events = await client.fetch<PublicEventProps[]>(
      groq`${eventFilter} {
        "events": *[_type == "event"]
      }`
    )

    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    console.log(error)
  }
}

export async function updateEvent() {
  try {

  } catch (error) {
    handleError(error)
  }
}

