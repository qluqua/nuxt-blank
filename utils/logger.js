/**
 * @note important
 * relative paths are used intentionally
 * otherwise it breaks the assembly on the server
 */
import { isProductionStand } from './server';

const DEFAULT_CONFIG = {
  prefix: '',
  condition: true,
};
const LEVELS = {
  DEBUG: 'Debug',
  INFO: 'Information',
  WARN: 'Warning',
  ERROR: 'Error',
};
const METHODS_MAP = {
  [LEVELS.DEBUG]: 'log',
  [LEVELS.INFO]: 'info',
  [LEVELS.WARN]: 'warn',
  [LEVELS.ERROR]: 'error',
};
const DEFAULT_STYLES = 'padding: 0 3px 2px 3px; border-radius: 3px; color: black;';
const STYLES = {
  [LEVELS.DEBUG]: `${DEFAULT_STYLES} background: gainsboro;`,
  [LEVELS.INFO]: `${DEFAULT_STYLES} background: lightblue;`,
  [LEVELS.WARN]: `${DEFAULT_STYLES} background: gold;`,
  [LEVELS.ERROR]: `${DEFAULT_STYLES} background: firebrick; color: white;`,
};

/**
 * Remove auxiliary code spaces in template strings
 * @see original function https://habr.com/ru/post/280928/
 * @param {string|string[]} strings
 * @param {*} expressions
 * @returns {string}
 */
export const loggerClearTemplate = (strings, ...expressions) => {
  const match = strings[0].match(/\n+( *)/);
  const len = match ? match[1].length : 0;
  const indent = new RegExp(`\n {${len}}`, 'g');

  return expressions.reduce(
    (acc, expr, i) => `${acc}${expr}${strings[i + 1].replace(indent, '\n')}`,
    strings[0].replace(indent, '\n'),
  ).replace(/^\n|\n$/g, '');
};

export class Logger {
  /**
   * @param {{ prefix: string, condition: boolean }} config
   */
  constructor(config = {}) {
    this.options = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  log(...attrs) {
    this.output(LEVELS.DEBUG, ...attrs);
  }

  info(...attrs) {
    this.output(LEVELS.INFO, ...attrs);
  }

  warn(...attrs) {
    this.output(LEVELS.WARN, ...attrs);
  }

  error(...attrs) {
    this.output(LEVELS.ERROR, ...attrs);
  }

  output(level, ...attrs) {
    if (!this.hasAccess()) return;

    const method = METHODS_MAP[level];
    const styles = STYLES[level];

    console[method](`%c${this.options.prefix}`, styles, ...attrs);
  }

  hasAccess() {
    return !isProductionStand && Boolean(this.options.condition);
  }
}
