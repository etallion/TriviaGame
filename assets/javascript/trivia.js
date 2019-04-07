




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
             tag : "promixa%20centauri"
             },
             {question : "What has a gravitational pull so strong that even light cannot escape it?",
             ansOptions : ["Jupiter", "Dark Matter", "A Worm Hole", "A Black Hole"],
             correct : 3,
             tag : "black%20hole"
             },
             {question : "Which NASA space flight was the last manned mission to the moon?",
             ansOptions : ["Falcon Heavy", "Apollo 2", "Apollo 17", "Sputnik 1"],
             correct : 2,
             tag : "apollo%20moon"
             },
             {question : "How many moons are in our Solar System?",
             ansOptions : ["1", "9", "181", "over 1200"],
             correct : 2,
             tag : "moons"
             },
             {question : "What is the most common type of star found in the Milky Way?",
             ansOptions : ["Red dwarf stars", "sunials", "White dwarf stars", "twinkle stars"],
             correct : 0,
             tag : "black%20hole"
             },
             {question : "What is the most common type of star found in the Milky Way?",
             ansOptions : ["Red dwarf stars", "sunials", "White dwarf stars", "twinkle stars"],
             correct : 0,
             tag : "black%20hole"
             }, {question : "What is the most common type of star found in the Milky Way?",
             ansOptions : ["Red dwarf stars", "sunials", "White dwarf stars", "twinkle stars"],
             correct : 0,
             tag : "black%20hole"
             }],
    init : function (){
        trivia.timer = clearTimeout;
        trivia.optionsDiv.html('<button type="button" id="startBtn" class="btn btn-lg"> Start Game</button>');
        console.log("init");
    },
    startgame : function (){
        console.log("starting game now");
        $("#startBtn").addClass("hidden");
       trivia.questionDiv.empty();
       trivia.questionDiv.html("<h2>" + (trivia.count+1) + ". " + trivia.main[trivia.count].question);

       trivia.optionsDiv.empty();
       for(var i = 0; i < 4; i++){
        trivia.optionsDiv.append('<div class="myOptions opt' + i + '" data-value="' + i + '">' + trivia.main[trivia.count].ansOptions[i] + "</div>");
       }
       

    },
    nextQuestion : function (){
        trivia.count++;
        if(trivia.count < trivia.main.length){
            trivia.questionDiv.empty();
            trivia.questionDiv.html("<h2>" + (trivia.count+1) + ". " + trivia.main[trivia.count].question);
    
            trivia.optionsDiv.empty();
            for(var i = 0; i < 4; i++){
            trivia.optionsDiv.append('<div class="myOptions opt' + i + '" data-value="' + i + '">' + trivia.main[trivia.count].ansOptions[i] + '</div>');
        }
        }else{
            trivia.displayResult();
        }

    },
    count : 0,
    correct : 0,
    wrong : 0,
    checkAnswer : function (event) {
        //start timer 
        trivia.timer = setTimeout(trivia.nextQuestion, 5000);

        //hide incorrect options
        for(var i =0; i< 4; i++){
            console.log("looping");
            if(trivia.main[trivia.count].correct !== i){
                console.log('foud');
                var $temp = $('.opt' + i +'');
                $temp.addClass("hidden");
            }
        }


        if(parseInt(event) === trivia.main[trivia.count].correct){
            
            // correct answer
            console.log("correct"+ parseInt(event));
            var $temp = $('.opt' + parseInt(event) +'');
            $temp.addClass("correct");
            } else {
            //wrong answer
            console.log("false"+ parseInt(event));
            var $temp = $('.opt' + trivia.main[trivia.count].correct+'');
            $temp.addClass("wrong");
            }

             //create and declare query address for a randon gif with api key
      var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=rKTyieWDSyjDNPV9Hq5OSZY33AYum5o9&tag=" + trivia.main[trivia.count].tag;
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
          trivia.optionsDiv.append(image);
        });
        

    },
    displayResult : function () {

    },
    interval : null,
    timer : null,
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

    trivia.optionsDiv.on("click", ".myOptions", function(){
        trivia.checkAnswer($(this).attr("data-value"));
        trivia.timer = clearTimeout;
    });
});
