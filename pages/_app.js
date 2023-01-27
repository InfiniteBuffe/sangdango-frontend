// import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import TransitionFix from '@/components/TransitionFix'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const transition_paths = ['/', '/service/club/home']
  TransitionFix()
  return (
    <>
      <Toaster position="bottom-center"
        reverseOrder={false}
        toastOptions={{
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
      <Component key={router.route} {...pageProps} />
    </>
  )
}
