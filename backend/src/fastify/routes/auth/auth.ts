import { FastifyInstance } from 'fastify'
import { userService } from '../../services/user.service'
import { AuthCredentialsSchema, AuthCredentialsType } from './auth.schema'

export const authRoutes = (fastify: FastifyInstance, opts: {}, done: () => void) => {
  fastify.post<{
    Body: AuthCredentialsType
  }>(
    '/login',
    {
      schema: {
        body: AuthCredentialsSchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const user = await userService.findOne({ email })

      if (!user) {
        return reply.status(401).send({ message: 'Email not found' })
      }

      if (await userService.comparePasswords(user, password)) {
        return reply.status(401).send({ message: 'Invalid password' })
      }

      const token = fastify.jwt.sign({ _id: user._id })
      request.session.set('token', token)
      request.session.set('user', user)

      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
      })
      return reply.send({ _id: user._id, email: user.email, token })
    }
  )

  fastify.post<{
    Body: AuthCredentialsType
  }>(
    '/register',
    {
      schema: {
        body: AuthCredentialsSchema,
      },
    },
    async (request, reply) => {
      const { email, password } = request.body
      const alreadyExists = await userService.findOne({ email })

      if (alreadyExists) {
        return reply.status(401).send({ message: 'User already exists' })
      }
      await userService.create({ email, password })
      return reply.send({})
    }
  )

  done()
}
