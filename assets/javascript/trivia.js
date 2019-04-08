




var trivia = {
    main : [{question : "What is the smallest planet in our solar system?",
            ansOptions : ["Earth", "Mercury", "Venus", "Alderann"],
            correct : 1,
            tag : "Mercury"
            },
             {question : "What is the most common type of star found in the Milky Way?",
             ansOptions : ["Red dwarf stars", "sunials", "White dwarf stars", "twinkle stars"],
             correct : 0,
             tag : "Red%20Dwarf%20star"
             },
             {question : "What is the closest star to the Sun?",
             ansOptions : ["Promixa Centauri", "sunials", "White dwarf stars", "twinkle stars"],
             correct : 0,
             tag : "galaxy"
             },
             {question : "What has a gravitational pull so strong that even light cannot escape it?",
             ansOptions : ["Jupiter", "Dark Matter", "A Worm Hole", "A Black Hole"],
             correct : 3,
             tag : "black%20hole"
             },
             {question : "Which NASA space flight was the last manned mission to the moon?",
             ansOptions : ["Falcon Heavy", "Apollo 2", "Apollo 17", "Sputnik 1"],
             correct : 2,
             tag : "nasa%20shuttle"
             },
             {question : "How many moons are in our Solar System?",
             ansOptions : ["1", "9", "181", "over 1200"],
             correct : 2,
             tag : "moons"
             },
             {question : "What flavor ice cream did Baskin-Robbins release in 1969 to commemorate America’s landing on the moon?",
             ansOptions : ["Milky Way Rocket Pop", "Rocky Caramel Moon ", "Lunar Cheesecake", "Astronaut Ice Cream"],
             correct : 0,
             tag : "cheesecake%20ice%20cream"
             },
             {question : "The size of the Earth's moon is what percentage of the size of the Earth?",
             ansOptions : ["Less than 1%", "15%", "27%", "100%, they are the same size"],
             correct : 0,
             tag : "earth%20moon"
             }, {question : "What ?",
             ansOptions : ["Red dwarf stars", "sunials", "White dwarf stars", "twinkle stars"],
             correct : 0,
             tag : "black%20hole"
             }],
    init : function (){
        clearTimeout(trivia.timerObj);
        $("#displayBtn").html('<button type="button" id="startBtn" class="btn-lg"> Start Game</button>');
        console.log("init");
    },
    startgame : function (){
        trivia.correct = 0
        trivia.wrong = 0;
        console.log("starting game now");

        // start timer
        clearInterval(trivia.intervalObj);
        clearTimeout(trivia.timerObj);
        trivia.interval = 10;
        trivia.currentTime = 10;
        trivia.intervalObj = setInterval(trivia.displayTimer, 1000);

        $("#startBtn").addClass("hidden");
       trivia.$questionDiv.empty();
       trivia.$questionDiv.html("<h2>" + (trivia.count+1) + ". " + trivia.main[trivia.count].question);

       trivia.$optionsDiv.empty();
       for(var i = 0; i < 4; i++){
        trivia.$optionsDiv.append('<div class="myOptions opt' + i + '" data-value="' + i + '">' + trivia.main[trivia.count].ansOptions[i] + "</div>");
       }
       

    },
    nextQuestion : function (){
        console.log("Next Question");
        //increment counter
        trivia.count++;
        // start timer
        clearInterval(trivia.intervalObj);
        clearTimeout(trivia.timerObj);
        trivia.interval = 10;
        trivia.currentTime = 10;
        trivia.intervalObj = setInterval(trivia.displayTimer, 1000);


        if(trivia.count < trivia.main.length){
            trivia.$questionDiv.empty();
            trivia.$questionDiv.html("<h2>" + (trivia.count+1) + ". " + trivia.main[trivia.count].question);
    
            trivia.$optionsDiv.empty();
            for(var i = 0; i < 4; i++){
            trivia.$optionsDiv.append('<div class="myOptions opt' + i + '" data-value="' + i + '">' + trivia.main[trivia.count].ansOptions[i] + '</div>');
        }
        }else{
            clearInterval(trivia.intervalObj);
            trivia.displayResult();
        }

    },
    checkAnswer : function (event) {
        //start timer 
        // clearTimeout(trivia.timerObj);
        clearInterval(trivia.intervalObj);
   


        //hide incorrect options
        for(var i =0; i< 4; i++){
            console.log("CheckAnswer Looping");
            if(trivia.main[trivia.count].correct !== i){
                console.log('Found');
                var $temp = $('.opt' + i +'');
                $temp.addClass("hidden");
                
            }
        }

        // with the answer showing, change to green if they selected the correct answer, else make it red if they chose incorrectly
        if(parseInt(event) === trivia.main[trivia.count].correct){
            // correct answer
            trivia.$optionsDiv.prepend("Correct!")
            trivia.correct++;
            console.log("correct : "+ parseInt(event));
            var $temp = $('.opt' + parseInt(event) + '');
            $temp.addClass("correct");
        } else {
            //wrong answer
            trivia.$optionsDiv.prepend("Wrong, the correct answer is :")
            trivia.wrong++;
            console.log("false : "+ parseInt(event));
            var $temp = $('.opt' + trivia.main[trivia.count].correct +'');
            $temp.addClass("wrong");
        }

        //create and declare query address for a randon gif with api key
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=rKTyieWDSyjDNPV9Hq5OSZY33AYum5o9&tag=" + trivia.main[trivia.count].tag + '';
        console.log(queryURL);
        //make api call with queryURL address using a GET method
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // the callback for the api call
        .then(function(response) {

        //retrieve property from the call using the response object, its data object and its image url value
        var imageUrl = response.data.image_original_url;

        //create image block
        var image = $("<img>");

        //Sets source/src attribute to the image url, and sets alt text (mouse over or if image doesn't display)
        image.attr("src", imageUrl);
        image.attr("alt", "answer image");

        //Adds newly created img to begin of the images div
        trivia.$optionsDiv.append(image);
        });

        trivia.interval = 3;
        trivia.currentTime = 3;
       // trivia.timerObj = 
        setTimeout(function(){
            console.log("set 3 second timer");
            trivia.nextQuestion();
        }, (1000 * parseInt(trivia.interval)));

    },
    displayResult : function () {
        trivia.$optionsDiv.empty();
        trivia.$questionDiv.empty();

        trivia.$optionsDiv.html("<div>");
        trivia.$optionsDiv.append("Correct Answers : " + trivia.correct);
        trivia.$optionsDiv.append("<br>Wrong Answers : " + trivia.wrong);

        trivia.count = 0;
        $("#startBtn").removeClass("hidden");
        clearTimeout(trivia.timerObj);
    },
    timer : function (){
       
        //Check if timer done
        console.log("timer()" + trivia.currentTime);
        if(trivia.currentTime > 0){
            //still counting down
            trivia.currentTime--;
            console.log(trivia.currentTime);
          //  trivia.displayTimer ();
        } else {
            //timer up, handle it
            clearInterval(trivia.intervalObj);
            //no answer, so pass null to trigger wrong answer
            var arg = null
            trivia.checkAnswer(arg);
        }
    },
    displayTimer : function(){
        trivia.timer();
        $("#timerDiv").text(trivia.currentTime);
        
    },
    count : 0, //Trivia question (array index) tracker.
    correct : 0, //running total of correct answers by user.
    wrong : 0,  //Running total of wrong answers by user.
    interval : 0,
    currentTime : 0,
    timerObj : null,
    intervalObj : null,
    $questionDiv : null, //jQuery reference to DOM element
    $optionsDiv : null //jQuery reference to DOM element


}; // END OF trivia object



$(document).ready(function (){

    //Sets variable value to jQuery element
    trivia.$questionDiv = $("#question");
    trivia.$optionsDiv = $("#options");
    
    trivia.init();

    $("#startBtn").click(function(){
        trivia.startgame();
    });

    trivia.$optionsDiv.on("click", ".myOptions", function(){
        trivia.checkAnswer($(this).attr("data-value"));
         clearTimeout(trivia.timerObj);
    });
});
