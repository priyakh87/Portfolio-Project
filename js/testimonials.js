// Mock testimonials data
const testimonials = [
  {
    name: "Amit Sharma",
    title: "Project Manager, Octa AR automation",
    text: "Priya is a highly skilled developer who consistently delivers high-quality work. Her attention to detail and dedication to the project were outstanding.",
    image: "./images/avatar-priya.png"
  },
  {
    name: "Sara Lee",
    title: "Lead Designer, Yomly",
    text: "Working with Priya was a pleasure. She brings creativity and technical expertise to every project.",
    image: "./images/profile-pic.jpeg"
  },
  {
    name: "John Doe",
    title: "CTO, Knowledge E",
    text: "Priya's ability to solve complex problems and her collaborative spirit made a huge impact on our team.",
    image: "./images/avatar.png"
  }
];

let currentTestimonial = 0;

function renderTestimonial(idx) {
  const content = document.querySelector('.testimonial-content');
  if (!content) return;
  const t = testimonials[idx];
  content.innerHTML = `
    <div class="testimonial-card">
      <img src="${t.image}" alt="${t.name}" class="testimonial-img" />
      <blockquote>"${t.text}"</blockquote>
      <p class="testimonial-name">${t.name}</p>
      <p class="testimonial-title">${t.title}</p>
    </div>
  `;
}

function setupCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
  renderTestimonial(currentTestimonial);
  document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
  });
  document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
  });
}

document.addEventListener('DOMContentLoaded', setupCarousel);
window.setupCarousel = setupCarousel;
window.renderTestimonial = renderTestimonial;