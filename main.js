import './index.scss'
import mapHelper from './helpers/mapHelper'
import sliderHelper from './helpers/sliderHelper'
import { CircleIcon } from './components/circle-icon.js'
import { CityList } from './components/city-list.js'
import { BusinesCard } from './components/busines-card'

document.addEventListener('DOMContentLoaded', () => {
  mapHelper()
})

window.onload = () => sliderHelper()

customElements.define('circle-icon', CircleIcon)
customElements.define('city-list', CityList)
customElements.define('busines-card', BusinesCard)
  