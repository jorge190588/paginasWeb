(function(){
    var questions =[{
        question: "cuanto es 2*5?",
        choices: [2,5,10,15],
        correctAnswer: 2
    },
    { 
        question: "cuanto es 3*6?",
        choices: [3,6,9,12],
        correctAnswer: 3
    },
    { 
        question: "cuanto es 8*9?",
        choices: [72,5,10,15],
        correctAnswer: 0
    },
    { 
        question: "cuanto es 1*7?",
        choices: [2,5,10,15,7],
        correctAnswer: 4
    }];

    //alert(questions[0].question);
    var questionCounter = 0; // numero de preguntas
    var selections = [] // array que contiene las opciones del usuario
    var quiz = $('#quiz'); //referencia al contenedor con id quiz en el dom

    //Mostrar la primera pregunta
    displayNext();
    
    
    //Click handler boton next
    $('#next').on('click',function(e){
        e.preventDefault();

        //Suspendido click listener durante fade animation
        if(quiz.is(':animated')){
            return false;
        }

        choose();

        // Si el usuario no selecciona respuesta se detiene
        if(isNaN(selections[questionCounter])){
            alert('Selecciona una respuesta');        
        }
        else{
            questionCounter++;
            displayNext();
        }
    });

    // click handler boton previous
    $('#prev').on('click',function(e){
        e.preventDefault();

        if(quiz.is(':animated')){
            return false;
        }

        choose();
        questionCounter--;
        displayNext();
    });

    //Click handler Start
    $("#start").on('click',function(e){
        e.preventDefault();

        if(quiz.is(':animated')){
            return false;
        }

        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animation de los botones en el hover
    $('.button').on('mouseenter',function(){
        $(this).addClass('active');
    });

    $('.button').on('mouseleave',function(){
        $(this).removeClass('active');
    });

    // Crea y devuelve el div que contiene las preguntas y los radios con respuestas
    function createQuestionElement(index)
    {
        var qElement = $('<div>',{
            id: 'question'
        });

        var header = $('<h2>Pregunta '+(index + 1)+':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    // Crea una lista de las respuestas con radios buttons
    function createRadios(index)
    {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for(var i=0; i<questions[index].choices.length; i++)
        {
            item = $('<li>');
            input = '<input type="radio" name="answer" value='+i+'/>';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // lee la respuesta seleccionada y mete el valor a una matriz
    function choose()
    {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();        
    }

    // funcion para mostrar siguiente
    function displayNext()
    {
        quiz.fadeOut(function(){
            $("#question").remove();
            
            alert(questionCounter);
            
            if(questionCounter < questions.length)
            {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();

                if(!(isNaN(selections[questionCounter])))
                {
                    $("input[value="+selections[questionCounter]+"]").prop('checked',true);
                }

                //controla la visualización del boton previus
                if(questionCounter === 1){
                    $("#prev").show();
                }
                else if(questionCounter === 0){
                    $("#prev").hide();
                    $("#next").show();
                }
                else{
                    var scoreElem = displayScore();
                    quiz.append(scoreElem).fadeIn();
                    $("#next").hide();
                    $("#prev").hide();
                    $("#start").show();
                }
            }            
        });
    }

    function displayScore()
    {
        var score = $("<p>",{id: 'question'});

        var numCorrect = 0;
        for(var i=0; i<selections.length; i++)
        {
            if(selections[i] === questions[i].correctAnswer){
                numCorrect++;
            }
        }

        score.append("Tienes "+numCorrect+" preguntas correctas de "+questions.length);
        return score;
    }
})();

