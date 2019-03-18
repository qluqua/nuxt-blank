import VisibilityObserver from '@/mixins/VisibilityObserver'

export default ({ app }) => {
  const className = 'js-if-visible-hidden'
  const options = {
    targets: document.getElementsByClassName(className),
    offset: 100,
    ifIntoView() {
      if (this.classList.contains(className)) {
        this.classList.remove(className)
      }
    }
  }

  app.router.afterEach(() => {
    new VisibilityObserver(options)
  })
}

