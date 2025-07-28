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







// for testing purpose ...   *o*

// // {
//   "name": "toast-face",
//   "version": "1.0.1",
//   "main": "dist/index.js",    
//   "module": "dist/index.es.js",
//   "types": "dist/index.d.ts",
//   "type": "module"
// }

