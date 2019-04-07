




var trivia = {
    main : [{question : "What is the smallest planet in our solar system?",
            ansOption1 : "Earth",
            ansOption2 : "Mercury",
            ansOption3 : "Venus",
            ansOption4 : "Alderaan",
            correct : 2
            },
             {question : "What is the most common type of star found in the Milky Way?",
             ansOption1 : "Red dwarf stars",
             ansOption2 : "sunials",
             ansOption3 : "White dwarf stars",
             ansOption4 : "twinkle stars",
             correct : 1
             }],
    init : function (){
        trivia.questionDiv.html('<button type="button" id="startBtn" class="btn btn-lg"> Start Game</button>');
        trivia.optionsDiv.text("Hello World");
        console.log("init");
    },
    startgame : function (){
        console.log("starting game now");
       trivia.questionDiv.empty();
       trivia.questionDiv.html("<h2>" + (trivia.count+1) + ". " + trivia.main[trivia.count].question);

    },
    nextQuestion : function (){

    },
    count : 0,
    correct : 0,
    wrong : 0,
    checkAnswer : function () {
        // correct answer

        //wrong answer

    },
    displayResult : function () {

    },
    gameTimer : null,
    setTimer : function () {

    },
    questionDiv : null,
    optionsDiv : null


}; // END OF trivia object



$(document).ready(function (){

    trivia.questionDiv = $("#question");
    trivia.optionsDiv = $("#options");
    
    trivia.init();

    $("#startBtn").click(function(){
        trivia.startgame();
    });
});
