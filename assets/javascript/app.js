

var panel = $("#quiz-area");
var countStartNumber = 30;

var questions = [{
        question: "Which brain is a cat's brain most similar to?",
        answers: ["Human", "Dog"],
        correctAnswer: "Human",
        image: "assets/images/cat_hitting_pillow.gif"
    },

    {
        question: "A term for a group of cats?",
        answers: ["Caggle", "Clowder", "Covey", "Clutch"],
        correctAnswer: "Clowder",
        image: "assets/images/hand_shake.gif"
    },

    {
        question: "A cat has how many whiskers, on average?",
        answers: ["16", "12", "8", "24"],
        correctAnswer: "24",
        image: "assets/images/dualing_yawn.gif"
    },

    {
        question: "Do cats have fewer or more teeth than dogs ?",
        answers: ["Same", "More", "Fewer"],
        correctAnswer: "Fewer",
        image: "assets/images/pumping_fist.gif"
    },

    {
        question: "The thick hair around the face of some cats (such as Persians) is called:",
        answers: ["Mane", "Shock", "Ruff", "Pelt"],
        correctAnswer: "Ruff",
        image: "assets/images/winking.gif"
    },

    {
        question: "What is it called when a cat rubs the side of its head on you or on furniture?",
        answers: ["Bunting", "Beaning", "Brocking", "Tagging"],
        correctAnswer: "Bunting",
        image: "assets/images/pouncing_cat.gif"
    },

    {
        question: "Outdoor-only cats live, on average, about:",
        answers: ["7 to 10 years", "3 - 5 years", "12 - 15 years"],
        correctAnswer: "3 - 5 years",
        image: "assets/images/dualing_yawn.gif"
    },

    {
        question: "A term for a group of kittens is:",
        answers: ["Nook", "Kaggle", "Kaboodle", "Kindle"],
        correctAnswer: "Kindle",
        image: "assets/images/cat_hitting_pillow.gif"
    },

    {
        question: "A cat, standing in a still position, can jump how many times its own height?",
        answers: ["4", "6", "2", "8"],
        correctAnswer: "6",
        image: "assets/images/hand_shake.gif"
    },

    {
        question: "'Tabby' is the name of a breed.",
        answers: ["False", "True"],
        correctAnswer: "False",
        image: "assets/images/pumping_fist.gif"
    },

    {
        question: "All of the following are the names of cat breeds, except:",
        answers: ["Birman", "Beauceron", "Balinese", "Burmilla"],
        correctAnswer: "Beauceron",
        image: "assets/images/winking.gif"
    },

    {
        question: "Cats can't taste this:",
        answers: ["Bitter", "Sour", "Salt", "Sweet"],
        correctAnswer: "Sweet",
        image: "assets/images/pouncing_cat.gif"
    },

    {
        question: "Which of the following statements about body language is FALSE?",
        answers: ["A tail tucked underneath the body means I am hungery.",
        "A twitching tail means I am getting irritated.", 
        "A thumping tail means I am totally frustrated.", 
        "A cat's tail held high means I am happy."],
        correctAnswer: "A tail tucked underneath the body means I am hungery.",
        image: "assets/images/pumping_fist.gif"
    }];


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
        panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function () {

        clearInterval(timer);

        panel.html("<h2>All done, heres how you did!</h2>");

        $("#counter-number").text(game.counter);

        panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
        panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
        panel.append("<br><button id='start-over'>Start Over?</button>");
    },

    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function () {

        game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>Nope!</h2>");
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

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
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

$(document).on("click", "#start-over", function () {
    game.reset();
});

$(document).on("click", ".answer-button", function (e) {
    game.clicked(e);
});

$(document).on("click", "#start", function () {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
    game.loadQuestion();
});