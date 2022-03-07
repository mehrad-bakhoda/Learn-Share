import CategoryCard from "../../Components/CatergoryCard";
import Filters from "../../Components/Filters";
import AddButton from "../../Components/AddButton";
import superjson from "superjson";

import { prisma } from "../../lib/prisma";

import Link from "next/link";

const CategoriesPage = ({ data }) => {
  return (
    <div className="innerPage categoriesPage">
      <div className="container-fluid">
        <Filters />
        <div className="row">
          {data.map((category) => {
            return (
              <div
                className="col-lg-3 col-sm-4 col-sm-6 col-12"
                key={category.id}
              >
                <Link href={`/categories/${category.title}/subjects`}>
                  <a>
                    <CategoryCard
                      name={`${category.title}`}
                      followers={`${category.followers}`}
                      subjects={`${category.subjectsNumber}`}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Link href="/upload/category">
        <a>
          <AddButton />
        </a>
      </Link>
    </div>
  );
};

export default CategoriesPage;

export async function getServerSideProps({ query }) {
  if (query.query) {
    if (query.sort_by == "تاريخ") {
      const categories = await prisma.category.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
        },
      });
      const { json } = superjson.serialize(categories);

      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by == "دنبال کنندگان") {
      const categories = await prisma.category.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
        },
      });
      const { json } = superjson.serialize(categories);

      return {
        props: {
          data: json,
        },
      };
    }

    if (!query.language && !query.sortBy) {
      const categories = await prisma.category.findMany({
        where: {
          title: {
            search: `${query.query}`,
          },
        },
      });
      const { json } = superjson.serialize(categories);

      return {
        props: {
          data: json,
        },
      };
    }
  } else {
    if (query.sort_by == "تاريخ") {
      const categories = await prisma.category.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
      const { json } = superjson.serialize(categories);

      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by == "دنبال کنندگان") {
      const categories = await prisma.category.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
      });
      const { json } = superjson.serialize(categories);

      return {
        props: {
          data: json,
        },
      };
    }

    if (!query.language && !query.sortBy) {
      const categories = await prisma.category.findMany();
      const { json } = superjson.serialize(categories);

      return {
        props: {
          data: json,
        },
      };
    }
  }
}
