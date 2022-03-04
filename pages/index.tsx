import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import data from '../data.json';

const Home: NextPage = () => {

  return (
    <Layout>
      <main className="relative bg-white overflow-hidden">
        <section className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <article className="sm:max-w-lg">
                <h4 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                    Discover your new favorite restaurant
                </h4>
                <p className="mt-4 text-xl text-gray-500">
                    Don&apos;t let yourself / your family / your friends disappointed by some restaurants, Read a review from us and &quot;Make Your Dinner Great Again!&quot;
                </p>
                <Link href="/restaurants/?p=1&showItems=30">
                    <a className="mt-8 text-center bg-cyan-600 border border-transparent rounded py-3 px-8 inline-block text-white font-medium hover:bg-cyan-700">Browse</a>
                </Link>
            </article>    
            <section className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <article className="grid grid-flow-row pt-16 max-w-7xl mx-auto px-4">
                {
                    data.data.slice(0,2).map((restaurant: any) => (
                        <div key={restaurant.uid}>
                        <Image className="w-full h-full object-center object-cover lg:w-full lg:h-full" width={'160'} height={'160'} src={`https://loremflickr.com/500/500/restaurant?v=${restaurant.id}`} alt={restaurant.description} />
                        <h5 className="mt-2 text-xl font-bold">{restaurant.name}</h5>
                        <p className="mt-2 mb-6 max-w-lg">{restaurant.review}</p>
                        </div>
                    ))
                }
                </article>
            </section>
        </section>
      </main>
    </Layout>
  )
}

export default Home
