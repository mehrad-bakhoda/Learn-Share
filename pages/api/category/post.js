import { prisma } from "../../../lib/prisma";
import { verify } from "jsonwebtoken";

import cookie from "cookie";

export default async function handle(req, res) {
  if (req.body.title) {
    if (!req.headers.cookie) {
      res.redirect("/login");
    }
    if (req.headers.cookie) {
      const getToken = cookie.parse(req.headers.cookie);
      const token = getToken.refreshToken;

      if (!token) return res.status(401);
      let payload = null;

      try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

        const category = await prisma.category.create({
          data: {
            title: `${req.body.title}`,
            user: {
              connect: { id: payload.userId },
            },
          },
        });
        if (category) {
          res.redirect("/categories");
        }

        if (!category) return res.status(401);
      } catch (e) {
        console.log(e);
        res.status(401);
        res.redirect("/login");
      }
    }
  }
  return res.status(400);
}
