import React, { useEffect, useState, useRef } from 'react';
import toast from './toastStore';
import {
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  Info,
  Bell,
} from 'lucide-react';

const colors = {
  success: '#16a34a',
  error: '#dc2626',
  warning: '#f59e0b',
  info: '#2563eb',
  default: '#334155',
  custom: '#7c3aed',
  notification: '#0ea5e9', // 🟦 blue-ish for example
};

function hexToRgba(hex, alpha = 0.3) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


export default function ToastFace({
  position = 'top-right',
  stack = 'queue',
  animation = 'popup',
  variant = 'crust',
  darkMode = false,
  bgColor: globalBgColor,
  textColor: globalTextColor,
  borderRadius = 12,
}) {
  const [toasts, setToasts] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [androidExpand, setAndroidExpand] = useState({});
  const refs = useRef({});
  const timers = useRef({});
  const startTimes = useRef({});
  const pauseTimes = useRef({});
  const remainingTimes = useRef({});
  const [animationKey, setAnimationKey] = useState(0);



  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (stack === 'android') {
      toasts.forEach((t) => {
        setAndroidExpand((prev) => ({ ...prev, [t.id]: false }));
        setTimeout(() => {
          setAndroidExpand((prev) => ({ ...prev, [t.id]: true }));
        }, 250);
      });
    }
  }, [toasts]);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
    toast.pause(id);
    const now = performance.now();

    const t = toast.get(id);
    if (t && startTimes.current[id]) {
      const elapsed = now - startTimes.current[id];
      const remaining = Math.max((t.duration ?? 3000) - elapsed, 0);
      remainingTimes.current[id] = remaining;
      pauseTimes.current[id] = now;

      if (timers.current[id]) {
        clearTimeout(timers.current[id]);
        delete timers.current[id];
      }
    }
  };

  const handleMouseLeave = (id) => {
    setHoveredId(null);
    toast.resume(id);
    const remaining = remainingTimes.current[id];
    if (remaining != null) {
      startTimes.current[id] = performance.now() - ((toast.get(id)?.duration ?? 3000) - remaining);
      timers.current[id] = setTimeout(() => {
        toast.remove(id);
        delete timers.current[id];
      }, remaining);

      delete remainingTimes.current[id];
      delete pauseTimes.current[id];
      setAnimationKey((prev) => prev + 1); // restart animation
    }
  };

  const baseStyle = {
    'top-right': { right: '1rem' },
    'top-center': { left: '50%', transform: 'translateX(-50%)' },
    'top-left': { left: '1rem' },
    'bottom-right': { right: '1rem' },
    'bottom-center': { left: '50%', transform: 'translateX(-50%)', bottom: '1rem' },
    'bottom-left': { left: '1rem' },
  }[position];

  const isBottom = position.startsWith('bottom');
  const activeStack = hoveredId ? 'block' : stack;

  let orderedToasts = [...toasts];
  if (stack === 'queue' && isBottom) orderedToasts.reverse();

  useEffect(() => {
    toasts.forEach((t) => {
      if (!t.duration || hoveredId === t.id) return;

      const now = performance.now();
      const start = startTimes.current[t.id] ?? now;
      const elapsed = now - start;
      const remaining = Math.max(t.duration - elapsed, 0);

      if (!timers.current[t.id]) {
        timers.current[t.id] = setTimeout(() => {
          toast.remove(t.id);
          delete timers.current[t.id];
        }, remaining);
      }
    });

    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, [toasts, hoveredId]);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        ...baseStyle,
        [isBottom ? 'bottom' : 'top']: '1rem',
      }}
    >
      <div style={{ position: 'relative', width: 320 }}>
        {orderedToasts.map((t, index) => {
          const isHovered = hoveredId === t.id;
          const isAndroid = stack === 'android';
          const expanded = androidExpand[t.id] || isHovered;

          refs.current[t.id] = refs.current[t.id] || React.createRef();

          const offset = activeStack === 'queue'
            ? index * 12
            : index * (refs.current[t.id]?.current?.offsetHeight + 2 || 82);

          const scale = activeStack === 'queue' ? 1 - index * 0.05 : 1;
          const opacity = activeStack === 'queue' ? 1 - index * 0.1 : 1;

          let bgColor = globalBgColor ?? (darkMode ? '#1f2937' : colors[t.type] || colors.default);
          let txtColor = globalTextColor ?? (darkMode ? '#fff' : 'white');
          let border = 'none';
          let backdrop = 'none';

          if (variant === 'glass') {
            bgColor = hexToRgba(colors[t.type] || '#000', 0.5);
            txtColor = "#111";
            border = `1px solid ${colors[t.type] || '#fff'}`;
            backdrop = 'blur(10px)';
          }

          if (variant === 'outline') {
            border = `1.4px solid ${colors[t.type] || '#000'}`;
            bgColor = hexToRgba(colors[t.type] || '#000', 0.9);
          }

          if (variant === 'shadowed') {
            bgColor = darkMode ? '#0f172a' : '#fff';
            txtColor = darkMode ? '#f1f5f9' : '#1e293b';
            border = '1px solid rgba(0,0,0,0.05)';
            // Add soft shadow
          }

          if (variant === 'frosted') {
            bgColor = hexToRgba(colors[t.type], 0.25);
            txtColor = '#fff';
            border = '1px solid rgba(255, 255, 255, 0.2)';
            backdrop = 'blur(12px)';
          }

          if (variant === 'terminal') {
            bgColor = '#0f0f0f';
            txtColor = hexToRgba(colors[t.type], 0.9);
            border = `1.4px solid ${colors[t.type]}`;
            backdrop = 'none';
          }
          
          
          
          
          

          let IconElement = <Bell />;
          if (t.type === 'success') IconElement = <CheckCircle />;
          else if (t.type === 'error') IconElement = <XCircle />;
          else if (t.type === 'warning') IconElement = <AlertTriangle />;
          else if (t.type === 'info') IconElement = <Info />;
          else if (typeof t.icon === 'function') {
            try {
              IconElement = React.createElement(t.icon);
            } catch {
              IconElement = <Bell />;
            }
          } else if (React.isValidElement(t.icon)) {
            IconElement = t.icon;
          }

          if (!startTimes.current[t.id]) {
            startTimes.current[t.id] = performance.now();
          }

          return (
            <div
              key={t.id}
              ref={refs.current[t.id]}
              style={{
                background: bgColor,
                color: txtColor,
                padding: isAndroid && !expanded ? '0.5rem' : '0.75rem 1rem',
                borderRadius: isAndroid && !expanded ? '999px' : borderRadius,
                display: 'flex',
                alignItems: 'center',
                justifyContent: isAndroid && !expanded ? 'center' : 'flex-start',
                width: isAndroid && !expanded ? 40 : 'fit-content',
                minWidth: isAndroid && !expanded ? 40 : 300,
                maxWidth: 320,
                gap: isAndroid && !expanded ? 0 : '1rem',
                overflow: 'hidden',
                border,
                backdropFilter: backdrop,
                WebkitBackdropFilter: backdrop,
                position: 'absolute',
                [isBottom ? 'bottom' : 'top']: `${offset}px`,
                left: 0,
                right: 0,
                margin: '0 auto',
                transform: `scale(${scale})`,
                opacity,
                zIndex: 9999 - index,
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                animation: `${t.exiting ? `${animation}-out` : `${animation}-in`} 0.4s ease forwards`,

              }}
              onMouseEnter={() => handleMouseEnter(t.id)}
              onMouseLeave={() => handleMouseLeave(t.id)}
            >

<span
  style={{
    display: "flex",
    alignItems: t.type === 'notification' ? 'start' : 'center',
    justifyContent: "center",
    flexShrink: 0,
    height: "100%",
  }}
>
  {t.type === 'notification' ? (
    <img
      src={t.image || 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
      alt="avatar"
      style={{   width: 40, height: 40, borderRadius: "999em" }}
    />
  ) : (
    IconElement
  )}
</span>


              <div
                style={{
                  flex: 1,
                  position: isAndroid && !expanded ? 'absolute' : 'relative',
                  opacity: isAndroid && !expanded ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div style={{ 
                position: isAndroid && !expanded ? 'absolute' : 'relative',
                opacity: isAndroid && !expanded ? 0 : 1,
                transition: 'position  0.3s ease , opacity 250ms 0.3s ease',
                }}>
                  {t.message}
                </div>
                {t.subMessage && <div style={{ fontSize: 12, opacity: 0.8 , lineHeight:".65" , marginBottom:".5em" }}>{t.subMessage}</div>}
                {t.body && <div style={{  }}>{t.body}</div>}

                {t.loader && (
                  <div
                    style={{
                      marginTop: 4,
                      height: 4,
                      background: '#fff3',
                      width: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      key={animationKey + t.id}
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#fff',
                        transformOrigin: 'left',
                        animation: `loader-${t.id} ${t.duration ?? 3000}ms linear forwards`,
                        animationPlayState: isHovered ? 'paused' : 'running',
                        opacity: isHovered ? 0.5 : 1,
                      }}
                    />
                  </div>
                )}
              </div>


              {t.closable && !isAndroid && (
                <button
                  onClick={() => toast.remove(t.id)}
                  style={{
                    padding: ".5em",
                    background: 'transparent',
                    border: 'none',
                    color: txtColor,
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  <X />
                </button>
              )}

              <style>{`
                @keyframes loader-${t.id} {
                  from { transform: scaleX(1); }
                  to { transform: scaleX(0); }
                }
                @keyframes popup-in {
                  from { scale: 0.85;  }
                  to {  scale:1;  }
                }
                  @keyframes popup-out {
                  from {  scale:1;  opacity:1; }
                  to {  scale:0.85; opacity:0; }
                }

                @keyframes slide-out {
                  from { transform: translateY(0);  }
                  to { transform: translateY(${isBottom ? '100%' : '-100%'});  }
                }

                @keyframes fade-out {
                  from { opacity: 1; }
                  to { opacity: 0; }
                }

                @keyframes slide-in {
                  from { transform: translateY(${isBottom ? '100%' : '-100%'});  }
                  to { transform: translateY(0);  }
                }
                @keyframes slide-out {
                  from { transform: translateY(0);  opacity:1;}
                  to { transform: translateY(${isBottom ? '100%' : '-100%'});  opacity:0;}
                }

                @keyframes slideLeft-in {
                  from { translate: -100% 0;  }
                  to { translate: 0 0;  }
                }

                @keyframes slideLeft-out {
                  from { translate: 0 0; opacity:1; }
                  to { translate: -100% 0;  opacity:0;}
                }

                @keyframes slideRight-in {
                  from { translate: 100% 0;  }
                  to { translate: 0 0;  }
                }

                @keyframes slideRight-out {
                  from { translate: 0 0;  opacity:1;}
                  to { translate: 100% 0;  opacity:0;}
                }

                @keyframes slideUp-in {
                  from { translate: 0 100%;  }
                  to { translate: 0 0;  }
                }

                @keyframes slideUp-out {
                  from { translate: 0 0;  opacity:1;}
                  to { translate: 0 100%;  opacity:0;}
                }

                @keyframes slideDown-in {
                  from { translate: 0 -100%;  }
                  to { translate: 0 0;  }
                }

                @keyframes slideDown-out {
                  from { translate: 0 0;  opacity:1;}
                  to { translate: 0 -100%;  opacity:0;}
                }
                
                @keyframes squeezy-in {
                  from { translate: 0 0; scale: 0.8 1.2;  }
                  to { translate: 0 0; scale: 1 1;  }
                }

                @keyframes squeezy-out {
                  from { translate: 0 0; scale: 1 1;  opacity:1;}
                  to { translate: 0 0; scale: 1.2 0.8;  opacity:0;}
                }



              `}</style>
            </div>
          );
        })}
      </div>
    </div>
  );
}
