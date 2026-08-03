const EMAILJS_SERVICE_ID = "service_iykci8c";
const EMAILJS_TEMPLATE_ID = "template_bt2293n";
const EMAILJS_PUBLIC_KEY = "FhRAIYkh64IbqHjWS";

const EMAILJS_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm";

let emailClientPromise;

async function getEmailClient() {
  if (!emailClientPromise) {
    emailClientPromise = import(EMAILJS_MODULE_URL).then(
      ({ default: emailjs }) => {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        return emailjs;
      },
    );
  }

  return emailClientPromise;
}

export async function sendContactForm(form) {
  const emailjs = await getEmailClient();

  return emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
}
