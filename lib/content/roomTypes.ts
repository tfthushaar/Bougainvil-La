import { asc } from 'drizzle-orm'
import { db } from '../db/client'
import { roomTypes } from '../db/schema'

export interface RoomType {
  name: string
  description: string
  photo: string | null
  quantity: number
  capacity: string
}

export async function getRoomTypes(): Promise<RoomType[]> {
  return db().select().from(roomTypes).orderBy(asc(roomTypes.order))
}
