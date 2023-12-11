
const getList = async () => {
    let url = 'http://127.0.0.1:5000/produtos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.produtos.forEach(item => insertList(item.nome, item.quantidade, item.mgmL, item.valor))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  getList()
  
  
  
  const postItem = async (inputProduct, inputQuantity, inputPrice, inputmgmL) => {
    const formData = new FormData();
    formData.append('nome', inputProduct);
    formData.append('quantidade', inputQuantity);
    formData.append('mgmL', inputmgmL);
    formData.append('valor', inputPrice);
  
    let url = 'http://127.0.0.1:5000/produto';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Confirma exclusão?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Excluído!")
        }
      }
    }
  }
  
  
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/produto?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  const newItem = () => {
    let inputProduct = document.getElementById("newInput").value;
    let inputQuantity = document.getElementById("newQuantity").value;
    let inputmgmL = document.getElementById("newmgmL").value;
    let inputPrice = document.getElementById("newPrice").value;
  
    if (inputProduct === '') {
      alert("Escreva o nome de um remédio!");
    } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
      alert("Quantidade e valor precisam ser números!");
    } else {
      insertList(inputProduct, inputQuantity, inputPrice, inputmgmL)
      postItem(inputProduct, inputQuantity, inputPrice, inputmgmL)
      alert("Remédio adicionado!")
    }
  }
  
  
  const insertList = (nameProduct, quantity, price, mgmL) => {
    var item = [nameProduct, quantity, price, mgmL]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newInput").value = "";
    document.getElementById("newQuantity").value = "";
    document.getElementById("newmgmL").value = "";
    document.getElementById("newPrice").value = "";
  
    removeElement()
  }