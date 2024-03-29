import Head from 'next/head'
import styles from '@/styles/pages/Main/Main.module.css'
import Header from '@/components/Header'
import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Twemoji from 'react-twemoji'
import Footer from '@/components/Footer'
import LoginModal from '@/components/LoginModal'
import axios from 'axios'
import ReactPlayer from 'react-player'
import TwemojiFix from '@/components/TwemojiFix'

const Main = () => {

  const TEXTS = [
    (<div>미래를 주도할 🚀<br />역량있는 상당인,</div>),
    (<div>상상하라,<br />당당하라!</div>)
  ]
  const [playerReady, setPlayerReady] = useState(false)
  const [loginModalStatus, setLoginModalStatus] = useState(false)
  const [meal, setMeal] = useState({ breakfast: '불러오는 중...', lunch: '불러오는 중...', dinner: '불러오는 중...', today: '조회 중...' })
  const videoRef = useRef()
  const router = useRouter()
  const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)

  // const { data: session } = useSession()

  useEffect(() => {
    if (!router.isReady) return
    setPlayerReady(true)
    axios({
      url: url + '/api/meal/today',
      method: 'GET'
    })
      .then(r => {
        let { data } = r
        setMeal({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
          today: data.today
        })
      })
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
      <LoginModal open={loginModalStatus} cb={setLoginModalStatus} />
      <div className={styles.video_box}>
        {/* <div className={styles.video_text}>
          미래인재 양성하는 희망찬 <span id={styles.video_text_school}>상당고등학교</span>
        </div> */}
        {playerReady && (
          <ReactPlayer
            url='https://cdn.sangdang.kr/sangdango_intro/sangdango_intro.m3u8'
            muted={true}
            controls={false}
            loop={true}
            playing={true}
            className={styles.video}
            width={'100%'}
            height={'100%'}
            playsinline={true}
            autoPlay={true}
          />
        )}
      </div>
      <div className={styles.slogan}>
        <div className={styles.text}>
          <span id={styles.nowarp}>미래인재🌏</span>
          <span id={styles.nowarp}>양성하는✏️</span>
          <span id={styles.nowarp}>희망찬✨</span>
          <span id={styles.nowarp}>상당고등학교🏫</span>
        </div>
      </div>
      {/* {(session) ? (
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
      ) : (
        <div className={styles.account_card} id={styles.account_nologin}>
          <div className={styles.account_text} id={styles.account_nologin_text}>
            간편하게 로그인 →
          </div>
          <div className={styles.account_login_box} onClick={()=>setLoginModalStatus(true)}>
            <div className={styles.account_login}>
              로그인
            </div>
          </div>
        </div>
      )} */}
      <div className={styles.meal_container}>
        <div className={styles.meal_title}>
          오늘의 식단 🍽️
        </div>
        {/* <div className={styles.space}/> */}
        <div className={styles.meal_box}>
          <div className={styles.meal_item}>
            <div className={styles.meal_item_title} id={styles.breakfast}>
              조식
            </div>
            <div className={styles.meal_item_menu}>
              {meal.breakfast}
            </div>
          </div>
          <div className={styles.meal_item}>
            <div className={styles.meal_item_title} id={styles.lunch}>
              중식
            </div>
            <div className={styles.meal_item_menu}>
              {meal.lunch}
            </div>
          </div>
          <div className={styles.meal_item}>
            <div className={styles.meal_item_title} id={styles.dinner}>
              석식
            </div>
            <div className={styles.meal_item_menu}>
              {meal.dinner}
            </div>
          </div>
        </div>
        <div className={styles.meal_notice}>
          기준: {meal.today}
        </div>
      </div>
      {/* <div className={styles.intro_big_text}>
        너만의 학교를 만들어봐!
      </div> */}
      {/* <div className={styles.intro_small_text}>
        아래 버튼을 눌러 이동하세요
      </div> */}
      <div className={styles.warp_container}>
        <div className={styles.warp_box} id={styles.umbrella} onClick={() => { router.push('/service/rental/home'); toast('우산대여 서비스로 이동합니다') }}>
          <div className={styles.warp_text_box}>
            <div className={styles.warp_big_text}>
              <span className={styles.warp_big_text_line}>우산대여&nbsp;</span><span><TwemojiFix options={{ className: styles.emoji_font }}>☂</TwemojiFix></span>
              <div className={styles.warp_big_small_text}>
                손쉽게 우산 대여!
              </div>
            </div>
            <div className={styles.warp_small_text}>눌러서 이동하기 →</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Main