# 🧑‍💻 Portfolio Website

This is a responsive, mobile-friendly portfolio website built using **HTML**, **CSS**, and **JavaScript**, now upgraded with **EmailJS v4**, **form validation**, and a live **character counter**. This version is Vite-ready but currently uses a CDN + ES module import setup.

---

## 🚀 Features

- Responsive layout for desktop, tablet, and mobile
- Animated toast notifications for form submission
- EmailJS integration (v4) to send emails from the frontend
- Full client-side validation (name, email, message length)
- Live message character counter with color feedback
- Easy to customize project, about, and skills sections

---

## 📁 Folder Structure

```
├── index.html              # Main HTML page
├── css/main.css            # Styling (pixel perfect to design)
├── js/main.js              # JS logic for form + toast
├── .env                    # EmailJS public config (for reference)
├── assets/                 # Images, icons, and resume
│   ├── avatar.png
│   ├── resume.pdf
│   └── icons/
│       └── html.svg, vue.svg, etc.
```

---

## 📩 EmailJS Setup (v4)

> If you're using this locally:

1. Create an account at [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create an **Email Service** and **Email Template**
3. Get your `service ID`, `template ID`, and `public key`
4. Replace the placeholders in `main.js`:

```js
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const PUBLIC_KEY = 'your_public_key';
```

5. Also update in `index.html` `<head>`:

```html
<script>
  (function() {
    emailjs.init('your_public_key');
  })();
</script>
```

---

## 🛠 To Run Locally (Static)
Just open `index.html` in your browser.

---

## ⚙️ To Migrate to Vite (Optional)

1. Run:
```bash
npm create vite@latest . -- --template vanilla
npm install
```
2. Rename `.env` to `.env.local` and use `VITE_` prefixes
3. Replace direct script with:
```html
<script type="module" src="/main.js"></script>
```
4. Run:
```bash
npm run dev
```

---

## 📬 License
MIT — free to modify and use.
