import { CheckInRepository } from '@/repositories/check-in-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { CheckIn } from '@prisma/client'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import dayjs from 'dayjs'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const MAX_TIME_IN_MINUTES = 20

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > MAX_TIME_IN_MINUTES) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
