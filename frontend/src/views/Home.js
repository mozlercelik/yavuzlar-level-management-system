import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { logout } from "src/pages/api/auth";
import styles from "src/styles/Home.module.css";
import showToast from "src/utils/showToast";

const Homepage = ({ setStatus, status }) => {
    const router = useRouter()

    const handleLogout = () => {
        logout()
            .then(() => {
                setStatus("unauthorized")
                showToast("dismiss")
                showToast("success", "logout success.")
            })
    }

    return (
        <>
            <img
                className={styles.logo}
                src="/yavuzlar.png"
                alt="Yavuzlar Logo"
                style={{
                    maxHeight: "80px"
                }}
            />

            <div className={styles.center}>
                <div className={styles.description}>
                    <p style={{ fontSize: "2rem", textAlign: 'center' }}>
                        Yavuzlar Organizason Yapısı & Üyeler
                        <br />

                        <span style={{ fontSize: "12px" }}>
                            {
                                status == "admin"
                                    ? "You are admin!"
                                    : null
                            }
                        </span>
                    </p>
                </div>
            </div>

            <div className={styles.grid}>
                <Box
                    className={styles.card}
                    onClick={() => router.replace("/users/core")}
                    sx={{ cursor: 'pointer' }}
                >
                    <h2>
                        Core <span>-&gt;</span>
                    </h2>
                    <p>
                        4. Seviye (Core) seviyesinde kimlerin olduğunu buradan görebilirsin.
                    </p>
                </Box>

                <Box
                    className={styles.card}
                    onClick={() => router.replace("/users/controller")}
                    sx={{ cursor: 'pointer' }}
                >
                    <h2>
                        Controller <span>-&gt;</span>
                    </h2>
                    <p>
                        3. Seviye (Controller) seviyesinde kimlerin olduğunu buradan görebilirsin.
                    </p>
                </Box>

                <Box
                    className={styles.card}
                    onClick={() => router.replace("/users/redteam")}
                    sx={{ cursor: 'pointer' }}
                >
                    <h2>
                        Red Team <span>-&gt;</span>
                    </h2>
                    <p>
                        2. Seviye (Red Team Birim Üyesi) seviyesinde kimlerin olduğunu buradan görebilirsin.
                    </p>
                </Box>

                <Box
                    className={styles.card}
                    onClick={() => router.replace("/users/software-development")}
                    sx={{ cursor: 'pointer' }}
                >
                    <h2>
                        Yazılım Geliştirme <span>-&gt;</span>
                    </h2>
                    <p>
                        2. Seviye (Yazılım Geliştirme Birim Üyesi) seviyesinde kimlerin olduğunu buradan görebilirsin.
                    </p>
                </Box>
            </div>

            <Button onClick={handleLogout}>ÇIKIŞ YAP</Button>
        </>
    )
}

export default Homepage