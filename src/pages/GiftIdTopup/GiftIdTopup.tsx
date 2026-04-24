import { useCallback, useRef, useState } from 'react'

import { CommonButton, Dropdown } from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import { Layout2 } from '@/layout'
import { Constant, English, Utility } from '@/services'
import { AppLoaderRef } from '@/types/ComponentTypes'

import SendBalanceApi from '../WalletManage/api/SendBalanceApi'
import GiftIdTopupApi from './api/GiftIdTopupApi'
import { DropDownObjectType } from '@/types/CommonTypes'

const GiftIdTopup = () => {
  const [inputValues, setInputValues] = useState({
    usercode: '',
  })
  const loaderRef = useRef<AppLoaderRef>(null)
  const [userName, setUserName] = useState('')
const [selectedDropDown, setSelectedDropDown] = useState<DropDownObjectType>({
    title: '$100',
    content: '100'
  })
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
       

        return newValues
      })
    },
    [handleGetUserName]
  )

  const handleTopUpUser = useCallback(() => {
    loaderRef?.current?.showLoader(true)
    const payload = {
      amount: selectedDropDown?.content,
      usercode: inputValues?.usercode ?? ''
    }
    GiftIdTopupApi.GiftTopup(payload)
      .then((res) => {
        if (res) {
          setInputValues(() => ({
            amount: '',
            usercode: ''
          }))
          setSelectedDropDown({
            title: '$100',
            content: '100'
          })
          setUserName('')
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [inputValues?.usercode, selectedDropDown?.content])
  return (
    <Layout2 singleLineContent="Autopool Topup">
      <Loader ref={loaderRef} />
      <div className="padded__container__utility space-y-8">
        <div className="flex flex-col  gap-4">
          {Constant.AdminAutoPoolTopupInputs.map((items) => {
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
            <div className="grid ">
              <Dropdown
                dropDownData={Constant.topupData}
                onSelectValue={setSelectedDropDown}
                selectedValue={selectedDropDown}
                wrapperClassName="max-h-56!"
              />
            </div>
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
export default GiftIdTopup
