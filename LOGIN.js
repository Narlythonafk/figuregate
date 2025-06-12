const USUARIO_PADRAO = "admin";
const SENHA_PADRAO = "1234";

const form = document.getElementById("loginForm");
const erroMsg = document.getElementById("erro");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (usuario === USUARIO_PADRAO && senha === SENHA_PADRAO) {
    localStorage.setItem("logado", "true");
    window.location.href = "painel.html";
  } else {
    erroMsg.classList.remove("hidden");
  }
});
