import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useLocation} from 'react-router-dom'

import {CommonButton, HeadingComponent, TextAreaComponent} from '@/components'
import InputComponent from '@/components/InputComponent/InputComponent'
import Loader from '@/components/InputComponent/Loader/Loader'
import {Layout2, Layout3} from '@/layout'
import {English} from '@/services'
import {Store} from '@/store'
import {TicketChatData, TicketMessageType} from '@/types/ApiTypes'
import {AppLoaderRef} from '@/types/ComponentTypes'

import SupportApi from './api/SupportApi'
import MessageSection from './sections/MessageSection'

const DetailsSupportTicket = () => {
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const id = useMemo(() => location?.state?.id, [location?.state])
  const isShow = useMemo(() => location?.state?.isShow, [location?.state])
  const [messages, setMessages] = useState<TicketChatData[] | null>([])

  const [ticketDetails, setTicketDetails] = useState<TicketMessageType>()
  const loaderRef = useRef<AppLoaderRef>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [inputValues, setInputValues] = useState({
    remark: '',
    file_upload: ''
  })

  const handleInputChange = useCallback((name: string, value: string | File | boolean) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: name === 'file_upload' ? (value as unknown as File) : value
    }))
  }, [])

  const handleFetchDetail = useCallback(() => {
    loaderRef?.current?.showLoader(true)
    const payload = {
      token: Store?.getState()?.userData?.user?.token ?? '',
      r_id: id ?? ''
    }

    SupportApi.TicketDetails(payload)
      .then((res) => {
        if (res) {
          setMessages(res?.data)
          setTicketDetails(res?.ticket)
        }
      })
      .finally(() => {
        loaderRef?.current?.showLoader(false)
      })
  }, [id])

  const AddRemark = useCallback(() => {
    loaderRef.current?.showLoader(true)

    const payload = {
      token: Store?.getState()?.userData?.user?.token ?? '',
      remark: inputValues?.remark ?? '',
      r_id: id ?? '',
      select_img: inputValues?.file_upload ?? '',
      is_complate: isChecked ? '1' : '0'
    }

    SupportApi.AddAdminRemark(payload)
      .then((res) => {
        if (res) {
          setInputValues({
            file_upload: '',
            remark: ''
          })
          setIsChecked(false)
          handleFetchDetail()
          if (!inputRef.current) return
          inputRef.current.value = ''
        }
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [handleFetchDetail, id, inputValues?.file_upload, inputValues?.remark, isChecked])

  useEffect(() => {
    handleFetchDetail()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout2>
      <Loader ref={loaderRef} />
      <HeadingComponent
        className="flex justify-start pt-4"
        singleLineContent="Support Ticket Details"
      />

      <Layout3 className="h-fit! mt-1 text-sm space-y-1" singleLineContent="">
        <p>
          <span className="font-medium">{English.E181}</span> {ticketDetails?.select_ticket_name}
        </p>
        <p>
          <span className="font-medium">{English.E182}</span> {ticketDetails?.question_name}
        </p>
        <p>
          <span className="font-medium">{English.E183}</span>{' '}
          <span
            className={`text-primary-red font-semibold ${ticketDetails?.status === 'Close' ? 'text-primary-red!' : 'text-primary-green!'}`}
          >
            {ticketDetails?.status}
          </span>
        </p>
        <p>
          <span className="font-medium">{English.E184}</span> {ticketDetails?.date}
        </p>
        {isShow ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
              <div>
                <TextAreaComponent
                  labelName={English.E154}
                  name="remark"
                  placeholder=""
                  rows={2}
                  value={inputValues?.remark}
                  onChange={(e) => {
                    const {value} = e.target
                    handleInputChange('remark', value)
                  }}
                />
              </div>
              <div className=" ">
                <InputComponent
                  ref={inputRef}
                  className="pt-1"
                  labelText="Select File "
                  name="file_upload"
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const {name, files} = e.target
                    handleInputChange(name, files?.length === 1 ? files[0] : '')
                  }}
                />
              </div>

              <div className=" flex justify-start items-start">
                <div className="flex gap-2 justify-center items-center">
                  <input
                    className="pt-1"
                    id="checkbox"
                    name="is_complete"
                    type="checkbox"
                    onChange={(e) => {
                      const {checked} = e.target
                      setIsChecked(checked)
                    }}
                  />
                  <label className="text-nowrap" htmlFor="checkbox">
                    {English.E185}
                  </label>
                </div>
              </div>
            </div>
            <CommonButton
              className="w-fit! mt-6!"
              disabled={inputValues?.remark === ''}
              onClick={AddRemark}
              singleLineContent={English.E47}
            />
          </div>
        ) : null}
      </Layout3>

      <Layout3 className="h-fit! mt-6" singleLineContent="">
        <HeadingComponent className="text-left text-base mb-4" singleLineContent="Ticket Message" />

        <MessageSection message={messages ?? []} />
      </Layout3>
    </Layout2>
  )
}

export default memo(DetailsSupportTicket)
