"use server"

import { handleError } from '../utils';
import { client } from "../../sanity/lib/client"
import { groq } from 'next-sanity';
import { PublicEventProps } from '@/types';

// export const checkoutOrder = async (order: { eventTitle: string, eventId: string, cost: number, buyerName: string, buyerEmail: string, buyerPhone: string, hostName: string, hostEmail: string, hostPhone: string, stripeId: string }) => {
//   const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`);
//   const lineItes = await validateOrder(order)

//   try {
//     const session = await stripe.checkout.sessions.create({
//       submit_type: "pay",
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       shipping_address_collection: {
//         allowed_countries: ["US"]
//       },
//       metadata: {
//         eventTitle: order.eventTitle,
//         eventId: order.eventId,
//         cost: order.cost,
//         buyerName: order.buyerName,
//         buyerEmail: order.buyerEmail,
//         buyerPhone: order.buyerPhone,
//         hostName: order.hostName,
//         hostEmail: order.hostEmail,
//         hostPhone: order.hostPhone,
//         stripeId: order.stripeId
//       },
//       billing_address_collection: "auto",
//       success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:3000/cart`
//     });

//     return session
//   } catch (error) {
//     throw error;
//   }
// }

// const validateOrder = async () => {
//   try {
//     const events = await client.fetch<PublicEventProps[]>(
//       groq`*[_type == 'event'] {
//         "id": _id,
//         "name": name,
//         "sku": sku,
//         "currency": currency,
//         "price": price,
//         "slug": slug.current
//       }`
//     )

//     const lineItems = validateCartItems(events, order.cartDetails)

//     console.log("Line Items: ", lineItems)

//     return lineItems
//   } catch (error) {
//     throw error;
//   }
// }

export const createEventBooking = async (order: { title: string, date: string, startTime: string, endTime: string, totalHours: string, estimatedAttendance: number, cost: number, locationStreet: string, locationCity: string, locationState: string, locationZip: string, hostName: string, hostEmail: string, hostPhone: string, additionalInfo: string }) => {
  try {
    console.log("Creating Event Booking: ", order)

    const transaction = client.transaction()

    const newOrder = {
      _type: "bookedEvent",
      title: order.title,
      date: order.date,
      startTime: order.startTime,
      endTime: order.endTime,
      totalHours: order.totalHours,
      estimatedAttendance: order.estimatedAttendance,
      cost: order.cost,
      locationStreet: order.locationStreet,
      locationCity: order.locationCity,
      locationState: order.locationState,
      locationZip: order.locationZip,
      hostName: order.hostName,
      hostEmail: order.hostEmail,
      hostPhone: order.hostPhone,
      additionalInfo: order.additionalInfo,
    }

    const createdOrder = await transaction.create(newOrder)

    console.log("New Event Booked: ", createdOrder)

    await transaction.commit()

    return "Complete"
  } catch (err) {
    console.log(err)
  }
}

export const createTicketOrder = async (order: { eventTitle: string, eventId: string, cost: number, buyerName: string, buyerEmail: string, buyerPhone: string, hostName: string, hostEmail: string, hostPhone: string, stripeId: string }) => {
  try {

    console.log("Creating New Order: ", order)

    const transaction = client.transaction()

    const newOrder = {
      _type: "ticketOrder",
      eventTitle: order.eventTitle,
      eventId: order.eventId,
      cost: order.cost,
      buyerName: order.buyerName,
      buyerEmail: order.buyerEmail,
      buyerPhone: order.buyerPhone,
      hostName: order.hostName,
      hostEmail: order.hostEmail,
      hostPhone: order.hostPhone,
      stripeId: order.stripeId
    }

    const createdOrder = await transaction.create(newOrder)

    console.log("New Order: ", createdOrder)

    await transaction.commit()

    return "Complete"
  } catch (error) {
    handleError(error);
  }
}

export async function getBookingOrders() {
  try {
    const eventFilter = `*[_type == 'order' && category == 'Booked Event']`

    const events = await client.fetch<PublicEventProps[]>(
      groq`${eventFilter}`
    )
    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    handleError(error)
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser() {
  // try {

  // const skipAmount = (Number(page) - 1) * limit
  // const conditions = { buyer: userId }

  // const orders = await Order.distinct('event._id')
  //   .find(conditions)
  //   .sort({ createdAt: 'desc' })
  //   .skip(skipAmount)
  //   .limit(limit)
  //   .populate({
  //     path: 'event',
  //     model: Event,
  //     populate: {
  //       path: 'organizer',
  //       model: User,
  //       select: '_id firstName lastName',
  //     },
  //   })

  // const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

  // return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  // } catch (error) {
  //   handleError(error)
  // }
}