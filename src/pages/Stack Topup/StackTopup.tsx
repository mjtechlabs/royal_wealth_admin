import { useCallback, useRef, useState } from 'react'

import { CommonButton } from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import { Layout2 } from '@/layout'
import { Constant, English, Utility } from '@/services'
import { AppLoaderRef } from '@/types/ComponentTypes'

import SendBalanceApi from '../WalletManage/api/SendBalanceApi'
import StackTopupApi from './api/StackTopupApi'

const StackTopup = () => {
  const [inputValues, setInputValues] = useState({
    usercode: '',
    amount: ''
  })
  const loaderRef = useRef<AppLoaderRef>(null)
  const [userName, setUserName] = useState('')

  const handleGetUserName = useCallback((code: string) => {
    const props = {
      usercode: code ?? ''
    }
    SendBalanceApi.getUserInfo(props).then((res) => {
      if (res) {
        setUserName(res?.data)
      }
      if (!res) {
        setUserName('')
      }
    })
  }, [])

  const handleInputChange = useCallback(
    (name: string, value: string) => {
      setInputValues((prev) => {
        let newValues = { ...prev, [name]: value }

        if (name === 'usercode' && value.length >= 6) {
          newValues = { ...newValues, [name]: value }
          handleGetUserName(value)
        }
        if (name === 'amount') {
          newValues = { ...newValues, [name]: Utility.isValidNumber(value) }
        }

        return newValues
      })
    },
    [handleGetUserName]
  )

  const handleTopUpUser = useCallback(() => {
    loaderRef?.current?.showLoader(true)
    const payload = {
      amount: inputValues?.amount,
      usercode: inputValues?.usercode ?? ''
    }
    StackTopupApi.GiftTopup(payload)
      .then((res) => {
        if (res) {
          setInputValues(() => ({
            amount: '',
            usercode: ''
          }))

          setUserName('')
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [inputValues?.amount, inputValues?.usercode])
  return (
    <Layout2 singleLineContent="Stack Topup">
      <Loader ref={loaderRef} />
      <div className="padded__container__utility space-y-8">
        <div className="flex flex-col  gap-4">
          {Constant.UserTopupInputs.map((items) => {
            const { label, type, inputName } = items
            return (
              <div key={`inputs_${label}`}>
                <InputComponent
                  labelText={label}
                  name={inputName}
                  type={type}
                  value={inputValues?.[inputName as keyof typeof inputValues]}
                  onChange={(e) => {
                    const { name, value } = e.target
                    handleInputChange(name, value)
                  }}
                  onKeyDown={(e) => {
                    if (inputName !== 'usercode') return
                    if (
                      e.key === 'Enter' &&
                      !Object.values(inputValues).some((values) => values === '')
                    ) {
                      handleTopUpUser()
                    }
                  }}
                />
                {userName !== '' && inputName === 'usercode' && (
                  <span className="ml-1">{userName}</span>
                )}
              </div>
            )
          })}

          <CommonButton
            className={`small__transparent__button w-fit! `}
            disabled={Object.values(inputValues).some((item) => item === '')}
            onClick={handleTopUpUser}
            singleLineContent={English.E47}
          />
        </div>
      </div>
    </Layout2>
  )
}
export default StackTopup
