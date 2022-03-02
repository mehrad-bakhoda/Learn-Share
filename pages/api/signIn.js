import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../../functions/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const userForTheClient = {
      id: user.id,
      email: user.email,
    };

    if (bcrypt.compareSync(password, user.password)) {
      const token = createRefreshToken(user);
      sendRefreshToken(res, token);
      const accessToken = createAccessToken(user);
      res.send({ user: userForTheClient, accessToken });
    } else {
      res.status(404).send();
    }
  }
}
