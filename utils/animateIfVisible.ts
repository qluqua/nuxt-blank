import { VisibilityObserver } from '@/utils'

export default function animateIfVisible(className = 'js-voa-start') {
  const options = {
    targets: document.getElementsByClassName(className),
    offset: 100,
    ifIntoView() {
      this.classList.remove(className)
    }
  }

  return new VisibilityObserver(options)
}
