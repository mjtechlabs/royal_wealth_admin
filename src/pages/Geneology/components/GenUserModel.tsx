import {useMemo} from 'react'

import {CommonButton} from '@/components'
import {TreeDataObject} from '@/types/ApiTypes'

interface GenUserModelProps {
  data: TreeDataObject
  onPressShowDropDown: () => void
}

const GenUserModel = (props: GenUserModelProps) => {
  const {data, onPressShowDropDown} = props
  const {email, mobile, name, regdate, totalstaking, status, usercode, totaluser} = data

  const dataObject = useMemo(
    () => [
      {title: 'Name', content: name === 'N/A' ? '---' : name, key: 'name'},
      {title: 'Email', content: email === 'N/A' ? '---' : email, key: 'email'},
      {title: 'Mobile', content: mobile === 'N/A' ? '---' : mobile, key: 'mobile'},

      {title: 'Registration Date', content: regdate === 'N/A' ? '---' : regdate, key: 'reg_date'},
      {title: 'Staking', content: `$${totalstaking}`, key: 'staking'},
      {
        title: 'Status',
        content: status === '1' ? 'Active' : status === '0' ? 'InActive' : 'Blocked',
        key: 'status'
      },
      {title: 'User Code', content: usercode, key: 'user_code'},
      {title: 'Total Team', content: totaluser ?? '0', key: 'user_code'}
    ],
    [email, mobile, name, regdate, status, totalstaking, totaluser, usercode]
  )

  return (
    <div className="space-y-5 ">
      <div className="space-y-4  overflow-x-auto bg-primary-cyan p-2 rounded-md ">
        {dataObject?.map((objData) => {
          const {content, key, title} = objData
          return (
            <div
              key={key}
              className="grid grid-cols-2 gap-2.5 border-b border-solid  border-b-secondary-gray last:border-none p-3 "
            >
              <span>{title}</span>
              <span>{content}</span>
            </div>
          )
        })}
      </div>
      <CommonButton
        className="large__filled__button w-fit! mx-auto"
        singleLineContent="Show DownLine"
        onClick={(e) => {
          e.stopPropagation()
          onPressShowDropDown()
        }}
      />
    </div>
  )
}

export default GenUserModel
