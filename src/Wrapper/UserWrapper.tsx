import {Fragment, useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {GeneralProps, StorageProps} from '@/types/CommonTypes'

const UserWrapper = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  const Data = useSelector((state: StorageProps) => state.userData?.user)
  const isAlreadyLoggedIn = useMemo(() => Data?.token !== '' && Data?.token !== null, [Data?.token])

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      setStatus(true)
    } else {
      navigate('/login', {replace: true})
      setStatus(false)
    }
  }, [isAlreadyLoggedIn, navigate])

  return status ? <Fragment> {children}</Fragment> : null
}

export default UserWrapper
