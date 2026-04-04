import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'

import {GeneralProps, StorageProps} from '@/types/CommonTypes'

const AuthWrapper = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  const [status, setStatus] = useState(false)
  const Data = useSelector((state: StorageProps) => state?.userData)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const user = Data?.user?.token
    const currentPath = location.pathname

    if (!user) {
      navigate('/login')
      setStatus(false)
      return
    }

    if (currentPath !== '/') {
      navigate('/', {replace: true})
    }

    setStatus(true)
  }, [Data?.user?.token, children, location.pathname, location.state, navigate])

  return !status ? children : null
}

export default AuthWrapper
