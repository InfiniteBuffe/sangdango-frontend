import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { motion } from "framer-motion"

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
      <motion.div exit={{ opacity: 0 }}>
        <Component {...pageProps} />
      </motion.div>
    </>
  )
}
