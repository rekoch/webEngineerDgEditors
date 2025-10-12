// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="welcome.html">Willkommen</a></li><li class="chapter-item expanded affix "><li class="part-title">Links und Tutorials</li><li class="chapter-item expanded "><a href="links/links.html"><strong aria-hidden="true">1.</strong> Hilfreiche Links</a></li><li class="chapter-item expanded "><a href="links/tutorials.html"><strong aria-hidden="true">2.</strong> Tutorials</a></li><li class="chapter-item expanded "><a href="links/videos.html"><strong aria-hidden="true">3.</strong> Video Aufzeichnungen</a></li><li class="chapter-item expanded affix "><li class="part-title">Setup</li><li class="chapter-item expanded "><a href="setup/intro.html"><strong aria-hidden="true">4.</strong> Setup</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="setup/vsCode.html"><strong aria-hidden="true">4.1.</strong> Vs Code</a></li><li class="chapter-item expanded "><a href="setup/node.html"><strong aria-hidden="true">4.2.</strong> NodeJs</a></li><li class="chapter-item expanded "><a href="setup/chrome.html"><strong aria-hidden="true">4.3.</strong> Chrome</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">HTML</li><li class="chapter-item expanded "><a href="html/intro.html"><strong aria-hidden="true">5.</strong> Einstieg</a></li><li class="chapter-item expanded "><a href="html/blogpage.html"><strong aria-hidden="true">6.</strong> Blog Page</a></li><li class="chapter-item expanded affix "><li class="part-title">CSS</li><li class="chapter-item expanded "><a href="css/intro.html"><strong aria-hidden="true">7.</strong> Einstieg</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="css/rwd.html"><strong aria-hidden="true">7.1.</strong> Responsive Web Design</a></li></ol></li><li class="chapter-item expanded "><a href="css/blogpage/intro.html"><strong aria-hidden="true">8.</strong> Blog Page mit CSS</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="css/blogpage/basics.html"><strong aria-hidden="true">8.1.</strong> 🗺️ Basis</a></li><li class="chapter-item expanded "><a href="css/blogpage/font.html"><strong aria-hidden="true">8.2.</strong> 📚 Font and Size</a></li><li class="chapter-item expanded "><a href="css/blogpage/width.html"><strong aria-hidden="true">8.3.</strong> 📐 Breite der Seite</a></li><li class="chapter-item expanded "><a href="css/blogpage/rubrik.html"><strong aria-hidden="true">8.4.</strong> 🏷️ Rubrik</a></li><li class="chapter-item expanded "><a href="css/blogpage/buttons.html"><strong aria-hidden="true">8.5.</strong> 🔘 Buttons</a></li><li class="chapter-item expanded "><a href="css/blogpage/likes.html"><strong aria-hidden="true">8.6.</strong> ❤️ like Bereich</a></li><li class="chapter-item expanded "><a href="css/blogpage/variables.html"><strong aria-hidden="true">8.7.</strong> 🎯 CSS Variablen</a></li><li class="chapter-item expanded "><a href="css/blogpage/responsive.html"><strong aria-hidden="true">8.8.</strong> 💃🏼 Responsive is key</a></li><li class="chapter-item expanded "><a href="css/blogpage/preview.html"><strong aria-hidden="true">8.9.</strong> 🔭 Blog Page Preview</a></li><li class="chapter-item expanded "><a href="css/blogpage/wrapUp.html"><strong aria-hidden="true">8.10.</strong> 🎁 Wrap it up</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">JavaScript</li><li class="chapter-item expanded "><a href="javascript/intro.html"><strong aria-hidden="true">9.</strong> Einstieg</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="javascript/debugJs.html"><strong aria-hidden="true">9.1.</strong> 🐛 Debuggen von JavaScript</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="javascript/debugChrome.html"><strong aria-hidden="true">9.1.1.</strong> Debug JS mit Chrome</a></li><li class="chapter-item expanded "><a href="javascript/debugVsCode.html"><strong aria-hidden="true">9.1.2.</strong> Debug JS mit VsCode</a></li></ol></li><li class="chapter-item expanded "><a href="javascript/callbacks.html"><strong aria-hidden="true">9.2.</strong> Callbacks</a></li></ol></li><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/intro.html"><strong aria-hidden="true">10.</strong> 🧠 Blog Page Intelligence</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/table.html"><strong aria-hidden="true">10.1.</strong> 🤖 Table auto design</a></li><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/buttons.html"><strong aria-hidden="true">10.2.</strong> 🛎️ Push the button</a></li><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/backendConnect.html"><strong aria-hidden="true">10.3.</strong> ⛓️‍💥 connect the backend</a></li><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/likes.html"><strong aria-hidden="true">10.4.</strong> ❤️‍🩹 like Funktion wiederherstellen</a></li><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/follow.html"><strong aria-hidden="true">10.5.</strong> 🚓 follow Funktion wiederherstellen</a></li><li class="chapter-item expanded "><a href="javascript/blogPageIntelligence/wrapUp.html"><strong aria-hidden="true">10.6.</strong> 💝 wrap it up</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
