"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Hero2 from "../assets/luxury_and_rich_home_exterior_side_view.png";
import Link from "next/link";

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [avlHouses, setAvlHouses] = useState(0);
  const [soldHouses, setSoldHouses] = useState(0);
  const [agents, setAgents] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateValue(setAvlHouses, 8, 1000); // total signature dishes
          animateValue(setSoldHouses, 6, 1000); // years of serving
          animateValue(setAgents, 2, 1000);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  const animateValue = (
    setter: (value: number) => void,
    target: number,
    duration: number
  ) => {
    const start = 0;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setter(Math.floor(current));
    }, stepTime);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg-color)]  text-[var(--primary-color)]  font-raleway font-light  relative overflow-hidden"
    >
      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16">
        {/* Image with dotted background */}
        <div className="relative w-full h-full z-10 rounded-2xl">
          <Image
            src={Hero2}
            alt="Dining"
            width={600}
            height={400}
            className="relative z-10 w-full h-[300px] md:h-[400px] object-cover "
          />
        </div>
        {/* Text Content */}
        <div className="z-10">
          <h2
            className="text-3xl md:text-4xl font-semibold text-[var(--title)] mt-2 tracking-widest"
            data-aos="fade-right"
          >
            We Help You To Find Your Dream Home
          </h2>
          <p
            className="text-[var(--primary-color)] text-lg  mb-8 mt-4 tracking-widest"
            data-aos="fade-right"
          >
            From charming cottages to breathtaking luxury estates, our expert
            team is by your side at every step—making your dream home not just a
            vision, but a reality.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 tracking-widest sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-t border-gray-300 mb-8">
            <div className="py-4 sm:pr-6 ">
              <p className="text-[var(--primary-color)] text-4xl font-sans font-semibold">
                {avlHouses}K+
              </p>
              <p className="text-[var(--primary-color)] text-md font-semibold">
                Houses Available
              </p>
            </div>
            <div className="py-4 sm:pl-6">
              <p className="text-[var(--primary-color)] text-4xl font-sans font-semibold">
                {soldHouses}K+
              </p>
              <p className="text-[var(--primary-color)] text-md font-semibold">
                Houses Sold
              </p>
            </div>
            <div className="py-4 sm:pl-6">
              <p className="text-[var(--primary-color)] text-4xl font-sans font-semibold">
                {agents}K+
              </p>
              <p className="text-[var(--primary-color)] text-md font-semibold">
                Trusted Agents
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
