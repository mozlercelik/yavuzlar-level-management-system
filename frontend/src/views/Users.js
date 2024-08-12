import { Chip, Box, Typography, CircularProgress, Tooltip, Button } from "@mui/material";
import styles from "src/styles/Home.module.css";
import { useEffect, useState } from 'react'
import showToast from 'src/utils/showToast'
import { useRouter } from 'next/router'
import { fetchUsers } from "src/pages/api/users";
import { checkUser } from "src/pages/api/auth";

const Users = ({ level = 'all', title }) => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const init = () => {
        checkUser()
            .then(res => { })
            .catch(err => { router.replace("/") })
    }

    useEffect(() => { init() }, [])

    useEffect(() => {
        setLoading(true)
        fetchUsers(level)
            .then(res => {
                showToast(res.status, res.message)

                if (!res?.data) return null

                setUsers(res?.data)
                if (level == "core")
                    fetchUsers("leader").then(res2 => {
                        setUsers([
                            ...res?.data,
                            ...res2?.data
                        ])
                    })
            })
            .catch(err => console.log(err))
        setLoading(false)
    }, [])

    return (
        <>
            <img
                className={styles.logo}
                src="/yavuzlar.png"
                alt="Yavuzlar Logo"
                style={{
                    maxHeight: "80px",
                    cursor: 'pointer'
                }}
                onClick={() => router.replace("/")}
            />

            <div className={styles.center}>
                <div className={styles.description}>
                    <p style={{ fontSize: "2rem" }}>
                        {title}
                    </p>
                </div>
            </div>

            {
                loading
                    ? <CircularProgress />
                    : <Box sx={{
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        {
                            users?.length > 0 && level == "core"
                                ? users?.find((user) => user.level == 'leader')
                                    ? <Tooltip title="Lider" placement="top">
                                        <Chip label={users?.find((user) => user.level == 'leader').first_name + " " + users?.find((user) => user.level == 'leader').last_name} sx={{ borderRadius: '4px', cursor: 'default' }} color={"primary"} />
                                    </Tooltip>
                                    : null
                                : null
                        }
                        {
                            users?.length > 0
                                ? users?.filter(({ level }) => level != 'leader').map((user, index) => {
                                    return (
                                        <Chip key={index} label={user.first_name + " " + user.last_name} sx={{ borderRadius: '4px', cursor: 'default' }} />
                                    )
                                })
                                : <Box>
                                    <Typography variant="h4">Üye bulunamadı</Typography>
                                </Box>
                        }
                    </Box>
            }


            <Button onClick={() => router.replace("/")}>ANA SAYFA</Button >
        </>
    )
}

export default Users