import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  if (!req.headers.cookie) {
    console.log(req.headers.cookie);
    res.redirect("/login");
  }
  if (req.headers.cookie) {
    const resource = await prisma.resource.update({
      where: { id: +req.query.id },

      data: {
        likes: { increment: 1 },
      },
    });

    if (resource) {
      return resource.likes;
    }
    return false;
  }
}
