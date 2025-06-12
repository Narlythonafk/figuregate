function mostrarSecao(secao) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("produtos").classList.add("hidden");
  document.getElementById(secao).classList.remove("hidden");
  location.hash = secao;
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "login.html";
}

window.onload = () => {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "login.html";
    return;
  }
  const hash = location.hash.replace("#", "") || "dashboard";
  mostrarSecao(hash);
  carregarProdutos();
};

let produtos = JSON.parse(localStorage.getItem("produtos") || "[]");

function salvarProduto() {
  const nome = document.getElementById("nome").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const preco = document.getElementById("preco").value.trim();
  const estoque = document.getElementById("estoque").value.trim();
  const imagemInput = document.getElementById("uploadImagem");
  const file = imagemInput.files[0];

  if (!nome || !categoria || !preco || !estoque) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const editIndex = document.getElementById("editIndex").value;

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      salvarProdutoComImagem(e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    salvarProdutoComImagem(null);
  }

  function salvarProdutoComImagem(imagem) {
    if (editIndex === "") {
      // Novo produto
      produtos.push({
        nome,
        categoria,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        imagem,
      });
    } else {
      // Editar produto
      produtos[editIndex] = {
        nome,
        categoria,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        imagem: imagem || produtos[editIndex].imagem,
      };
      document.getElementById("editIndex").value = "";
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));
    limparForm();
    carregarProdutos();
  }
}

function carregarProdutos() {
  const tabela = document.getElementById("tabela");
  tabela.innerHTML = "";

  produtos.forEach((produto, index) => {
    const tr = document.createElement("tr");

    const tdImagem = document.createElement("td");
    if (produto.imagem) {
      const img = document.createElement("img");
      img.src = produto.imagem;
      tdImagem.appendChild(img);
    }
    tr.appendChild(tdImagem);

    tr.innerHTML += `
      <td>${produto.nome}</td>
      <td>${produto.categoria}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>${produto.estoque}</td>
      <td>
        <button onclick="editarProduto(${index})" class="btn btn-primary">Editar</button>
        <button onclick="excluirProduto(${index})" class="btn btn-danger">Excluir</button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

function limparForm() {
  document.getElementById("nome").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("estoque").value = "";
  document.getElementById("uploadImagem").value = "";
  document.getElementById("editIndex").value = "";
}

function editarProduto(index) {
  const produto = produtos[index];
  document.getElementById("nome").value = produto.nome;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("preco").value = produto.preco;
  document.getElementById("estoque").value = produto.estoque;
  document.getElementById("editIndex").value = index;
}

function excluirProduto(index) {
  if (confirm("Deseja realmente excluir este produto?")) {
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
  }
}
