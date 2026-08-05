import type { Image } from 'sanity'
import { sanityClient, urlFor } from './client'
import { roomTypesQuery } from './queries'

export interface RoomType {
  name: string
  description: string
  photo: string | null
  quantity: number
  capacity: string
}

interface RawRoomType extends Omit<RoomType, 'photo'> {
  photo: Image | null
}

export async function getRoomTypes(): Promise<RoomType[]> {
  const raw: RawRoomType[] = await sanityClient.fetch(roomTypesQuery)
  return raw.map((r) => ({
    ...r,
    photo: r.photo ? urlFor(r.photo).width(1200).url() : null,
  }))
}
