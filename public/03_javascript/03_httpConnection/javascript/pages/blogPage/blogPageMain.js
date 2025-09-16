import './buttons.js';
import './tables.js';
import {getLikesPerBlogPage} from '../../services/blogPageLikes.js';

const blogPageId = 37832; // Beispiel Blog-Seiten-ID

function initBlogPage() {
  getLikesPerBlogPage(blogPageId)
    .then((data) => {
      document.getElementById("data-like-counter").textContent = data.likeCount;
    })
    .catch((error) => {
      console.error("Error loading likes:", error);
    });
}

initBlogPage();