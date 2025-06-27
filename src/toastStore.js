let toasts = []
let updateListeners = []

export const toastStore = {
  subscribe: (cb) => {
    updateListeners.push(cb)
    cb(toasts)
    return () => {
      updateListeners = updateListeners.filter(fn => fn !== cb)
    }
  },
  add: (msg, options = {}) => {
    const id = Date.now().toString()
    const toast = {
        id,
        message: msg,
        type: options.type || 'default',
        duration: options.duration || 3000,
        closable: options.closable !== false,
        loader: options.loader || false,
        title: options.title || null,
        profileImg: options.profileImg || null,
        customIcon: options.customIcon || null, 
        bgColor: options.bgColor || null,     
        textColor: options.textColor || null, 
    }
    toasts.push(toast)
    updateListeners.forEach(fn => fn([...toasts]))
    if (toast.duration > 0) {
      setTimeout(() => toastStore.remove(id), toast.duration)
    }
  },  
  remove: (id) => {
    toasts = toasts.filter(t => t.id !== id)
    updateListeners.forEach(fn => fn([...toasts]))
  }
}

