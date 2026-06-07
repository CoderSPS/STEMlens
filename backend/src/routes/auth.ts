import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../index'
import bcrypt from 'bcrypt'

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: { email: string; password: string; name?: string } }>(
    '/signup',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password, name } = request.body

      if (!email || !password) {
        return reply.status(400).send({ message: 'Email and password required' })
      }

      try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
          return reply.status(400).send({ message: 'Email already registered' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: name || 'User',
          },
        })

        const token = fastify.jwt.sign({ id: user.id, email: user.email })
        reply.send({ token, user: { id: user.id, email: user.email, name: user.name } })
      } catch (error) {
        reply.status(500).send({ message: 'Signup failed' })
      }
    }
  )

  fastify.post<{ Body: { email: string; password: string } }>(
    '/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = request.body

      if (!email || !password) {
        return reply.status(400).send({ message: 'Email and password required' })
      }

      try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
          return reply.status(401).send({ message: 'Invalid credentials' })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
          return reply.status(401).send({ message: 'Invalid credentials' })
        }

        const token = fastify.jwt.sign({ id: user.id, email: user.email })
        reply.send({ token, user: { id: user.id, email: user.email, name: user.name } })
      } catch (error) {
        reply.status(500).send({ message: 'Login failed' })
      }
    }
  )

  fastify.get(
    '/me',
    { onRequest: [fastify.authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: (request.user as any).id },
        })
        reply.send({ id: user?.id, email: user?.email, name: user?.name })
      } catch (error) {
        reply.status(500).send({ message: 'Failed to fetch user' })
      }
    }
  )
}
