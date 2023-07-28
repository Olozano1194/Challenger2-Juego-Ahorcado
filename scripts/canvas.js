
//desde aca comienza el metodo canvas, creación del canvas

function dibujeCanvas(){ //esta funcion es para crear los guiones
    tablero.lineWidth= 8; //para poner la largura de nuestra linea, la base de la estructura del ahorcado
    tablero.lineCap= "round";
    tablero.lineJoin= "round";
    tablero.fillStyle= "#F3F5F6";
    tablero.strokeStyle= "#8A3871";

    //esta es para la base
    tablero.fillRect(0,0,1200,800);
    tablero.beginPath();
    tablero.moveTo(440, 400);//esto es para el tamaño del la estructura
    tablero.lineTo(760, 400);
    
    
    //este es para columna
    tablero.moveTo(550, 50);
    tablero.lineTo(550, 400);

    //este es para la viga  
    tablero.moveTo(700, 50);
    tablero.lineTo(550, 50);

    //este es para la columna más pequeña
    tablero.moveTo(700, 50);
    tablero.lineTo(700, 100);
    tablero.stroke();
    tablero.closePath();
}

function dibujarLinea(){ //esta funcion la usamos para colocar los guiones correspondientes
    tablero.LineWidth= 6;
    tablero.lineCap= "round";
    tablero.fillStyle= "#F3F5F6";
    tablero.strokeStyle= "#8A3871";

    var anchura = 600/palabraSecreta.length;
    for(var i=0; i < palabraSecreta.length; i++){
        tablero.moveTo(300 + (anchura * i), 530);
        tablero.lineTo(350 + (anchura * i), 530);
    }
    tablero.stroke();
    tablero.closePath();
}

//esta funcion nos ayuda a mostrar las letras correctas
function dibujarLetra(letra){
    
    tablero.font= "bold 53px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap= "round";
    tablero.lineJoin= "round";
    tablero.fillStyle = "#2A3871";
    
    var anchura=600/palabraSecreta.length;

  // for(var i=0;i<palabraSecreta.length;i++){

    //   if(palabraSecreta[i]==letra){

        //    tablero.fillText(letra, 510 + (anchura*i), 630);
    		tablero.fillText(palabraSecreta[letra],308 + (anchura*letra),520);
    //    }
       
        
  // }
  //  tablero.stroke();
  //  tablero.closePath();
}

//esta funcion va a servir para mostrar las letras incorrectas
function dibujarLetraIncorrecta(letra, errorsLeft){

    tablero.font= "bold 40px Inter";
    tablero.lineWidth = 6;
    tablero.lineCap= "round";
    tablero.lineJoin= "round";
    tablero.fillStyle = "#2A3871";

    //var anchura=600/palabraSecreta.length;

   // for(var i=0;i<palabraSecreta.length;i++){

      //  if(palabraSecreta[i]==letra){
             tablero.fillText(letra, 150 + (40 * (10 - errorsLeft)), 590, 40);
    		//tablero.fillText(letra,510 + (anchura*i), 630);
      //  }
   // }
  //  tablero.stroke();
  //  tablero.closePath();
} 

function dibujarVidaHorca(contador){

    tablero.strokeStyle = "#8A3871" ;
    switch(contador){

        case 1: //cabeza
            tablero.lineWidth = 4;
            tablero.beginPath();
            tablero.arc(700,130,25,0,Math.PI*2);
            break;  
        case 2://cuerpo
            tablero.lineWidth = 4;
            tablero.moveTo(700, 155);
            tablero.lineTo(700,300);
            break;
        case 3://brazo derecha
            tablero.lineWidth = 4;
            tablero.moveTo(700, 180);
            tablero.lineTo(740,240);
            break; 
        case 4://brazo izquierda
            tablero.lineWidth = 4;
            tablero.moveTo(700, 180);
            tablero.lineTo(660,240);
            break;  
        case 5://pierna derecha
            tablero.lineWidth = 4;
            tablero.moveTo(700,300);
            tablero.lineTo(740,340);
            break;
        case 6: //pierna izquierda
            tablero.lineWidth = 4;
            tablero.moveTo(700,300);
            tablero.lineTo(660,340);
            break;                    
    }
    tablero.stroke();
    tablero.closePath();
}


