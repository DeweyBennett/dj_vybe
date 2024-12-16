import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      type: 'string',
    }),
    defineField({
      name: 'clerk',
      type: 'string',
    }),
    defineField({
      name: 'eventsBooked',
      type: 'array',
      of: [
        {
          type: "object",
          fields: [
            { type: "string", name: "eventId" },
            { type: "string", name: "date" },
            { type: "number", name: "cost" }
          ]
        }
      ],
    }),
    defineField({
      name: 'ticketsPurchased',
      type: 'array',
      of: [
        {
          type: "object",
          fields: [
            { type: "string", name: "orderId" },
            { type: "string", name: "eventId" },
            { type: "string", name: "date" },
            { type: "number", name: "cost" }
          ]
        }
      ],
    }),
  ],
  preview: {
    select: {
      title: 'clerk',
    },
  },
})
