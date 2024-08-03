import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}
export class RegisterUserUseCase {
  constructor(private repository: UserRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.repository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.repository.create({
      name,
      email,
      password_hash,
    })
  }
}
