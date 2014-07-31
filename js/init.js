/*
	autor:			@khrizenriquez #afro-K
*/
(function () {
	'use strict';
	init: {
		document.getElementById( "btnCalcular" ).addEventListener( "click", function () {
			renderizarRespuesta( document.getElementById( "ingresoDatosLectura" ).value );
		} );
		document.getElementById( "btnArchivo" ).addEventListener( "click", function () {
			desdeArchivo ( document.getElementById( "ingresoDatosLectura" ).value, "data.txt" );
		} );
		var abecedario = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o",
		"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
	}
	/*
		ingreso el texto que deseo leer y este cuenta la cantidad de letras que el texto contenga
	*/
	function cuentaLetras( elemento ) {
		return elemento.length;
	}
	/*
		Ingreso el texto que deseeo leer y este lo que hace es contar la cantidad de palabras y las devuelte todas
	*/
	function cuentaPalabras( elemento ) {
		var espacios = elemento.match( /\s/g );
		var cantidad = espacios ? espacios.length : 0;
		return cantidad;
	}
	/*
		Ingreso el texto que deseeo leer y este cuenta la cantidad de números que el texto contenga
	*/
	function cuentaNumeros( elemento ) {
		var numero = elemento.match( /([0-9])/g );
		var cantidad = numero ? numero.length : 0;
		return cantidad;
	}
	/*
		Ingreso el texto que deseo leer y este cuenta la cantidad de saltos de línea que el texto tenga
	*/
	function saltosLinea ( elemento ) {
		//		Gracias a http://emilio.aesinformatica.com/2008/04/12/contar-numero-de-saltos-de-linea-con-javascript/#ixzz38XoocNGI
		var cantidad = elemento.match( /\n/g );
		var cuenta = cantidad ? cantidad.length : 0;
		return cuenta;
	}
	/*
		Ingreso el texto que deseeo leer y este regresa un objeto JSON con la cantidad de letras que se repinten
		del abecedario
	*/
	function letrasAbc ( elemento, abc ) {
		var patron = new RegExp("[" + abc + "]", "g");
		elemento = elemento.toLowerCase();
		var letras = elemento.match( patron );
		var cantidad = letras ? letras.length : 0;
		return cantidad;
	}
	function colocandoLetras ( textoEnviado ) {
		document.getElementById( "datos" ).innerHTML += "<h3>Letras del abecedario</h3>";
		for( var texto in abecedario ) {
			document.getElementById( "datos" ).innerHTML += "<label>" +
			abecedario[ texto ] + " = " +
			letrasAbc( textoEnviado, abecedario[ texto ] ) + "</label>";
		}
	}
	function imprimiendoNombres ( titulo, cantidad ) {
		document.getElementById( "datos" ).innerHTML += "<h3>" + titulo + "</h3>";

		document.getElementById( "datos" ).innerHTML += "<label>" + cantidad + "</label>";
	}
	/*
		Hace referencia a cuando se ingrese el texto en la misma página
		param:
			elemento: an element
	*/
	function renderizarRespuesta( elemento ) {
		efectoCargar();
		setTimeout( function () {
			document.getElementById( "datos" ).innerHTML = "";
			imprimiendoNombres ( "Letras en total", cuentaLetras( elemento ) );
			imprimiendoNombres ( "Palabras en total", cuentaPalabras( elemento ) );
			imprimiendoNombres ( "Números en total", cuentaNumeros( elemento ) );
			imprimiendoNombres ( "Saltos de líneas", saltosLinea( elemento ) );
			colocandoLetras ( elemento );
		}, 500);
	}
	/*
		Hace referencia a que hay un archivo local y se debe leer
		param:
			elemento: an element
			ruta: String
	*/
	function desdeArchivo ( elemento, ruta ) {
		efectoCargar();
		var xhr = new XMLHttpRequest();
		xhr.open( "GET", ruta, false );
		xhr.onreadystatechange = function () {
			if ( xhr.readyState === 4 ) {
				if ( xhr.status === 200 ) {
					var data = xhr.responseText;
					setTimeout( function () {
						document.getElementById( "datos" ).innerHTML = "";
						imprimiendoNombres( "Letras en total", cuentaLetras( data ) );
						imprimiendoNombres( "Palabras en total", cuentaPalabras( data ) );
						imprimiendoNombres( "Números en total", cuentaNumeros( data ) );
						imprimiendoNombres( "Saltos de línea", saltosLinea( data ) );
						colocandoLetras( data );
						imprimiendoNombres( "Texto original", data );
					}, 500 );
				} else {

				}
			}
		};
		xhr.send();
	}
	function efectoCargar() {
		document.getElementById( "datos" ).innerHTML = "<figure><img src='img/preloaders/cog.GIF' alt='cargando' /></figure>";
	}
	function mostrandoElTexto( texto ) {
	}
})();