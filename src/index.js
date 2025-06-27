import ToastFace from './ToastFace'
import { toastStore } from './toastStore'

function createToast(type) {
  return (msg, options = {}) => {
    toastStore.add(msg, { ...options, type })
  }
}

export const toast = {
  success: createToast('success'),
  error: createToast('error'),
  warning: createToast('warning'),
  info: createToast('default'),
  custom: createToast('custom'),
  notification: (msg, options = {}) =>
    toastStore.add(msg, { ...options, type: 'notification' }), 
}

export { ToastFace }
