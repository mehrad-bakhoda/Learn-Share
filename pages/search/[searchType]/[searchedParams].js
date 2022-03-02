import CategoryCard from "../../../Components/CatergoryCard";
import SubjectCard from "../../../Components/SubjectCard";
import ResourceCard from "../../../Components/ResourceCard";

import Filters from "../../../Components//Filters";
import superjson from "superjson";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
import Link from "next/link";

export default function SearchedItem({ data, dataType }) {
  return (
    <div className="innerPage categoriesPage">
      <div className="container-fluid">
        <Filters />
        <div className="row">
          {data.map((selected) => {
            return (
              <>
                {dataType === "category" && (
                  <div
                    className="col-lg-3 col-sm-4 col-sm-6 col-12"
                    key={selected.id}
                  >
                    <Link href={`/categories/${selected.title}/subjects`}>
                      <a>
                        <CategoryCard
                          name={`${selected.title}`}
                          followers={`${selected.followers}`}
                          subjects={`${selected.subjectsNumber}`}
                        />
                      </a>
                    </Link>
                  </div>
                )}
                {dataType === "subject" && (
                  <div className="col-lg-4 col-md-6 col-12" key={selected.id}>
                    <Link
                      href={`/categories/${selected.categoryId}/subjects/${selected.title}/resources`}
                    >
                      <a>
                        <SubjectCard
                          name={`${selected.title}`}
                          followers={`${selected.followers}`}
                          resources={`${selected.resourcesNumber}`}
                        />
                      </a>
                    </Link>
                  </div>
                )}
                {dataType === "resource" && (
                  <div className="col-12 col-lg-6" key={selected.id}>
                    <ResourceCard
                      name={`${selected.title}`}
                      likes={`${selected.likes}`}
                      dislikes={`${selected.dislikes}`}
                      price={`${selected.price}`}
                      link={`${selected.link}`}
                      language={`${selected.language}`}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ params }) {
  if (params.searchType === "category") {
    const result = await prisma.category.findMany({
      where: {
        title: {
          search: `${params.searchedParams}`,
        },
      },
    });
    const { json } = superjson.serialize(result);

    return {
      props: {
        data: json,
        dataType: "category",
      },
    };
  } else if (params.searchType === "subject") {
    const result = await prisma.subject.findMany({
      where: {
        title: {
          search: `${params.searchedParams}`,
        },
      },
    });

    const { json } = superjson.serialize(result);

    return {
      props: {
        data: json,
        dataType: "subject",
      },
    };
  } else if (params.searchType === "resource") {
    const result = await prisma.resource.findMany({
      where: {
        title: {
          search: `${params.searchedParams}`,
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
  return { notFound: true };
}
