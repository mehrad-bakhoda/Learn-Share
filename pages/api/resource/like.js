import { prisma } from "../../../lib/prisma";
import { verify } from "jsonwebtoken";

import cookie from "cookie";
export default async function handle(req, res) {
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

      const resource = await prisma.resource.findUnique({
        where: { id: +req.query.id },
      });

      if (resource) {
        const user = await prisma.user.findUnique({
          where: { id: payload.userId },
        });
        if (user) {
          if (user.likes.find((e) => e === resource.id) === undefined) {
            if (user.dislikes.find((e) => e === resource.id) === undefined) {
              console.log("moew");
              user.likes.push(resource.id);

              const like = await prisma.resource.update({
                where: { id: +req.query.id },
                data: {
                  likes: { increment: 1 },
                },
              });

              if (like) {
                const update = await prisma.user.update({
                  where: { id: payload.userId },
                  data: {
                    likes: user.likes,
                  },
                });
                if (update) {
                  return like.likes;
                }
              }
            } else {
              user.likes.push(resource.id);
              var dislikeIndex = user.dislikes.indexOf(resource.id);
              user.dislikes.splice(dislikeIndex, 1);
              const like = await prisma.resource.update({
                where: { id: +req.query.id },
                data: {
                  likes: { increment: 1 },
                  dislikes: { increment: -1 },
                },
              });

              if (like) {
                const update = await prisma.user.update({
                  where: { id: payload.userId },
                  data: {
                    likes: user.likes,
                    dislikes: user.dislikes,
                  },
                });
                if (update) {
                  return like.likes;
                }
              }
            }
          }
        }
      }

      if (!resource) return res.status(401);
    } catch (e) {
      console.log(e);
      res.status(401);
      res.redirect("/login");
    }
  }
  return res.status(401);
}
