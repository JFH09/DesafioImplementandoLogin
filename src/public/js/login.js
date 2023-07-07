let currentURL = window.location.href;
let btnIniciarSesion = document.getElementById("iniciarSesionbtn");
let btnRegistrarme = document.getElementById("Registrarme");

btnIniciarSesion.addEventListener("click", async (event) => {
  event.preventDefault();

  let email = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;
  console.log(currentURL);

  let obj = {
    email: email,
    password: password,
  };
  console.log("usuario que intenta iniciar sesion : ", obj);
  if (currentURL[1] != "") {
    currentURL = currentURL.split("/login");
  }

  const response = await fetch(currentURL[0] + "/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  if (responseData.status === "success") {
    Swal.fire("Inicio Sesion con exito!!!", "", "success");
    window.location.replace("/api/products");
  } else {
    Swal.fire("No se pudo Iniciar Sesion !", "", "info");
  }
});

btnRegistrarme.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("/register");
});
