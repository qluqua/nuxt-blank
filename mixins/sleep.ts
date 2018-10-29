function sleep(ms: number): Promise<boolean> {
  return new Promise(resolve => setTimeout(resolve(true), ms))
}

export { sleep }
export default sleep
