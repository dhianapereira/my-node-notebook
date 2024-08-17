import {
  FindManyNearbyParams,
  GymRepository,
} from '@/repositories/gym-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coodinates'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number) {
    const ITEMS_PER_PAGE = 20

    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const MAX_DISTANCE_IN_KM = 10

    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < MAX_DISTANCE_IN_KM
    })
  }
}
