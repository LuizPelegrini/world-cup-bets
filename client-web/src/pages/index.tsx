import Image from 'next/image';

import appPreviewImg from '../assets/app-preview.png';
import logoImg from '../assets/logo.svg';
import avatarsExampleImg from '../assets/avatars-example.png';
import iconCheckImg from '../assets/icon-check.svg';

export default function Home() {
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
            <span className="text-green-500">+12.592</span>people are using it
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 tex-sm"
            type="text"
            required
            placeholder="What's the pool's name?"
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
              <span className="font-bold text-2xl">+2.034</span>
              <span>Pools created</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+192.847</span>
              <span>Guesses created</span>
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

// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json();

//   return {
//     props: {
//       count: data.count
//     }
//   };
// };
