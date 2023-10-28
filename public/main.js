import { createElement } from 'react'
import { hydrateRoot } from 'react-dom/client'

import App from '../src/App'

hydrateRoot(document, createElement(App))
