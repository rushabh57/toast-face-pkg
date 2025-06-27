import React, { useEffect, useState } from 'react';
import { toastStore } from './toastStore';

const colors = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  default: '#333',
  custom: '#6366f1',
};

const icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#292D32" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 22H22L12 2Z" fill="#f59e0b" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#ef4444" />
      <line x1="8" y1="8" x2="16" y2="16" stroke="#fff" strokeWidth="2" />
      <line x1="16" y1="8" x2="8" y2="16" stroke="#fff" strokeWidth="2" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#121923" strokeWidth="2" />
    </svg>
  )
};

export default function ToastFace({ position = 'top-right', animation = 'popup', stack = 'queue', darkMode = false, borderRadius = 12, wrap = true, loaderDuration = 3000 }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => toastStore.subscribe(setToasts), []);

  const baseStyle = {
    'top-right': { right: '1rem' },
    'top-left': { left: '1rem' },
    'bottom-right': { right: '1rem' },
    'bottom-left': { left: '1rem' },
  }[position];

  const hasStandardToasts = toasts.some(t => t.type !== 'notification');

  const notificationPosStyle = {
    position: 'fixed',
    zIndex: 9999,
    ...baseStyle,
    [position.startsWith('top') ? 'top' : 'bottom']: hasStandardToasts ? '6rem' : '1rem',
  };

  const toastPosStyle = {
    position: 'fixed',
    zIndex: 9999,
    ...baseStyle,
    [position.startsWith('top') ? 'top' : 'bottom']: '1rem',
  };

  const notificationToasts = toasts.filter(t => t.type === 'notification');
  const standardToasts = toasts.filter(t => t.type !== 'notification');

  const renderToasts = (toastArray) => {
    const isBottom = position.startsWith('bottom');
    const arrangedToasts = isBottom ? [...toastArray] : [...toastArray].reverse();

    return (
      <div style={{ position: 'relative', width: 320 }}>
        {arrangedToasts.map((t, index) => {
          const offset = stack === 'queue' ? index * 10 : stack === 'block' ? index * 80 : 0;
          const scale = stack === 'queue' ? 1 - index * 0.05 : 1;
          const opacity = stack === 'queue' ? 1 - index * 0.1 : 1;

          const bgColor = t.bgColor || (t.type === 'notification'
            ? (darkMode ? '#1f2937' : '#fff')
            : colors[t.type] || colors.default);

          const textColor = t.textColor || (t.type === 'notification'
            ? (darkMode ? '#fff' : '#000')
            : 'white');

          const style = {
            background: bgColor,
            color: textColor,
            padding: t.type === 'notification' ? '1rem' : '0.75rem 1rem',
            borderRadius: borderRadius,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 300,
            gap: '1rem',
            border: t.type === 'notification' ? '1px solid #e5e7eb' : 'none',
            position: 'absolute',
            [isBottom ? 'bottom' : 'top']: `${offset}px`,
            left: 0,
            right: 0,
            margin: '0 auto',
            transform: `scale(${scale})`,
            opacity,
            zIndex: 9999 - index,
            animation: `${animation} 0.3s ease`,
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
          };

          return (
            <div key={t.id} style={style}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: wrap ? 'normal' : 'nowrap', overflow: wrap ? 'visible' : 'hidden', textOverflow: wrap ? 'unset' : 'ellipsis' }}>
                  {t.type === 'notification' && t.profileImg ? null : (t.customIcon || icons[t.type] || icons.default)}

                  {t.type === 'notification' && (
                    <img
                      src={t.profileImg || 'https://www.svgrepo.com/show/527946/user-circle.svg'}
                      alt=""
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                  )}

                  <div>
                    {t.type === 'notification' ? (
                      <>
                        <div style={{ fontWeight: 600 }}>{t.title || 'Notification'}</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{t.message}</div>
                      </>
                    ) : (
                      t.message
                    )}
                  </div>
                </div>
                {t.loader && (
                  <div style={{ marginTop: 4, height: 4, background: '#fff3', width: '100%', borderRadius: 2 }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#fff',
                      animation: `loaderAnim-${t.id} ${loaderDuration}ms linear forwards`
                    }} />
                  </div>
                )}
              </div>

              {t.closable && (
                <button onClick={() => toastStore.remove(t.id)} style={{
                  background: 'transparent',
                  color: textColor,
                  fontSize: 16,
                  border: 'none',
                  cursor: 'pointer'
                }}>×</button>
              )}
              <style>{`
                @keyframes loaderAnim-${t.id} {
                  from { width: 100% }
                  to { width: 0% }
                }
              `}</style>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div style={notificationPosStyle}>{renderToasts(notificationToasts)}</div>
      <div style={toastPosStyle}>{renderToasts(standardToasts)}</div>
    </>
  );
}
