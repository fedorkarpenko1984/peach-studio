export default function () {
  const wrapper = document.querySelector('.slider__wrapper')
  wrapper.style.height = Math.round(wrapper.offsetWidth * 0.751) + 'px'
  const slides = document.querySelectorAll('.slider__wrapper__slide')
  slides[0].style.display = 'block'

  window.addEventListener('resize', () => {
    wrapper.style.height = Math.round(wrapper.offsetWidth * 0.751) + 'px'
  })

  const indicators = []
  const indication = document.querySelector('.slider__indication')
  indication.style.gridTemplateColumns = `repeat(${slides.length}, 1fr)`
  for (let i = 0; i < slides.length; i++) {
    const newIndicator = document.createElement('div')
    newIndicator.classList.add('slider__indication__indicator')
    indication.append(newIndicator)
    indicators.push(newIndicator)
  }
  indicators[0].style.background = '#A30C33'

  function slideIn(currentSlide, commingSlide) {
    commingSlide.style.left = '100%'
    commingSlide.style.zIndex = '100'
    commingSlide.style.display = 'block'
    commingSlide.style.left = '0%'
    currentSlide.style.zIndex = '0'
    currentSlide.style.dislay = 'none'
  }

  function changeIndicator(newIndex, currentIndex) {
    indicators[newIndex].style.background = '#A30C33'
    indicators[currentIndex].style.background = 'rgba(0, 0, 0, 0.1)'
  }

  function newTimer() {
      return setInterval(() => {
        let newIndex = currentIndex + 1
        if (newIndex >= slides.length) newIndex = 0
        slideIn(slides[currentIndex], slides[newIndex])
        changeIndicator(newIndex, currentIndex)
        currentIndex = newIndex
      }, 3000)
  }

  let currentIndex = 0

  let timer = newTimer()

  const arrows = document.querySelectorAll('.slider__arrows__arrow')
  arrows[1].onclick = () => {
    clearInterval(timer)
    let newIndex = currentIndex + 1
    if (newIndex >= slides.length) newIndex = 0
    slideIn(slides[currentIndex], slides[newIndex])
    changeIndicator(newIndex, currentIndex)
    currentIndex = newIndex
    timer = newTimer()
  }
  arrows[0].onclick = () => {
    clearInterval(timer)
    let newIndex = currentIndex - 1
    if (newIndex < 0) newIndex = slides.length - 1
    slideIn(slides[currentIndex], slides[newIndex])
    changeIndicator(newIndex, currentIndex)
    currentIndex = newIndex
    timer = newTimer()
  }
}