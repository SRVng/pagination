## About
My first pagination website using Next.js also this is my first time using tailwindcss. (will be responsive soon)

## Problems
This project is running fine in my local development and production (localhost) but when this project deployed through Vercel there are a problem which I assumed that it was caused by getServerSideProps. 500 Internal server error that will occur randomly when browsing through the page.

Later I try to change the way this website navigate to each page.

```
/// Instead of
 <a href={"/restaurants/?p=" + page + getQuery()} />
 
/// Use this
    const router = useRouter()
    ...
    const handlePagesClick = (page: number) => {
    router.push({
      pathname: '/restaurants',
      query: { p: page, showItems: router.query.showItems }
      })
    }
    ...
    <a onClick={() => handlePagesClick(page)} />

```

After my initial guess using this method the website working fine on desktop, no more 500 error. **Still got error on mobile**
