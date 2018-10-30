import { TimelineLite, Power1, willChange } from '@/mixins/gsap'

interface Params {
  elements: HTMLElement[],
  maskColor: string,
  textEnterColor: string,
  textLeaveColor: string,
  duration: number,
  delay: number,
  staggerDelay: number,
}

const animateTextAppearMask = (params: Params) => {
  return new Promise(resolve => {
    const masks = createMasks(params)
    const ease = Power1.easeInOut
    const timeline = new TimelineLite()
    const timelineWch = willChange(timeline)

    timelineWch
      .staggerFromTo(masks, params.duration, {
        x: '101%',
        backgroundColor: params.maskColor,
      }, {
        x: '-101%',
        delay: params.delay,
        backgroundColor: params.maskColor,
        ease,
        immediateRender: true,
      }, params.staggerDelay)

    timelineWch
      .staggerFromTo(params.elements, params.duration, {
        color: params.textEnterColor,
      }, {
        color: params.textLeaveColor,
        delay: params.delay,
        ease,
        immediateRender: true,
      }, params.staggerDelay, params.duration * 0.5)

    timeline
      .add(resolve)
  })
}

function createMasks(params: Params) {
  const masks = []

  for (const el of params.elements) {
    const mask = createMask(params)

    el.setAttribute('style', `
      position: relative;
      overflow: hidden;
      display: inline-block;
      will-change: contents, color;`)
    el.appendChild(mask)
    masks.push(mask)
  }

  return masks
}

function createMask(params: Params) {
  const mask = document.createElement('div')
  mask.classList.add('js-textline-mask')
  mask.setAttribute('style', `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${params.maskColor};
    will-change: transform;`)

  return mask
}

export { animateTextAppearMask }
export default animateTextAppearMask
