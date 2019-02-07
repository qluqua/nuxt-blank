// https://stackoverflow.com/questions/30571488/windows-resize-trigger-event-is-not-working-in-ie11
export default function() {
  if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    const event = document.createEvent('UIEvents')

    event.initUIEvent('resize', true, false, window, 0)
    window.dispatchEvent(event)
  } else {
    window.dispatchEvent(new Event('resize'))
  }
}
