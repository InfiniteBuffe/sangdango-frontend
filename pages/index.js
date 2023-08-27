import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/pages/Main/Main.module.css'
import Header from '@/components/Header'
import TextTransition, { presets } from "react-text-transition"
import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Twemoji from 'react-twemoji'
import Footer from '@/components/Footer'
import { signOut, useSession } from 'next-auth/react'

const Main = () => {

  const TEXTS = [
    (<div>미래를 주도할 🚀<br />역량있는 상당인,</div>),
    (<div>상상하라,<br />당당하라!</div>)
  ]
  const [index, setIndex] = useState(0);
  const [videoClass, setVideoClass] = useState(styles.video)
  const videoRef = useRef()
  const router = useRouter()

  const { data: session } = useSession()

  useEffect(() => {
    // toast('3월 2일에 만나요! 🎉',
    //   // {
    //   //   icon: '⏳',
    //   // }
    // );
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      5000
    )
    // 화면 크기에 따라 영상 잘리는 부분 없애기
    // if (typeof window != undefined) {
    //   const handleResize = () => {
    //     let width = window.innerWidth
    //     let height = window.innerHeight
    //     if (width >= height * 2) {
    //       setVideoClass(classNames(styles.video, styles.video_bug))
    //     } else {
    //       setVideoClass(styles.video)
    //     }
    //   }
    //   window.addEventListener('resize', handleResize)
    //   return () => {
    //     window.removeEventListener('resize', handleResize)
    //     clearTimeout(intervalId)
    //   }
    // }
    // return () => clearTimeout(intervalId)
  }, [])
  return (
    <>
      <Head>
        <title>상당고등학교 학생정보망</title>
        <meta name="description" content="상당고등학교 학생들을 위한 온라인 공간 📡" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.video_box}>
        <div className={styles.video_text_box}>
          <div className={styles.video_top_text}>
            상당고 학생정보망📡
          </div>
          <div className={styles.video_text}>
            <TextTransition springConfig={presets.default}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
            <div className={styles.video_space} />오직 <span className={styles.highlight}>상당고에서.</span>
          </div>
          <Image
            src="/images/down_arrow.svg"
            className={styles.down_arrow}
            width={20}
            height={20}
          />
        </div>
        <video
          ref={videoRef}
          autoPlay={true}
          loop={true}
          width={'100%'}
          height={'100%'}
          muted={true}
          className={videoClass}
        >
          <source src="https://cdn.sangdang.kr/intro_video.mp4" type='video/mp4' />
        </video>
      </div>
      {(session) ? (
        <div className={styles.account_card}>
          <div className={styles.account_text}>
            {session.user.name}님
          </div>
          <div className={styles.account_logout_box} onClick={()=>signOut()}>
            <div className={styles.account_logout}>
              로그아웃
            </div>
          </div>
        </div>
      ) : (<></>)}
      <div className={styles.intro_big_text}>
        너만의 학교를 만들어봐!
      </div>
      <div className={styles.intro_small_text}>
        아래 버튼을 눌러 이동하세요
      </div>
      <div className={styles.warp_container}>
        <div className={styles.warp_box} id={styles.umbrella} onClick={() => { router.push('/service/rental/home'); toast('우산대여 서비스로 이동합니다') }}>
          <div className={styles.warp_text_box}>
            <div className={styles.warp_big_text}>
              <span className={styles.warp_big_text_line}>우산대여&nbsp;</span><span><Twemoji options={{ className: styles.emoji_font }}>☂</Twemoji></span>
              <div className={styles.warp_big_small_text}>
                손쉽게 우산 대여!
              </div>
            </div>
            <div className={styles.warp_small_text}>눌러서 이동하기 →</div>
          </div>
        </div>
        {/* <div className={styles.warp_box} id={styles.club} onClick={()=>{router.push('/service/club/home');toast('동아리 서비스로 이동합니다')}}>
          <div className={styles.warp_text_box}>
            <div className={styles.warp_big_text}>
              <span className={styles.warp_big_text_line}>동아리&nbsp;</span><span><Twemoji options={{ className: styles.emoji_font }}>🔬</Twemoji></span>
              <div className={styles.warp_big_small_text}>
                동아리를 손쉽게 관리.
              </div>
            </div>
            <div className={styles.warp_small_text}>눌러서 이동하기 →</div>
          </div>
        </div> */}
        {/* <div className={styles.warp_box} id={styles.community} onClick={()=>toast('학기 중 오픈 예정이에요!')}>
          <div className={styles.warp_text_box}>
            <div className={styles.warp_big_text}>
              <span className={styles.warp_big_text_line}>커뮤니티&nbsp;</span><span><Twemoji options={{ className: styles.emoji_font }}>✍️</Twemoji></span>
              <div className={styles.warp_big_small_text}>
                사람이 여행하는 곳은 사람의 마음뿐이다
              </div>
            </div>
            <div className={styles.warp_small_text}>눌러서 이동하기 →</div>
          </div>
        </div>
        <div className={styles.warp_box} id={styles.music} onClick={()=>toast('학기 중 협의 후 오픈 예정이에요!')}>
          <div className={styles.warp_text_box}>
            <div className={styles.warp_big_text}>
              <span className={styles.warp_big_text_line}>시설이용&nbsp;</span><span><Twemoji options={{ className: styles.emoji_font }}>📋</Twemoji></span>
              <div className={styles.warp_big_small_text}>
                지금. 여기. 상당고에서.
              </div>
            </div>
            <div className={styles.warp_small_text}>눌러서 이동하기 →</div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export default Main