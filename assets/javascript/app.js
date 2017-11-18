

function handleClick()
  {         

var correctAnswers = 0;

var incorrectAnswers = 0;

var unanswered = -37;



for (var i = 0; i <= 30; i++) {

  var radios = document.getElementsByName('question'+i);

for (var j = 0; j < radios.length; j++) {

  var radio = radios[j];
    if (radio.value == "correct" && radio.checked) {
          correctAnswers++;
    }
    else if (radio.value == "wrong" && radio.checked) {
        incorrectAnswers++;
    }   

    else 
        unanswered++;
    
  }
 }                   
    alert("Correct Answers: " + correctAnswers + "  Incorrect Answers: " + 
      incorrectAnswers + "  Unanswered: " + unanswered);
  }