//Randomiza el juego.
function Random(array)
{
	var length = array.length; 
	var aux;
	var randomPos;

	for(var i=0;i<length;i++)
	{
		aux = array[i]; 
		randomPos = Math.floor(Math.random() * length);
		array[i] = array[randomPos]; 
		array[randomPos] = aux; 
	}
	return array; 
}

function drawButtons()
{
	/*$("body").append('<div><button type="button" id="reiniciar" class="reiniciar">Reiniciar</button><button type="button" id="regresar" class="reiniciar">Regresar</button></div>');*/
	$("#bloque").append('<div id="movBot"><input id="reiniciar" class="reiniciar" type="button" value="Reiniciar" /><div id="talking_boxm" class="texto2">Movimientos<br>0</div></div>');
	$("#bloque").append('<div id="movBot" class="cronometro"><div id="hms"></div></div>');
}

//Dibuja las piezas
var Piece = function(value,rigthPosX,rigthPosY,posX,posY,rigthPosX2,rigthPosY2)
{
	this.value = value; 
	this.isRigthPosition = false; 
	this.isRigthPosition2 = false; 
	this.posX = posX; 
	this.posY = posY; 
	this.rigthPosX = rigthPosX; 
	this.rigthPosY = rigthPosY; 
	this.rigthPosX2 = rigthPosX2; 
	this.rigthPosY2 = rigthPosY2; 
}

//Inicializa el juego.
var Game = function()
{
	this.isWrongCount = 0; 
	this.isWrongCount2 = 0; 
	this.piecesArray = new Array();
	this.contador = 0;  

	this.restart = function(){
		this.isWrongCount = 0; 
		this.isWrongCount2 = 0; 
		this.piecesArray = new Array(); 
		this.contador = 0;  

		document.getElementById("talking_box").remove();
		$("#textos").append('<p id="talking_box" class="texto1">¡Bienvenido!<br>' + localStorage.getItem("name") + '</p>');
		document.getElementById("talking_boxm").innerHTML = "Movimientos<br>0";
		/*$("#textos").append('<p id="talking_box" class="texto2">¡Empieza el Juego!</p>');*/
	}
	this.initializeGame = function()
	{
		var randomArray = new Array(); 
		
		if(localStorage.getItem("tamTablero") == "3x3"){
			for(var i=0;i<8;i++)
				randomArray[i] = i+1;
			do
			{
				randomArray = Random(randomArray); 
			}
			while(!this.isSolvable(randomArray));
			
			for(var i=0;i<8;i++)
			{
				if((3-(i%3)-1) != 0){
					/*console.log(4-Math.floor(i/3+1));
					console.log(3-(i%3)-1);*/
					this.piecesArray[i] = new Piece(i+1,Math.floor(i/3+1),(i%3)+1,Math.floor((randomArray[i]-1)/3)+1,((randomArray[i]-1)%3)+1,4-Math.floor(i/3+1),3-(i%3)-1);
				}else{
					this.piecesArray[i] = new Piece(i+1,Math.floor(i/3+1),(i%3)+1,Math.floor((randomArray[i]-1)/3)+1,((randomArray[i]-1)%3)+1,4-Math.floor(i/2+1), 3);
					/*console.log(4-Math.floor(i/2+1));
					console.log(3);*/
				}
				

				if((this.piecesArray[i].posX != this.piecesArray[i].rigthPosX) || (this.piecesArray[i].posY != this.piecesArray[i].rigthPosY))
					this.isWrongCount++;
				else
					this.piecesArray[i].isRigthPosition = true; 

				if((this.piecesArray[i].posX != this.piecesArray[i].rigthPosX2) || (this.piecesArray[i].posY != this.piecesArray[i].rigthPosY2))
					this.isWrongCount2++;
				else
					this.piecesArray[i].isRigthPosition2 = true; 
			}
			this.piecesArray[8] = new Piece(9,3,3,3,3,3,3); 
		} else {
			for(var i=0;i<15;i++)
				randomArray[i] = i+1;
			do
			{
				randomArray = Random(randomArray); 
			}
			while(!this.isSolvable(randomArray));
			
			for(var i=0;i<15;i++)
			{
				if((4-(i%4)-1) != 0){
					this.piecesArray[i] = new Piece(i+1,Math.floor(i/4+1),(i%4)+1,Math.floor((randomArray[i]-1)/4)+1,((randomArray[i]-1)%4)+1,5-Math.floor(i/4+1),4-(i%4)-1);
				}else{
					this.piecesArray[i] = new Piece(i+1,Math.floor(i/4+1),(i%4)+1,Math.floor((randomArray[i]-1)/4)+1,((randomArray[i]-1)%4)+1,5-Math.floor(i/3+1), 4);
				}
				

				if((this.piecesArray[i].posX != this.piecesArray[i].rigthPosX) || (this.piecesArray[i].posY != this.piecesArray[i].rigthPosY))
					this.isWrongCount++;
				else
					this.piecesArray[i].isRigthPosition = true; 

				if((this.piecesArray[i].posX != this.piecesArray[i].rigthPosX2) || (this.piecesArray[i].posY != this.piecesArray[i].rigthPosY2))
					this.isWrongCount2++;
				else
					this.piecesArray[i].isRigthPosition2 = true; 
			}
			this.piecesArray[15] = new Piece(16,4,4,4,4,4,4); 
		}	
	}
	//Verifica que el juego es resolvible
	this.isSolvable = function(random_array)
	{
		var control_sum = 0; 

		var control_array = new Array();  
		var test_array = new Array();
		var length = random_array.length; 
		for(var i=0;i<length;i++) 
			test_array[random_array[i]-1] = i+1;
		for(var i=0;i<length;i++)
			control_array[i] = 0;
		for(var i=0;i<length;i++)
		{
			for(var j=i+1;j<length;j++)
			{
				if(test_array[j]<test_array[i])
					control_array[i]++;
			}
			control_sum += control_array[i]; 
		}	
		
		if(localStorage.getItem("tamTablero") == "4x4" && control_sum % 2 == 1
			&& localStorage.getItem("mode") == "descendente")
			return true;
		else if(control_sum % 2 == 0 && ((localStorage.getItem("tamTablero") == "4x4"
			&& localStorage.getItem("mode") == "ascendente") || 
			localStorage.getItem("tamTablero") == "3x3"))
			return true;
		else
			return false;
	}
	//inicializa el tablero en el html
	this.drawBoard = function()
	{
		$("#bloque").append('<section id="game_board" class="game_board"><section id="piece_container"></section></section>');

		if(localStorage.getItem("tamTablero") == "3x3"){
			for(var i=0;i<8;i++)
				$("#piece_container").append('<div class="game_piece" id="game_piece" style="top:'+((this.piecesArray[i].posX-1)*33)+'%;left:'+((this.piecesArray[i].posY-1)*33)+'%"><div class="number_container" id="piece'+i+'">'+this.piecesArray[i].value+'</div></div>');		
		} else {
			for(var i=0;i<15;i++)
				$("#piece_container").append('<div class="game_piece" id="game_piece_4x4" style="top:'+((this.piecesArray[i].posX-1)*25)+'%;left:'+((this.piecesArray[i].posY-1)*25)+'%"><div class="number_container_4x4" id="piece'+i+'">'+this.piecesArray[i].value+'</div></div>');			
		}
	}
	//inicializa el tablero en el html
	this.redrawBoard = function()
	{
		$("#game_board").append('<section id="piece_container"></section>');

		if(localStorage.getItem("tamTablero") == "3x3"){
			for(var i=0;i<8;i++)
				$("#piece_container").append('<div class="game_piece" id="game_piece" style="top:'+((this.piecesArray[i].posX-1)*33)+'%;left:'+((this.piecesArray[i].posY-1)*33)+'%"><div class="number_container" id="piece'+i+'">'+this.piecesArray[i].value+'</div></div>');		
		} else {
			for(var i=0;i<15;i++)
				$("#piece_container").append('<div class="game_piece" id="game_piece_4x4" style="top:'+((this.piecesArray[i].posX-1)*25)+'%;left:'+((this.piecesArray[i].posY-1)*25)+'%"><div class="number_container_4x4" id="piece'+i+'">'+this.piecesArray[i].value+'</div></div>');			
		}	
	}
	//Verifica la posición de las piezas.
	this.checkPosition = function(piece)
	{
		if((piece.posX == piece.rigthPosX) && (piece.posY == piece.rigthPosY)) 
		{
			piece.isRigthPosition = true; 
			this.isWrongCount--;
		}
		else
		{
			if(piece.isRigthPosition) 
			{
				piece.isRigthPosition = false;
				this.isWrongCount++;
			}
		}

		if((piece.posX == piece.rigthPosX2) && (piece.posY == piece.rigthPosY2)) 
		{
			piece.isRigthPosition2 = true; 
			this.isWrongCount2--;
		}
		else
		{
			if(piece.isRigthPosition2) 
			{
				piece.isRigthPosition2 = false;
				this.isWrongCount2++;
			}
		}
	}

	//Función para mover una pieza
	this.movePiece = function(piece_number)
	{
		if(localStorage.getItem("tamTablero") == "3x3"){
			var test_posX = this.piecesArray[piece_number-1].posX - this.piecesArray[8].posX;
			var test_posY = this.piecesArray[piece_number-1].posY - this.piecesArray[8].posY;
			var wasMoved = false;
			if(Math.abs(test_posX) + Math.abs(test_posY) == 1)
			{
				var auxX = this.piecesArray[piece_number-1].posX;
				var auxY = this.piecesArray[piece_number-1].posY;
				this.piecesArray[piece_number-1].posX = this.piecesArray[8].posX; 
				this.piecesArray[piece_number-1].posY = this.piecesArray[8].posY;
				this.piecesArray[8].posX = auxX;
				this.piecesArray[8].posY = auxY;
				this.checkPosition(this.piecesArray[piece_number-1]);
				wasMoved = true;
			}
		} else {
			var test_posX = this.piecesArray[piece_number-1].posX - this.piecesArray[15].posX;
			var test_posY = this.piecesArray[piece_number-1].posY - this.piecesArray[15].posY;
			var wasMoved = false;
			if(Math.abs(test_posX) + Math.abs(test_posY) == 1)
			{
				var auxX = this.piecesArray[piece_number-1].posX;
				var auxY = this.piecesArray[piece_number-1].posY;
				this.piecesArray[piece_number-1].posX = this.piecesArray[15].posX; 
				this.piecesArray[piece_number-1].posY = this.piecesArray[15].posY;
				this.piecesArray[15].posX = auxX;
				this.piecesArray[15].posY = auxY;
				this.checkPosition(this.piecesArray[piece_number-1]);
				wasMoved = true;
			}
		}

		return wasMoved;
	}
	//Verifica si el juego se resolvio correctamente
	this.checkGame = function()
	{
		if(this.isWrongCount == 0 && localStorage.getItem("mode") == "ascendente") 
			return true; 
		else if(this.isWrongCount2 == 0 && localStorage.getItem("mode") == "descendente") 
			return true; 
		else
			return false;
	}

	this.conteo = function()
	{
		this.contador++;
		return this.contador;
	}
}

function init(){
    h = 0;
    m = 0;
    s = 0;
    document.getElementById("hms").innerHTML="00:00:00";
}     

function cronometrar(){
    escribir();
    id = setInterval(escribir,1000);
}

function escribir(){
    var hAux, mAux, sAux;
    s++;
    if (s>59){m++;s=0;}
    if (m>59){h++;m=0;}
    if (h>24){h=0;}

    if (s<10){sAux="0"+s;}else{sAux=s;}
    if (m<10){mAux="0"+m;}else{mAux=m;}
    if (h<10){hAux="0"+h;}else{hAux=h;}

    document.getElementById("hms").innerHTML = hAux + ":" + mAux + ":" + sAux; 
}

function parar(){
    clearInterval(id);
}

function reini(){
    clearInterval(id);
    document.getElementById("hms").innerHTML="00:00:00";
    h=0;m=0;s=0;
}

function guardarBD(contador){
	var name = localStorage.getItem("name");
	var tab = localStorage.getItem("tamTablero");
	var modo = localStorage.getItem("mode");
	var mov = contador;
	var tiempo = document.getElementById("hms").innerHTML;
	var db = openDatabase('puzzleDB', '1.0', 'Puzzle database', 2 * 1024 * 1024);

	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS jugadores(id integer, user text, modo text, tablero text, mov integer, tiempo text)');
	});
	
		console.log("insertando elemento")
		db.transaction(function (tx) {
			tx.executeSql('SELECT MAX(id) FROM jugadores', [],
				function callback(tx, results) {
					arreglo = Object.values(results.rows.item(0));

					if((arreglo[0] + 1) <= 10){
						db.transaction(function (tx) {
							tx.executeSql('INSERT INTO jugadores VALUES(?, ?, ?, ?, ?, ?)',
										[arreglo[0] + 1, name, modo, tab, mov, tiempo]);
						}, function (err) {
							alert(err.message);
						});
					} else {
						db.transaction(function (tx) {
							tx.executeSql('SELECT MAX(mov) FROM jugadores', [],
								function callback(tx, results) {
									arreglo2 = Object.values(results.rows.item(0));
				
									db.transaction(function(t) {
										t.executeSql("UPDATE jugadores SET user = ?, modo = ?,"+
											"tablero = ?, mov = ?, tiempo = ? WHERE mov = ? AND id = (SELECT id FROM jugadores WHERE mov = ? ORDER BY id LIMIT 1) ",
											[name, modo, tab, mov, tiempo, arreglo2[0], arreglo2[0]]);
									});
								});
						});		
					}

				});
		});
}

//Inicia el juego
$(document).ready(function(){
	var game = new Game();
	game.initializeGame();
	game.drawBoard();

	$(".game_piece").click(function(){	
		var piece_number = $(this).children().text();	
		if(game.movePiece(piece_number)){
			if(localStorage.getItem("tamTablero") == "3x3"){
				$(this).animate({'top':((game.piecesArray[piece_number-1].posX-1)*33)+'%','left':((game.piecesArray[piece_number-1].posY-1)*33)+'%'},200);
			}else{
				$(this).animate({'top':((game.piecesArray[piece_number-1].posX-1)*25)+'%','left':((game.piecesArray[piece_number-1].posY-1)*25)+'%'},200);	
			}
			
			document.getElementById("talking_box").innerHTML = "¡Bienvenido!<br>" +  localStorage.getItem("name");
			document.getElementById("talking_boxm").innerHTML = "Movimientos<br>" + game.conteo();
		} 
		
		if(game.checkGame()){
			guardarBD(game.contador);

			document.getElementById("talking_box").innerHTML = "¡Puzzle Completado!";
			
			parar();

			document.getElementById("piece_container").remove();
			$("#game_board").append('<img src="cat.gif" alt="dancing cats" id="cats" />');
		}
	});	

	drawButtons();
	init();
	cronometrar();
	//guardarBD(game.contador);

	$("#reiniciar").click(function(){	
		try{
			document.getElementById("cats").remove();
		} catch(x){}
		try{
			document.getElementById("piece_container").remove();
		} catch(x){}

		game.restart();
		game.initializeGame();
		game.redrawBoard();

		reini();
		cronometrar();

		$(".game_piece").click(function(){	
			var piece_number = $(this).children().text();	
		if(game.movePiece(piece_number)){
			if(localStorage.getItem("tamTablero") == "3x3"){
				$(this).animate({'top':((game.piecesArray[piece_number-1].posX-1)*33)+'%','left':((game.piecesArray[piece_number-1].posY-1)*33)+'%'},200);
			}else{
				$(this).animate({'top':((game.piecesArray[piece_number-1].posX-1)*25)+'%','left':((game.piecesArray[piece_number-1].posY-1)*25)+'%'},200);	
			}
			
			document.getElementById("talking_box").innerHTML = "¡Bienvenido!<br>" +  localStorage.getItem("name");
			document.getElementById("talking_boxm").innerHTML = "Movimientos<br>" + game.conteo();
		} 
		
		if(game.checkGame()){
			guardarBD(game.contador);

			document.getElementById("talking_box").innerHTML = "¡Puzzle Completado!";
			
			parar();

			document.getElementById("piece_container").remove();
			$("#game_board").append('<img src="cat.gif" alt="dancing cats" id="cats" />');
		}
		});	
	});	

	$("#regresar").click(function(){	
		location.href ="index.html";
	});	
});
