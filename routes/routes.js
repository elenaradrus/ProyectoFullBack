const router = require("express").Router();
const pages = require("../controllers/pages.controllers")
const user = require("../controllers/user.controllers")

// const login = require("../controllers/user.controllers")
// const log = require("../controllers/user.controllers")
 

//Rutas de inicio
router.get("/",pages.home);
router.post("/registro",user.saveDataForm);
router.post("/login", user.login);
router.post("/logHome", user.logHome);
router.post("/uCuber1", user.uCuber1);
router.post("/verCoche", user.verCoche);
router.post("/registeruser",user.registerUser);

// router.put("/updateuser",user.updateUser);

 

module.exports = router;