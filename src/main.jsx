import { createRoot } from 'react-dom/client'
import { MotionGlobalConfig } from 'framer-motion'
import App from './App'
import PhoneFrame from './PhoneFrame'
import './styles.css'
import './discover.css'
import './detail.css'
import './flow.css'
import './spec.css'

// ?still → skip animations (used for automated checks in a hidden browser pane)
if (new URLSearchParams(location.search).has('still')) MotionGlobalConfig.skipAnimations = true

createRoot(document.getElementById('root')).render(<PhoneFrame><App /></PhoneFrame>)
