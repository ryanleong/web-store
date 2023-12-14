Demo: https://web-store-ryanleong.vercel.app/

# Running in development
`Node >20.7` is required to run.

```
npm install
cp .env.sample .env.local
npm run dev
```

# Current setup
- **Zustand** was used for state management and is broken down into slices
  - This neatens the store, allowing better maintanability
  - See `/store`
- A **notification system** was also added to the app
  - Currently, the only notification is when the user adds an item to cart but it could be extended further in the future
  - See `/store/noficationSlice.ts` and `/components/Header/Notification.tsx`
- The app is fully type checked using **Typescript**
- Components were split into separate directories based on the feature they are part of
  - There is also a `common` directory for reusable components
  - See `/components`
- An API hook was set up for making API calls
  - This separates this from the app (better modularity)
- Unit test were done using Jest and React Testing Library
  - Test were kept in each component/file directory
    - This keep the test close to the file, making it easier to refactor as the app grows
    - See `/__tests__` in each respective directory
  - The only exception is unit test for `/page` as NextJS try to parse it as a page route
    - See `/__tests__` in the root directory
    - This is documented in NextJS docs
- In the interest of time, TailwindCSS was used for styling.
- **Framer motion** was also used for page and component transitions

# Design and UX
- The design takes inspiration from the Nike website and Secretlab
  - This provided a good starting point for a good UX experience for the end user
- Images provided by Dummyjson aren't the best, which brings the design down
  - In a real world scenario, images should be optimised for the site

# Limitations
- Dummyjson had an api endpoint for Cart CRUD, but it does not persist the data
  - So cart data is currently saved to localStorage for demo purposes
- Dummyjson only had an endpoint to filter by category, and I used it.
  - However, there isn't one for rating and price range. So currently the sorting logic is on the client side
  - Ideally, this should be done on the API, along with sorting

# Things I would like to upgrade given more time
- Sever-side rendering (SSR) / Incremental Static Regeneration (ISR)
  - This would allow SEO crawlers to have better access to the site
  - Allowing it to be crawled more efficiently
- Routes to persist product filtering
  - ie. `/products/category/${category_slug}?rating=4`
  - This will allow users to persist their current filtering
- Integration/End to end test
  - This would give us better coverage on how the app functions as a whole

