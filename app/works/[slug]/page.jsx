import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import Image from "next/image";
import NextLink from "@/app/components/common/next-link";

const WORK_QUERY = `*[_type == "heroWork" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };
 
export default async function WorkPage({ params }) {
  const { slug } = params;
  const work = await client.fetch(WORK_QUERY, { slug }, options);

  const workImageURL = work?.poster ? urlFor(work.poster)?.url() : null;

  return (
    <main className="relative size-full flex flex-col items-center justify-center">

      <figure className="fixed inset-0 size-full -z-10">
        {workImageURL && (
          <Image
            src={workImageURL}
            alt={work.title}
            width={2000}
            height={2000}
            className="size-full object-cover brightness-50"
          />
        )}
      </figure>

<div className="my-30 h-full flex flex-col items-start justify-center">      
   <NextLink
        href="/"
        className=" text-s text-[1em] font-medium tracking-[-0.05em] hover:underline mix-blend-exclusion"
      >
        ← Back to home
      </NextLink>

      <div className="mt-20 flex flex-col items-start justify-start mix-blend-exclusion">
        <h1 className="text-s text-[5em] font-medium tracking-[-0.04em]">
          {work.title}
        </h1>

      <div className="max-w-[600px] flex flex-col items-start justify-start text-s">
          {Array.isArray(work.body) && <PortableText value={work.body} />}
        </div>
      </div></div>
    </main>
  );
}
