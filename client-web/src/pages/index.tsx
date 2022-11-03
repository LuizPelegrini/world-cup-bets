import { GetStaticProps } from 'next';
import { FormEvent, useState } from 'react';
import Image from 'next/image';

import { api } from '../lib/axios';

import appPreviewImg from '../assets/app-preview.png';
import logoImg from '../assets/logo.svg';
import avatarsExampleImg from '../assets/avatars-example.png';
import iconCheckImg from '../assets/icon-check.svg';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      });

      const { code } = response.data;
      await navigator.clipboard.writeText(code);

      alert('Pool successfully created, code copied to clipboard!');

      setPoolTitle('');
    } catch (err) {
      console.log(err);
      alert('Failed on creating the pool');
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="Logo" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Create your own World Cup pool and share with your friends!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarsExampleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-green-500">+{userCount}</span> people are using it
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2" >
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 tex-sm text-gray-100"
            type="text"
            required
            placeholder="What's the pool's name?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Create My Pool
          </button>
        </form>

        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          After creating your pool, you&apos;ll receive an unique code to invite your friends 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount}</span>
              <span>Pools created</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount}</span>
              <span>Guesses sent</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Two mobile phones displaying app preview"
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [
    poolCountResponse,
    guessCountResponse,
    userCountResponse
  ] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    },
    revalidate: 10
  };
};
