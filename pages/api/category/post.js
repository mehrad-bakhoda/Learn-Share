import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  if (!req.headers.cookie) {
    res.redirect("/login");
  }
  if (req.headers.cookie) {
    const category = await prisma.category.create({
      data: {
        title: `${req.body.title}`,
      },
    });
    if (category) {
      res.redirect("/categories");
    }
  }
}
