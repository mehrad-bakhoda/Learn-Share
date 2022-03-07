import SubjectCard from "../../../../Components/SubjectCard";
import Filters from "../../../../Components/Filters";
import AddButton from "../../../../Components/AddButton";
import superjson from "superjson";

import { prisma } from "../../../../lib/prisma";

import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const SubjectsPage = ({ data, categorySlug }) => {
  const { query } = useRouter();
  return (
    <div className="innerPage subjectsPage">
      <div className="container-fluid">
        <Filters />
        <div className="row">
          {data.map((subject) => {
            return (
              <div className="col-lg-4 col-md-6 col-12" key={subject.id}>
                <Link
                  href={`/categories/${categorySlug}/subjects/${subject.title}/resources`}
                >
                  <a>
                    <SubjectCard
                      name={`${subject.title}`}
                      followers={`${subject.followers}`}
                      resources={`${subject.resourcesNumber}`}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Link href={`/upload/subject?category=${query.categorySlug}`}>
        <a>
          <AddButton />
        </a>
      </Link>
    </div>
  );
};

export default SubjectsPage;
export async function getServerSideProps({ params, query }) {
  if (query.sort_by == "تاريخ") {
    const subjects = await prisma.subject.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        category: {
          title: params.categorySlug,
        },
      },
    });
    const { json } = superjson.serialize(subjects);

    return {
      props: {
        categorySlug: params.categorySlug,
        data: json,
      },
    };
  }
  if (query.sort_by == "دنبال کنندگان") {
    const subjects = await prisma.subject.findMany({
      orderBy: [
        {
          followers: "desc",
        },
      ],
      where: {
        category: {
          title: params.categorySlug,
        },
      },
    });
    const { json } = superjson.serialize(subjects);

    return {
      props: {
        categorySlug: params.categorySlug,
        data: json,
      },
    };
  }

  if (!query.language && !query.sortBy) {
    const subjects = await prisma.subject.findMany({
      where: {
        category: {
          title: params.categorySlug,
        },
      },
    });
    const { json } = superjson.serialize(subjects);

    return {
      props: {
        categorySlug: params.categorySlug,
        data: json,
      },
    };
  }
}
