setTimeout(function(){   
	$("#idQuiz").text(Math.round(Math.random()*100))  
},1000);

function getQuiz(){
	var numeroAleatorio = Math.round(Math.random()*100);
	$("#idQuiz").text(numeroAleatorio); 	
	$("#txtNombre").val(numeroAleatorio);
}

$("#getId").click(function(){ 
	getQuiz();
});