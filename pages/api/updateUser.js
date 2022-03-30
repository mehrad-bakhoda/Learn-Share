import { verify } from "jsonwebtoken";
import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "../../functions/auth";
import cookie from "cookie";
import { prisma } from "../../lib/prisma";

export default async function refresh_token(req, res) {
  if (req.method === "POST") {
    if (!req.headers.cookie) return res.send({ ok: false, accessToken: "" });
    const getToken = cookie.parse(req.headers.cookie);
    const token = getToken.refreshToken;

    if (!token) return res.send({ ok: false, accessToken: "" });
    let payload = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (!user) return res.send({ ok: false, accessToken: "" });
      if (user) {
        const { email, password, phoneNumber } = JSON.parse(req.body);
        if (bcrypt.compareSync(password, user.password)) {
          const update = await prisma.user.updateMany({
            where: {
              id: payload.userId,
            },
            data: {
              email,
              phoneNumber,
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
      return res.send({ ok: false, accessToken: "" });
    }
  } else {
    res.status(500).send();
  }
}
