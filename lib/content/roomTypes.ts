import { query } from '../db/turso-http'

export interface RoomType {
  id: string
  name: string
  description: string
  photo: string | null
  quantity: number
  capacity: string
}

export async function getRoomTypes(): Promise<RoomType[]> {
  const rows = await query('SELECT * FROM room_types ORDER BY "order"')
  return rows.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    photo: (row.photo as string | null) ?? null,
    quantity: row.quantity as number,
    capacity: row.capacity as string,
  }))
}
