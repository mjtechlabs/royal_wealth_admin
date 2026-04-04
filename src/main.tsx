import './index.css'

import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import {PersistGate} from 'redux-persist/integration/react'

import App from './App'
import {PersistStorage, Store} from './store'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <Provider store={Store}>
    <PersistGate persistor={PersistStorage}>
      <ToastContainer
        hideProgressBar
        autoClose={2000}
        draggable={false}
        limit={1}
        position="top-right"
      />
      <App />
    </PersistGate>
  </Provider>
)
