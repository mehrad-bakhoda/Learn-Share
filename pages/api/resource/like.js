import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
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
