import {memo, useMemo} from 'react'

import {HeadingComponentProps} from '../../types/ComponentTypes'

const HeadingComponent = (props: HeadingComponentProps) => {
  const {type = 'h2', className = '', singleLineContent = '', isUnderline = false} = props
  const Tag = useMemo(() => type, [type])

  return (
    <Tag
      className={`font-semibold ${type === 'h1' ? 'h1__utility' : type === 'h2' ? 'h2__utility' : type === 'h3' ? 'h3__utility' : type === 'h4' ? 'h4__utility' : 'h5__utility'} ${className} text-left! ${isUnderline ? 'border-b border-gray-300 ' : ''}`}
    >
      {singleLineContent}
    </Tag>
  )
}

export default memo(HeadingComponent)
