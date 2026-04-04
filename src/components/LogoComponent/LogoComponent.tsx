import {memo} from 'react'

import {Images} from '@/services'
import {GeneralProps} from '@/types/CommonTypes'

import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const LogoComponent = (
  props: Pick<
    GeneralProps,
    'singleLineContent' | 'layoutClassName' | 'className' | 'closeIconClassName'
  > & {onCloseClick?: () => void}
) => {
  const {
    singleLineContent = '',
    layoutClassName = '',
    className = '',
    closeIconClassName = '',
    onCloseClick
  } = props
  return (
    <div>
      <div className={`flex gap-4 items-center   ${layoutClassName}`}>
        <ImageComponent
          className={`w-10   aspect-square [&>img]:white__filter!  ${closeIconClassName}`}
          imageUrl={Images.crossIcon}
          onPressImage={onCloseClick}
        />
        {singleLineContent !== '' && (
          <HeadingComponent singleLineContent={singleLineContent} type="h3" />
        )}
        <div className=" px-2  rounded-xl">
          <ImageComponent
            className={`w-15  aspect-square ${className}`}
            imageUrl={Images.logoImg}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(LogoComponent)
