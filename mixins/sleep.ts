export default function sleep(ms: number): Promise<boolean> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
