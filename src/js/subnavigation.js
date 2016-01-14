var closest = require("./closest");
var $ = require("./qsa");

var animateScroll = require("./animateScroll");

var tabGroup = document.querySelector(".tab-group");
if (tabGroup) {

  var tabNav = tabGroup.querySelector(".tab-navigation");
  var tabs = $("article.tab", tabGroup);

  var showTab = function(hash, onload) {
    var now = tabGroup.querySelector(hash);
    if (now) {
      tabs.forEach(el => el.classList.add("hidden"));
      $(".selected", tabNav).forEach(el => el.classList.remove("selected"));
      tabNav.querySelector(`[href="${hash}"]`).classList.add("selected");
      now.classList.remove("hidden");
      //jump to the tab on mobile
      var bounds = now.getBoundingClientRect();
      if (!onload) animateScroll(now)
    }
  };

  var hash = window.location.hash || "#" + document.querySelector("article.tab").id;
  showTab(hash, true);

  window.addEventListener("popstate", function(e) {
    if (e.state) {
      showTab(e.state);
    }
  });

  var onClick = function(e) {
    e.preventDefault();
    var id = this.getAttribute("href");
    showTab(id);
    window.history.pushState(id, id, id);
  };

  $("a", tabNav).forEach(a => a.addEventListener("click", onClick));

}

var slide = function(e) {
  var href = this.getAttribute("href");
  if (href.indexOf("#") != 0) return;
  var section = document.querySelector(href);
  if (!section) return;
  e.preventDefault();
  animateScroll(section);
  window.history.pushState(href, href, href);
};

$(".jump a").forEach(a => a.addEventListener("click", slide));
$(".to-top a").forEach(a => a.addEventListener("click", slide));