const followAuthorText = "Autorin folgen";
const unfollowAuthorText = "Autorin nicht mehr folgen";

const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";

import { appObserver, ObserverEvents } from "../../services/observer.js";
import {
  getIsFollowingAuthor,
  followAuthorByUser,
  unfollowAuthorByUser,
} from "../../services/authorFollow.js";
import {
  getIsFollowingTopic,
  followTopicByUser,
  unfollowTopicByUser,
} from "../../services/topicFollow.js";

let currentUserId = 0;
let blogPageId = 0;
let authorOfCurrentBlogPage = "";
let topicsOfCurrentBlogPage = [];

function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      await setAuthorFollowButtonState(currentUserId);
      await setTopicFollowButtonState(currentUserId);
    },
    true
  );
}

function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    async (data) => {
      blogPageId = data.blogPageId;
      getAuthorOfCurrentBlogPage();
      getTopicsOfCurrentBlogPage();
      await setAuthorFollowButtonState(currentUserId);
      await setTopicFollowButtonState(currentUserId);
    },
    true
  );
}

export async function toggleTopicFollowState(btn) {
  const topicName = btn.dataset.topicName;
  if (topicName && currentUserId) {
    try {
      const response = await getIsFollowingTopic(topicName, currentUserId);
      if (response.isFollowedTopic) {
        // Unfollow
        await unfollowTopicByUser(topicName, currentUserId);
        updateTopicFollowButtonUI(btn, false);
      } else {
        // Follow
        await followTopicByUser(topicName, currentUserId);
        updateTopicFollowButtonUI(btn, true);
      }
    } catch (error) {
      console.error("Error toggling topic follow state:", error);
    }
  }
}

export async function toggleAuthorFollowState(btn) {
  const authorEmail = btn.dataset.authorEmail;
  if (authorEmail && currentUserId) {
    try {
      const response = await getIsFollowingAuthor(authorEmail, currentUserId);
      if (response.isFollowedAuthor) {
        // Unfollow
        await unfollowAuthorByUser(authorEmail, currentUserId);
        updateAuthorFollowButtonUI(btn, false);
      } else {
        // Follow
        await followAuthorByUser(authorEmail, currentUserId);
        updateAuthorFollowButtonUI(btn, true);
      }
    } catch (error) {
      console.error("Error toggling author follow state:", error);
    }
  }
}

function updateTopicFollowButtonUI(btn, isFollowing) {
  if (isFollowing) {
    btn.classList.remove("primary");
    btn.innerHTML = unfollowTopicText;
  } else {
    btn.classList.add("primary");
    btn.innerHTML = followTopicText;
  }
}

function updateAuthorFollowButtonUI(btn, isFollowing) {
  if (isFollowing) {
    btn.classList.remove("primary");
    btn.innerHTML = unfollowAuthorText;
  } else {
    btn.classList.add("primary");
    btn.innerHTML = followAuthorText;
  }
}

async function setTopicFollowButtonState(userId) {
  if (userId && topicsOfCurrentBlogPage.length > 0) {
    const buttons = document.querySelectorAll("button[data-button='follow_topic']");
    
    for (const btn of buttons) {
      const topicName = btn.dataset.topicName;
      try {
        const response = await getIsFollowingTopic(topicName, userId);
        updateTopicFollowButtonUI(btn, response.isFollowedTopic);
      } catch (error) {
        console.error("Error loading topic follow state:", error);
      }
    }
  }
}

async function setAuthorFollowButtonState(userId) {
  if (userId && authorOfCurrentBlogPage) {
    const btn = document.querySelector("button[data-button='follow_author']");
    if (btn) {
      try {
        const response = await getIsFollowingAuthor(authorOfCurrentBlogPage, userId);
        updateAuthorFollowButtonUI(btn, response.isFollowedAuthor);
      } catch (error) {
        console.error("Error loading author follow state:", error);
      }
    }
  }
}

function getAuthorOfCurrentBlogPage() {
  const btn = document.querySelector("button[data-button='follow_author']");
  if (btn) {
    authorOfCurrentBlogPage = btn.dataset.authorEmail;
  }
}

function getTopicsOfCurrentBlogPage() {
  topicsOfCurrentBlogPage = [];
  document
    .querySelectorAll("button[data-button='follow_topic']")
    .forEach((btn) => {
      topicsOfCurrentBlogPage.push(btn.dataset.topicName);
    });
}

observeUserIdChange();
observeBlogPageIdChange();
