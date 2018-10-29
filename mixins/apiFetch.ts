// @TODO: add method option: POST, GET etc.
interface FetchOptions {
  endpoint: string
  parameters?: object
}

const apiFetch = async (options: FetchOptions ) => {
  try {
    const { endpoint, parameters } = options
    const headers: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
    const data = await fetch(endpoint, headers)

    return data.json()
  } catch (error) {
    throw new Error(error)
  }
}

export { apiFetch }
export default apiFetch
