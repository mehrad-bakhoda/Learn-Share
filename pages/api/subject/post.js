import { prisma } from "../../../lib/prisma";
import { verify } from "jsonwebtoken";

import cookie from "cookie";
export default async function handle(req, res) {
  if (!req.headers.cookie) {
    console.log(req.headers.cookie);
    res.redirect("/login");
  }
  if (req.headers.cookie) {
    if (req.body.title) {
      const getToken = cookie.parse(req.headers.cookie);
      const token = getToken.refreshToken;

      if (!token) return res.status(401);
      let payload = null;

      try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        const subject = await prisma.subject.create({
          data: {
            title: `${req.body.title}`,
            category: {
              connect: { title: req.query.category },
            },
            user: {
              connect: { id: payload.userId },
            },
          },
        });

        if (subject) {
          const update = await prisma.category.update({
            where: { title: req.query.category },
            data: { subjectsNumber: { increment: 1 } },
          });

          if (update) {
            res.redirect(`/categories/${req.query.category}/subjects`);
          }
        }

        if (!subject) res.status(401);
      } catch (e) {
        console.log(e);
        res.status(401);
        res.redirect("/login");
      }
    }
  }
  res.status(400);
}
