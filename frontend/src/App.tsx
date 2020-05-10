import React from 'react'

import SignIn from './pages/SignIn'
import GlobalStyle from './styles/global'

import AppProvider from './context'

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>

      <GlobalStyle />
    </>
  )
}

export default App
