import { createVNode, render } from 'vue';
import ERabbitMeassage from '@/components/library/ERabbitMessage.vue';

const div = document.createElement('div');
div.setAttribute('class', 'er-message-container');
document.body.appendChild(div);

// 定时器标识
let timer = null;

export default ({ type, text }) => {
  const vnode = createVNode(ERabbitMeassage, { type, text });
  render(vnode, div);

  console.log(this);

  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 3000);
};
