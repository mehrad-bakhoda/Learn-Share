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

        if (
          req.body.title &&
          req.body.url &&
          req.body.price &&
          req.body.language
        ) {
          const resource = await prisma.resource.create({
            data: {
              title: `${req.body.title}`,
              url: `${req.body.url}`,
              price: `${req.body.price}`,
              language: `${req.body.language}`,
              subject: {
                connect: { title: req.query.subject },
              },
              user: {
                connect: { id: payload.userId },
              },
            },
          });

          const update = await prisma.subject.update({
            where: { title: req.query.subject },
            data: { resourcesNumber: { increment: 1 } },
          });
          if (resource) {
            res.redirect(
              `/categories/${req.query.category}/subjects/${req.query.subject}/resources`
            );
          }
        }

        if (!resource) return res.status(401);
      } catch (e) {
        console.log(e);
        res.status(401);
        res.redirect("/login");
      }
    }
  }
  return res.status(400);
}
