import { toggleBlogPageLike } from "./likeStateHandler.js";
import { toggleAuthorFollowState, toggleTopicFollowState } from "./followStateHandler.js";

document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        toggleBlogPageLike();
        break;
      case "follow_author":
        toggleAuthorFollowState(button);
        break;
      case "follow_topic":
        toggleTopicFollowState(button);
        break;

      default:
        console.warn(`Unbekannter Button-Typ: ${button.dataset.button}`);
    }
  });
});