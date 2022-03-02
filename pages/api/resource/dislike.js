import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const resource = await prisma.resource.update({
    where: { id: +req.query.id },

    data: {
      dislikes: { increment: 1 },
    },
  });

  if (resource) {
    res.redirect(
      `/categories/${req.query.category}/subjects/${req.query.subject}/resources`
    );
  }
}
