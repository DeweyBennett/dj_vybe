import { Image } from "sanity"

export interface BookedEventProps {
  _id: string
  _createdAt: string
  title: string
  date: string
  startTime: string
  endTime: string
  totalHours: string
  estimatedAttendance: number
  cost: number
  locationStreet: string
  locationCity: string
  locationState: string
  locationZip: string
  hostName: string
  hostEmail: string
  hostPhone: string
  additionalInfo: string
}

export interface PublicEventProps {
  _id: string
  _createdAt: string
  title: string
  date: string
  startTime: string
  endTime: string
  totalHours: number
  estimatedAttendance: number
  cost: number
  locationStreet: string
  locationCity: string
  locationState: string
  locationZip: string
  hostName: string
  hostEmail: string
  hostPhone: string
  poster: Image
  additionalInfo: string
}

export interface TicketOrderProps {
  _id: string
  _createdAt: string
  eventTitle: string
  eventId: string
  cost: number
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  hostName: string
  hostEmail: string
  hostPhone: string
  stripeId: string
}

export interface UserProps {
  _id: string
  _createdAt: string
  clerk: string
  firstName: string
  lastName: string
  email: string
  phone: string
  eventsBooked: [{
    eventId: string
    date: string
    cost: number
  }]
  ticketsPurchased: [{
    orderId: string
    eventId: string
    date: string
    cost: number
  }]
}