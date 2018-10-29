/**
 * Склонения: 1 яблоко, 2 яблока, 5 яблок
 * Пример: plural(3, ['яблоко, яблока, яблок'])
 * Результат примера: "яблока"
 * Взято отсюда: https://gist.github.com/realmyst/1262561
 */
export default function(num: number, titles: string[]) {
  const n = Math.abs(num)
  const cases = [2, 0, 1, 1, 1, 2]
  const index = (n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]
  const result = titles[index]

  return result
}
