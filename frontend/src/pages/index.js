import Head from "next/head";
import { Toaster } from 'react-hot-toast';
import Homepage from "src/views/Home";
import { useEffect, useState } from "react";
import { checkUser } from "./api/auth";
import Login from "src/views/Login";
import { Box, CircularProgress } from "@mui/material";


export default function Home() {
  const [status, setStatus] = useState("unauthorized")
  const [loading, setLoading] = useState(false)

  const init = () => {
    setLoading(true)
    checkUser()
      .then(res => status != res.data ? setStatus(res.data) : undefined)
      .catch(err => { status != "unauthorized" ? setStatus("unauthorized") : undefined })
      .finally(() => { setLoading(false) })
  }

  useEffect(() => { init() }, [status])

  return (
    <>
      <Toaster />

      <Head>
        <title>Yavuzlar YLMS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        loading
          ? <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <CircularProgress />
          </Box>
          : status == "unauthorized"
            ? <Login setStatus={setStatus} />
            : <Homepage setStatus={setStatus} status={status} />
      }
    </>
  );
}
