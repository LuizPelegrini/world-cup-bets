import Fastify from 'fastify';

async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  });

  fastify.get('/pools/count', () => {
    return { count: 0 }
  });

  // start server
  await fastify.listen({
    port: 3333
  });
}

bootstrap();
