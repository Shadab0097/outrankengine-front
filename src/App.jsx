
// import './App.css'
import URLAnalyzer from './component/URLAnalyzer'
import Login from './component/Login'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './component/Body'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import './index.css'


function App() {


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path='/' element={<Body />} />

            <Route path="/login" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
