export default function(phone: string) {
  if (!phone) {
    return ''
  }

  return phone.replace(/[^\d\+]/g, '')
}
