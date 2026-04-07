/* eslint-disable react/jsx-sort-props */
import {useCallback, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {CommonButton, HeadingComponent, ImageComponent} from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import {Constant, English, Images, Utility} from '@/services'
import CommonFunction from '@/services/CommonFunction'

import AuthApi from './api/AuthApi'

const Login = () => {
  const [inputValues, setInputValues] = useState({email: '', password: ''})
  const [error, setError] = useState({email: '', password: ''})
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(true)
  const handleLoginAdmin = useCallback(() => {
    const payload = {
      email: inputValues?.email,
      password: inputValues?.password
    }

    AuthApi.LoginAdminApi(payload).then((res) => {
      if (res) {
        CommonFunction.addSliceData('addUserDetails', {token: res?.token})
        navigate('/')
      }
    })
  }, [inputValues?.email, inputValues?.password, navigate])

  const handleInputChange = useCallback((name: string, value: string) => {
    setInputValues((prev) => ({...prev, [name]: value}))
    if (name === 'email' && !Utility.isValidEmail(value)) {
      setError((prev) => ({...prev, [name]: English.E62}))
      return
    }
    setError((prev) => ({...prev, [name]: ''}))
  }, [])

  return (
    <div className="  h-screen w-screen">
      <div className="h-full bg-[url(./src/assets/back.png)] bg-cover flex items-center justify-center ">
        <div className="flex-col max-w-[320px] m-5 p-6 w-full mx-auto items-center justify-center bg-primary-white space-y-5 shadow-lg rounded-2xl">
          <div className="flex flex-col justify-center items-center  rounded-xl">
            <ImageComponent
              className="size-20  aspect-square flex items-center "
              imageUrl={Images.logoImg}
            />
          </div>
          <div className="flex justify-center">
            <HeadingComponent
              className="text-2xl font-medium! text-primary-black text-shadow-lg/20 "
              singleLineContent="Admin Login"
            />
          </div>

          <div className="flex flex-col gap-6 ">
            {Constant.LoginArray?.map((item) => {
              // const { isImportant, lableText, name, placeHolder, type } = item
              const {lableText, name, placeHolder, type} = item
              return (
                <div key={`input_${name}`}>
                  <InputComponent
                    onPressImage={() => {
                      setShowPassword((data) => !data)
                    }}
                    placeholder={placeHolder}
                    type={name === 'password' ? (showPassword ? 'password' : 'text') : type}
                    value={inputValues?.[name as keyof typeof inputValues]}
                    icon={
                      name === 'password' &&
                      inputValues?.[name as keyof typeof inputValues].length !== 0
                        ? showPassword
                          ? Images.eyeClose
                          : Images.eyeOpen
                        : ''
                    }
                    wrapperClassName="[&>div>label]:text-white"
                    onChange={(e) => {
                      handleInputChange(name, e.target.value)
                    }}
                    layoutClassName="[&>label]:peer-focus:bg-primary-white/70!"
                    error={error?.[name as keyof typeof error]}
                    labelText={lableText}
                  />
                </div>
              )
            })}
            <CommonButton
              className="small__filled__button w-full! py-3.5"
              disabled={
                Object.values(inputValues).some((item) => item === '') ||
                Object.values(error).some((item) => item !== '')
              }
              onClick={handleLoginAdmin}
              singleLineContent={English.E40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
