var closest = require("./closest");
var $ = require("./qsa");

var quizContainer = document.querySelector(".quiz-questions");

if (quizContainer) {

  var answers = $("input[type=radio]", quizContainer);

  var cancelClick = function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  };

  var onChoose = function(e) {
    var question = closest(e.target, ".question");
    if (question.classList.contains("answered")) {
      return;
    }
    question.classList.add("answered");
    var input = e.target;
    question.classList.add(input.value ? "correct" : "incorrect");
    var options = $("input, label", question);
    options.forEach(el => el.addEventListener("click", cancelClick));
  };

  answers.forEach(el => el.addEventListener("change", onChoose));

}