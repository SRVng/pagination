import Layout from "../components/Layout";
import React from 'react';
import axios from 'axios';
import { server } from "../config";
import RestaurantLists from "../components/RestaurantLists";
import Head from "next/head";
import { useRouter } from "next/router";

const Restaurants = ({ restaurants, totalData }: any) => {

  const router = useRouter();

  const restaurantProps = {
    restaurants,
    totalData
  }

  return (
    <Layout>
      <>
      <Head>
        <title>Restaurants: Page {router.query.p}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RestaurantLists {...restaurantProps}/>
      </>
    </Layout>
  )
}

// https://github.com/vercel/next.js/discussions/20641
// Issue at Vercel

export async function getServerSideProps(context: any) {

  const query = (context.query.p && context.query.showItems) ? ('?p=' + context.query.p  + '&showItems=' + context.query.showItems) : ''

  const restaurants = await axios.get(
    server.url + '/api/perPages' + query
  );

  return {
    props: {
      restaurants: restaurants.data.data,
      totalData: restaurants.data.totalData
    }
  }
}

export default Restaurants