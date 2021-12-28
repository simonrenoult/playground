import { FastifyInstance } from 'fastify'

export interface ListeDeEndpoints {
  enregistrerEndpoints(fastify: FastifyInstance): void
}
