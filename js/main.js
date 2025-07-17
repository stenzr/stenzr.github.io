import { populateHeadSection, fetchProfileData, populateAboutSection, fetchMediumPosts, fetchTimelineData, populateSocialIcons, fetchNavBarData, populateSectionHeadings } from './utilities.js';

// ensure that js is called after the dom is fully loaded
populateHeadSection();
fetchProfileData();
populateAboutSection();
populateSectionHeadings();
fetchNavBarData();
populateSocialIcons();
fetchTimelineData();
fetchMediumPosts();
