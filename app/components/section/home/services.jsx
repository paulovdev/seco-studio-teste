import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <section className="h-screen flex items-center justify-between max-lg:flex-col">
      <div className="flex-2 h-screen flex items-center justify-center max-lg:pb-10">
        <figure className="size-full overflow-hidden">
          <Image
            src={"/services.jpg"}
            width={2000}
            height={2000}
            alt=""
            className="size-full object-cover"
          />
        </figure>
      </div>
      <div className="flex-2 h-screen flex flex-col items-center justify-center">
        <div className="px-2 py-4 h-full flex items-start justify-start max-lg:pb-25">
          <p className="text-p text-[1.2em] font-medium tracking-[-0.05em] leading-[1.1]">
            Great design transforms a business, it doesn’t just decorate it. We
            work in partnership with you to learn about your vision and
            understand your goals so that together, we can create one-of-a-kind
            design solutions that are as distinctive as you and your business.
          </p>
        </div>
        <div className="size-full flex items-end justify-end">
          <div className="p-5 w-full grid grid-cols-4 max-lg:grid-cols-1 max-lg:p-2">
            <ul className="flex flex-col items-start gap-4 col-start-3 col-span-full">
              <li className="flex flex-col items-start">
                <h3 className="mb-4 text-p text-[1.3em] font-normal tracking-[-0.04em] uppercase">
                  Brand Design
                </h3>
                <p className="text-p text-[.9em] font-normal tracking-[-0.03em] leading-[1.1]">
                  Brand Strategy, Brand Identity, Creative Direction,
                  Illustrations, Social Media design, Newsletter templates &
                  more.
                </p>
              </li>
              <li className="flex flex-col items-start ">
                <h3 className="mb-4 text-p text-[1.3em] font-normal tracking-[-0.04em] uppercase">
                  Web Design
                </h3>
                <p className="text-p text-[.9em] font-normal tracking-[-0.03em] leading-[1.1]">
                  Online Studios, Creative Portfolios, Ecommerce stores, Booking
                  Platforms, Corporate, Event Venues & more.
                </p>
              </li>
              <li className="flex flex-col items-start">
                <h3 className="mb-4 text-p text-[1.3em] font-normal tracking-[-0.04em] uppercase">
                  Editorial Design
                </h3>
                <p className="text-p text-[.9em] font-normal tracking-[-0.03em] leading-[1.1]">
                  Magazines, Book Covers, Stationery, Signage, Leaflets & more.
                </p>
              </li>
              <li className="mt-6">
                <a
                  href="#"
                  className="text-p text-[.75em] font-medium tracking-[-0.03em] underline ring-offset-2"
                >
                  the design studio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
