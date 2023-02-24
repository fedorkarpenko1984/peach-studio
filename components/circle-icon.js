export class CircleIcon extends HTMLElement {
  constructor() {
    super();
    const src = this.attributes.src.value
    this
      .attachShadow({mode: 'open'})
      .innerHTML = `<style>
                      .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                      }
                      .wrapper {
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                        border-radius: 50%;
                        justify-content: center
                      }
                    </style>
                    <div class="container">
                      <div class="wrapper">
                        <img src="${src}" />
                      </div>
                      <p style="text-align: center; margin-top: 4px;margin-bottom: 0;">${this.title}</p>
                    </div>`;
    const wrapper = this.shadowRoot.querySelector('.wrapper')
    const container = this.shadowRoot.querySelector('.container')
    const image = this.shadowRoot.querySelector('img')

    function setSize() {
      if (window.innerWidth <= 576) {
        wrapper.style.width = '80px'
        wrapper.style.height = '80px'
        container.style.width = '125px'
        image.style.height = '36px'
      } else {
        wrapper.style.width = '110px'
        wrapper.style.height = '110px'
        container.style.width = '150px'
        image.style.height = '48px'
      }
    }
    setSize()
    window.addEventListener('resize', setSize)

    wrapper.style.background = this.attributes.color.value
  }
}
  