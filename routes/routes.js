const router = require("express").Router();
const pages = require("../controllers/pages.controllers")
const user = require("../controllers/user.controllers")
 

//Rutas de inicio
router.get("/",pages.home);
router.post("/registeruser",user.registerUser);
router.put("/updateuser",user.updateUser);
 

 

module.exports = router;