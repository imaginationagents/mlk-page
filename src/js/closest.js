var matches = 
  "matches" in document.body ? "matches" :
  "matchesSelector" in document.body ? "matchesSelector" :
  "msMatchesSelector" in document.body ? "msMatchesSelector" :
  "webkitMatchesSelector" in document.body ? "webkitMatchesSelector" :
  "mozMatchesSelector";

module.exports = function(element, selector) {
  while (element && element !== document.documentElement) {
    if (element[matches](selector)) return element;
    element = element.parentElement;
  }
};