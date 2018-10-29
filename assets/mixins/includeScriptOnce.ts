function scriptAlreadyIncluded(url: string): boolean {
  const scripts = Array.from(document.querySelectorAll('script'))

  if (!scripts.length) {
    return false
  }

  return !!scripts.filter(script => script.src === url).length
}

function includeScriptOnce(url: string): Promise<boolean> {
  return new Promise(resolve => {
    if (scriptAlreadyIncluded(url)) {
      resolve(true)
      return true
    }

    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = url
    script.async = true

    document.getElementsByTagName('body')[0].insertBefore(script, null)

    script.onload = () => {
      resolve(true)
    }
  })
}

export { includeScriptOnce }
export default includeScriptOnce
