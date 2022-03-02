import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  if (req.query.query !== "") {
    if (req.query.type === "category") {
      const response = await prisma.category.findMany({
        where: {
          title: {
            search: `${req.query.query}`,
          },
        },
      });
      return response;
    }
  }
}
