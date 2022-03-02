import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const category = await prisma.category.create({
    data: {
      title: `${req.body.title}`,
    },
  });
  if (category) {
    res.redirect("/categories");
  }
}
