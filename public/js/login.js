const form = document.getElementById("loginForm");

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch("/login", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    });

    const data = await respuesta.json();

    if(data.success){

        window.location.href = "home.html";

    }else{

        alert(data.mensaje);

    }

});
