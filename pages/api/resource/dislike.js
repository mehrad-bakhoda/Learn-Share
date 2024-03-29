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
          if (user.dislikes.find((e) => e === resource.id) === undefined) {
            if (user.likes.find((e) => e === resource.id) === undefined) {
              user.dislikes.push(resource.id);

              const dislike = await prisma.resource.update({
                where: { id: +req.query.id },
                data: {
                  dislikes: { increment: 1 },
                },
              });

              if (dislike) {
                const update = await prisma.user.update({
                  where: { id: payload.userId },
                  data: {
                    dislikes: user.dislikes,
                  },
                });
                if (update) {
                  return dislike.dislikes;
                }
              }
            } else {
              user.dislikes.push(resource.id);
              var likeIndex = user.likes.indexOf(resource.id);
              user.likes.splice(likeIndex, 1);
              const dislike = await prisma.resource.update({
                where: { id: +req.query.id },
                data: {
                  likes: { increment: -1 },
                  dislikes: { increment: 1 },
                },
              });

              if (dislike) {
                const update = await prisma.user.update({
                  where: { id: payload.userId },
                  data: {
                    likes: user.likes,
                    dislikes: user.dislikes,
                  },
                });
                if (update) {
                  return dislike.dislikes;
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
