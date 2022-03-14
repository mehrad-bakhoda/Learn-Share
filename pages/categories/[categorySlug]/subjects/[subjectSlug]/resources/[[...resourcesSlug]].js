import ResourceCard from "../../../../../../Components/Cards/ResourceCard";
import AddButton from "../../../../../../Components/General/AddButton";
import Link from "next/link";
import superjson from "superjson";
import { useRouter } from "next/dist/client/router";
import Filters from "../../../../../../Components/General/Filters";

import { prisma } from "../../../../../../lib/prisma";

function RecoursesPage({ data }) {
  const { query } = useRouter();

  return (
    <div className="innerPage resourcesPage">
      <div className="container-fluid">
        <Filters searching={true} subscribe={true} lang={true} order={true} />

        <div className="row">
          {data.map((resource) => {
            return (
              <div
                className="col-12 col-lg-6"
                key={resource.data ? resource.data.id : resource.id}
              >
                <ResourceCard
                  id={resource.data ? resource.data.id : resource.id}
                  name={`${
                    resource.data ? resource.data.title : resource.title
                  }`}
                  likes={`${
                    resource.data ? resource.data.likes : resource.likes
                  }`}
                  dislikes={`${
                    resource.data ? resource.data.dislikes : resource.dislikes
                  }`}
                  price={`${
                    resource.data ? resource.data.price : resource.price
                  }`}
                  link={`${resource.data ? resource.data.link : resource.link}`}
                  language={`${
                    resource.data ? resource.data.language : resource.language
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Link
        href={`/upload/resource?category=${query.categorySlug}&subject=${query.subjectSlug}`}
      >
        <a>
          <AddButton />
        </a>
      </Link>
    </div>
  );
}

export default RecoursesPage;
export async function getServerSideProps({ params, query }) {
  if (query.query) {
    if (query.language === "انگلیسی") {
      const resources = await prisma.resource.findMany({
        where: {
          language: "en",
          title: {
            search: `${query.query}`,
          },

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "تاريخ") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);

      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "دنبال کنندگان") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "قيمت") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            price: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "دنبال کنندگان" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "fa",
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "دنبال کنندگان" && query.language === "انگلیسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "en",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "تاريخ" && query.language === "انگلیسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "en",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "تاريخ" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "قيمت" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            price: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "قيمت" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            price: "desc",
          },
        ],
        where: {
          title: {
            search: `${query.query}`,
          },
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (!query.language && !query.sort_by) {
      const resources = await prisma.resource.findMany({
        where: {
          title: {
            search: `${query.query}`,
          },
          subject: {
            title: params.subjectSlug,
          },
        },
      });
      let percentages = [];
      resources.map((every) => {
        const total = every.likes + every.dislikes;
        const percentage = (every.likes / total) * 100;
        percentages.push({ percentage: percentage, id: every.id, data: every });
      });
      percentages.sort((a, b) => {
        return b.percentage - a.percentage;
      });

      const { json } = superjson.serialize(percentages);

      return {
        props: {
          data: json,
        },
      };
    }
  } else {
    if (query.language === "انگلیسی") {
      const resources = await prisma.resource.findMany({
        where: {
          language: "en",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        where: {
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "تاريخ") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);

      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "دنبال کنندگان") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "قيمت") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            price: "desc",
          },
        ],
        where: {
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "دنبال کنندگان" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          language: "fa",
          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "دنبال کنندگان" && query.language === "انگلیسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            followers: "desc",
          },
        ],
        where: {
          language: "en",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "تاريخ" && query.language === "انگلیسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          language: "en",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "تاريخ" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: {
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "قيمت" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            price: "desc",
          },
        ],
        where: {
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (query.sort_by === "قيمت" && query.language === "فارسی") {
      const resources = await prisma.resource.findMany({
        orderBy: [
          {
            price: "desc",
          },
        ],
        where: {
          language: "fa",

          subject: {
            title: params.subjectSlug,
          },
        },
      });

      const { json } = superjson.serialize(resources);
      return {
        props: {
          data: json,
        },
      };
    }
    if (!query.language && !query.sort_by) {
      const resources = await prisma.resource.findMany({
        where: {
          subject: {
            title: params.subjectSlug,
          },
        },
      });
      let percentages = [];
      resources.map((every) => {
        const total = every.likes + every.dislikes;
        const percentage = (every.likes / total) * 100;
        percentages.push({ percentage: percentage, id: every.id, data: every });
      });
      percentages.sort((a, b) => {
        return b.percentage - a.percentage;
      });

      const { json } = superjson.serialize(percentages);

      return {
        props: {
          data: json,
        },
      };
    }
  }
}
