import {memo} from 'react'

import {Images} from '@/services'
import {DashboardCardsProps} from '@/types/ComponentTypes'

import HeadingComponent from '../HeadingComponent/HeadingComponent'
import ImageComponent from '../ImageComponent/ImageComponent'

const DashboardCard = (props: DashboardCardsProps) => {
  const {spanContent, title, className = '', imageUrl = ''} = props
  return (
    <div
      className={`rounded-2xl flex shadow-lg
          items-center overflow-hidden relative  border-primary-cyan  p-5 md:p-4 dashboard_card
        ${className}`}
    >
      <ImageComponent
        className="absolute size-30  [&>img]:object-none! [&>img]:opacity-50 z-10"
        imageUrl={Images.shape}
      />
      <div className="flex flex-col justify-between h-full w-full">
        <HeadingComponent
className="" singleLineContent={title}
type="h3" />
        <span className="semi_bold__utility__large text-left pt-5">{spanContent}</span>
      </div>
      {imageUrl !== '' && <ImageComponent className="w-13 h-15 shrink-0" imageUrl={imageUrl} />}
    </div>
  )
}

export default memo(DashboardCard)
