import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";

const WORK_QUERY = `*[_type == "heroWork" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function WorkPage({ params }) {
  const { slug } = await params;

  const work = await client.fetch(WORK_QUERY, { slug }, options);

  const workImageURL = work?.poster
    ? urlFor(work.poster)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to works
      </Link>

      {workImageURL && (
        <img
          src={workImageURL}
          alt={work.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}

      <h1 className="text-4xl font-bold mb-8">{work.title}</h1>

      <div className="prose">
        {Array.isArray(work.body) && <PortableText value={work.body} />}
      </div>
    </main>
  );
}
