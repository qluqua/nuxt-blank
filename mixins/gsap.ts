import TimelineLite from 'gsap/TimelineLite'
import 'gsap/CSSPlugin'
import { Power0, Power1, Power2, Power3, Power4, Elastic, Back, Linear, Expo } from 'gsap/EasePack'
// import TweenMax from 'gsap/TweenMax'
// import TweenLite from 'gsap/TweenLite'
// import TimelineMax from 'gsap/TimelineMax'
// import ScrollToPlugin from 'gsap/src/uncompressed/plugins/ScrollToPlugin'
// import ScrambleTextPlugin from '@/scripts/ScrambleTextPlugin'
// import RoundPropsPlugin from 'gsap/src/uncompressed/plugins/RoundPropsPlugin'
// import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic'
// import animation.gsap from 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'
// import 'debug.addIndicators' from 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

// https://greensock.com/ease-visualizer

export {
  TimelineLite,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Elastic,
  Back,
  Linear,
  Expo
}

function getChange(props) {
  const list = ['transform']

  if (props.opacity) {
    list.push('opacity')
  }

  return list.join(', ')
}

function animate(timeline, method, element, duration, props, time = 0) {
  timeline.set(element, { willChange: getChange(props) }, time)
  timeline[method](element, duration, props, time)
  timeline.set(element, { clearProps: 'will-change' }, time + duration)
}

function animateFromTo(timeline, method, element, duration, propsFrom, propsTo, time = 0) {
  timeline.set(element, { willChange: getChange(propsFrom) }, time)
  timeline[method](element, duration, propsFrom, propsTo, time)
  timeline.set(element, { clearProps: 'will-change' }, time + duration)
}

function animateStagger(timeline, method, element, duration, props, time = 0, time2 = 0) {
  timeline.set(element, { willChange: getChange(props) }, time)
  timeline[method](element, duration, props, time, time2)
  timeline.set(element, { clearProps: 'will-change' }, time + (duration * 2))
}

function animateStaggerFromTo(timeline, method, element, duration, propsFrom, propsTo, time = 0, time2 = 0) {
  timeline.set(element, { willChange: getChange(propsFrom) }, time)
  timeline[method](element, duration, propsFrom, propsTo, time, time2)
  timeline.set(element, { clearProps: 'will-change' }, time + (duration * 2))
}

export function willChange(timeline) {
  return {
    to(element, duration, props, time = 0) {
      animate(timeline, 'to', element, duration, props, time)
    },
    from(element, duration, props, time = 0) {
      animate(timeline, 'from', element, duration, props, time)
    },
    fromTo(element, duration, propsFrom, propsTo, time = 0) {
      animateFromTo(timeline, 'fromTo', element, duration, propsFrom, propsTo, time)
    },
    staggerTo(element, duration, props, time = 0, time2 = 0) {
      animateStagger(timeline, 'staggerTo', element, duration, props, time, time2)
    },
    staggerFrom(element, duration, props, time = 0, time2 = 0) {
      animateStagger(timeline, 'staggerFrom', element, duration, props, time, time2)
    },
    staggerFromTo(element, duration, propsFrom, propsTo, time = 0, time2 = 0) {
      animateStaggerFromTo(timeline, 'staggerFromTo', element, duration, propsFrom, propsTo, time, time2)
    },
    set(...args) {
      timeline.set(...args)
    },
    origin: timeline,
  }
}

export function clearTimeline(timeline) {
  if (timeline.origin) {
    timeline = timeline.origin
  }

  const targets = timeline.getChildren()
  timeline.kill()

  targets.forEach(target => {
    if (target.getChildren) {
      clearTimeline(target)
      return
    }
    timeline.set(target.target, { clearProps: 'all' })
  })
}
