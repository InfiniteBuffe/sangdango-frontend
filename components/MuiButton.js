import { Box, Button, ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const MuiButton = (props) => {
    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    })
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box textAlign='center'>
                    <Button
                        fullWidth
                        style={{
                            height: '50px',
                            width: props.bottomSheet ? '100%' : 'calc(100% - 60px)',
                            maxWidth: '750px',
                            marginTop: '20px',
                            borderRadius: '20px',
                            color: 'white',
                            fontSize: '16px',
                            fontFamily: 'pretendard',
                            fontWeight: 600,
                            ...props.style
                        }}
                        variant="contained"
                        size="large"
                        color="dark"
                        type="submit"
                        onClick={props.onClick}
                        disabled={props.disabled}
                    >
                        {props.children}
                    </Button>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default MuiButton