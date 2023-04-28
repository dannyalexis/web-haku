import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//import cloudinary from "../libs/cloudinary.js";
/*
export const register = async (req, res) => {
  try {
    const { email } = req.body;
    let img;
    if (!req.files.img) {
      const result = await uploadImage(req.files.img.tempFilePath);
      img = {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlENOqz1zOSD6Z_ke-bK72MiYLoqhQVGRBVw&usqp=CAU",
        public_id: "example",
      };
    }
    const result = await uploadImage(req.files.img.tempFilePath);
    await fs.remove(req.files.img.tempFilePath);
    img = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(401).send("El correo ya fue registrado");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        ...req.body,
        password: hash,
        img,
      });
      const result = await newUser.save();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

*/
export const register = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(401).send("El correo ya fue registrado");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        ...req.body,
        password: hash,
      });
      const result = await newUser.save();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

/*
export const register = async (req, res) => {
  try {
    const { email, img } = req.body;
    const uploadRes = await cloudinary.uploader.upload(img, {
      upload_preset: "online-shop",
    });

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(401).send("El correo ya fue registrado");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        ...req.body,
        password: hash,
        img: uploadRes,
      });
      const result = await newUser.save();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
*/
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const result = await User.findOne({ email });
    if (result && (await bcrypt.compare(password, result.password))) {
      result;
      const payload = {
        userId: result._id,
        user: result.name,
        email: result.email,
        oficina: result.oficina,
        role: result.tipo,
        country: result.country,
      };
      console.log("payload =>", payload);
      const token = jwt.sign(payload, process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      res.json({ token });
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
