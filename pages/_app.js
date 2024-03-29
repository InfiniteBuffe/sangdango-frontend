// import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
// import TransitionFix from '@/components/TransitionFix'
import ServiceHeader from '@/components/ServiceHeader'
// import Layout from '@/components/Layout'
import BottomNav from '@/components/BottomNav'
import { SessionProvider } from "next-auth/react"
import "react-spring-bottom-sheet/dist/style.css"
import { Analytics } from '@vercel/analytics/react'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  // TransitionFix()
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Toaster position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 2300,
            style: {
              borderRadius: '30px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
        {/*<Layout>*/}
        <NextNProgress 
          // color='#67e8c2'
          color='#0e1b3d'
        />
        <ServiceHeader />
        <BottomNav />
        <Component key={router.route} {...pageProps} />
        <Analytics />
        {/*</Layout>*/}
        {/* <Component key={router.route} {...pageProps} /> */}
      </SessionProvider>
    </>
  )
}
