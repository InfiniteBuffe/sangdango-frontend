// import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import TransitionFix from '@/components/TransitionFix'
import ServiceHeader from '@/components/ServiceHeader'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  TransitionFix()
  return (
    <>
      <Toaster position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '30px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      {/* <Layout>
        <Component key={router.route} {...pageProps} />
      </Layout> */}
      <ServiceHeader />
      <Component key={router.route} {...pageProps} />
    </>
  )
}
