import express from "express";
import { prismaClient } from "store/client";
import { CreateUserInput, SignInInput } from "./types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from better uptime!",
  });
});
app.post("/website", async (req, res) => {
  console.log(req.body.url);

  const website = await prismaClient.website.create({
    data: {
      url: req.body.url,
    },
  });
  res.status(200).json({
    message: "Hello from better uptime!",
    id: website.id,
  });
});

app.get("/status/:website", (req, res) => {
  res.status(200).json({
    message: "Hello from better uptime!",
  });
});

app.post("/user/sign-up", async (req, res) => {
  const data = CreateUserInput.safeParse(req.body);

  if (!data.success) {
    console.log(data.error);
    res.status(403).send("Please fill all the required fields!");
    return;
  }
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.data.email,
      },
    });

    if (existingUser) {
      res.status(403).json({
        message: "User Already exists!",
      });
      return;
    }

    let hashedPassword = await bcrypt.hash(data.data.password, 5);

    let user = await prismaClient.user.create({
      data: {
        name: data.data.name,
        email: data.data.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      id: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      message: "something went wrong!",
      error,
    });
  }
});

app.post("/user/sign-in", async (req, res) => {
  const data = SignInInput.safeParse(req.body);

  if (!data.success) {
    console.log(data.error);

    res.status(403).json({
      message: "Please provide valid inputs!",
    });
  }

  try {
    let user = await prismaClient.user.findUnique({
      where: {
        email: data.data?.email,
      },
    });

    if (!user) {
      res.status(500).json({
        message: "User does not exists! Please Sign Up.",
      });
      return;
    }

    const match = bcrypt.compare(user?.password, data.data?.password as string);

    if (!match) {
      res.status(400).json({
        message: "Invalid Email or Password!",
      });
      return;
    }

    const token = jwt.sign(user.id, process.env.JWT_SECRET!);

    res.status(200).json({
      message: "Signed in Successfully!",
      jwt: token,
    });
  } catch (error) {}
});

app.listen(process.env.PORT || 3000);
