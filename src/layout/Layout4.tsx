import {HeadingComponent} from '@/components'
import {GeneralProps} from '@/types/CommonTypes'

const Layout4 = (props: Required<Pick<GeneralProps, 'singleLineContent' | 'children'>>) => {
  const {singleLineContent, children} = props
  return (
    <div className="space-y-3">
      <HeadingComponent singleLineContent={singleLineContent} type="h5" />
      {children}
    </div>
  )
}

export default Layout4
