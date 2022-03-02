import { prisma } from "../../lib/prisma";

export default async function handle(req, res) {
  if (req.body.name) {
    const category = await prisma.category.findMany({
      where: {
        title: {
          search: `${req.body.name}`,
        },
      },
    });
    const subject = await prisma.subject.findMany({
      where: {
        title: {
          search: `${req.body.name}`,
        },
      },
    });
    const resource = await prisma.resource.findMany({
      where: {
        title: {
          search: `${req.body.name}`,
        },
      },
    });

    if (category && category.length !== 0) {
      res.redirect(`/search/category/${req.body.name}`);
    } else if (subject && subject.length !== 0) {
      res.redirect(`/search/subject/${req.body.name}`);
    } else if (resource && resource.length !== 0) {
      res.redirect(`/search/resource/${req.body.name}`);
    }
    res.redirect(`/${req.body.name}/not-found`);
  }
}
