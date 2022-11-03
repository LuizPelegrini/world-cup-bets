import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
  log: ['query'] // logs out all query
});

async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true, // allow all domains to access backend. Specify domain in production
  });

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.post('/pools', async (request, response) => {
    const createBodySchema = z.object({
      title: z.string()
    });

    // validate body
    const { title } = createBodySchema.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code
      }
    })

    return response.status(201).send({ code });
  });

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count();

    return { count };
  });

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  // start server
  await fastify.listen({
    port: 3333,
    /*host: '0.0.0.0'*/ // so mobile client can access backend
  });
}

bootstrap();
