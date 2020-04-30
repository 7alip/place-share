import { Router } from "express";
import { check } from "express-validator";

import { getUsers, signup, login } from "../controllers/users";
import { fileUpload } from "../middlewares/fileUpload-middleware";

const checkSignup: any[] = [
  check("name").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
];

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", fileUpload.single("image"), checkSignup, signup);
userRouter.post("/login", login);

export default userRouter;
