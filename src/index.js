import ToastFace from './ToastFace';
import toastStore from './toastStore';
import './styles/toast-face.css';

function create(type) {
  return (msg, opts = {}) => {
    toastStore[type](msg, opts);
  };
}

const toast = {
  success: create('success'),
  error: create('error'),
  warning: create('warning'),
  info: create('info'),
  custom: (msg, opts = {}) => toastStore.custom(msg, opts),
  notification: (opts = {}) => toastStore.notification(opts),
  remove: toastStore.remove,
  clear: toastStore.clear,
};

export { toast, ToastFace };
