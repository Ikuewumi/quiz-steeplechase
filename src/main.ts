import './css/base.css'
import './css/layout.css'
import './css/index.css'

import App from './App.svelte'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLungs, faHome, faBook, faList, faBookOpen, faHeart, faBone, faChevronRight, faChevronLeft, faPlus, faRightFromBracket, faCircleInfo, faUpload, faBug, faSave, faTimes, faAdd, faPlay, faCheck, faTriangleExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons'


library.add(faLungs, faHome, faBook, faList, faBookOpen, faHeart, faBone, faChevronRight, faChevronLeft, faPlus, faRightFromBracket, faCircleInfo, faUpload, faBug, faSave, faTimes, faPlay, faCheck, faTriangleExclamation, faSpinner);


const app = new App({
  target: document.getElementById('app'),
})

export default app
