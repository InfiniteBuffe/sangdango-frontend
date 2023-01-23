import React from "react"
import Link from "next/link"
import { Transition, TransitionGroup } from "react-transition-group"
import { useRouter } from "next/router"
import styles from '@/styles/components/Layout/Layout.module.css'

// const getTransitionStyles = {
//   entering: {
//     position: `absolute`,
//     opacity: 0,
//   },
//   entered: {
//     transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
//     opacity: 1,
//   },
//   exiting: {
//     transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
//     opacity: 0,
//   },
// }

const transition_styles = {
  entering: styles.entering,
  entered: styles.entered,
  exiting: styles.exiting,
}

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <TransitionGroup>
        <Transition
          key={router.pathname}
          timeout={{
            enter: 200,
            exit: 200,
          }}
        >
          {(status) => (
            <div
              className={
                transition_styles[status]
              }
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </>
  );
};

export default Layout;