/*
Diese Datei ist dafür zuständig, dass sämtliche Follow-Zustände (Autor folgen/nicht mehr folgen,
Thema folgen/nicht mehr folgen) korrekt gehandhabt werden.

Du wirst hier folgende Funktionen implementieren:
- Beobachten von Änderungen der Benutzer-ID und der Blog-Seiten-ID
- Initialisieren des Follow-Zustands für Autor und Themen, wenn sich die Blog-Seiten-ID ändert
- Umschalten des Follow-Zustands für Autor und Themen, wenn die entsprechenden Buttons geklickt werden
- Setzen des Button-Textes entsprechend dem aktuellen Follow-Zustand

Dazu wirst du die Observer-Funktionalität nutzen, um auf Änderungen der Benutzer-ID und der Blog-Seiten-ID zu reagieren.
Die Observer-Funktionen sind bereits implementiert und reagieren auf die Events USER_ID_CHANGED und BLOG_PAGE_ID_CHANGED.

Ausserdem wurden die Texte für die Buttons bereits definiert welche du verwenden kannst um den Button-Text entsprechend dem Follow-Zustand zu aktualisieren.
*/

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

function initFollowStateHandler() {
  observeUserIdChange();
  observeBlogPageIdChange();
  observeAuthorFollowButtonClick();
  observeTopicFollowButtonClick();
}

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
      await setAuthorFollowButtonState(currentUserId);
      await setTopicFollowButtonState(currentUserId);
    },
    true
  );
}

function observeAuthorFollowButtonClick() {
  appObserver.subscribe(
    ObserverEvents.AUTHOR_FOLLOW_BUTTON_CLICKED,
    async (data) => {
      if (currentUserId === 0 || blogPageId === 0) {
        console.warn("User ID oder Blog Page ID ist nicht gesetzt.");
        return;
      }
      toggleAuthorFollowState(data.button);
    }
  );
}

function observeTopicFollowButtonClick() {
  appObserver.subscribe(
    ObserverEvents.TOPIC_FOLLOW_BUTTON_CLICKED,
    async (data) => {
      if (currentUserId === 0 || blogPageId === 0) {
        console.warn("User ID oder Blog Page ID ist nicht gesetzt.");
        return;
      }
      toggleTopicFollowState(data.button);
    }
  );
}

async function toggleTopicFollowState(btn) {
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

async function toggleAuthorFollowState(btn) {
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

async function setTopicFollowButtonState(userId) {
  if (userId) {
    const buttons = document.querySelectorAll(
      "button[data-button='follow_topic']"
    );

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
  if (userId) {
    const btn = document.querySelector("button[data-button='follow_author']");
    const authorEmail = btn.dataset.authorEmail;
    if (btn) {
      try {
        const response = await getIsFollowingAuthor(
          authorEmail,
          userId
        );
        updateAuthorFollowButtonUI(btn, response.isFollowedAuthor);
      } catch (error) {
        console.error("Error loading author follow state:", error);
      }
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

initFollowStateHandler();
