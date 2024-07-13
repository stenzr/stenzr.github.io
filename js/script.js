
  // Function to fetch Medium posts and populate the timeline
  const fetchMediumPosts = async () => {
    try {
      const mediumUsername = "stenzr";
      const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`;
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedUrl)}`);
      const data = await response.json();
      populateMediumPosts(data.items);
    } catch (error) {
      console.error("Error fetching Medium posts:", error);
    }
  };

  // Function to populate Medium posts in the timeline
  const populateMediumPosts = (posts) => {
    const postsContainer = document.getElementById("medium-posts");
    posts.forEach((item) => {
      const postTimelineContentElement = document.createElement("div");
      postTimelineContentElement.className = "medium-individual-post";
      postTimelineContentElement.innerHTML = `<h5><a href="${item.link}" target="_blank">${item.title}</a></h5>`;
      postsContainer.appendChild(postTimelineContentElement);
    });
  };

  // Function to generate timeline (work experience) content from JSON data
  const generateTimeline = (data) => {
    const timelineContainer = document.getElementById("timeline");
    data.forEach((item) => {
      const timelineBlock = createTimelineBlock(item, "fa-chalkboard-teacher");
      timelineContainer.appendChild(timelineBlock);
    });
  };

  // Function to create a timeline block element
  const createTimelineBlock = (item, iconClass) => {
    const timelineBlock = document.createElement("div");
    timelineBlock.className = "timeline-block";
    timelineBlock.style.textAlign = "center";
    timelineBlock.innerHTML = `
      <div class="timeline-ico"><i class="fa ${iconClass}"></i></div>
      <div class="timeline-header"><h3>${item.role}</h3><p style="text-align: center;">${item.period}</p></div>
      <div class="timeline-content">
        <h4>${item.company}</h4>
        <h5>${item.position}</h5>
        <p>${item.description.join("<br>")}</p>
      </div>
    `;
    return timelineBlock;
  };

  // Function to populate timeline sections (achievements, positions, education)
  const populateTimeline = (items, containerId, iconClass) => {
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
          ${item.link ? `<a href="${item.link}" style="color: aqua;" target="_blank">View Publication</a>` : ""}
        </div>
      `;
      container.appendChild(block);
      container.appendChild(document.createElement("br"));
    });
  };

  // Function to populate education section
  const populateEducation = (items, containerId, iconClassCollege, iconClassSchool) => {
    const container = document.getElementById(containerId);
    items.forEach((item) => {
      const iconClass = item.level === "College" ? iconClassCollege : iconClassSchool;
      const block = document.createElement("div");
      block.className = "timeline-block";
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

  // Function to fetch and generate timeline content from JSON
  const fetchTimelineData = async () => {
    try {
      const workExperienceResponse = await fetch("json_assets/work_experience.json");
      const workExperienceData = await workExperienceResponse.json();
      generateTimeline(workExperienceData);

      const timelineEventsResponse = await fetch("json_assets/timeline_events.json");
      const timelineEventsData = await timelineEventsResponse.json();
      populateTimeline(timelineEventsData.achievements, "achievements-timeline", "fa-terminal");
      populateTimeline(timelineEventsData.positions, "positions-timeline", "fa-terminal");
      populateEducation(timelineEventsData.education, "education-timeline", "fa-user-graduate", "fa-chalkboard-teacher");
    } catch (error) {
      console.error("Error fetching timeline data:", error);
    }
  };

  // Fetch and display timeline data and Medium posts
  fetchTimelineData();
  fetchMediumPosts();
