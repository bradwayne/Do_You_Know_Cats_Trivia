var backgroundMusic = new Audio("assets/audio/havana_cover_by_cats.m4a");

function pauseAudio() {
    if (document.getElementById('navAudio').classList.contains('play')) {
        document.getElementById('navAudio').classList.add('mute');
        document.getElementById('navAudio').classList.remove('play');
        document.getElementById('audio_on').style.display = 'none';
        document.getElementById('audio_mute').style.display = 'inline';
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    } else if (document.getElementById('navAudio').classList.contains('mute')) {
        document.getElementById('navAudio').classList.add('play');
        document.getElementById('navAudio').classList.remove('mute');
        document.getElementById('audio_on').style.display = 'inline';
        document.getElementById('audio_mute').style.display = 'none';
        backgroundMusic.play();
    }
}
backgroundMusic.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);
backgroundMusic.play();
$("#navAudio").click(pauseAudio);


var panel = $("#quiz-area");
var countStartNumber = 30;

var questions = [{
        question: "Which brain is a cat's brain most similar to?",
        answers: ["Human", "Dog"],
        correctAnswer: "Human",
        image: "assets/images/cat_hitting_pillow.gif"
    },

    {
        question: "Term for a group of cats?",
        answers: ["Caggle", "Clowder", "Covey", "Clutch"],
        correctAnswer: "Clowder",
        image: "assets/images/clouder.gif"
    },

    {
        question: "A cat has how many whiskers, on average?",
        answers: ["16", "12", "8", "24"],
        correctAnswer: "24",
        image: "assets/images/whiskers.gif"
    },

    {
        question: "Do cats have fewer or more teeth than dogs?",
        answers: ["Fewer", "More"],
        correctAnswer: "Fewer",
        image: "assets/images/dualing_yawn.gif"
    },

    {
        question: "Thick hair around the face of some cats (Persians) is called:",
        answers: ["Mane", "Shock", "Ruff", "Pelt"],
        correctAnswer: "Ruff",
        image: "assets/images/ruff.gif"
    },

    {
        question: "A cat rubbing the side of its head on you or furniture is called:",
        answers: ["Bunting", "Beaning", "Brocking", "Tagging"],
        correctAnswer: "Bunting",
        image: "assets/images/rubbing.gif"
    },

    {
        question: "Outdoor-only cats live, on average, about:",
        answers: ["7 to 10 years", "3 - 5 years", "12 - 15 years"],
        correctAnswer: "3 - 5 years",
        image: "assets/images/outdoors.gif"
    },

    {
        question: "'Tabby' is a name of a breed.",
        answers: ["False", "True"],
        correctAnswer: "False",
        image: "assets/images/pumping_fist.gif"
    },

    {
        question: "Term for a group of kittens is called:",
        answers: ["Nook", "Kaggle", "Kaboodle", "Kindle"],
        correctAnswer: "Kindle",
        image: "assets/images/kindle.gif"
    },

    {
        question: "A cat can jump how many times its height?",
        answers: ["4", "6", "2", "8"],
        correctAnswer: "6",
        image: "assets/images/jumping.webp"
    },

    {
        question: "All are names of cat breeds, except:",
        answers: ["Birman", "Beauceron", "Balinese", "Burmilla"],
        correctAnswer: "Beauceron",
        image: "assets/images/blow_dryer.gif"
    },

    {
        question: "Cats can't taste this:",
        answers: ["Bitter", "Sour", "Salt", "Sweet"],
        correctAnswer: "Sweet",
        image: "assets/images/tasting.webp"
    },


    {
        question: "A cat's tail that is twitching means?",
        answers: ["I am hungry.", "I am getting irritated.", "I am totally frustrated.", "I am happy."],
        correctAnswer: "I am getting irritated.",
        image: "assets/images/winking.gif"
    }
];


var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        game.counter--;
        $("#counter-number").text(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(game.countdown, 1000);

        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i] +
                "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function () {
        game.counter = countStartNumber;
        $("#counter-number").text(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function () {

        clearInterval(timer);

        $("#counter-number").html(game.counter);

        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    answeredIncorrectly: function () {

        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>NOPE!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    answeredCorrectly: function () {

        clearInterval(timer);

        game.correct++;

        panel.html("<h2>CORRECT!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function () {

        clearInterval(timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").text(game.counter);

        panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        panel.append("<br><button class='btn' id='start-over'>Start Over ?</button>");
    },

    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },

    reset: function () {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};

// CLICK EVENTS
$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2 id='time'>Question Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
});

$(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
});

$(document).on("click", "#start-over", function () {
    game.reset();
});