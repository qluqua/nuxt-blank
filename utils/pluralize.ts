/**
 * Склонения: 1 яблоко, 2 яблока, 5 яблок
 * Пример: pluralize(3, ['яблоко, яблока, яблок'])
 * Результат примера: "3 яблока"
 * @param {Number} num
 * @param {Array} titles string[]
 * @returns {String}
 */
export default function pluralize(num, titles) {
  const n = Math.abs(num);
  const cases = [2, 0, 1, 1, 1, 2];
  const i = (n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5];
  return `${num}&nbsp;${titles[i]}`;
}
