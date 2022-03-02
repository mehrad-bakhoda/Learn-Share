import ResourceCard from "../../../../../../Components/ResourceCard";
import AddButton from "../../../../../../Components/AddButton";
import Link from "next/link";
import superjson from "superjson";
import { useRouter } from "next/dist/client/router";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function RecoursesPage({ data }) {
  const { query } = useRouter();

  return (
    <div className="innerPage resourcesPage">
      <div className="container-fluid">
        <div className="row">
          {data.map((resource) => {
            return (
              <div className="col-12 col-lg-6" key={resource.data.id}>
                <ResourceCard
                  id={resource.data.id}
                  name={`${resource.data.title}`}
                  likes={`${resource.data.likes}`}
                  dislikes={`${resource.data.dislikes}`}
                  price={`${resource.data.price}`}
                  link={`${resource.data.link}`}
                  language={`${resource.data.language}`}
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
export async function getServerSideProps({ params }) {
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
