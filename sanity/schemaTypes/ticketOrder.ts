import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ticketOrderType = defineType({
  name: 'ticketOrder',
  title: 'TicketOrder',
  type: 'document',
  fields: [
    defineField({
      name: 'eventTitle',
      type: 'string',
    }),
    defineField({
      name: 'eventId',
      type: 'string',
    }),
    defineField({
      name: 'cost',
      type: 'number',
    }),
    defineField({
      name: 'buyerName',
      type: 'string',
    }),
    defineField({
      name: 'buyerEmail',
      type: 'string',
    }),
    defineField({
      name: 'buyerPhone',
      type: 'string',
    }),
    defineField({
      name: 'hostName',
      type: 'string',
    }),
    defineField({
      name: 'hostEmail',
      type: 'string',
    }),
    defineField({
      name: 'hostPhone',
      type: 'string',
    }),
    defineField({
      name: 'stripeId',
      type: 'string',
    }),
  ],
})
