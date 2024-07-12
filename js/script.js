
// fetch medium posts

async function fetchMediumPosts() {
    const mediumUsername = 'stenzr';
    const mediumFeedUrl = `https://medium.com/feed/@${mediumUsername}`;
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedUrl)}`);
    const data = await response.json();
    const postsContainer = document.getElementById('medium-posts');

    data.items.slice(0, 5).forEach(item => {
        // const postTimelineHeaderElement = document.createElement('div');
        // postTimelineHeaderElement.className = 'timeline-header';
        // postTimelineHeaderElement.innerHTML = `
        //         <p>${item.pubDate}</p>  
        // `;

        // postsContainer.appendChild(postTimelineHeaderElement);


        const postTimelineContentElement = document.createElement('div');
        postTimelineContentElement.className = 'medium-individual-post';
        postTimelineContentElement.innerHTML = `
            <h5><a href="${item.link}" target="_blank">${item.title}</a></h5>
        `;
        postsContainer.appendChild(postTimelineContentElement);
    });
}

fetchMediumPosts();