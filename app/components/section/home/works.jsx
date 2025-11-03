"use client";

import { client } from "@/sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";

const opacityAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: "linear" } },
};

const WORKS_QUERY = `*[
  _type == "heroWork" && defined(slug.current)
]|order(publishedAt desc)[0...12]{title, category, poster, slug, description}`;

const { projectId, dataset } = client.config();

const urlFor = (source) =>
  source && projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Card = ({ slug, img, title }) => {
  return (
    <div className="w-full h-[600px] p-0.5 transition-all duration-500 cubic-bezier(0.33, 1, 0.68, 1)">
      <motion.figure className="relative w-full h-full overflow-hidden">
        {img && (
          <Image
            src={img}
            width={500}
            height={500}
            alt={title || ""}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-5 left-5 w-[calc(100%-40px)] flex items-center justify-between">
          <p className="text-s text-[0.875em] font-medium tracking-[-0.03em] uppercase">
            {title}
          </p>
          <Link
            href={`/works/${slug?.current}`}
            className="text-s text-[0.875em] font-medium tracking-[-0.03em] uppercase"
          >
            VIEW
          </Link>
        </div>
      </motion.figure>
    </div>
  );
};

const Works = () => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [works, setWorks] = useState([]);

  const fetchWorks = async () => {
    const data = await client.fetch(WORKS_QUERY);
    setWorks(data);
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  return (
    <div className="bg-s py-2 pl-2 pr-2 max-md:pr-0" ref={ref}>
      <motion.div variants={opacityAnim} animate={inView ? "show" : "hidden"}>
        <Swiper
          autoplay={{ delay: 10000 }}
          loop={true}
          modules={[Autoplay]}
          spaceBetween={8}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
        >
          {works.map((work, i) => (
            <SwiperSlide key={i}>
              <Card
                img={
                  work.poster?.asset
                    ? urlFor(work.poster.asset._ref).url()
                    : null
                }
                title={work.title}
                slug={work.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Works;