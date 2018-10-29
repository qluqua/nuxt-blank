function sleep(ms: number): Promise<boolean> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export { sleep }
export default sleep
