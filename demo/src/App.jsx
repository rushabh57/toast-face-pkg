import React from 'react';
import { toast, ToastFace } from '../../src/index.js';
import { Rocket } from 'lucide-react';
import { AiFillBell } from 'react-icons/ai';

export default function App() {
  const handleSuccess = () => {
    toast.success("Operation successful!", { loader: false, duration: 4000, closable: true });
  };
  const handleError = () => {
    toast.error("Something went wrong!", { subMessage: "Try again.", loader: true, duration: 5000, closable: true });
  };
  const handleLucide = () => {
    toast.custom("Launched!", { icon: Rocket, body: "Rocket launched successfully.", loader: true, duration: 5000, closable: true });
  };
  const handleReactIcon = () => {
    toast.custom("Notification!", { icon: AiFillBell, body: "You have a new alert.", loader: true, duration: 5000, closable: true });
  };
  const handleNotification = () => {
    toast.notification({
      message: "Main Heading",
      subMessage: "this is sub heading.",
      // icon: AiFillBell,
      body: "Msg body",
      image: "https://st2.depositphotos.com/4497765/7554/v/450/depositphotos_75545899-stock-illustration-super-comic-book-style-word.jpg", // your custom image URL
      duration: 5000,
      loader: true,
    });
    
    
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Toast Demo</h2>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleLucide}>Lucide Icon</button>
      <button onClick={handleReactIcon}>React Icon</button>
      <button onClick={handleNotification}>handleNotification</button>

      <ToastFace
        position="bottom-left"
        stack="queue"
        animation="slideUp" // ← try "popup", "slideLeft", "squeezy", etc.
        variant="" // ←  try shadowed , outline , glass , frosted
      />

    </div>
  );
}








// import React from 'react';
// import { toast, ToastFace } from '../../src/index.js';
// import { Rocket } from 'lucide-react';



// function App() {
  
//   return (
//     <>
//       <button className='h-fit w-fit px-6 py-2 m-2 bg-gray-300'  onClick={() => toast.success("Saved successfully!" , {loader: true})}>Show Toast</button>
//       <button className='h-fit w-fit px-6 py-2 m-2 bg-gray-300'  onClick={() => toast.warning(" successfully!")}>Show warn</button>
//       <button className='h-fit w-fit px-6 py-2 m-2 bg-gray-300'  onClick={() => toast.error(" successfully!")}>Show error</button>
//       <button
//       className='h-fit w-fit px-6 py-2 m-2 bg-gray-300'
//       onClick={() =>
//         toast.custom("This is a custom toast!", {
//           customIcon: <Rocket style={{ width: 24, height: 24 }} />,
//           loader: true,
//           duration: 5000
//         })
//       }
//       >
//         Show custom
//       </button>
      
//       <button className='h-fit w-fit px-6 py-2 m-2 bg-gray-300' 
//       onClick={() => toast.notification(" successfully!" , {
//       })}>Show notificaiton</button>
      
//       <ToastFace 
//       variant='liquidglass' 
//       position="top-right" 
//       animation="slide-up" 
//       stack="block" 
//       darkMode={false} 
//       loaderDuration= {4000}
//       />
//     </>
//   );
// }

// export default App;


// {
//   "name": "toast-face",
//   "version": "1.0.1",
//   "description": "A modern and customizable toast notification library for React",
//   "main": "dist/index.js",
//   "module": "dist/index.es.js",
//   "types": "dist/index.d.ts",
//   "files": [
//     "dist"
//   ],
//   "type": "module",
//   "scripts": {
//     "build": "vite build"
//   },
//   "keywords": [
//     "toast",
//     "react-toast",
//     "toastface",
//     "notification",
//     "react",
//     "toast-library"
//   ],
//   "author": "rushabh",
//   "license": "MIT",
//     "peerDependencies": {
//       "react": ">=18",
//       "react-dom": ">=18"
//     },
//     "repository": {
//       "type": "git",
//       "url": "https://github.com/rushabh57/toast-face-pkg"
//     },
//     "homepage": "https://rushabh57.github.io/toast-face-page",
//   "devDependencies": {
//     "vite": "^7.0.0"
//   }
// }
