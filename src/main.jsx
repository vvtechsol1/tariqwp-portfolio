import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// The credesign reference stylesheets, in the order the original page loaded them.
import './vendor/normalize.css'
import './vendor/bootstrap.min.css'
import './vendor/style.css'
import './vendor/responsive.css'

import 'lenis/dist/lenis.css'
// Tokens, dark theme and the styles for the plugin replacements — must come last.
import './styles/app.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
