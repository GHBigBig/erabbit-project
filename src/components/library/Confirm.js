import { render, createVNode } from 'vue';
import ERabbitConfirm from '@/components/library/ERabbitConfirm.vue';

const div = document.createElement('div');
div.setAttribute('class', 'er-confirm-contaimer');
document.body.appendChild(div);

export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    const submitCallback = () => {
      render(null, div);
      resolve();
    };
    const cancelCallback = () => {
      render(null, div);
      reject();
    };
    const vnode = createVNode(ERabbitConfirm, {
      title,
      text,
      submitCallback,
      cancelCallback,
    });
    render(vnode, div);
  });
};
