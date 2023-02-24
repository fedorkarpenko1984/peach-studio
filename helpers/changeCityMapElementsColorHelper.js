export default function (city, color) {
    const cityMapElements = document.querySelectorAll(`[data-city="${city}"]`)
    cityMapElements[0].style.fill = color
    cityMapElements[1].style.fill = color
  }