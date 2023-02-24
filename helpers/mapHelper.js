import state from "./stateHelper"
import toggleCityGroupHelper from "./toggleCityGroupHelper"
import changeCityMapElementsColorHelper from "./changeCityMapElementsColorHelper"

export default function () {  
  const arrow = document.querySelector('.map-navigation__open-dropdown__arrow')
  const cityLists = document.querySelector('.city-lists')
  const mapModule = document.querySelector('.map-module')
  const map = document.querySelector('.map')
  document.querySelector('.map-navigation__open-dropdown').onclick = () => {
    if (!state.dropdownOpen) {
      arrow.style.transform = 'rotate(-180deg)'
      cityLists.style.opacity = '1'
      if (window.innerWidth < 576) {
        mapModule.style.overflow = 'hidden'
      }
    } else {
      arrow.style.transform = 'rotate(0deg)'
      cityLists.style.opacity = '0'
      if (window.innerWidth < 576) {
        mapModule.style.overflow = 'scroll'
      }
    }
    state.dropdownOpen = !state.dropdownOpen
  }

  document.querySelector('.map').onclick = () => {
    if (state.dropdownOpen) {
      arrow.style.transform = 'rotate(0deg)'
      cityLists.style.opacity = '0'
    }
  }

  const navigationAreas = document.querySelectorAll('.map-navigation__areas__area')
  navigationAreas.forEach(area => {
    area.onclick = () => {
      if (area.getAttribute('data-area') !== state.currentArea) {
        changeCityMapElementsColorHelper(state.currentCity, '#444')
      }
      toggleCityGroupHelper(area)
      if (area.getAttribute('data-area') === 'moscow') {
        changeCityMapElementsColorHelper('moscow', '#A30C33')
        state.currentCity = 'moscow'
      }
    }
  })
}