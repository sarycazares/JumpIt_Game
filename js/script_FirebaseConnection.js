
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { getDatabase, ref, set, onValue, child, get} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDM1Sc5H1INPIhbuY8LMZ7FgBTXPEQYQz4",
    authDomain: "jumpit-game.firebaseapp.com",
    projectId: "jumpit-game",
    storageBucket: "jumpit-game.appspot.com",
    messagingSenderId: "433536604968",
    appId: "1:433536604968:web:5da3d858ca7cf2c533ce1d",
    measurementId: "G-RG4S0EQXDE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const database = getDatabase();

// Crear Usuarios

var RegistroUsuario=document.getElementById('RegistroUsuario');

RegistroUsuario.addEventListener('submit',e=>{

    e.preventDefault();

    var email=document.getElementById('correo').value;
    var password=document.getElementById('contraseña').value;
    
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    InsertarDatosUsuario(user.uid);

    RegistroUsuario.reset();
    $('#staticBackdrop2').modal('hide');
    alert("Usuario Registrado Con Éxito c:");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("ERROR: Lo Sentimos Favor De Volver A Intentarlo :c");
    // ..
  });
    
    });


    function InsertarDatosUsuario(userID){

    var email=document.getElementById('correo').value;
    var userName=document.getElementById('usuario').value;

        set(ref(database, 'users/' + userID), {
            Id: userID,
            Usuario:userName,
            Correo:email
        });
    }



// Iniciar Sesion Usuario

var IniciarSesionUsuario=document.getElementById('IniciarSesionUsuario');

IniciarSesionUsuario.addEventListener('submit',e=>{

    e.preventDefault();
   
    var email=document.getElementById('usuarioIniciarSesion').value;
    var password=document.getElementById('contraseñaIniciarSesion').value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    var referencia = ref(database, 'users/' + user.uid);
onValue(referencia, (snapshot) => {
  const data = snapshot.val();
  window.location.href = "Pagina_Principal.php?usuarioInicioSesion="+ data.Id;
});
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("ERROR: Lo Sentimos Favor De Volver A Intentarlo :c");
    IniciarSesionUsuario.reset();
  });

});


onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });





