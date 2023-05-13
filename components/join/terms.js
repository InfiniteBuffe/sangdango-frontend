import {Checkbox, createTheme, FormControlLabel, FormGroup} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useEffect, useState} from "react";
import styles from "@/styles/components/join/Terms/Terms.module.css";

const Terms = (props) => {
    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    })
    const [privacyAgree, setPrivacyAgree] = useState(false);
    const [termsAgree, setTermsAgree] = useState(false);
    const [allAgree, setAllAgree] = useState(false);
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
    useEffect(() => {
        if (termsAgree && privacyAgree) {
            setAllAgree(true);
            props.checkedState(true)
        } else {
            setAllAgree(false);
            props.checkedState(false)
        }
    }, [termsAgree, privacyAgree]);

    return (
        <>
            <div className={styles.all_select}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={props.buttonState}
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
                                disabled={props.buttonState}
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
                                disabled={props.buttonState}
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
        </>
    )
}

export default Terms