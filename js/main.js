import { populateHeadSection, fetchProfileData, populateAboutSection, fetchMediumPosts, fetchTimelineData, populateSocialIcons, fetchNavBarData } from './utilities.js';

// ensure that js is called after the dom is fully loaded
populateHeadSection();
fetchProfileData();
populateAboutSection();
fetchNavBarData();
populateSocialIcons();
fetchTimelineData();
fetchMediumPosts();
