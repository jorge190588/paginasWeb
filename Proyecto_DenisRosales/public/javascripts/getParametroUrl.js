var url = getParamUrl('id');
console.log(url);

$('#idJuego').val(url);

function getParamUrl( name ){
	var regexS = "[\\/?&]"+name+"=([^&#]*)";
	var regex = new RegExp ( regexS );
	var tmpURL = window.location.href;
	var results = regex.exec( tmpURL );
	if( results == null )
		return"No se encontro url";
	else
		return results[1];
}