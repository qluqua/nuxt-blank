export default function(
  title: string,
  delimeter: string = '|',
  postfix: string = 'Project name') {

  if (!title) {
    document.title = postfix
    return
  }

  document.title = `${title} ${delimeter} ${postfix}`
}
