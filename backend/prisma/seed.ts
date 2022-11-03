import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/LuizPelegrini.png'
    }
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      onwerId: user.id,

      // creating a participant inside this pool
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.match.create({
    data: {
      date: '2022-11-10T13:23:18.776Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  });


  await prisma.match.create({
    data: {
      date: '2022-11-08T13:23:18.776Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        // create a guess
        create: {
          firstTeamScore: 2,
          secondTeamScore: 1,

          // connecting an existent participant (via its composed key) to the guess
          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  });
}

main();
