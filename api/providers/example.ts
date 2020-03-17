import { Logger } from '@/utils';

const logger = new Logger({
  prefix: '[exampleProvider]',
  condition: true,
});
const exampleUrl = 'https://jsonplaceholder.typicode.com/todos/';

export function fetchExample($axios) {
  return async function({ id = 1 }) { // eslint-disable-line
    try {
      const { data } = await $axios.get(`${exampleUrl}${id}`);

      return data;
    } catch (error) {
      logger.error(error, 'id: ', id);
    }
  };
}
