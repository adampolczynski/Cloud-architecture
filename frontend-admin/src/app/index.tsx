import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

// import ErrorBoundary from '../ErrorBoundary'
// import { NotFound } from '../NotFound'
import { Login } from './login/login'

const App: React.FC = () => (
  //   <ErrorBoundary>
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
  //   </ErrorBoundary>
)

export default App
