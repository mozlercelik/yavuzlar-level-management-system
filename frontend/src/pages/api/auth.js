// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";


const login = async (values) => {
  const { data } = await axios({
    method: "post",
    url: "/api/auth/login",
    data: values
  })

  return data
}

const checkUser = async () => {
  const { data } = await axios.get('/api/auth/check')

  return data;
}

const logout = async () => {
  const { data } = await axios.get('/api/auth/logout')

  return data;
}


export { login, checkUser, logout }
