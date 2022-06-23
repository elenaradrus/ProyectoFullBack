/**
 * Creamos los endpoints que unen las funciones guardadas en user.controllers junto con las diferentes
 * vistas pug
 */


const router = require("express").Router();
const pages = require("../controllers/pages.controllers")
const user = require("../controllers/user.controllers")
const admin = require("../controllers/admin.controllers")


 
//Rutas de inicio
router.get("/",pages.home);
router.post("/registro",user.saveDataForm);
router.post("/login", user.login);
router.post("/logHome", user.logHome);
router.post("/uCuber1", user.uCuber1);
router.post("/factura", user.factura);
router.post("/search", user.search);
router.post("/genFactura", user.genFactura);
// router.get("/get-factura/:id", user.factura);
router.post("/verCoche", user.verCoche);
router.post("/registeruser",user.registerUser);
router.post('/logOut', user.logOut);
router.post('/borrar', user.borrar);
router.post('/borrar1', user.borrar1);
router.post("/anadirCoche", admin.anadirCoche);
router.post("/borrarCoche", admin.borrarCoche);
router.post("/borrarUsuario", admin.borrarUsuario);
router.post("/actualizar", admin.actualizarDatos);
router.post('/logOut1', admin.logOut);




module.exports = router;