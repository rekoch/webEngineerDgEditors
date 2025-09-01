const likePageText = "Dieser Artikel gefällt mir!";
const unlikePageText = "Dieser Artikel gefällt mir nicht mehr";

const followAuthorText = "Autorin folgen";
const unfollowAuthorText = "Autorin nicht mehr folgen";

const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";

const filledHeart = document.createElement("span");
filledHeart.innerHTML = `<svg
    fill="none" viewBox="0 0 16 16" width="16" height="16"
 class="svg-icon"><path fill="#fff" fill-rule="evenodd" d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" clip-rule="evenodd"></path></svg>`;
filledHeart.classList.add("mr-s");

const breakingHeart = document.createElement("span");
breakingHeart.innerHTML = `<svg
    fill="none" viewBox="0 0 16 16" width="16" height="16"
    class="svg-icon">
    <path fill="#000" fill-rule="evenodd" d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" clip-rule="evenodd"></path>
    <polyline points="6,4 8,8 7,10 9,12" stroke="#fff" stroke-width="1" fill="none"/>
</svg>`;
breakingHeart.classList.add("mr-s");

document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.getAttribute("data-button")) {
      case "like_article":
        toggleLikeButtonState(button);
        break;
      case "follow_author_michelle":
        toggleButtonState(button, followAuthorText, unfollowAuthorText);
        break;
      case "follow_topic_tablet":
        toggleButtonState(button, followTopicText, unfollowTopicText);
        break;

      default:
        console.warn(
          `Unbekannter Button-Typ: ${button.getAttribute("data-button")}`
        );
    }
  });
});

function toggleLikeButtonState(button) {
  const currentState = button.getAttribute("data-button-state");
  const likeCounter = document.querySelector("span[data-like-counter]");
  let currentCount = parseInt(likeCounter.textContent);
  if (currentState == "inactive") {
    button.textContent = unlikePageText;
    button.setAttribute("data-button-state", "active");
    button.classList.remove("primary");
    button.prepend(breakingHeart);
    currentCount++;
  } else {
    button.textContent = likePageText;
    button.setAttribute("data-button-state", "inactive");
    button.classList.add("primary");
    button.prepend(filledHeart);
    currentCount--;
  }
  likeCounter.textContent = currentCount;
}

function toggleButtonState(button, activationText, inactivatingText) {
  const currentState = button.getAttribute("data-button-state");
  if (currentState == "active") {
    button.textContent = activationText;
    button.setAttribute("data-button-state", "inactive");
    button.classList.add("primary");
  } else {
    button.textContent = inactivatingText;
    button.setAttribute("data-button-state", "active");
    button.classList.remove("primary");
  }
}