var datos = {};

function getQuiz(){
	var numeroAleatorio = Math.round(Math.random()*100);
	$("#idQuiz").text(numeroAleatorio); 	
	$("#txtNombre").val(numeroAleatorio);
}

function insertarParrafo(){
	var nuevoParrafo = $("#txtParrafo").val();
	var titulo = $("#txtTitulo").val();
	datos.parrafos.push({"titulo": titulo, "parrafo":parrafo});
}

function mostrarParrafos(){
	datos.parrafos.forEach(function(index,val){
		console.log("index",val);
	})
}

function main(){
	//DATOS INICIALES
	datos.parrafos = {};

	// EVENTOS
	
	$("#btnGuardar").click(function(){ 
		insertarParrafo();
	});

	//LOGICA INICIAL.
	setTimeout(function(){   
		$("#idQuiz").text(Math.round(Math.random()*100))  
	},1000);

};

main();
