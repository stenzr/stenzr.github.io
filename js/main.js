import { 
  populateHeadSection, 
  fetchProfileData, 
  populateAboutSection, 
  fetchMediumPosts, 
  fetchTimelineData, 
  populateSocialIcons, 
  fetchNavBarData, 
  populateSectionHeadings, 
  fetchSocialLinks,
  populateCodingStats 
} from './utilities.js';

// ensure that js is called after the dom is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  populateHeadSection();
  fetchProfileData();
  populateAboutSection();
  populateSectionHeadings();
  fetchNavBarData();
  populateSocialIcons();
  fetchSocialLinks();
  fetchTimelineData();
  fetchMediumPosts();
  populateCodingStats();
});
