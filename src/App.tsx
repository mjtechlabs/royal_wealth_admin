import { BrowserRouter, Route, Routes } from 'react-router-dom'

import GoBackComponent from './components/BreakLine/GoBackComponent/GoBackComponent'
import ModalProvider from './components/ModalComponent/context/ModalProvider'
import { AuthRoute, DashboardRoutes } from './routes'

const App = () => (
  <BrowserRouter>
    <ModalProvider>
      <Routes>
        <Route element={<GoBackComponent />} path="*" />
        {AuthRoute}
        {DashboardRoutes}
      </Routes>
    </ModalProvider>
  </BrowserRouter>
)
export default App
