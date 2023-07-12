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

export default function App({ Component, pageProps }) {
  const router = useRouter()
  // TransitionFix()
  return (
    <>
      <SessionProvider>
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
            <ServiceHeader />
            <BottomNav />
            <Component key={router.route} {...pageProps} />
        {/*</Layout>*/}
        {/* <Component key={router.route} {...pageProps} /> */}
      </SessionProvider>
    </>
  )
}
