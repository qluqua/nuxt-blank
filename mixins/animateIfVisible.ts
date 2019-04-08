import VisibilityObserver from '@/mixins/VisibilityObserver'

export default (className = 'js-voa-start') => {
  const options = {
    targets: document.getElementsByClassName(className),
    offset: 100,
    ifIntoView() {
      this.classList.remove(className)
    }
  }

  return new VisibilityObserver(options)
}
