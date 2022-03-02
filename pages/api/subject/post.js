import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  if (!req.headers.cookie) {
    console.log(req.headers.cookie);
    res.redirect("/login");
  }
  if (req.headers.cookie) {
    if (req.body.title) {
      const subject = await prisma.subject.create({
        data: {
          title: `${req.body.title}`,
          category: {
            connect: { title: req.query.category },
          },
        },
      });
      const update = await prisma.category.update({
        where: { title: req.query.category },
        data: { subjectsNumber: { increment: 1 } },
      });

      if (subject) {
        res.redirect(`/categories/${req.query.category}/subjects`);
      }
    }
  }
}
