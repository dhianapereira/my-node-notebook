import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from './register-user'

describe('Register Use Case', () => {
  it('Should be able to register', async () => {
    const repository = new InMemoryUserRepository()
    const useCase = new RegisterUserUseCase(repository)

    const { user } = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const repository = new InMemoryUserRepository()
    const useCase = new RegisterUserUseCase(repository)

    const { user } = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const repository = new InMemoryUserRepository()
    const useCase = new RegisterUserUseCase(repository)

    const email = 'johndoe@example.com'

    await useCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      useCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
