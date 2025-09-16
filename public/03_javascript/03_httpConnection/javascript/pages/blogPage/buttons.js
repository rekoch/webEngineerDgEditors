import { likeBlogPage, unlikeBlogPage } from "../../services/blogPageLikes.js";

const followAuthorText = "Autorin folgen";
const unfollowAuthorText = "Autorin nicht mehr folgen";

const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";



document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        //toggleLikeButtonState(button, likePageText, unlikePageText);
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

function toggleLikeButtonState(button, activationText, inactivatingText) {
  const currentState = button.dataset.buttonState;
  const likeCounter = document.getElementById("data-like-counter");
  let currentCount = parseInt(likeCounter.textContent);

  toggleButtonState(button, activationText, inactivatingText);

  if (currentState == "inactive") {
    button.prepend(brokenHeart);
    currentCount++;
    handleBlogPageLike();
  } else {
    button.prepend(filledHeart);
    currentCount--;
    handleUnlikeBlogPage();
  }
  likeCounter.textContent = currentCount;
}

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

async function handleBlogPageLike() {
  await likeBlogPage(37832, document.getElementById("data-user-id").textContent).then((res) => {
    console.log("Blog page liked successfully:", res);
  }).catch((error) => {
    console.error("Error liking the blog page:", error);
  });
}

async function handleUnlikeBlogPage() {
  await unlikeBlogPage(37832, document.getElementById("data-user-id").textContent).then((res) => {
    console.log("Blog page unliked successfully:", res);
  }).catch((error) => {
    console.error("Error unliking the blog page:", error);
  });
}
