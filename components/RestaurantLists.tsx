import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const RestaurantLists = ({ restaurants, totalData }: any) => {

  const router = useRouter();
  const itemPerPages = parseInt(router.query.showItems!.toString());

  const [pages, updatePages] = useState(Math.ceil((totalData / itemPerPages)));

  useEffect(() => {
    updatePages(Math.ceil((totalData / itemPerPages)));
  }, [itemPerPages, totalData])

  return (
    <section className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <header className="flex gap-10">
        <div className="flex-1 w-64">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Recommended Restaurant
          </h2>
        </div>
        <div className="grow-0 h-10"></div>
        <Pages pages={pages} />
        <ChangeItemPerPage itemPerPages={itemPerPages} />
      </header>
      <section className="mt-6 mb-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {
          restaurants.map((restaurant: any) => (
            <article key={restaurant.uid}>
              <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none sm:h-40 sm:aspect-none">
              <Image className="w-full h-full object-center object-cover lg:w-full lg:h-full" layout="fill" src={`https://loremflickr.com/500/500/restaurant?v=${restaurant.id}`} alt={restaurant.description} />
              </div>
              <p>{restaurant.name}</p>
            </article>
          ))
        }
      </section>
      <section className="mt-10">
        <Pages pages={pages}/>
      </section>
    </section>
  )
}

interface ChangeItemPerPageProps {
  itemPerPages: number
}

const ChangeItemPerPage = (props: ChangeItemPerPageProps) => {

  const router = useRouter();
  const array = [10, 30, 50, 100];

  const handleItemPerPages = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({
      pathname: '/restaurants',
      query: { p: 1, showItems: e.target.value}
    })
  }

  return (
    <div className="flex-2 w-32 m-auto text-center border-2 border-black">
      <p className="inline">Show: </p>
      <select className="bg-white"  defaultValue={router.query.showItems} onChange={handleItemPerPages}>
      {
        array.map((number) => (
          <option value={number} key={number}>{number}</option>
        ))
      }
      </select>
    </div>
  )
}

const Pages = (props: {pages: number}) => {

  const router = useRouter();

  const [pageArray, setPageArray] = useState(
    Array.from(Array(props.pages).keys()).map((x) => x += 1)
  )

  const currentPage = parseInt(router.query.p!.toString());
  const lastPage = pageArray.at(-1)!;

  const nextOrBack = (method: string) => {

    if (method === 'next') {
      currentPage !== lastPage ?
      router.push({
        pathname: '/restaurants',
        query: { ...router.query, p: (currentPage + 1).toFixed()}
      }): null
    } else if (method === 'back') {
      currentPage !== 1 ?
      router.push({
        pathname: '/restaurants',
        query: { ...router.query, p: (currentPage - 1).toFixed()}
      }) : null
    }
  }

  const getQuery = () => {
    return `&showItems=${router.query.showItems}`
  };

  const pageLink = {
    NAVIGATOR: "px-1 cursor-pointer text-2xl text-gray-300 hover:text-gray-900",
    LINK: "px-4 text-xl hover:font-bold",
    LINK_ACTIVE: "px-4 text-xl bg-blue-200 rounded",
    DOT: "px-3 text-xl"
  }

  useEffect(() => {
    setPageArray(
      Array.from(Array(props.pages).keys()).map((x) => x += 1)
    );
  }, [props.pages])

  return (
    <div className="flex-1 m-auto text-center">
      <a onClick={() => nextOrBack('back')} className={pageLink.NAVIGATOR}>&lt;</a>
      <a href={"/restaurants/?p=" + '1' + getQuery()} className={currentPage === 1 ? pageLink.LINK_ACTIVE : pageLink.LINK}>1</a>

      {
        (currentPage - 1) >= 4 && (lastPage >= 10) 
        ? <span className={pageLink.DOT}>...</span> 
        : null
      }

      {
        pageArray.flatMap((page) => (
          lastPage <= 7 &&
          (page !== 1 && page !== lastPage)
        ? (
          <a href={"/restaurants/?p=" + page + getQuery()} key={page} className={page === currentPage ? pageLink.LINK_ACTIVE : pageLink.LINK}>{page}</a>
        )
        : (
            page >= (currentPage - 2)) &&
            (page <= (currentPage + 2)) &&
            (page !== 1 && page !== lastPage)
          ? (
            <a href={"/restaurants/?p=" + page + getQuery()} key={page} className={page === currentPage ? pageLink.LINK_ACTIVE : pageLink.LINK}>{page}</a>
            )
          : (
              currentPage <= 2 &&
              page <= 5 && 
              (page !== 1 && page !== lastPage))
            ? (
              <a href={"/restaurants/?p=" + page + getQuery()} key={"f" + page} className={page === currentPage ? pageLink.LINK_ACTIVE : pageLink.LINK}>{page}</a>
            ) 
            : (
                currentPage >= (lastPage - 2) &&
                page >= (lastPage - 5) && 
                (page !== 1 && page !== lastPage) 
              ? (
                <a href={"/restaurants/?p=" + page + getQuery()} key={"l" + page} className={page === currentPage ? pageLink.LINK_ACTIVE : pageLink.LINK}>{page}</a>
              )
              : null
              )
        ))
      }

      {
        (currentPage <= (lastPage - 4)) && (lastPage >= 10)
        ? <span className={pageLink.DOT}>...</span> 
        : null
      }
      <a href={"/restaurants/?p=" + lastPage.toString() + getQuery()} className={currentPage === lastPage ? pageLink.LINK_ACTIVE : pageLink.LINK}>{lastPage}</a>
      <a onClick={() => nextOrBack('next')} className={pageLink.NAVIGATOR}>&gt;</a>
    </div>
  )
}

export default RestaurantLists