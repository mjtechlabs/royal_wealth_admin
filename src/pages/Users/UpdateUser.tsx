import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {CommonButton, Dropdown, HeadingComponent} from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2, Layout3} from '@/layout'
import Layout4 from '@/layout/Layout4'
import {Constant, English} from '@/services'
import {UserListApiData} from '@/types/ApiTypes'
import {DropDownObjectType} from '@/types/CommonTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import UserList from './api/UsersApi'

const UpdateUser = () => {
  const [inputValues, setInputValues] = useState({
    user_mobile: '',
    user_email: '',
    user_name: '',
    userid: ''
  })
  const loaderRef = useRef<AppLoaderRef>(null)
  const location = useLocation()
  const userData: UserListApiData = useMemo(() => location?.state, [location?.state])
  const [passwordValues, setPasswordValues] = useState({
    password: '',
    confirmpassword: ''
  })
  // const [transValues, setTransValues] = useState({
  //   password: '',
  //   confirmpassword: ''
  // })
  const [error, setError] = useState({
    password: '',
    confirmpassword: ''
  })
  // const [errorTrans, setErrorTrans] = useState({
  //   password: '',
  //   confirmpassword: ''
  // })
  const navigate = useNavigate()

  const [selectCountry, setSelectCountry] = useState<DropDownObjectType>({
    title: userData?.countryid === '' || !userData?.countryid ? 'Select City' : userData?.countryid,
    content: userData?.countryid
  })
  const [countryData, setCountryData] = useState<DropDownObjectType[] | null>()

  const handleInputChange = useCallback(
    (name: string, value: string, type: 'profile' | 'login' | 'trans') => {
      if (type === 'login') {
        setPasswordValues((prev) => {
          const newValues = {...prev, [name]: value}

          if (newValues.password !== newValues.confirmpassword) {
            setError({
              password: '',
              confirmpassword: 'Not Match Password'
            })
          } else {
            setError({
              confirmpassword: '',
              password: ''
            })
          }

          return newValues
        })
      }
      // if (type === 'trans') {
      //   setTransValues((prev) => {
      //     const newValues = { ...prev, [name]: value }

      //     if (newValues.password !== newValues.confirmpassword) {
      //       setErrorTrans({
      //         password: '',
      //         confirmpassword: 'Not Match Password'
      //       })
      //     } else {
      //       setErrorTrans({
      //         confirmpassword: '',
      //         password: ''
      //       })
      //     }

      //     return newValues
      //   })
      // }
    },
    []
  )

  const handleSubmit = useCallback(() => {
    loaderRef.current?.showLoader(true)

    const payload = {
      usercode: userData?.user_id ?? '',

      name: inputValues?.user_name ?? '',
      email: inputValues?.user_email ?? '',
      user_mobile: inputValues?.user_mobile ?? '',
      country_id: selectCountry?.content ?? ''
    }
    UserList.UpdateUser(payload)
      .then((res) => {
        if (res) {
          navigate('/users')
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [
    userData?.user_id,
    inputValues?.user_name,
    inputValues?.user_email,
    inputValues?.user_mobile,
    selectCountry?.content,
    navigate
  ])

  const handleUpdatUserPassword = useCallback(() => {
    loaderRef.current?.showLoader(true)

    const payload = {
      password: passwordValues?.password,

      usercode: inputValues?.userid ?? ''
    }

    UserList.updatePassword(payload)
      .then((res) => {
        if (res) {
          setPasswordValues({
            confirmpassword: '',
            password: ''
          })
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [inputValues?.userid, passwordValues?.password])

  // const handleUpdatTransPassword = useCallback(() => {
  //   loaderRef.current?.showLoader(true)

  //   const payload = {
  //     password: transValues?.password,
  //     usercode: inputValues?.userid ?? ''
  //   }

  //   UserList.updateTransPassword(payload)
  //     .then((res) => {
  //       if (res) {
  //         setTransValues({
  //           confirmpassword: '',
  //           password: ''
  //         })
  //       }
  //     })
  //     .finally(() => {
  //       loaderRef.current?.showLoader(false)
  //     })
  // }, [inputValues?.userid, transValues?.password])

  const handleGetCountry = useCallback(() => {
    UserList.getCountry().then((res) => {
      if (res) {
        setCountryData(res)
      }
    })
  }, [])

  useEffect(() => {
    if (!userData) return
    setInputValues(() => ({
      user_name: userData?.user_name,
      user_mobile: userData?.user_mobile,
      user_email: userData?.user_email,
      userid: userData?.user_id
    }))
    if (userData?.countryid) {
      const country = countryData?.filter((item) => item?.content === userData?.countryid)
      setSelectCountry(country?.[0] as DropDownObjectType)
    }
  }, [countryData, userData])

  useEffect(() => {
    handleGetCountry()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2 className="">
      <Loader ref={loaderRef} />
      <div className="space-y-10!">
        <div className="space-y-4">
          <HeadingComponent className="text-left mt-5" singleLineContent={English.E109} />

          <Layout3 className="border border-primary-blue/50 rounded-2xl" singleLineContent="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Constant.UpdateUserArray?.map((item) => {
                const {lableText, name, placeHolder, type, readonly} = item
                return type === 'text' || type === 'email' || type === 'pincode' ? (
                  <div key={`input_${name}`}>
                    <InputComponent
                      className=""
                      labelText={lableText}
                      layoutClassName="[&>label]:peer-focus:bg-primary-white/70!  justify-end! "
                      placeholder={placeHolder}
                      readOnly={readonly}
                      value={inputValues?.[name as keyof typeof inputValues]}
                      wrapperClassName="[&>div>label]:text-white"
                      onChange={(e) => {
                        setInputValues((prev) => ({...prev, [name]: e.target.value}))
                      }}
                    />
                  </div>
                ) : type === 'statecountry' ? (
                  <Layout4 key={`dropdownCity_${type}`} singleLineContent="Select Contry">
                    <Dropdown
                      key={`dropdownstate_${type}`}
                      dropDownData={countryData as any}
                      selectedValue={selectCountry}
                      onSelectValue={(value) => {
                        setSelectCountry(value)
                      }}
                    />
                  </Layout4>
                ) : null
              })}
            </div>
            <CommonButton
              className="small__transparent__button w-fit!"
              disabled={Object.values(inputValues).some((item) => item === '')}
              onClick={handleSubmit}
              singleLineContent={English.E47}
            />
          </Layout3>
        </div>

        <div className="space-y-4">
          <HeadingComponent className="text-left mt-5" singleLineContent="Login Password " />
          <Layout3 className="border border-primary-blue/50 rounded-2xl" singleLineContent="">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Constant.LoginPasswrodArray?.map((item) => {
                  const {lableText, name, placeHolder, type} = item
                  return (
                    <div key={`input_${name}`}>
                      <InputComponent
                        className=""
                        error={error?.[name as keyof typeof error]}
                        // isImportant={isImportant}
                        labelText={lableText}
                        placeholder={placeHolder}
                        type={type}
                        value={passwordValues?.[name as keyof typeof passwordValues]}
                        wrapperClassName="[&>div>label]:text-white"
                        onChange={(e) => {
                          const {value} = e.target
                          handleInputChange(name, value, 'login')
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <CommonButton
                className="small__transparent__button w-fit!"
                onClick={handleUpdatUserPassword}
                singleLineContent={English.E47}
                disabled={
                  Object.values(passwordValues).some((item) => item === '') ||
                  passwordValues?.password !== passwordValues?.confirmpassword
                }
              />
            </div>
          </Layout3>
        </div>
        {/* <div className="space-y-4">
          <HeadingComponent className="text-left mt-5" singleLineContent="Transaction Password " />
          <Layout3 className="border border-primary-blue/50 rounded-2xl" singleLineContent="">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Constant.LoginPasswrodArray?.map((item) => {
                  const {lableText, name, placeHolder, type} = item
                  return (
                    <div key={`input_${name}`}>
                      <InputComponent
                        className=""
                        error={errorTrans?.[name as keyof typeof errorTrans]}
                        // isImportant={isImportant}
                        labelText={lableText}
                        placeholder={placeHolder}
                        type={type}
                        value={transValues?.[name as keyof typeof transValues]}
                        wrapperClassName="[&>div>label]:text-white"
                        onChange={(e) => {
                          const {value} = e.target
                          handleInputChange(name, value, 'trans')
                        }}
                      />
                    </div>
                  )
                })}
              </div>
              <CommonButton
                className="small__transparent__button w-fit!"
                onClick={handleUpdatTransPassword}
                singleLineContent={English.E47}
                disabled={
                  Object.values(transValues).some((item) => item === '') ||
                  transValues?.password !== transValues?.confirmpassword
                }
              />
            </div>
          </Layout3>
        </div> */}
      </div>
    </Layout2>
  )
}

export default memo(UpdateUser)
