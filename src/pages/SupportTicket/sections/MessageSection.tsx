import {Image} from 'antd'
import {useState} from 'react'

import {CommonButton, HeadingComponent} from '@/components'
import {English} from '@/services'
import {TicketChatData} from '@/types/ApiTypes'

const MessageSection = (props: {message: TicketChatData[] | []}) => {
  const {message} = props
  const [rowData, setRowData] = useState<TicketChatData | null>()

  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      {open ? (
        <Image
          src={(rowData?.file_image as string) ?? ''}
          style={{display: 'none'}}
          preview={{
            open,
            onVisibleChange: (vis) => setOpen(vis)
          }}
        />
      ) : null}
      {message ? (
        message?.map((item) => {
          const isAdmin = item?.admin_remark !== ''

          return (
            <div
              key={item?.r_id}
              className={`flex flex-col gap-2  ${isAdmin ? 'items-end' : 'items-start'}`}
            >
              <span
                className={`text-xs mb-1 font-semibold ${
                  isAdmin ? 'text-primary-blue text-right' : 'text-gray-600 text-left'
                }`}
              >
                {isAdmin ? 'Admin' : 'You'}
              </span>

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm
            ${
              isAdmin
                ? 'bg-primary-blue text-primary-white rounded-br-none'
                : 'bg-primary-black text-primary-white rounded-bl-none'
            }`}
              >
                <div className="flex gap-2">
                  <p className="wrap-break-word">
                    {isAdmin ? item?.admin_remark : item?.user_remark}
                  </p>
                </div>

                <p
                  className={`text-[10px] mt-1 text-right
              ${isAdmin ? 'text-white/70' : 'text-gray-500'}`}
                >
                  {item?.date ?? ''}
                </p>
              </div>
              {item?.file_image !== '' && (
                <CommonButton
                  className="small__transparent__button text-nowrap font-normal! text-sm py-1! px-1 w-fit!"
                  singleLineContent={English.E155}
                  onClick={() => {
                    setOpen(true)
                    setRowData(item ?? '')
                  }}
                />
              )}
            </div>
          )
        })
      ) : (
        <div className="flex justify-center ">
          <HeadingComponent
            className="flex justify-start pt-4"
            singleLineContent={English.E186}
            type="h4"
          />
        </div>
      )}
    </div>
  )
}

export default MessageSection
