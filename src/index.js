// import ToastFace from './ToastFace'
// import { toastStore } from './toastStore'

// function createToast(type) {
//   return (msg, options = {}) => {
//     toastStore.add(msg, { ...options, type })
//   }
// }

// export const toast = {
//   success: createToast('success'),
//   error: createToast('error'),
//   warning: createToast('warning'),
//   info: createToast('default'),
//   custom: createToast('custom'),
//   notification: (msg, options = {}) =>
//     toastStore.add(msg, { ...options, type: 'notification' }), 
// }

// export { ToastFace }
// import ToastFace from './ToastFace';
// import toastStore from './toastStore';

// function create(type) {
//   return (msg, opts = {}) => {
//     toastStore[type](msg, opts);
//   };
// }

// const toast = {
//   success: create('success'),
//   error: create('error'),
//   warning: create('warning'),
//   info: create('info'),
//   custom: (msg, opts = {}) => toastStore.custom(msg, opts),
//   notification: (opts = {}) => toastStore.notification(opts),
//   remove: toastStore.remove,
//   clear: toastStore.clear,
// };

// export { toast, ToastFace };

import ToastFace from './ToastFace';
import toastStore from './toastStore';

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
