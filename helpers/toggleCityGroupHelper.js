import state from "./stateHelper"

export default function (area) {
    const cityGroups = document.querySelectorAll('.map__city-group')
    if (state.currentArea === area.getAttribute('data-area')) return
    if (state.currentArea === 'all') {
      cityGroups.forEach(cityGroup => {
        if (cityGroup.id !== area.getAttribute('data-area')) cityGroup.style.display = 'none'
      })
    }
    if (area.getAttribute('data-area') === 'all') {
      cityGroups.forEach(cityGroup => cityGroup.style.display = 'block')
    }
    if (state.currentArea !== 'all' && area.getAttribute('data-area') !== 'all') {
      document.getElementById(`${state.currentArea}`).style.display = 'none'
      document.getElementById(`${area.getAttribute('data-area')}`).style.display = 'block'
    }
  
    document.querySelector(`[data-area="${state.currentArea}"]`).classList.remove('map-navigation__areas__area_active')
    area.classList.add('map-navigation__areas__area_active')
    state.currentArea = area.getAttribute('data-area')
  }