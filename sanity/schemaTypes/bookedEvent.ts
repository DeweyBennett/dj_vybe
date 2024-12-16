import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const bookedEventType = defineType({
  name: 'bookedEvent',
  title: 'BookedEvent',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'date',
      type: 'string',
    }),
    defineField({
      name: 'startTime',
      type: 'string',
    }),
    defineField({
      name: 'endTime',
      type: 'string',
    }),
    defineField({
      name: 'totalHours',
      type: 'string',
    }),
    defineField({
      name: 'estimatedAttendance',
      type: 'number',
    }),
    defineField({
      name: 'cost',
      type: 'number',
    }),
    defineField({
      name: 'locationStreet',
      type: 'string',
    }),
    defineField({
      name: 'locationCity',
      type: 'string',
    }),
    defineField({
      name: 'locationState',
      type: 'string',
    }),
    defineField({
      name: 'locationZip',
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
      name: 'additionalInfo',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'hostName',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
