fetch("http://localhost:3007")
  .then(function (res) {
    return res.json()

  })
  .then(function (user) {
    const divUser = user.map(function (u) {
      return `
      <tr id="${u.id}"> 
      <th scope="row" id="${u.id}"><div class="form-check">
      <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."></div>
      </th>
      <td>${u.nombre}</td>
      <td>${u.apellido}</td>
      <td>${u.email}</td>
      <td>${u.telefono}</td>
      <td>
        <i class="Edit material-icons" style="color:yellow" id="${u.id}">&#xE254;</i>
       <button style="border:0; background: transparent"><i class="Delete material-icons"  style="color:red" id="${u.id}">&#xE872;</i></button>
      </td>
      </tr > 
      `
    })

    document.getElementById("datos").innerHTML = divUser.join('')

    const caca = document.querySelectorAll(".Delete")
    console.log(caca)
    caca.forEach(function (button) {
      button.onclick = eliminar;
    })
  })


function eliminar(e) {
  console.log(e)
  const id = e.target.id;
  console.log(id)
  fetch(`http://localhost:3007/api/users/${id}/eliminar`, {
    method: 'delete'
  })
    .then(res => {
      document.getElementById(id).remove()
    })

}


// modal (abrir)
document.querySelector(".btn-add").onclick = function (e) {
  const modal = document.getElementById("modal")
  modal.removeAttribute("style");

  console.log(e)
}
// modal (cerrar click boton)
document.getElementById("close").onclick = function (e) {
  const cerrarModal = document.getElementById("modal")
  cerrarModal.setAttribute("style", "display:none")
}

//modal (cerrar click afuera)
// document.querySelector('.btn-guardar').onclick = function (e) {
//   const cerrarAfuera = document.getElementById("modal")
//   cerrarAfuera.setAttribute("style", "display:none")
// }



document.querySelector(".btn-guardar").onclick = function () {
  const nombre = document.querySelector("#recipient-name").value;
  const apellido = document.querySelector("#recipient-lastname").value;
  const email = document.querySelector("#recipient-email").value;
  const telefono = document.querySelector("#recipient-phone").value;



  const todo = { //este es el objeto que se va a pasar al servidor como datos 
    nombre: nombre,
    apellido : apellido,
    email: email,
    telefono: telefono,
  }

  fetch("http://localhost:3007/api/users", {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json'
    }

  })
    .then(res => {
      if (!res.ok) {
        throw {
          status: res.status,
          message: 'todo ok'
        }
      } else {
        return res.json()
      }
    })
    .then(d => {
      const nuevoUser = `
    <tr id="${d.id}"> 
    <th scope="row" id="${d.id}"><div class="form-check">
    <input class="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."></div>
    </th>
    <td>${d.nombre}</td>
    <td>${d.apellido}</td>
    <td>${d.email}</td>
    <td>${d.telefono}</td>
    <td>
      <i class="Edit material-icons" style="color:yellow" id="${d.id}">&#xE254;</i>
     <button style="border:0; background: transparent"><i class="Delete material-icons"  style="color:red" id="${d.id}">&#xE872;</i></button>
    </td>
    </tr > 
    
    `
      document.querySelector('#datos').innerHTML += nuevoUser


    })

}