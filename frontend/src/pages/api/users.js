// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const fetchUsers = async (level = 'all') => {
  const { data } = await axios.get('/api/users/' + level)

  return data;
}

export { fetchUsers }
