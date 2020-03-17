import device from 'current-device';
import { detect } from 'detect-browser';
import { throttle } from '@/utils';

const THROTTLE_TIMEOUT = 60;
const isIe = typeof window !== 'undefined'
  && Object.hasOwnProperty.call(window, 'ActiveXObject')
  && !window.ActiveXObject; // Internet Explorer 6-11
const isEdge = !isIe && !!window['StyleMedia']; // Edge 20+

function makeIframeAndPrepeareHTMLDocument() {
  const { head, body } = document;

  // Тег <html> должен быть position: relative, что бы iframe был на всё высоту документа
  const style = document.createElement('style');
  const htmlStyles = 'html { position: relative !important; }';
  style.type = 'text/css';
  head.appendChild(style);
  style.appendChild(document.createTextNode(htmlStyles));

  // Теперь можно создать iframe который всегда будет на всю высоту и ширину документа
  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', '_resizeTrigger');
  iframe.setAttribute('style', 'position: absolute; z-index: 9999; pointer-events: none; visibility: hidden; width: 100%; min-height: 100%; height: auto; top: 0; border: none;');
  body.appendChild(iframe);

  return iframe;
}

export default function clientUiHandler({ store: { state, commit } }) {
  function init() {
    const queriesAll = Object.entries(state.ui.grid.queries);
    const iframe = makeIframeAndPrepeareHTMLDocument();

    commit('ui/isIe', isIe);
    commit('ui/isEdge', isEdge);
    commit('ui/setDeviceType', device.type);
    commit('ui/setBrowser', detect());

    if (isIe) document.documentElement.classList.add('is-ie');
    if (isEdge) document.documentElement.classList.add('is-edge');

    // Отлавливает всё, кроме высоты ОКНА
    function iframeResizeHandler() {
      const queriesCurrent = queriesAll.filter(query => window.matchMedia(query[1]).matches);
      const breakpoint = queriesCurrent.find(rule => rule[0].length === 2)[0];
      const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
      const { innerWidth: documentWidth, innerHeight: documentHeight } = iframe.contentWindow;
      const scrollbarWidth = windowWidth - documentWidth;

      const viewportInfo = {
        windowWidth, // ширина ОКНА браузера, не зависит от наличия скроллбара или ширины контента страницы
        windowHeight, // высота ОКНА браузера, внимание - высота ОКНА, а не самой страницы
        documentWidth, // ширина контента страницы, уменьшается, если есть скроллбар, может быть меньше/больше ширины ОКНА браузера
        documentHeight, // высота контента, читай - самой страницы. как правило, больше высоты ОКНА
        scrollbarWidth, // ширина скроллбара, равна 0, если скроллбара нет или скроллбар поверх страницы
        breakpoint, // наименование текущего брейкпоинта - 'xs' или 'sm' и так далее
      };

      commit('ui/updateViewportInfo', viewportInfo);
    }

    // Отлавливает ТОЛЬКО высоту ОКНА
    function windowResizeHandler() {
      // Если изменилась ширина окна - то отработает iframeResizeHandler и всё будет хорошо
      if (state.ui.windowWidth !== window.innerWidth) return;

      commit('ui/setWindowHeight', window.innerHeight);
    }

    function windowScrollHandler() {
      commit('ui/setScrollY', window.scrollY || window.pageYOffset);
    }

    iframeResizeHandler();
    windowScrollHandler();

    window.addEventListener('scroll', throttle(windowScrollHandler, THROTTLE_TIMEOUT));
    window.addEventListener('resize', throttle(windowResizeHandler, THROTTLE_TIMEOUT));
    iframe.contentWindow.addEventListener('resize', throttle(iframeResizeHandler, THROTTLE_TIMEOUT));
  }

  // ВНИМАНИЕ! Вызов без requestAnimationFrame вызовет ошибку!
  requestAnimationFrame(init);
}
