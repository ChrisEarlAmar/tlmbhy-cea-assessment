import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.jsx'

createRoot(document.getElementById('app')).render(
  <Fragment>
    <App />
  </Fragment>,
)
