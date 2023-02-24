import toggleCityGroupHelper from "../helpers/toggleCityGroupHelper";
import changeCityMapElementsColor from "../helpers/changeCityMapElementsColorHelper";
import state from "../helpers/stateHelper";
import { citiesDictionary } from "../constants";

const template = (title) => `
<style>
  * {
    font-size: 18px;
    line-height: 20px;
  }
  .title {
    font-weight: 900;
    cursor: pointer;
    transition: color 0.5s;
  }
  .arrow {
    display: none;
  }
  .wrapper {
    height: auto;
    transition: height 0.5s;
  }
  @media screen and (max-width: 576px)  {
    * {
      font-size: 14px;
    }
    .arrow {
      display: inline-block;
      margin-left: 3px;
      height: 5px;
    }
    .wrapper {
      height: 0px;
      overflow: hidden;
      margin-bottom: 14px;
      transition: height 0.5s;
    }
  }
</style>
<div>
  <div class="title">
    ${title}
    <img src="./assets/images/city-list-arrow.svg" class="arrow" >
  </div>
  <div class="wrapper"></div>
</div>`

export class CityList extends HTMLElement {
  constructor() {
    super();
    this
      .attachShadow({mode: 'open'})
      .innerHTML = template(this.title)
    this.shadowRoot.children[1].children[0].onclick = () => {
      const navArea = document.querySelector(`[data-area="${this.attributes.area.value}"]`)
      toggleCityGroupHelper(navArea)
      if (this.attributes.area.value === 'moscow') {
        changeCityMapElementsColor('moscow', '#A30C33')
        if (state.currentCity) changeCityMapElementsColor(state.currentCity, '#444')
        state.currentCity = 'moscow'
      }
    }

    let cities = this.attributes.cities?.value;
    if (cities) {
      cities = cities.split(',').map(city => city.trim())
    }
    const wrapper = this.shadowRoot.querySelector('.wrapper')

    const title = this.shadowRoot.querySelector('.title')
    const arrow = this.shadowRoot.querySelector('.arrow')
    let isOpen = false
    title.onclick = () => {
      if (window.innerWidth > 576) return
      if (this.title === 'Москва') return
      if (!isOpen && title.textContent) {
        wrapper.style.height = 'auto'
        arrow.style.transform = 'rotate(-180deg)'
        title.style.color = '#A30C33'
      } else {
        wrapper.style.height = '0px'
        arrow.style.transform = 'rotate(0deg)'
        title.style.color = '#444'
      }
      isOpen = !isOpen
    }

    cities?.forEach(city => {
      const cityElement = document.createElement('div')
      cityElement.innerHTML = city
      window.innerWidth > 576 
        ? cityElement.style.marginTop = '12px'
        : cityElement.style.marginTop = '14px'
      cityElement.style.fontFamily = 'Proxima'
      cityElement.style.cursor = 'pointer'
      wrapper.append(cityElement)

      cityElement.onclick = () => {
        const city = citiesDictionary[cityElement.textContent.toLowerCase()]
        changeCityMapElementsColor(city, '#A30C33')
        if (state.currentCity) changeCityMapElementsColor(state.currentCity, '#444')
        state.currentCity = city
        const navArea = document.querySelector(`[data-area="${this.attributes.area.value}"]`)
        toggleCityGroupHelper(navArea)
      }
    })
  }
}