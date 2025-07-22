// Mock data for work experience
const experienceData = [
  {
    title: "Senior Frontend Developer",
    company: "Octa AR automation",
    companyUrl: "https://app.weareocta.com/",
    tenure: "Feb 2024 – Oct 2024",
    description: [
      "Spearheaded frontend and backend development by introducing Vue 3 (transitioning from jQuery) alongside Laravel 10, aligning the project with industry standards and improving maintainability.",
      "Provided team knowledge sessions on Vue 3 best practices, enhancing team proficiency and accelerating feature development.",
      "Executed database migrations and optimized CRUD operations, improving backend performance and maintaining data integrity across multiple modules.",
      "Developed and implemented a scalable style guide using SCSS, ensuring consistent design standards and reducing frontend inconsistencies.",
      "Improved overall web performance through cross-browser testing, image optimization, and removal of redundant code, resulting in faster load times and enhanced user experience.",
      "Led code reviews for 5+ team members, significantly reducing bugs and ensuring adherence to best practices, contributing to a 20% drop in post-release defects.",
    ],
    skills: [
      "Vue.js",
      "Laravel",
      "SCSS",
      "Migration",
      "Code Review",
      "Bootstrap 5",
      "jQuery",
      "Jira","Aws console","Figma"
    ],
    images: ["./images/projects/octa.png", "./images/backgroungimg.jpg"],
  },
  {
    title: "Senior Frontend Developer",
    company: "Yomly (Previously EmiratesHR)",
    companyUrl: "https://webdevco.com/",
    tenure: "Dec 2022 – Mar 2023",
    description: [
      "Delivered key add-on features for existing applications as part of a specialized 3-person team, meeting tight project deadlines.",
      "Developed frontend components using Angular, ensuring seamless integration with backend services powered by GraphQL and Node.js.",
      "Collaborated closely with backend engineer to design efficient data flows and optimize API interactions for enhanced performance.",
      "Provided frontend technical expertise to the team, ensuring best practices in code structure, modular design, and scalability.",
    ],
    skills: [
      "Angular",
      "GraphQL",
      "Node.js",
      "Frontend Development",
      "Agile Development",
      "Jira",
    ],
    images: ["./images/feddev.jpg"],
  },
  {
    title: "Front End Developer @ Zendy",
    company: "Knowledge E",
    companyUrl: "https://zendy.io/",
    tenure: "Jan 2021 – July 2022",
    description: [
      "Zendy projects focuses on providing an online Platform with easy access to world with latest academic literature. To overcome the gap of non-affordable books, research papers, journals, etc. by providing them on single platform with latest content (e-books, articles, journal).",
      "My Role focuses on developing the user interface using React Js with Redux as a state management library along with REST API.",
      "Collaboration with designers, QA team and backend team",
      "Discussions with Marketing and Product manager ",
      "Login Performance, cross browser compatibility.",
      "Responsive designs ",
      "For bug fixing and new features used https://www.browserstack.com/ for testing.",
      "For Admin panel (cockpit) added new functionality and updated designs using Material UI.",
    ],
    images: ["./images/portfolio.jpg", "./images/npm.jpg"],
    skills: [
      "React.js",
      "Redux",
      "REST API", "Jira","Figma",
        "Responsive Design",
      "Cross-browser Testing",
      "Material UI",
      "Code Review",
    ],
  },
  {
    title: "Sr. Front End Developer",
    company: "ePROMIS Solutions",
    companyUrl: "https://epromis.com/",
    tenure: "Aug 2019 – Jan 2021",
    description: [
      "Created base framework of SASS for the team customising fuse theme (Angular 7 Material based).",
      "Create different partial SASS files for Layouts and functionality.",
      "Devloped responsive Dashboards and Reporting designs and Layouts were user can dynamically change one type of graph/charts to another .",
      "Custom Angular7+ work as per the Project needs.",
      "Resolving queries of developers",
      "Discussion with testing and project managers team for clarification/ requirements",
      "Internal team discussion for technical feasibility of the tasks",
      "Site Performance and cross browser issues.",
      "Developing different modules in angular as per the project requirements.",
    ],
    images: ["./images/portfolio.jpg", "./images/npm.jpg"],
    skills: [
      "Angular 7+",
      "SASS",
      "MySQL",
      "Asp.net",
      "Unit testing",
      "Responsive Design",
      "Team Collaboration",
      "Site Performance",
      "Code Review",
    ],
  },
  {
    title: "Sr. Front End Developer",
    company: "Wishfin",
    companyUrl: "https://wishfin.com/",
    tenure: "Aug 2016 – Apr 2019",
    description: [
      "Building Front end architecture for the projects and developing high-end solutions with industry best practices . Developing application's on Angular.6+, jQuery, Javascript, HTML5, CSS3, SASS, Wordpress themes.",
      "Maintaining code quality by doing code reviews of colleagues . Collaborating and estimating timelines for new projects /new features",
      "Planning, tracking, and managing our agile and software development projects in Jira. And Also used redmine for few projects",
      "Cross browser Issues and devices Unit testing on UAT , pre-prod or prod servers. ",
      "Provide support & Training to juniors or new team members.",
      "Collaborating the requirements of business, UX /UI designers team and backend team",
      "Created base framework of SASS for the main website and blog .",
      "Create base variables and and mixins.",
      "Created different partial SASS files for Layouts and functionality.",
      "Developed different layout and designs for the website when user is logged in to the system or not.",
    ],
    images: ["./images/portfolio.jpg", "./images/npm.jpg"],
    skills: [
      "Angular 2+",
      "SASS",
      "jQuery",
      "Wordpress",
      "Responsive Design",
      "Team Collaboration",
      "UI/UX",
      "Site Performance",
      "Code Review",
    ],
  },
];

function renderExperience() {
  const container = document.querySelector("#experience .container .flex-card");
  if (!container) return;
  container.innerHTML = '';
  experienceData.forEach((exp, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    let imagesHTML = '';
    // if (exp.images && exp.images.length > 0) {
    //   imagesHTML = `<div class='card-images'>${exp.images
    //     .map((img) => `
    //       <div class="img-hover-wrap">
    //         <img src='${img}' alt='${exp.company}' />
    //         <div class="img-hover-overlay">
    //           <a href='${exp.companyUrl}' target="_blank">${exp.company}</a>
    //         </div>
    //       </div>
    //     `)
    //     .join("")}</div>`;
    // }
    let descriptionHTML = '';
    if (Array.isArray(exp.description)) {
      // Show only first 2 items, rest hidden by default
      const visible = exp.description.slice(0, 2);
      const hidden = exp.description.slice(2);
      descriptionHTML = `<ul>${visible.map(item => `<li>${item}</li>`).join('')}</ul>`;
      if (hidden.length > 0) {
        descriptionHTML += `
          <ul class="desc-hidden" id="desc-hidden-${idx}" style="max-height:0;overflow:hidden;transition:max-height 0.5s cubic-bezier(0.4,0,0.2,1);">
            ${hidden.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <button class="read-more-btn" data-idx="${idx}">Read more</button>
        `;
      }
    } else {
      descriptionHTML = `<p>${exp.description}</p>`;
    }
    card.innerHTML = `
      ${imagesHTML}
      <div class="card-content">
        <h4 class="card-heading">${exp.title}</h4>
        <h5 class="card-sub-heading">${exp.company} -  <span class="card-tenure">${
      exp.tenure
    }</span></h5>
        
        <div class="card-skills">
          ${exp.skills
            .map((skill) => `<span class="skill">${skill}</span>`)
            .join("")}
        </div>
        ${descriptionHTML}
      </div>
    `;
    container.appendChild(card);
  });
  // Add event listeners for read more
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-idx');
      const hiddenUl = document.getElementById(`desc-hidden-${idx}`);
      if (hiddenUl) {
        const isOpen = hiddenUl.style.maxHeight && hiddenUl.style.maxHeight !== '0px';
        if (!isOpen) {
          hiddenUl.style.maxHeight = hiddenUl.scrollHeight + 'px';
          this.textContent = 'Read less';
        } else {
          hiddenUl.style.maxHeight = '0px';
          this.textContent = 'Read more';
        }
      }
    });
  });
}
window.renderExperience = renderExperience;
