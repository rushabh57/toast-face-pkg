let toasts = [];
let queue = [];
let subscribers = [];

let isProcessing = false;



let MAX_VISIBLE = 3; // default




function notify() {
  subscribers.forEach(cb => cb([...toasts]));
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}


function processQueue() {
  if (toasts.length >= MAX_VISIBLE || queue.length === 0) return;


  const toast = queue.shift();
  toast.startTime = Date.now();
  toast.remaining = toast.duration;
  toast.isPaused = false;
  
  toast.timeoutId = setTimeout(() => {
    removeToast(toast.id);
    processQueue(); 
  }, toast.remaining);

  toasts = [...toasts, toast];
  notify();
}

function pauseToast(id) {
  const toast = toasts.find(t => t.id === id);
  if (!toast || toast.isPaused) return;

  const elapsed = Date.now() - toast.startTime;
  toast.remaining -= elapsed;
  toast.isPaused = true;

  clearTimeout(toast.timeoutId);
}

function resumeToast(id) {
  const toast = toasts.find(t => t.id === id);
  if (!toast || !toast.isPaused) return;

  toast.startTime = Date.now();
  toast.timeoutId = setTimeout(() => removeToast(toast.id), toast.remaining);
  toast.isPaused = false;
}

function removeToast(id) {
  const toast = toasts.find(t => t.id === id);
  if (toast) clearTimeout(toast.timeoutId);

  // 🔧 Step 1: Mark it as exiting
  toasts = toasts.map(t => 
    t.id === id ? { ...t, exiting: true } : t
  );
  notify();

  // 🕒 Step 2: Wait for animation, then remove from list
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    notify();
    processQueue();
  }, 400); // matches your CSS exit animation duration
}

function getToast(id) {
  return toasts.find(t => t.id === id);
}


function addToast(newToast) {
  const id = generateId();
  const toast = {
    id,
    duration: newToast.duration || 3000,
    type: newToast.type || 'info',
    message: newToast.message || '',
    icon: newToast.icon || null,
    subMessage: newToast.subMessage || '',
    body: newToast.body || '',
    loader: newToast.loader || false,
    closable: newToast.closable ?? true,
    image: newToast.image || null,
    startTime: null,
    remaining: null,
    timeoutId: null,
    isPaused: false,

  };

  queue.push(toast);
  processQueue();

  return id;
}

function clearToasts() {
  toasts.forEach(t => clearTimeout(t.timeoutId));
  toasts = [];
  queue = [];
  notify();
}

const toast = {
  success: (msg, opts = {}) => addToast({ type: 'success', message: msg, ...opts }),
  error: (msg, opts = {}) => addToast({ type: 'error', message: msg, ...opts }),
  warning: (msg, opts = {}) => addToast({ type: 'warning', message: msg, ...opts }),
  info: (msg, opts = {}) => addToast({ type: 'info', message: msg, ...opts }),
  custom: (msg, opts = {}) => addToast({ type: 'custom', message: msg, ...opts }),
  notification: (opts = {}) => addToast({ type: 'notification', ...opts }),
  remove: removeToast,
  clear: clearToasts,
  subscribe: (cb) => {
    subscribers.push(cb);
    cb([...toasts]);
    return () => {
      subscribers = subscribers.filter(sub => sub !== cb);
    };
  },
  pause: pauseToast,
  resume: resumeToast,
  get: getToast, // ✅ Add this line
};

export default toast;
