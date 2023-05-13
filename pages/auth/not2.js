import Header from '@/components/Header';
import styles from '@/styles/pages/auth/join/not2/Join.module.css';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { grey, pink } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import Twemoji from 'react-twemoji';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Loading from "@/components/Loading";
import axios from "axios";
import {useRouter} from "next/router";
import { setCookie } from 'cookies-next';

const Join = () => {
	const theme = createTheme({
		palette: {
			dark: {
				main: grey[900],
			},
		},
	});

	const fadeAnimationDuration = 700 // css에서 재생시간 변경 시 ms단위로 변경 필요함.

	const nextButton = () => {
		setFirstViewStyle(styles.fadeout);
		setTimeout(() => {
			setFirstViewStyle(styles.remove);
			setSecondViewStyle(styles.fadein);
		}, fadeAnimationDuration);
	};

	const [firstViewStyle, setFirstViewStyle] = useState();
	const [secondViewStyle, setSecondViewStyle] = useState(styles.remove);
	const [allCheckedNextButtonClass, setAllCheckedNextButtonClass] = useState(styles.remove)

	const [privacyAgree, setPrivacyAgree] = useState(false);
	const [termsAgree, setTermsAgree] = useState(false);
	const [allAgree, setAllAgree] = useState(false);

	const [allCheckedNextButton, setAllCheckedNextButton] = useState(false);
	const [loadingVisible, setLoadingVisible] = useState(false)

	const allCheck = () => {
		if(allAgree) {
			setPrivacyAgree(false);
			setTermsAgree(false);
			setAllAgree(false);
		} else {
			setPrivacyAgree(true);
			setTermsAgree(true);
			setAllAgree(true);
		}
	};

	const router = useRouter()

	const gotoForm = () => {
		setLoadingVisible(true) // 나중에 버튼 클릭 시 버튼 글자 옆에 spinner 돌아가게 할 것. 이건 너무 좀 그런거같음.
		axios({
			url: '/api/verify/join/create',
			method: 'post',
			data: {
				privacy_agree: privacyAgree,
				terms_agree: termsAgree,
			}
		})
			.then( r => {
				// router.replace({
				// 	pathname: '/auth/join/info',
				// 	query: {
				// 		token: r.data.token
				// 	}
				// })
				setCookie('join_token', r.data.token, {maxAge: 10})
				router.push('/auth/join/info')
			})
	}

	useEffect(() => {
		if (termsAgree && privacyAgree) {
			setAllAgree(true);
			setAllCheckedNextButton(true);
			setAllCheckedNextButtonClass(styles.fadein);
		} else {
			setAllAgree(false);
			setAllCheckedNextButton(false);
			setAllCheckedNextButtonClass(styles.remove);
		}
	}, [termsAgree, privacyAgree]);

	return (
		<>
			<Header />
			<Loading visible={loadingVisible} />
			<div className={styles.box}>
				<div className={styles.title}>회원가입</div>
				<div className={styles.title_info}>서비스를 이용하기 위한 계정을 생성합니다.</div>
				<span className={firstViewStyle}>
					<div className={styles.intro_text}>
						<Twemoji options={{ className: styles.intro_emoji }}>👏</Twemoji>
						<div className={styles.space} />
						<div id={styles.intro_1}>반가워요.</div>
						<div className={styles.space} />
						<div id={styles.intro_2}>
							아래 버튼을 눌러
							<br />
							계정을 만들어보세요.
						</div>
					</div>
					<ThemeProvider theme={theme}>
						<Button
							fullWidth
							style={{
								fontFamily: 'pretendard',
								fontWeight: 600,
								height: '60px',
								fontSize: '16px',
								width: 'calc(100% - 30px)',
								left: '15px',
								color: 'white',
								borderRadius: '20px',
								position: 'absolute',
								bottom: '15px',
							}}
							variant="contained"
							size="large"
							color="dark"
							onClick={nextButton}
						>
							시작하기 →
						</Button>
					</ThemeProvider>
				</span>
				<span className={secondViewStyle}>
					<div className={styles.terms}>
						<div className={styles.space} />
						<div className={styles.terms_title}>
							<span id={styles.terms_light}>잠깐!</span>
							<br />
							<span id={styles.terms_highlight}>이용 동의</span>가 필요해요.
						</div>
						<div className={styles.space} />
						<div className={styles.all_select}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={allAgree}
											onClick={allCheck}
											sx={{
												color: grey[900],
												'&.Mui-checked': {
													color: grey[900],
												},
											}}
										/>
									}
									style={{ fontFamily: 'pretendard' }}
									label={
										<div className={styles.label} style={{ fontWeight: 800 }}>
											모두 동의합니다
										</div>
									}
								/>
							</FormGroup>
						</div>
						<div className={styles.space} />
						<div className={styles.select}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={termsAgree}
											onClick={() => setTermsAgree(!termsAgree)}
											sx={{
												color: grey[900],
												'&.Mui-checked': {
													color: grey[900],
												},
											}}
										/>
									}
									style={{ fontFamily: 'pretendard' }}
									label={
										<div className={styles.label}>
											서비스 이용약관 동의{' '}
											<span className={styles.require}>(필수)</span>
										</div>
									}
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={privacyAgree}
											onClick={() => setPrivacyAgree(!privacyAgree)}
											sx={{
												color: grey[900],
												'&.Mui-checked': {
													color: grey[900],
												},
											}}
										/>
									}
									style={{ fontFamily: 'pretendard' }}
									label={
										<div className={styles.label}>
											개인정보 수집이용 동의{' '}
											<span className={styles.require}>(필수)</span>
										</div>
									}
								/>
							</FormGroup>
						</div>
						<ThemeProvider theme={theme}>
							<div className={allCheckedNextButtonClass}>
								<Button
									fullWidth
									style={{
										fontFamily: 'pretendard',
										fontWeight: 600,
										height: '60px',
										fontSize: '16px',
										width: 'calc(100% - 30px)',
										left: '15px',
										color: 'white',
										borderRadius: '20px',
										position: 'absolute',
										bottom: '15px',
									}}
									variant="contained"
									size="large"
									color="dark"
									onClick={gotoForm}
								>
									다음으로 →
								</Button>
							</div>
						</ThemeProvider>
					</div>
				</span>
			</div>
		</>
	);
};

export default Join;