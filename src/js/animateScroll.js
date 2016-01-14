var ease = v => 0.5 - Math.cos( v * Math.PI ) / 2;

var raf = window.requestAnimationFrame || window.setTimeout;

var animating = false;

var animateScroll = function(element) {
  if (animating) return;
  var start = document.body.scrollTop || document.documentElement.scrollTop || 0;
  var bounds = element.getBoundingClientRect();
  var now = Date.now();
  var finish = start + bounds.top - 50;
  var distance = finish - start;
  if (Math.abs(distance) < 10) return;
  var duration = 300;
  var frame = function() {
    var t = Date.now();
    var elapsed = t - now;
    var d = elapsed / duration;
    document.body.scrollTop = document.documentElement.scrollTop = start + distance * ease(d);
    if (elapsed > duration) return animating = false;
    raf(frame);
  }
  animating = true;
  frame();
};

module.exports = animateScroll;