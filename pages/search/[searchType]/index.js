import CategoryCard from "../../../Components/Cards/CategoryCard";
import SubjectCard from "../../../Components/Cards/SubjectCard";
import ResourceCard from "../../../Components/Cards/ResourceCard";

import Filters from "../../../Components/General/Filters";
import superjson from "superjson";

import { prisma } from "../../../lib/prisma";

import Link from "next/link";

export default function SearchedItem({ data }) {
  return (
    <div className="innerPage categoriesPage">
      <div className="container-fluid">
        <Filters />
        <div className="row">
          {data.map((selected) => {
            return (
              <div
                className="col-lg-3 col-sm-4 col-sm-6 col-12"
                key={selected.id}
              >
                <ResourceCard
                  name={`${selected.title}`}
                  likes={`${selected.likes}`}
                  dislikes={`${selected.dislikes}`}
                  price={`${selected.price}`}
                  link={`${selected.link}`}
                  language={`${selected.language}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  const category = await prisma.category.findMany({
    where: {
      title: {
        search: `${params.searchType}`,
      },
    },
  });
  const subject = await prisma.subject.findMany({
    where: {
      title: {
        search: `${params.searchType}`,
      },
    },
  });
  const resource = await prisma.resource.findMany({
    where: {
      title: {
        search: `${params.searchType}`,
      },
    },
  });

  const { json } = superjson.serialize(result);

  return {
    props: {
      data: json,
      dataType: "resource",
    },
  };
}
