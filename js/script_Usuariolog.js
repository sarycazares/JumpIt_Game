
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, child, get} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

 const firebaseConfig = {
    apiKey: "AIzaSyDM1Sc5H1INPIhbuY8LMZ7FgBTXPEQYQz4",
    authDomain: "jumpit-game.firebaseapp.com",
    projectId: "jumpit-game",
    storageBucket: "jumpit-game.appspot.com",
    messagingSenderId: "433536604968",
    appId: "1:433536604968:web:5da3d858ca7cf2c533ce1d",
    measurementId: "G-RG4S0EQXDE"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase();


  //////////////////////////////////////////////////////////////////

function obtener_valor(variable) { 


    var remplaza = /\+/gi;
    var url = window.location.href;

    url = unescape(url);
    url = url.replace(remplaza, " ");
    //url = url.toUpperCase();

    //var variable_may = variable.toUpperCase();
    var variable_pos = url.indexOf(variable);

    if (variable_pos != -1)
    {
    var pos_separador = url.indexOf("&", variable_pos);
    
    if (pos_separador != -1)
    {
    return url.substring(variable_pos + variable.length + 1, pos_separador);
    } else
    {
    return url.substring(variable_pos + variable.length + 1, url.length);
    }
    } else
    {
    return "NO_ENCONTRADO";
    }
    }


window.addEventListener('load',e=>{

 
var nombreUsuarioHeader=document.getElementById('nombreUsuarioHeader');
var usuarioInicioSesion = "usuarioInicioSesion"
var userID = obtener_valor(usuarioInicioSesion);
var UserIdLog = document.getElementById('UserIdLog');
UserIdLog.value = userID;

var referencia = ref(database, 'users/' + userID);
onValue(referencia, (snapshot) => {
  const data = snapshot.val();
  nombreUsuarioHeader.textContent = data.Usuario;
});

  
  });

  ////////////////////

  // Cerrar Sesion


  var CerrarSesion=document.getElementById('btnCerrarSesión');

  CerrarSesion.addEventListener("click",e=>{
  signOut(auth)
.then(function(){
     console.log("Se Cerro Sesión Exitosamente c:");
     window.location.href = "index.php";
})
.catch(function(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    lert("ERROR: Lo Sentimos Favor De Volver A Intentarlo :c");
});

});