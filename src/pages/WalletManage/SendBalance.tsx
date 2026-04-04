import {useCallback, useRef, useState} from 'react'

import {CommonButton, Dropdown, HeadingComponent} from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2} from '@/layout'
import {Constant, English, Utility} from '@/services'
import {DropDownObjectType} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import SendBalanceApi from './api/SendBalanceApi'

const SendBalance = () => {
  const [inputValues, setInputValues] = useState({usercode: '', remark: '', amount: ''})
  const [selectedWalletDropDown, setSelectedWalletDropDown] = useState<DropDownObjectType>({
    title: 'SelectWallet Type',
    content: '-1'
  })
  const loaderRef = useRef<AppLoaderRef>(null)

  const [userName, setUserName] = useState('')

  const [selectedTransacDropDown, setSelectedTransacDropDown] = useState<DropDownObjectType>({
    title: 'Select Transaction Type',
    content: '-1'
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleLoginAdmin = useCallback(() => {
    loaderRef.current?.showLoader(true)

    const payload = {
      usercode: inputValues?.usercode ?? '',
      remark: inputValues?.remark ?? ' ',
      amount: inputValues?.amount ?? ' ',
      trans_type: selectedTransacDropDown?.content ?? '',
      wallet_type: selectedWalletDropDown?.content ?? ''
    }
    SendBalanceApi.SendWalletBalanceApi(payload)
      .then((res) => {
        if (res) {
          setInputValues({
            amount: '',
            remark: '',
            usercode: ''
          })
          setSelectedTransacDropDown({
            title: 'Select Transaction Type',
            content: '-1'
          })
          setSelectedWalletDropDown({
            title: 'Select Wallet Type',
            content: '-1'
          })
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [
    inputValues?.amount,
    inputValues?.remark,
    inputValues?.usercode,
    selectedTransacDropDown?.content,
    selectedWalletDropDown?.content
  ])

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
        let newValues = {...prev, [name]: value}

        if (name === 'usercode' && value.length >= 6) {
          newValues = {...newValues, [name]: Utility.isValidNumber(value)}
          handleGetUserName(Utility.isValidNumber(value))
        }
        if (name === 'amount') {
          newValues = {...newValues, [name]: Utility.isValidNumber(value)}
        }

        return newValues
      })
    },
    [handleGetUserName]
  )

  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <HeadingComponent
isUnderline className="text-left mt-5"
singleLineContent={English.E122} />
      <div className="flex-col max-w-155 m-5 p-6 w-full mx-auto items-center justify-between bg-primary-white space-y-5 shadow-lg rounded-2xl">
        <div className="flex justify-center">
          <HeadingComponent
            className="text-2xl font-medium! text-primary-black text-shadow-lg/20 "
            singleLineContent="Send Balance"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center  items-end ">
          {Constant.SendBalanceArray?.map((item) => {
            // const { isImportant, lableText, name, placeHolder, type } = item
            const {lableText, name, placeHolder, type} = item
            return name !== 'username' ? (
              <div key={`input_${name}`} className="flex flex-col ">
                <InputComponent
                  labelText={lableText}
                  layoutClassName="[&>label]:peer-focus:bg-primary-white/70!"
                  placeholder={placeHolder}
                  type={name === 'password' ? (showPassword ? 'password' : 'text') : type}
                  value={inputValues?.[name as keyof typeof inputValues]}
                  wrapperClassName="[&>div>label]:text-white"
                  onChange={(e) => {
                    handleInputChange(name, e.target.value)
                  }}
                  onPressImage={() => {
                    setShowPassword((data) => !data)
                  }}
                />
              </div>
            ) : name === 'username' ? (
              <div key={`input_${name}`} className="flex flex-col ">
                <InputComponent
                  readOnly
                  labelText={lableText}
                  layoutClassName="[&>label]:peer-focus:bg-primary-white/70!"
                  placeholder={placeHolder}
                  type={type}
                  value={userName}
                  wrapperClassName="[&>div>label]:text-white"
                />
              </div>
            ) : null
          })}
          <div>
            <HeadingComponent singleLineContent="Transaction Type:" type="h6" />
            <Dropdown
              dropDownData={Constant.transDropdownData}
              onSelectValue={setSelectedTransacDropDown}
              selectedValue={selectedTransacDropDown}
              wrapperClassName="max-h-24!"
            />
          </div>
          <div>
            <HeadingComponent singleLineContent="Wallet Type :" type="h6" />
            <Dropdown
              dropDownData={Constant.WalletTypeDropdownData}
              onSelectValue={setSelectedWalletDropDown}
              selectedValue={selectedWalletDropDown}
              wrapperClassName="max-h-24!"
            />
          </div>
        </div>
        <CommonButton
          className="small__filled__button w-full! py-3.5"
          disabled={Object.values(inputValues).some((item) => item === '')}
          onClick={handleLoginAdmin}
          singleLineContent={English.E122}
        />
      </div>
    </Layout2>
  )
}

export default SendBalance
