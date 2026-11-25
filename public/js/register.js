const form = document.getElementById("registerForm");

form.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch("/register", {

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

    alert(data.mensaje);

    if(data.success){

        window.location.href = "index.html";

    }

});
