import {HeadingComponent} from '@/components'
import {GeneralProps} from '@/types/CommonTypes'

const Layout2 = (
  props: Required<Pick<GeneralProps, 'children'>> &
    Pick<GeneralProps, 'singleLineContent' | 'className'>
) => {
  const {singleLineContent = '', className = '', children} = props
  return (
    <div
      className={`container__utility   space-y-5 lg:h-[calc(100vh-48px)] h-[calc(100vh-112px)]  overflow-y-auto max-w-full ${className}`}
      id="layout2__container"
    >
      {singleLineContent !== '' && (
        <HeadingComponent
          isUnderline
          className="pt-5 text-center  font-bold text-primary-black"
          singleLineContent={singleLineContent}
        />
      )}
      {children}
    </div>
  )
}

export default Layout2
