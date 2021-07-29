const d = document;
const $inputs = d.querySelectorAll(".form__input[required]"),
  $form = d.querySelector(".form"),
  $name = d.querySelector(".name__container"),
  $email = d.querySelector(".email__container");
/********************   validacion de contenido de inputs *********************** */
const formValidations = e => {
  e.preventDefault();
  if (e.target.matches(".form__input[required]")) {
    let input = e.target,
      pattern = input.pattern || input.dataset.pattern;
    if (pattern && input.value !== "") {
      let regex = new RegExp(pattern);

      if (!regex.exec(input.value)) {
        $name.classList.add("error");
        $email.classList.add("error");
      } else {
        $name.classList.remove("error");
        $email.classList.remove("error");
      }
    }
  }
};
/************************    funcion de mensaje de error     ****************************/
const $resContainer = d.querySelector(".response-container");
const responseError = data => {
  const resError = d.createElement("p");
  const message =
    data.statusText || "Ha ocurrido un error, por favor intentelo más tarde";
  resError.textContent = message;
  $resContainer.appendChild(resError);
};
/************************    funcion de mensaje de exito     ****************************/
const responseSuccessfully = data => {
  const successfully = d.createElement("p");
  const message = data.message || "Los datos se han enviado correctamente";
  successfully.textContent = message;
  $resContainer.appendChild(successfully);
};
/************************    funcion para enviar los datos al correo     ****************************/
const $loader = d.querySelector(".img-loader");
const formSubmit = e => {
  e.preventDefault();
  $loader.classList.add("visible");
  fetch("https://formsubmit.co/ajax/rafasanche7@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then(res => (res.ok ? res.json() : Promise.reject(res)))
    .catch(error => responseError(error))
    .then(data => {
      $loader.classList.remove("visible");
      responseSuccessfully(data);
    });
  setTimeout(() => {
    $resContainer.classList.add("none");
    $form.reset();
  }, 4000);
};

d.addEventListener("keyup", formValidations);
d.addEventListener("submit", formSubmit);
