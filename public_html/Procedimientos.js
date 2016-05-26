  
function cargar(){

var numeroInteraciones=5;
var rata=0.01;
var errorMaximo=0;
var sum=0;
var y=0;
var errorPatron=[];
var auxErrorLineal=0;
var sumPatrones=0;
var errorLineal= new Array();
var entradasProblema = new Array();
var salidasEsperadas = new Array();

//Primer patron    
    entradasProblema[1] = new Array();
    salidasEsperadas[1] = new Array();
    entradasProblema[1][1]=1;
    entradasProblema[1][2]=0;
    entradasProblema[1][3]=1;
    salidasEsperadas[1][1]=1;
    salidasEsperadas[1][2]=1;
//segunda patron
    entradasProblema[2] = new Array();
    salidasEsperadas[2] = new Array();
    entradasProblema[2][1]=0;
    entradasProblema[2][2]=1;
    entradasProblema[2][3]=0; 
    salidasEsperadas[2][1]=0;
    salidasEsperadas[2][2]=1;    
//Tercera patron
    entradasProblema[3] = new Array();
    salidasEsperadas[3] = new Array();    
    entradasProblema[3][1]=1;
    entradasProblema[3][2]=0;
    entradasProblema[3][3]=1;
    salidasEsperadas[3][1]=1;
    salidasEsperadas[3][2]=0;    
//Cuarto patron
    entradasProblema[4] = new Array();
    salidasEsperadas[4] = new Array();
    entradasProblema[4][1]=1;
    entradasProblema[4][2]=1;
    entradasProblema[4][3]=0;
    salidasEsperadas[4][1]=0;
    salidasEsperadas[4][2]=0;
    
var contenido=document.getElementById("contenido");
var e=document.getElementById("entradas").value;
var s=document.getElementById("salidas").value;



contenido.innerHTML="";
var aux=-1.1;
var valores=[];

var u= new Array();
for(var i=-1;i<20;i++){
    aux+=0.1;
    valores.push(aux.toFixed(1));
}
//console.log(valores);

var w= new Array();
for(var i=1;i<=s;i++){
     w[i]= new Array();
    for(var j=1;j<=e;j++){
        w[i][j]= parseFloat(Math.random() * (1 - (-1)) + (-1));//valores[Math.floor((Math.random() * 20) + 1)];
    }
    u[i]= parseFloat(Math.random() * (1 - (-1)) + (-1));//valores[Math.floor((Math.random() * 20) + 1)];
}



//*****************************************************************************
//                          MOSTRAR                                           *
//*****************************************************************************

 contenido.innerHTML+="<b>Matriz</b><br>";
for(var i=1;i<=s;i++){
    for(var j=1;j<=e;j++){
        contenido.innerHTML+="  "+w[i][j]+" &nbsp;&nbsp;  ";
    }
    contenido.innerHTML+="<br>";  
  } 
 

     contenido.innerHTML+="<b>Umbral</b><br>";
     for(var j=1;j<=s;j++){
        contenido.innerHTML+=" "+u[j]+"&nbsp;&nbsp; ";
    }
      
contenido.innerHTML+="<br><b>Entradas</b><br>";

for(var i=1;i<=4;i++){
    for(var j=1;j<=3;j++){
        contenido.innerHTML+="  "+entradasProblema[i][j]+" &nbsp;&nbsp";
    }
    contenido.innerHTML+="<br>";  
  } 

contenido.innerHTML+="<br><b>Salidas</b><br>";

for(var i=1;i<=4;i++){
    for(var j=1;j<=2;j++){
        contenido.innerHTML+="  "+salidasEsperadas[i][j]+" &nbsp;&nbsp";
    }
    contenido.innerHTML+="<br>";  
  } 
  

  //*****************************************************************************
//                          PROCESO DE ENTRENAMIENTO                          *
//*****************************************************************************
contenido.innerHTML+="<br><b>PROCESO DE ENTRENAMIENTO</b><br><hr>";
for (var q=1; q<=10; q++){
    contenido.innerHTML+="<hr>";
    contenido.innerHTML+="<br><b><h3> INTERACCIÓN"+q+"</h3> </b><br><hr>";
    sumPatrones=0;
    for(var i=1;i<=4;i++){
        auxErrorLineal=0;
        for(var j=1;j<=2;j++){
            sum=0;
            for(var k=1;k<=3;k++){
              sum+=entradasProblema[i][k]*w[j][k];   
            }//fin for para recorrer las entradas y pesos 
            //funcion Escalon
            var sumAux=sum-u[j];
                if(sumAux<=0){
                    y =0; 
                }else{
                    y=1;
                }
            //calculo el error lineal
            contenido.innerHTML+="yr"+j+"="+y+"<br>";
            errorLineal[j]=salidasEsperadas[i][j]-y;
            contenido.innerHTML+="<b>ErLineal"+j+"</b>="+ (salidasEsperadas[i][j]-y) +"<br>";
            var mientras=salidasEsperadas[i][j]-y;
            auxErrorLineal+=Math.abs(mientras);

        }//fin for para el numero de salidas por patron 
        contenido.innerHTML+="<b>ErPatrón"+i+"</b>="+ auxErrorLineal+"/"+ 2 + "=" + (auxErrorLineal/2) +"<br><hr>";
        errorPatron.push(auxErrorLineal/2);
        sumPatrones=sumPatrones+(auxErrorLineal/2);
        

        //cambio la matriz de peso y umbral del para el siguiente patron
            contenido.innerHTML+="<br><b>NUEVA MATRIZ DE PESO</b><br>";
            for(var f=1;f<=s;f++){
                for(var p=1;p<=e;p++){
                    var momentico=parseFloat(w[f][p] + (rata*errorLineal[f]*entradasProblema[i][p]));
                     contenido.innerHTML+="  "+momentico+" &nbsp;&nbsp;  ";
                    w[f][p]=momentico; //valores[Math.floor((Math.random() * 20) + 1)];
                }
                 contenido.innerHTML+="<br>"; 
                 var auxU=parseFloat(u[f]) + (parseFloat(rata)* parseFloat(errorLineal[f]) * 1);
                 u[f]=auxU;//valores[Math.floor((Math.random() * 20) + 1)];
            } 


                 contenido.innerHTML+="<b>Umbral</b><br>";
                 for(var p=1;p<=s;p++){
                    contenido.innerHTML+=" "+u[p]+"&nbsp;&nbsp;<br> ";
                } 

           

      }//fin for para los cuatro patrones 
      
       var promedioPatrones=sumPatrones/4;
       contenido.innerHTML+="<br> promedio de patrones "+ promedioPatrones;
       if(promedioPatrones<=errorMaximo){
         contenido.innerHTML+="<br><b style='color:red' >Se encontro el Error maximo permirido"+promedioPatrones+"<b>";
            break;
       };
}//fin para el for de las interacciones
//console.log(errorPatron);
//console.log(errorLineal[2]);
  

};//Fin Cargar
