import { type SchemaTypeDefinition } from 'sanity'
import { bookedEventType } from './bookedEvent'
import { publicEventype } from './publicEvent'
import { ticketOrderType } from './ticketOrder'
import { userType } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bookedEventType, publicEventype, ticketOrderType, userType],
}
