export default (phoneString: string) => phoneString && phoneString.replace(/[^\d\+]/g, '')
