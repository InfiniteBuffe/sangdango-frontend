import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  )
}
