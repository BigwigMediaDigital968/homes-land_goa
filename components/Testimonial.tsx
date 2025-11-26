"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
// import upwards from "../assets/upwards.png";
// import downwards from "../assets/downwards.png";
import Image from "next/image";

interface Review {
  name: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "JOHN DOE",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nibh nec fermentum vehicula, magna lacus facilisis leo.",
    rating: 5,
  },
  {
    name: "JANE SMITH",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    rating: 5,
  },
  {
    name: "MICHAEL BROWN",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
    rating: 5,
  },
  {
    name: "EMILY DAVIS",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros eu libero hendrerit ullamcorper.",
    rating: 5,
  },
  {
    name: "DAVID WILSON",
    content:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    rating: 5,
  },
];

export default function ReviewSection() {
  return (
    <section className="w-full py-12  font-raleway bg-[var(--bg-color)] text-black relative tracking-widest">
      {/* <div className="absolute top-0 left-0">
        <Image src={upwards} alt="upwards" />
      </div>
      <div className="absolute bottom-0 left-0">
        <Image src={downwards} alt="downwards" />
      </div> */}
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Section Label */}

        {/* Heading */}
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[var(--title)] mt-2 mb-6 tracking-widest">
          What Our Clients Say About Us
        </h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="relative bg-white  border border-neutral-200 p-6 shadow-lg h-80 flex flex-col justify-between hover:shadow-lg transition duration-300">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-[var(--primary-color)] text-2xl opacity-40" />

                {/* Review Content (truncate if too long) */}
                <p className="text-base leading-relaxed text-black line-clamp-4">
                  {review.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                      {review.name}
                    </h3>
                    <div className="flex mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-[var(--primary-color)] text-sm mr-1"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-sm font-bold uppercase">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
