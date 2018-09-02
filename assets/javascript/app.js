
var triviaQuestions = [{
	question: "Who is the highest paid Wide Receiver in the NFL?",
	answerList: ["Randy Moss", "Odell Beckham Jr.", "Antonio Brown", "Julio Jones"],
	answer: 1
},{
	question: "Who was the shortest player ever to play in the NBA?",
	answerList: ["Muggsy Bogues", "Damon Stoudamire", "Yao Ming", "Nate Robinson"],
	answer: 0
},{
	question: "Who is the official global ambassador for the Toronto Raptors?",
	answerList: ["The Raptor", "Donald Trump", "Tory Lanez", "Drake"],
	answer: 3
},{
	question: "When was the last time the Toronto Maple Leafs won the stanley cup?",
	answerList: ["2012", "1957", "1998", "1967"],
	answer: 3
},{
	question: "Which of these star soccer players has never played for Real Madrid?",
	answerList: ["Lionel Messi","David Beckham", "Zinedine Zidane", "Christiano Ronaldo"],
	answer: 0
},{
	question: "Which sprinter hold the female record for the fastest time in the 100 meter sprint?",
	answerList: ["Marion Jones", "Florence Griffith-Joyner", "Carmelita Jeter", "Emilly Batty"],
	answer: 1
},{
	question: "	Who was the last Blue Jays player to win the American League's Most Valuable Player Award?",
	answerList: ["Carlos Delgado", "Roberto Alomar", "Josh Donaldson", "Jose Bautista"],
	answer: 2
},{
	question: "Which of these MMA fighters is known as 'The Sandman'?",
	answerList: ["Robbie Lawler ", "Houston Alexander", "Marlon Sandro", "James Irvin"],
	answer: 3
},{
	question: "Which team holds the record for the most points scored in one quarter of a SUper Bowl?",
	answerList: ["New York Giants", "Washington Redskins", "New Orleans Saints", "Buffalo Bills"],
	answer: 1
},{
	question: "Where is the Baseball Hall of Fame and National Museum located??",
	answerList: ["Cooperstown, New York", "Cleveland, Ohio", "Baltimore, Maryland", "Boston, Massachusetts"],
	answer: 0
},

];


var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var correct = "Good Job!";
var	incorrect = "Sorry, that's incorrect!";
var messages = {
	
	endTime: "Looks like you're out of time!",
    finished: "Let's tally up the score.",
    
}




$('.rightWrong').hide()

$('#startBtn').on('click', function(){
    $(this).hide();
	newGame();
});

$('#restartButton').on('click', function(){
	$(this).hide();
	newGame();
});



function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
    $('#correctedAnswer').empty();
    $('.rightWrong').hide()
   

    
    
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
        answerPage();
        
        
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
    $('.question').empty();
    $('.rightWrong').show()

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#right').html(correct);
        $('#right').show();
        $('#wrong').hide();
        $("#timeUp").hide();
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
        $('#wrong').html(incorrect);
        $("#wrong").show();
        $("#right").hide();
        $("#timeUp").hide();
		$('#correctedAnswer').html('The right answer is: ' + rightAnswerText);
	} else{
		unanswered++;
        $('#timeUp').html(messages.endTime);
        $("#wrong").hide();
        $("#right").hide();
        $("#timeUp").show();
		$('#correctedAnswer').html('The right answer is: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){

	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('.rightWrong').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#restartButton').addClass('reset');
	$('#restartButton').show();
	$('#restartButton').html('Start Over?');
}
