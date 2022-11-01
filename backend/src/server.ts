import Fastify from 'fastify';

async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  });

  // start server
  await fastify.listen({
    port: 3333
  });
}

bootstrap();
