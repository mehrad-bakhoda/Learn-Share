import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  if (!req.headers.cookie) {
    console.log(req.headers.cookie);
    res.redirect("/login");
  }
  if (req.headers.cookie) {
    if (req.body.title && req.body.url && req.body.price && req.body.language) {
      const resource = await prisma.resource.create({
        data: {
          title: `${req.body.title}`,
          url: `${req.body.url}`,
          price: `${req.body.price}`,
          language: `${req.body.language}`,
          subject: {
            connect: { title: req.query.subject },
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
  }
}
