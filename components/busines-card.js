const template = (src, title) => `
<style>
  .busines-card {
    width: 100%;
    height: 260px;
    position: relative;
    overflow: hidden;
  }
  .image {
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: calc(100% - 80px);
    transition: all 1s;
  }
  .background {
    background: #2D3653;
    opacity: 0.6;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }
  .content:hover {
    top: 0;
    transition: all 1s;
  }
  .title-wrapper {
    height: 80px;
    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .title {
    font-size: 24px;
    color: white;
    line-height: 24px;

    margin-left: 20px;
  }
  .arrow {
    display: none;
  }
  .text {
    color: white;
    margin-left: 20px;
    width: 80%;
    position: absolute;
    top: 80px;
    font-size: 17px;
    z-index: 100;
  }
  @media screen and (max-width: 576px) {
    .busines-card {
      height: 60px;
      transition: all 1s;
    }
    .image {
      height: 240px;
    }
    .content {
      top: 0;
    }
    .title-wrapper {
      height: 60px;
    }
    .title {
      font-size: 20px;
      z-index: 100;
      margin-left: 10px;
      width: 80%;
    }
    .arrow {
      display: block;
      position: absolute;
      right: 16px;
      transition: all 1s;
    }
    .text {
      color: white;
      margin-left: 10px;
      width: calc(100% - 20px);
      position: absolute;
      top: 200px;
      transition: all 1s;
    }
  }
</style>

<div class="busines-card" >
  <img src="${src}" class="image" >
  <div class="content">
    <div class="background"></div>
    <div class="title-wrapper">
      <div class="title">${title}</div>
      <img src="./assets/images/busines-directions/busines-card-arrow.svg" class="arrow" >
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</div>`

export class BusinesCard extends HTMLElement {
    constructor() {
      super();
      this.isOpen = false
      this
        .attachShadow({mode: 'open'})
        .innerHTML = template(this.attributes.src?.value, this.title)

        const card = this.shadowRoot.querySelector('.busines-card')
        const arrow = this.shadowRoot.querySelector('.arrow')
        const text = this.shadowRoot.querySelector('.text')
        this.shadowRoot.querySelector('.title-wrapper').onclick = event => {
          if (window.innerWidth > 576) return
          if (!this.open) {
            card.style.height = '240px'
            arrow.style.transform = 'rotate(-180deg)'
            text.style.top = '60px'
          } else {
            card.style.height = '60px'
            arrow.style.transform = 'rotate(0deg)'
            text.style.top = '200px'
          }
          this.open = !this.open
        }
    }
  }
    