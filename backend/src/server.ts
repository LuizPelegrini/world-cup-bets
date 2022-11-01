import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'] // logs out all query
});

async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  });

  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  // start server
  await fastify.listen({
    port: 3333
  });
}

bootstrap();
