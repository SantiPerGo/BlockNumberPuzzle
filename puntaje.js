
function verTabla(){
	var db = openDatabase('puzzleDB', '1.0', 'Puzzle database', 2 * 1024 * 1024);

    //db.transaction(function(tx) {
	//	tx.executeSql("drop table jugadores");
	//});

	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM jugadores ORDER BY id DESC", [],
		function(tx, results) {
            document.getElementById("bloque").remove();
                $("body").append(
                    '<div id="bloque"><div id="contenedorTituloPuntuacion">' + 
                    '<form action="index.html"><input type="image" src="img/Atras_.png" id="regresar"/>' +
                    '</form><div id="talking_box" class="texto1">Tabla de Puntajes</div></div>' +
                    '<table id="tablaPuntuacion"><tr id="filas" class="tituloTabla">' +
                    '<th>No</th><th>NickName</th><th>Modo</th><th>Tablero</th><th>Movimientos</th><th>Tiempo</th>' +
                    '</tr><tr id="filas" class="fila0"></tr><tr id="filas" class="fila1"></tr><tr id="filas" class="fila2"></tr>' +
                    '<tr id="filas" class="fila3"></tr><tr id="filas" class="fila4"></tr><tr id="filas" class="fila5"></tr>' +
                    '<tr id="filas" class="fila6"></tr><tr id="filas" class="fila7"></tr><tr id="filas" class="fila8"></tr>' +
                    '<tr id="filas" class="fila9"></tr></table></div>');
            
                var len = results.rows.length;

                for (var i = 0; i < len; i++) {

                    $(".fila" + i).append(
                        '<th>'+results.rows.item(len-i-1).id+'</th>' +
                        '<th>'+results.rows.item(len-i-1).user+'</th>' +
                        '<th>'+results.rows.item(len-i-1).modo+'</th>' +
                        '<th>'+results.rows.item(len-i-1).tablero+'</th>' +
                        '<th>'+results.rows.item(len-i-1).mov+'</th>' +
                        '<th>'+results.rows.item(len-i-1).tiempo+'</th>')

                    console.log(results.rows.item(len-i-1).id);
                    console.log(results.rows.item(len-i-1).user);
                    console.log(results.rows.item(len-i-1).modo);
                    console.log(results.rows.item(len-i-1).tablero);
                    console.log(results.rows.item(len-i-1).mov);
                    console.log(results.rows.item(len-i-1).tiempo);
                }
		});
	});
}

$(document).ready(function(){
    $("body").append(
        '<div id="bloque"><div id="contenedorTituloPuntuacion">' + 
        '<form action="index.html"><input type="image" src="img/Atras_.png" id="regresar"/>' +
        '</form><div id="talking_box" class="texto1">No hay puntajes por mostrar</div></div>');
    verTabla();
});

