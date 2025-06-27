# 🥐 Toastface

**Toastface** is a modern, customizable, and minimal toast notification library for React with built-in support for custom icons, animations, loaders, notifications, dark mode, and more.

![Toastface Demo](https://your-demo-image-url.com)

---

## 🚀 Features

- 🔥 Light and Dark modes
- ✅ Success, Error, Warning, Default, Custom, and Notification styles
- ⏳ Built-in loader animation with customizable duration
- 🎨 Pass your own icons or use built-in SVGs
- 🎬 Popup, slide, squeezy animations
- 🔁 Queue, block, and stack display styles
- 💡 Easily theme and style every toast
- 🧠 Dev playground to preview and generate toast code

---

## 📦 Installation

```bash
npm install toastface
# or
yarn add toastface


# import React from 'react';
# import { toast, ToastContainer } from 'toastface';

# function App() {
#   return (
#     <>
#       <button onClick={() => toast.success("Saved successfully!")}>Show Toast</button>
#       <ToastContainer position="top-right" animation="popup" stack="queue" darkMode={false} />
#     </>
#   );
# }



#toast.success("Success!");
# toast.error("Error!");
# toast.warning("Warning!");
# toast.default("Default!");
# toast.custom("Custom toast!", { closable: true, loader: true });
# toast.notification("Message", {
#   title: "John Doe",
#   profileImg: "https://...",
#   closable: true
# });




# // {
# //     "name": "toast-face",
# //     "version": "0.0.1",
# //     "main": "src/index.js",
# //     "type": "module"
# //   }