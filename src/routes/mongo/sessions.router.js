import { Router } from "express";
import userModel from "../../dao/models/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  console.log("Entro a registrar un user...");
  console.log(req.body);
  let { first_name, last_name, email, age, password, rol } = req.body;
  console.log(
    "line 10: session router",
    first_name,
    last_name,
    email,
    age,
    password,
    rol
  );
  try {
    let user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
      rol,
    });
    // res.send({ status: "success", payload: result });
    console.log("usuarui creado...");
    res.status(201).json({ status: "success", result: user });
  } catch (err) {
    console.log("ocurrio un error...");
    res.send({ status: "error en try catch de router...", err: err });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = "";
  console.log("usuario que se va a logear -> ", email, password);
  if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
    console.log("es igual a superAdmin...");
    user = {
      first_name: "Super",
      last_name: "Admin",
      email: "adminCoder@coder.com",
      age: 999,
      password: "adminCod3r123",
      rol: "Super-Administrador",
    };
  } else {
    user = await userModel.findOne({ email: email, password: password });
    console.log("login use- >", user);
    if (!user) return res.status(401).send({ status: "error", error: user });
  }

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    rol: user.rol,
  };

  // res.send.status(200);
  res.status(201).json({ status: "success", payload: user });
});

router.get("/logoutSession", (req, res) => {
  //let { email } = req.body;

  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
    res.status(201).json({ status: "success", payload: "logout ok!" });
    console.log("Se cerro la sesion correctamente...");
  });
});
export default router;
