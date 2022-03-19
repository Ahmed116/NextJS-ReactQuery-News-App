import React from 'react'
import '../styles/globals.css'
import 'antd/dist/antd.css'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'


export default function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}
 
