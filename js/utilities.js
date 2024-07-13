import { TxtType } from "./txtType.js";
// utilities

// Function to populate Medium posts in the timeline
const populateMediumPosts = (posts) => {
  const postsContainer = document.getElementById("medium-posts");

  // Create and append elements for each Medium post
  posts.forEach((item) => {
    const postTimelineContentElement = document.createElement("div");
    postTimelineContentElement.className = "medium-individual-post";
    postTimelineContentElement.innerHTML = `<h5><a href="${item.link}" target="_blank">${item.title}</a></h5>`;
    postsContainer.appendChild(postTimelineContentElement);
  });
};

// Function to generate work experience timeline from JSON data
const generateWorkExperienceTimeline = (data) => {
  const timelineContainer = document.getElementById("timeline");

  // Create and append timeline blocks for each work experience item
  data.forEach((item) => {
    const timelineBlock = createTimelineBlock(item, "fa-laptop-code");
    timelineContainer.appendChild(timelineBlock);
  });
};

// Function to create a timeline block element
const createTimelineBlock = (item, iconClass) => {
  const timelineBlock = document.createElement("div");
  timelineBlock.className = "timeline-block";
  timelineBlock.style.textAlign = "center";

  // Define the inner HTML for the timeline block
  timelineBlock.innerHTML = `
        <div class="timeline-ico"><i class="fa ${iconClass}"></i></div>
        <div class="timeline-header"><h3>${
          item.role
        }</h3><p style="text-align: center;">${item.period}</p></div>
        <div class="timeline-content">
          <h4>${item.company}</h4>
          <h5>${item.position}</h5>
          <p>${item.description.join("<br>")}</p>
        </div>
      `;
  return timelineBlock;
};

// Function to populate achievements section
const populateAchievements = (items) => {
  const container = document.getElementById("achievements-timeline");

  // Create and append timeline blocks for each achievement item
  items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "timeline-block";

    // Define the inner HTML for the achievement block
    block.innerHTML = `
          <div class="timeline-ico"><i class="fa fa-trophy"></i></div>
          <div class="timeline-header"><h3>${item.year}</h3></div>
          <div class="timeline-content" style="text-align: center; justify-content: center;">
            <h5>${item.title}</h5>
            <p>${item.description}<br>${item.source}</p>
            ${
              item.link
                ? `<a href="${item.link}" style="color: aqua;" target="_blank">View Publication</a>`
                : ""
            }
          </div>
        `;
    container.appendChild(block);
    container.appendChild(document.createElement("br"));
  });
};

// Function to populate positions section
const populatePositions = (items) => {
  const container = document.getElementById("positions-timeline");

  // Create and append timeline blocks for each position item
  items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "timeline-block";

    // Define the inner HTML for the position block
    block.innerHTML = `
          <div class="timeline-ico"><i class="fa fa-user-tie"></i></div>
          <div class="timeline-header"><h3>${item.year}</h3></div>
          <div class="timeline-content" style="text-align: center; justify-content: center;">
            <h5>${item.title}</h5>
            <p>${item.description}</p>
          </div>
        `;
    container.appendChild(block);
    container.appendChild(document.createElement("br"));
  });
};

// Function to populate education section
const populateEducation = (items) => {
  const container = document.getElementById("education-timeline");

  // Create and append timeline blocks for each education item
  items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "timeline-block";

    // Determine the appropriate icon class based on education level
    const iconClass =
      item.level === "College" ? "fa-user-graduate" : "fa-chalkboard-teacher";

    // Define the inner HTML for the education block
    block.innerHTML = `
          <div class="timeline-ico"><i class="fa ${iconClass}"></i></div>
          <div class="timeline-header"><h3>${item.level}</h3><p style="text-align: center;">${item.year}</p></div>
          <div class="timeline-content" style="text-align: center; justify-content: center;">
            <h4>${item.institution}</h4>
            <h5>${item.details}</h5>
            <p>${item.degree}</p>
          </div>
        `;
    container.appendChild(block);
    container.appendChild(document.createElement("br"));
  });
};

// Function to generate social media links
let generateSocialLinks = (className, links) => {
  return links
    .map(
      (link) => `
        <a target="_blank" class="${className}" href="${link.url}"><i class="${link.icon}"></i></a>
    `
    )
    .join("");
};

const generateNavBar = (navData) => {
  return `
        <ul>
          ${navData
            .map(
              (item) => `
            <li class="nav-item">
              <a href="${item.href}" class="nav-link" ${
                item.target ? `target="${item.target}"` : ""
              }>${item.text}</a>
            </li>
          `
            )
            .join("")}
        </ul>
    `;
};

let fetchSocialLinks = async () => {
  try {
    // Fetch the JSON file with social links
    const response = await fetch("json_assets/social_links.json");
    const linksData = await response.json();

    // Inject social media links into the top section
    const socialTop = document.querySelector(".social-top");
    if (socialTop) {
      socialTop.innerHTML = generateSocialLinks("contact-icon-top", linksData);
    }

    // Inject social media links into the bottom section
    const socialBottom = document.querySelector(".social-bottom");
    if (socialBottom) {
      socialBottom.innerHTML = generateSocialLinks(
        "contact-icon-bottom",
        linksData
      );
    }
  } catch (error) {
    console.error("Error fetching social links:", error);
  }
};

const populateProfile = (data) => {
  const profileSection = document.querySelector(
    "#introduction .profile-content"
  );

  const profileHTML = `
      <div>
        <img class="profile-image" src="${
          data.profileImage
        }" alt="profile-image" />
      </div>
      <div>
        <h1 class="profile-name">${data.name}</h1>
      </div>
      <div>
        <h3 class="profile-subtitle">${data.subtitle}</h3></div>
      <h2>
        <a href="#" class="typewrite" data-period="2000"
          data-type='${JSON.stringify(data.typewriteText)}'>
          <span class="wrap"></span>
        </a>
      </h2>
    `;

  profileSection.innerHTML = profileHTML;

  // Reinitialize the typewriter effect
  initTypewriter();
};

// Helper function to initialize a single typewriter effect
const initializeElement = (element) => {
  const toRotate = element.getAttribute("data-type");
  const period = element.getAttribute("data-period");

  if (toRotate) {
    new TxtType(element, JSON.parse(toRotate), period);
  }
};

const replaceLinksInText = (text, links) => {
    if (!links || links.length === 0) return text;

    // Sort links by length descending to replace longer phrases first
    links.sort((a, b) => b.text.length - a.text.length);

    // Replace each link's text with an anchor tag
    links.forEach(link => {
        const linkHTML = `<a target="_blank" href="${link.url}" style="color: whitesmoke; text-decoration: none;">${link.text}</a>`;
        text = text.replace(new RegExp(link.text, 'g'), linkHTML);
    });

    return text;
};

// Exports

// Main function to initialize typewriter effects on all elements
export const initTypewriter = () => {
  const elements = Array.from(document.getElementsByClassName("typewrite"));
  elements.forEach(initializeElement);
};

// Function to fetch and generate timeline content from JSON
export const fetchTimelineData = async () => {
  try {
    // Fetch work experience data
    const workExperienceResponse = await fetch(
      "json_assets/work_experience.json"
    );
    const workExperienceData = await workExperienceResponse.json();
    generateWorkExperienceTimeline(workExperienceData);

    // Fetch achievements data
    const achievementsResponse = await fetch("json_assets/achievements.json");
    const achievementsData = await achievementsResponse.json();
    populateAchievements(achievementsData);

    // Fetch positions data
    const positionsResponse = await fetch("json_assets/positions.json");
    const positionsData = await positionsResponse.json();
    populatePositions(positionsData);

    // Fetch education data
    const educationResponse = await fetch("json_assets/education.json");
    const educationData = await educationResponse.json();
    populateEducation(educationData);
  } catch (error) {
    console.error("Error fetching timeline data:", error);
  }
};

// Fetch and display timeline data and Medium posts

export const populateSocialIcons = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // Fetch the JSON file
    fetchSocialLinks();
  });
};

export const fetchNavBarData = async () => {
  try {
    // Fetch the JSON file with navigation links
    const response = await fetch("json_assets/navbar_links.json");
    const navData = await response.json();

    // Inject navigation bar into the navbar div
    const navbar = document.querySelector(".navbar-items");
    if (navbar) {
      navbar.innerHTML = generateNavBar(navData);
    } else {
      console.error("Navbar element not found.");
    }
  } catch (error) {
    console.error("Error fetching navigation links:", error);
  }
};

// Function to fetch Medium posts and populate the timeline
export const fetchMediumPosts = async () => {
  try {
    // Fetch the config JSON to get the Medium username
    const configResponse = await fetch("json_assets/profile.json");
    const configData = await configResponse.json();
    const mediumUsername = configData.mediumUsername;

    // Define the Medium feed URL using the fetched username
    const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`;

    // Fetch the RSS feed data and convert to JSON
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        mediumFeedUrl
      )}`
    );
    const data = await response.json();

    // Populate the Medium posts in the timeline
    populateMediumPosts(data.items);
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
  }
};

export const fetchProfileData = async () => {
  try {
    const response = await fetch("json_assets/profile.json");
    const profileData = await response.json();
    populateProfile(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};
  
// Function to populate the About Me section
export const populateAboutSection = async () => {
    try {
        // Fetch the About Me data
        const response = await fetch('json_assets/about.json');
        const data = await response.json();

        // Populate the section heading
        const headingElement = document.getElementById('about-heading');
        if (headingElement) {
            headingElement.textContent = data.heading;
        } else {
            console.error('Heading element not found');
        }

        // Populate the section content
        const contentElement = document.getElementById('about-content');
        if (contentElement) {
            contentElement.innerHTML = data.content
                .map(item => {
                    const contentText = replaceLinksInText(item.text, item.links);
                    return `<p>${contentText}</p>`;
                })
                .join('<br>');
        } else {
            console.error('Content element not found');
        }
    } catch (error) {
        console.error('Error fetching About Me data:', error);
    }
};
