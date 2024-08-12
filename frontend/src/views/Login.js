import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { login } from "src/pages/api/auth"
import showToast from "src/utils/showToast"

const Login = ({ setStatus }) => {
    // States
    const [values, setValues] = useState({
        admin_key: "",
        key: "",
        fullname: "",
        are_you_admin: false,
    })
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        if (!values.key || !values.fullname) {
            showToast("error", "Please fill in the blanks")
            return
        }

        setLoading(true)

        login(values)
            .then(res => {
                showToast("dismiss")
                showToast(res?.status, res?.message)

                if (res.data == "success") {
                    setStatus("success")
                    showToast("success", "Hoş geldin " + values.fullname)
                } else {
                    setStatus("unauthorized")
                }
            })
            .catch(err => {
                console.error("err", err)
                if (err?.response?.data?.message) {
                    showToast("dismiss")
                    showToast(err?.response?.data?.status, err?.response?.data?.message)
                }
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (loading) showToast("loading", "Giriş yapılıyor.")
    }, [loading])

    return (
        <div style={{ textAlign: 'center' }}>
            <Card sx={{ width: '100vh' }}>
                <CardHeader title="Yavuzlar Giriş" />
                <CardContent>
                    <Grid container spacing={3}>

                        <Grid item xs={12}>
                            <TextField fullWidth value={values.key} label='Key' onChange={e => setValues({ ...values, key: e.target.value })} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth value={values.fullname} label='Fullname' onChange={e => setValues({ ...values, fullname: e.target.value })} />
                        </Grid>


                        <Grid item xs={12} sx={{ textAlign: 'left' }}>
                            <FormControlLabel
                                label='Admin misin?'
                                control={<Checkbox checked={values.are_you_admin} onChange={e => setValues({ ...values, are_you_admin: e.target.checked })} name='are_you_admin' />}
                            />
                        </Grid>

                        {
                            values.are_you_admin
                                ? <Grid item xs={12}>
                                    <TextField fullWidth value={values.admin_key} label='Admin Key (Opsiyonel)' onChange={e => setValues({ ...values, admin_key: e.target.value })} />
                                </Grid>
                                : null
                        }

                        <Grid item xs={12}>
                            <Button variant="contained" size="large" onClick={handleLogin}>GİRİŞ YAP</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login