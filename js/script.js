// fetch medium posts

let fetchMediumPosts = async () => {
  const mediumUsername = "stenzr";
  const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`;
  const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      mediumFeedUrl
    )}`
  );
  const data = await response.json();
  const postsContainer = document.getElementById("medium-posts");

  data.items.forEach((item) => {
    // const postTimelineHeaderElement = document.createElement('div');
    // postTimelineHeaderElement.className = 'timeline-header';
    // postTimelineHeaderElement.innerHTML = `
    //         <p>${item.pubDate}</p>
    // `;

    // postsContainer.appendChild(postTimelineHeaderElement);

    const postTimelineContentElement = document.createElement("div");
    postTimelineContentElement.className = "medium-individual-post";
    postTimelineContentElement.innerHTML = `
            <h5><a href="${item.link}" target="_blank">${item.title}</a></h5>
        `;
    postsContainer.appendChild(postTimelineContentElement);
  });
};

// Function to generate timeline (work experience) content from JSON data
let generateTimeline = (data) => {
  const timelineContainer = document.getElementById("timeline");

  data.forEach((item) => {
    const timelineBlock = document.createElement("div");
    timelineBlock.className = "timeline-block";
    timelineBlock.style.textAlign = "center";

    timelineBlock.innerHTML = `
        <div class="timeline-ico">
          <i class="fa fa-chalkboard-teacher"></i>
        </div>
        <div class="timeline-header">
          <h3>${item.role}</h3>
          <p style="text-align: center;">${item.period}</p>
        </div>
        <div class="timeline-content">
          <h4>${item.company}</h4>
          <h5>${item.position}</h5>
          <p>${item.description.join("<br>")}</p>
        </div>
      `;

    timelineContainer.appendChild(timelineBlock);
  });
};

let populateTimeline = (items, containerId, iconClass) => {
  const container = document.getElementById(containerId);
  items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "timeline-block";

    block.innerHTML = `
        <div class="timeline-ico"><i class="fa ${iconClass}"></i></div>
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

let populateEducation = (
  items,
  containerId,
  iconClassCollege,
  iconClassSchool
) => {
  const container = document.getElementById(containerId);
  items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "timeline-block";
    const iconClass =
      item.level === "College" ? iconClassCollege : iconClassSchool;

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

// Fetch JSON data and generate timeline
fetch("json_assets/work_experience.json")
  .then((response) => response.json())
  .then((data) => generateTimeline(data))
  .catch((error) => console.error("Error fetching timeline data:", error));

fetch("json_assets/timeline_events.json")
  .then((response) => response.json())
  .then((data) => {
    populateTimeline(data.achievements, "achievements-timeline", "fa-terminal");
    populateTimeline(data.positions, "positions-timeline", "fa-terminal");
    populateEducation(
      data.education,
      "education-timeline",
      "fa-user-graduate",
      "fa-chalkboard-teacher"
    );
  })
  .catch((error) => console.error("Error loading timeline data:", error));

// time line generation ends

// fetch medium posts and display in timeline
fetchMediumPosts();
