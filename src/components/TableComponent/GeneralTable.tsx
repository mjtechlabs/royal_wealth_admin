import {memo} from 'react'

import {GeneralTableProps} from '@/types/ComponentTypes'

const GeneralTable = (props: GeneralTableProps) => {
  const {tableHeading, children, className = '', layoutClassName = ''} = props

  return (
    <div className="w-full h-fit  bg-primary-white rounded-2xl pb-3 shadow-2xl  mb-10! ">
      <div
        className={`relative rounded-sm overflow-x-auto no-scrollbar ${layoutClassName} w-full`}
        id="table"
      >
        <table className="w-full text-center text-sm  ">
          <thead
            className={`text-xs  bg-primary-black/10 capitalize text-palette-text-secondary! ${className}`}
          >
            <tr className="">
              {tableHeading?.map((heading) => {
                const {content} = heading
                return (
                  <th key={content} className="px-6  py-3">
                    {content}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="w-full ">{children}</tbody>
        </table>
      </div>
    </div>
  )
}

export default memo(GeneralTable)
