import { useEffect, useState } from 'react'
import { fetchUsers } from '../api/users'
import showToast from 'src/utils/showToast'
import Users from 'src/views/Users'

const Core = () => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        fetchUsers("software-development").then(res => {
            showToast(res.status, res.message)

            setUsers(res?.data)
        }).catch(err => console.log(err))
    }, [])

    return (
        <Users level="software-development" title="Yazılım Geliştirme Birim Üyeleri" />
    )
}

export default Core