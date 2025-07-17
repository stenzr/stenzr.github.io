import { TxtType } from "./txtType.js";
// utilities

// Function to populate Medium posts in the timeline
const populateMediumPosts = (posts) => {
  const postsContainer = document.getElementById("medium-posts");

  // Create and append elements for each Medium post
  posts.forEach((item) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    
    // Format the date
    const publishDate = new Date(item.pubDate);
    const formattedDate = publishDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Create excerpt from content (first 150 characters)
    const excerpt = item.content ? 
      item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 
      'Read the full article on Medium...';
    
    blogCard.innerHTML = `
      <div class="blog-title">
        <a href="${item.link}" target="_blank">${item.title}</a>
      </div>
      <div class="blog-excerpt">${excerpt}</div>
      <div class="blog-meta">
        <div class="blog-date">${formattedDate}</div>
        <a href="${item.link}" target="_blank" class="blog-read-more">Read More</a>
      </div>
    `;
    
    postsContainer.appendChild(blogCard);
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
  timelineBlock.className = "timeline-block work-experience-card";
  timelineBlock.style.textAlign = "center";

  // Create a more structured and visually appealing layout
  const descriptionList = item.description.map(desc => `<li>${desc}</li>`).join("");
  
  // Define the inner HTML for the timeline block with improved structure
  timelineBlock.innerHTML = `
        <div class="timeline-ico work-experience-icon"><i class="fa ${iconClass}"></i></div>
        <div class="timeline-header work-experience-header">
          <div class="work-role-badge">${item.role}</div>
          <h3 class="work-period">${item.period}</h3>
        </div>
        <div class="timeline-content work-experience-content">
          <div class="work-company-info">
            <h4 class="work-company">${item.company}</h4>
            <h5 class="work-position">${item.position}</h5>
          </div>
          <div class="work-description">
            <ul class="work-achievements">
              ${descriptionList}
            </ul>
          </div>
        </div>
      `;
  return timelineBlock;
};

// Function to populate achievements section
const populateAchievements = (items) => {
  const container = document.getElementById("achievements-timeline");
  if (!container) return;

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "achievement-card";
    
    const linkHtml = item.link ? 
      `<div class="achievement-link"><a href="${item.link}" target="_blank">View Publication</a></div>` : "";
    
    card.innerHTML = `
      <div class="achievement-header">
        <div class="achievement-icon"><i class="fa fa-trophy"></i></div>
        <div class="achievement-year">${item.year}</div>
      </div>
      <div class="achievement-content">
        <h3 class="achievement-title">${item.title}</h3>
        <p class="achievement-description">${item.description}</p>
        <p class="achievement-source">${item.source}</p>
        ${linkHtml}
      </div>
    `;
    
    container.appendChild(card);
  });
};

// Function to populate positions section
const populatePositions = (items) => {
  const container = document.getElementById("positions-timeline");
  if (!container) return;

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "position-card";
    
    card.innerHTML = `
      <div class="position-header">
        <div class="position-icon"><i class="fa fa-user-tie"></i></div>
        <div class="position-year">${item.year}</div>
      </div>
      <div class="position-content">
        <h3 class="position-title">${item.title}</h3>
        <p class="position-description">${item.description}</p>
      </div>
    `;
    
    container.appendChild(card);
  });
};

// Function to populate education section
const populateEducation = (items) => {
  const container = document.getElementById("education-timeline");
  if (!container) return;

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "education-card";
    
    // Determine the appropriate icon class based on education level
    const iconClass =
      item.level === "College" ? "fa-user-graduate" : "fa-chalkboard-teacher";
    
    card.innerHTML = `
      <div class="education-header">
        <div class="education-icon"><i class="fa ${iconClass}"></i></div>
        <div class="education-level">${item.level}</div>
        <div class="education-year">${item.year}</div>
      </div>
      <div class="education-content">
        <h3 class="education-institution">${item.institution}</h3>
        <h4 class="education-details">${item.details}</h4>
        <p class="education-degree">${item.degree}</p>
      </div>
    `;
    
    container.appendChild(card);
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

let generateSocialLinksText = (links) => {
  return links
    .map(
      (link) => `
        <a target="_blank" href="${link.url}">${link.text || link.platform}</a>
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

    // Inject social media links into the footer links section
    const footerLinks = document.querySelector(".footer-links");
    if (footerLinks) {
      linksData.forEach((link) => {
        const socialLink = document.createElement("a");
        socialLink.href = link.url;
        socialLink.target = "_blank";
        socialLink.textContent = link.text || link.platform;
        footerLinks.appendChild(socialLink);
      });
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
        }" alt="profile-image" width="200" height="200" />
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
  links.forEach((link) => {
    const linkHTML = `<a target="_blank" href="${link.url}" style="color: whitesmoke; text-decoration: none;">${link.text}</a>`;
    text = text.replace(new RegExp(link.text, "g"), linkHTML);
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

    // Fetch projects data
    const projectsResponse = await fetch("json_assets/projects.json");
    const projectsData = await projectsResponse.json();
    populateProjects(projectsData);
  } catch (error) {
    console.error("Error fetching timeline data:", error);
  }
};

// Function to populate projects section
const populateProjects = (items) => {
  const container = document.getElementById("projects-container");
  if (!container) return;
  
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "project-card";
    
    const technologiesHtml = item.technologies ? 
      `<div class="project-technologies"><strong>Technologies:</strong> <span>${item.technologies.join(", ")}</span></div>` : "";
    
    const linksHtml = [];
    if (item.link) {
      linksHtml.push(`<a href="${item.link}" target="_blank">Live Demo</a>`);
    }
    if (item.github) {
      linksHtml.push(`<a href="${item.github}" target="_blank">GitHub</a>`);
    }
    const linksSection = linksHtml.length > 0 ? 
      `<div class="project-links">${linksHtml.join("")}</div>` : "";
    
    card.innerHTML = `
      <div class="project-title">${item.title}</div>
      <div class="project-description">${item.description}</div>
      ${technologiesHtml}
      ${linksSection}
    `;
    
    container.appendChild(card);
  });
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

    // Initialize sticky navigation functionality
    initStickyNavigation();
  } catch (error) {
    console.error("Error fetching navigation links:", error);
  }
};

// Function to handle sticky navigation and active section highlighting
const initStickyNavigation = () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sideNav = document.getElementById("side-nav");
  const sideNavItems = document.querySelectorAll(".side-nav-item");
  
  // Sections to monitor
  const sections = [
    { id: "introduction", name: "Home" },
    { id: "about", name: "About Me" },
    { id: "projects", name: "Projects" },
    { id: "myscribbles", name: "Blog" },
    { id: "work-experience", name: "Work Experience" },
    { id: "achievements", name: "Achievements" },
    { id: "positions", name: "Positions" },
    { id: "education", name: "Education" }
  ];

  // Initialize side navigation with social icons
  initSideNavigation();

  // Handle scroll events
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const footerElement = document.getElementById("bottom-container");
    
    // Check if we're near the footer
    const isNearFooter = footerElement && 
      (scrollY + windowHeight) >= (documentHeight - 100);
    
    // Show side nav after scrolling past introduction, but hide near footer
    if (scrollY > 200 && !isNearFooter) {
      sideNav.classList.add("visible");
    } else {
      sideNav.classList.remove("visible");
    }

    // Update active navigation link based on current section
    let currentSection = "";
    let closestSection = null;
    let minDistance = Infinity;
    
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const sectionTop = element.offsetTop - 150; // Offset for sticky nav
        const sectionBottom = sectionTop + element.offsetHeight;
        
        // Check if we're within this section
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          currentSection = section.name;
          return; // Found the current section, no need to continue
        }
        
        // If not within any section, find the closest one
        const distance = Math.abs(scrollY - sectionTop);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section.name;
        }
      }
    });
    
    // If no section is currently active, use the closest one
    if (!currentSection && closestSection) {
      currentSection = closestSection;
    }

    // Update active class on navigation links
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.textContent === currentSection) {
        link.classList.add("active");
      }
    });

    // Update active class on side navigation items
    sideNavItems.forEach(item => {
      item.classList.remove("active");
      if (item.getAttribute("data-section") === currentSection) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      
      // Only handle internal links
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          // Adjust offset based on section type
          let offset = 80;
          if (href.includes("work-experience") || href.includes("achievements") || 
              href.includes("positions") || href.includes("education")) {
            offset = 100; // More offset for timeline subsections
          } else if (href === "#introduction") {
            offset = 60; // Less offset for home section
          }
          
          const offsetTop = targetSection.offsetTop - offset;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        } else {
          console.log("Target section not found for:", href);
        }
      }
    });
  });

  // Smooth scrolling for side navigation items
  sideNavItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const href = item.getAttribute("href");
      
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          // Adjust offset based on whether it's a timeline subsection
          let offset = 80;
          if (href.includes("work-experience") || href.includes("achievements") || 
              href.includes("positions") || href.includes("education")) {
            offset = 100; // Slightly more offset for timeline subsections
          }
          
          const offsetTop = targetSection.offsetTop - offset;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        } else {
          console.log("Target section not found for:", href);
        }
      }
    });
  });
};

// Function to initialize side navigation with social icons
const initSideNavigation = async () => {
  try {
    const response = await fetch("json_assets/social_links.json");
    const socialData = await response.json();
    
    const sideSocialContainer = document.getElementById("side-social-icons");
    
    if (sideSocialContainer) {
      const socialIconsHtml = socialData.map(link => 
        `<a href="${link.url}" target="_blank" class="side-social-icon">
          <i class="${link.icon}"></i>
        </a>`
      ).join("");
      
      sideSocialContainer.innerHTML = socialIconsHtml;
    }
  } catch (error) {
    console.error("Error loading social icons for side nav:", error);
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
    const response = await fetch("json_assets/about.json");
    const data = await response.json();

    // Populate the section heading
    const headingElement = document.getElementById("about-heading");
    if (headingElement) {
      headingElement.textContent = data.heading;
    } else {
      console.error("Heading element not found");
    }

    // Populate the section content
    const contentElement = document.getElementById("about-content");
    if (contentElement) {
      contentElement.innerHTML = data.content
        .map((item) => {
          const contentText = replaceLinksInText(item.text, item.links);
          return `<p>${contentText}</p>`;
        })
        .join("<br>");
    } else {
      console.error("Content element not found");
    }
  } catch (error) {
    console.error("Error fetching About Me data:", error);
  }
};

export const populateHeadSection = () => {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Fetch the JSON configuration
      const response = await fetch("json_assets/head_config.json");
      const config = await response.json();

      // Set the charset
      if (config.charset) {
        const metaCharset = document.createElement("meta");
        metaCharset.setAttribute("charset", config.charset);
        document.head.appendChild(metaCharset);
      }

      // Set the http-equiv
      if (config.httpEquiv) {
        const metaHttpEquiv = document.createElement("meta");
        metaHttpEquiv.setAttribute("http-equiv", "X-UA-Compatible");
        metaHttpEquiv.setAttribute("content", config.httpEquiv);
        document.head.appendChild(metaHttpEquiv);
      }

      // Set the favicon
      if (config.favicon) {
        const linkFavicon = document.createElement("link");
        linkFavicon.setAttribute("rel", "shortcut icon");
        linkFavicon.setAttribute("href", config.favicon);
        document.head.appendChild(linkFavicon);
      }

      // Set the title
      if (config.title) {
        document.title = config.title;
      }

      // Set the description
      if (config.description) {
        const metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", config.description);
        document.head.appendChild(metaDescription);
      }

      // Set the author
      if (config.author) {
        const metaAuthor = document.createElement("meta");
        metaAuthor.setAttribute("name", "author");
        metaAuthor.setAttribute("content", config.author);
        document.head.appendChild(metaAuthor);
      }

      // Set the keywords
      if (config.keywords) {
        const metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        metaKeywords.setAttribute("content", config.keywords);
        document.head.appendChild(metaKeywords);
      }

      // Set the viewport
      if (config.viewport) {
        const metaViewport = document.createElement("meta");
        metaViewport.setAttribute("name", "viewport");
        metaViewport.setAttribute("content", config.viewport);
        document.head.appendChild(metaViewport);
      }

      // Add preconnect links
      if (config.preconnect && Array.isArray(config.preconnect)) {
        config.preconnect.forEach((href) => {
          const linkPreconnect = document.createElement("link");
          linkPreconnect.setAttribute("rel", "preconnect");
          linkPreconnect.setAttribute("href", href);
          linkPreconnect.setAttribute("crossorigin", "anonymous");
          document.head.appendChild(linkPreconnect);
        });
      }

      // Add dns-prefetch links (optional)
      if (config.dnsPrefetch && Array.isArray(config.dnsPrefetch)) {
        config.dnsPrefetch.forEach((href) => {
          const linkDnsPrefetch = document.createElement("link");
          linkDnsPrefetch.setAttribute("rel", "dns-prefetch");
          linkDnsPrefetch.setAttribute("href", href);
          document.head.appendChild(linkDnsPrefetch);
        });
      }

      // Set the favicon image type and path
      if (config.faviconPath) {
        const linkFaviconPath = document.createElement("link");
        linkFaviconPath.setAttribute("rel", "icon");
        linkFaviconPath.setAttribute("type", `image/${config.faviconType}`);
        linkFaviconPath.setAttribute("href", config.faviconPath);
        document.head.appendChild(linkFaviconPath);
      }

      // Add stylesheets
      if (config.stylesheets && Array.isArray(config.stylesheets)) {
        config.stylesheets.forEach((href) => {
          const linkStylesheet = document.createElement("link");
          linkStylesheet.setAttribute("rel", "stylesheet");
          linkStylesheet.setAttribute("href", href);
          document.head.appendChild(linkStylesheet);
        });
      }

      // Add scripts
      if (config.scripts && Array.isArray(config.scripts)) {
        config.scripts.forEach((src) => {
          const script = document.createElement("script");
          script.setAttribute("src", src);
          script.setAttribute("defer", true);
          script.setAttribute("crossorigin", "anonymous");
          document.head.appendChild(script);
        });
      }
    } catch (error) {
      console.error("Error fetching head configuration:", error);
    }
  });
};
