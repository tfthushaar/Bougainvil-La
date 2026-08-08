import type { Image } from 'sanity'
import { urlFor } from './client'
import { sanityFetch } from './live'
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
  const { data } = await sanityFetch({ query: roomTypesQuery })
  return (data as RawRoomType[]).map((r) => ({
    ...r,
    photo: r.photo ? urlFor(r.photo).width(1200).url() : null,
  }))
}
