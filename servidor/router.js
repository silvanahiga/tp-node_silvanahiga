const express = require('express');
const router = express.Router();

// router.get('/api/users', (req, res)=>{
//     res.json('hola estas en la ruta del tp')
// })

const datos = [{
    id: 1,
    nombre: 'Ada',
    apellido: 'Lovelace',
    telefono: '1234567890',
    email: 'contacto@gmail.com'
}, {
    id: 2,
    nombre: 'Grace',
    apellido: 'Hopper',
    telefono: '087654321',
    email: 'contacto@hotmail.com'
}];



router.get('/', function (req, res) {
    res.send(datos)
})


router.get('/api/users', function (req, res) {
    res.send('hola usuario')
})

router.delete('/api/users/:idUsers/eliminar', function (req, res) {
    const id = parseInt(req.params.idUsers);
    for (let i = 0; i < datos.length; i++) {
        if (datos[i].id == id) {
            datos.splice(i, 1)
        }
    }
    res.json(datos)
})


let ID = 3;
router.post("/api/users", function (req, res) {
  const nuevoUser = req.body;

  nuevoUser.id = ID++;

  datos.push(nuevoUser)
  res.json(nuevoUser)
  
})
 











module.exports = router;