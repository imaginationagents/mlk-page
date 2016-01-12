var closest = require("./closest");
var $ = require("./qsa");

var tabGroup = document.querySelector(".tab-group");

if (tabGroup) {

  var tabNav = tabGroup.querySelector(".tab-navigation");
  var tabs = $("article.tab", tabGroup);

  var showTab = function(hash) {
    var now = tabGroup.querySelector(hash);
    if (now) {
      tabs.forEach(el => el.classList.add("hidden"));
      now.classList.remove("hidden");
    }
  };

  var hash = window.location.hash || "#" + document.querySelector("article.tab").id;
  showTab(hash);

  var onClick = function(e) {
    e.preventDefault();
    var id = this.getAttribute("href");
    showTab(id);
    window.history.replaceState(id, id, id);
  };

  $("a", tabNav).forEach(a => a.addEventListener("click", onClick));

}