import {memo} from 'react'

import {English} from '@/services'
import {EmptyComponentProps} from '@/types/ComponentTypes'

const EmptyComponent = (props: EmptyComponentProps) => {
  const {singleLineContent, isTableType = false} = props
  return isTableType ? (
    <tr className="text-center">
      <td
        className="text_lg_utility text-primary-blue2 bg-secondary-black rounded-lg w-full"
        colSpan={12}
      >
        {singleLineContent ?? English.E17}
      </td>
    </tr>
  ) : (
    <p className="text_lg_utility text-primary-blue2 bg-secondary-black p-4 rounded-lg w-full">
      {singleLineContent ?? English.E63}
    </p>
  )
}

export default memo(EmptyComponent)
