
// import './App.css'
import URLAnalyzer from './component/URLAnalyzer'
import Login from './component/Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './component/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import './index.css'
import PrivacyPolicy from './component/PrivacyPolicy'
import AboutUs from './component/AboutUs'
import ContactUs from './component/ContactUs'
import ErrorPage from './component/ErrorPage'
import Pricing from './component/Pricing'


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<URLAnalyzer />} />
              <Route path="login" element={<Login />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="pricing" element={<Pricing />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
