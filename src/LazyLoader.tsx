import {Suspense} from 'react'

import Loader from './components/InputComponent/Loader/Loader'
import {GeneralProps} from './types/CommonTypes'

const LazyLoader = (props: Required<Pick<GeneralProps, 'children'>>) => {
  const {children} = props
  return <Suspense fallback={<Loader ref={(ref) => ref?.showLoader(true)} />}>{children}</Suspense>
}

export default LazyLoader
