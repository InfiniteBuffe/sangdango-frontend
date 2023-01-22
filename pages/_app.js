import Layout from '@/components/Layout'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
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
      <Layout>
        <Component key={router.route} {...pageProps} />
      </Layout>
    </>
  )
}
