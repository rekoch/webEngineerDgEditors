import { toggleBlogPageLike } from "./likeStateHandler.js";

const followAuthorText = "Autorin folgen";
const unfollowAuthorText = "Autorin nicht mehr folgen";

const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";



document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        toggleBlogPageLike();
        break;
      case "follow_author":
        toggleButtonState(button, followAuthorText, unfollowAuthorText);
        break;
      case "follow_topic":
        toggleButtonState(button, followTopicText, unfollowTopicText);
        break;

      default:
        console.warn(`Unbekannter Button-Typ: ${button.dataset.button}`);
    }
  });
});

function toggleButtonState(button, activationText, inactivatingText) {
  const currentState = button.dataset.buttonState;
  button.classList.toggle("primary");
  if (currentState == "active") {
    button.textContent = activationText;
    button.dataset.buttonState = "inactive";
  } else {
    button.textContent = inactivatingText;
    button.dataset.buttonState = "active";
  }
}