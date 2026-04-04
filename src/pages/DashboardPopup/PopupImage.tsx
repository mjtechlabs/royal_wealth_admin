import React, {useCallback, useEffect, useRef, useState} from 'react'

import {CommonButton, HeadingComponent, ImageComponent} from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2, Layout3} from '@/layout'
import {English} from '@/services'
import {Store} from '@/store'

import DashboardPopupApi from './api/DashboardPopupApi'

const PopupImage = () => {
  const [inputValues, setInputValues] = useState({
    profilepic: ''
  })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [getPopup, setGetPopup] = useState<{image_url: string} | null>()

  const handleInputChange = useCallback((name: string, value: string | File) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: name === 'profilepic' ? (value as unknown as File) : value
    }))
  }, [])

  const handleGetDashboardPopup = useCallback(() => {
    setIsLoading(true)
    const props = {
      token: Store?.getState()?.userData?.user?.token ?? ''
    }
    DashboardPopupApi.getDashboardPopup(props)
      .then((res) => {
        if (res) {
          setGetPopup(res?.data)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleDashboardPopup = useCallback(() => {
    setIsLoading(true)
    const props = {
      token: Store?.getState()?.userData?.user?.token ?? '',
      popupImage: inputValues?.profilepic ?? ''
    }
    DashboardPopupApi.DashboardPopupUpload(props)
      .then((res) => {
        if (res) {
          handleGetDashboardPopup()
          if (!inputRef.current) return
          inputRef.current.value = ''
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [handleGetDashboardPopup, inputValues?.profilepic])

  const handleGetDashboardPopupDelete = useCallback(() => {
    setIsLoading(true)
    const props = {
      token: Store?.getState()?.userData?.user?.token ?? ''
    }
    DashboardPopupApi.DashboardPopupDelete(props)
      .then((res) => {
        if (res) {
          handleGetDashboardPopup()
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [handleGetDashboardPopup])

  useEffect(() => {
    handleGetDashboardPopup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <Loader ref={(ref) => ref?.showLoader(isLoading)} />
      <HeadingComponent className="text-center pt-5" singleLineContent={English.E161} />
      <Layout3 singleLineContent="">
        <div className=" ">
          <InputComponent
            ref={inputRef}
            accept="image/gif, image/jpg, image/jpeg, image/png"
            className="pt-1"
            labelText={English.E162}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const {files} = e.target
              handleInputChange('profilepic', files?.length === 1 ? files[0] : '')
            }}
          />
        </div>
        <CommonButton
          className="w-fit!"
          onClick={handleDashboardPopup}
          singleLineContent="Submit"
        />
      </Layout3>

      {getPopup?.image_url ? (
        <Layout3 singleLineContent="">
          <ImageComponent className="[&>img]:h-37.5" imageUrl={getPopup?.image_url ?? ''} />
          <CommonButton
            className="bg-primary-red!"
            onClick={() => handleGetDashboardPopupDelete()}
            singleLineContent={English.E139}
          />
        </Layout3>
      ) : null}
    </Layout2>
  )
}

export default PopupImage
