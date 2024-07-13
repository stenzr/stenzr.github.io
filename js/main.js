import { populateHeadSection, fetchProfileData, populateAboutSection, fetchMediumPosts, fetchTimelineData, populateSocialIcons, fetchNavBarData } from './utilities.js';

populateHeadSection();
fetchProfileData();
populateAboutSection();
fetchNavBarData();
populateSocialIcons();
fetchTimelineData();
fetchMediumPosts();

  