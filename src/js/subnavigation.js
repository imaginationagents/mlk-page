var closest = require("./closest");
var $ = require("./qsa");

var tabGroup = document.querySelector(".tab-group");

var ease = v => 0.5 - Math.cos( v * Math.PI ) / 2;

var raf = window.requestAnimationFrame || window.setTimeout;

var animateScroll = function(element) {
  var start = document.body.scrollTop || document.documentElement.scrollTop || 0;
  var bounds = element.getBoundingClientRect();
  var now = Date.now();
  var finish = start + bounds.top - 50;
  var distance = finish - start;
  if (distance == 0) return;
  var duration = 300;
  var frame = function() {
    var t = Date.now();
    var elapsed = t - now;
    var d = elapsed / duration;
    document.body.scrollTop = document.documentElement.scrollTop = start + distance * ease(d);
    if (elapsed > duration) return;
    raf(frame);
  }
  frame();
};

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
      if (!onload && (bounds.top > window.innerHeight || bounds.top < 0)) animateScroll(now)
    }
  };

  var hash = window.location.hash || "#" + document.querySelector("article.tab").id;
  showTab(hash, true);

  var onClick = function(e) {
    e.preventDefault();
    var id = this.getAttribute("href");
    showTab(id);
    window.history.replaceState(id, id, id);
  };

  $("a", tabNav).forEach(a => a.addEventListener("click", onClick));

}