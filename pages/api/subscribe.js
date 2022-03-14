import { prisma } from "../../lib/prisma";
import { verify } from "jsonwebtoken";

import cookie from "cookie";
export default async function handle(req, res) {
  console.log(req);
  if (!req.headers.cookie) {
    console.log(req.headers.cookie);
    res.redirect("/login");
  }
  if (req.headers.cookie) {
    const getToken = cookie.parse(req.headers.cookie);
    const token = getToken.refreshToken;

    if (!token) return res.status(401);
    let payload = null;

    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

    const category = await prisma.category.findUnique({
      where: { id: +req.query.id },
    });

    if (category) {
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });
      if (user) {
        if (
          user.followedCategories.find((e) => e === category.id) === undefined
        ) {
          user.followedCategories.push(category.id);
          res.status(200).send();
        }
      }
    }
  }
  res.status(401).send();
}
