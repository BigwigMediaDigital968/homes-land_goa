"use client";

import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import banner from "../../../assets/image (10) 2.png";
import aboutImage from "../../../assets/aboutus.jpg";
import { useEffect, useRef } from "react";
import { MapPin, User, ClipboardList, Handshake } from "lucide-react";
import Aos from "aos";
import HelpSection from "../../../components/HelpSection";
import ContactInfo from "../../../components/ContactInfo";

const features = [
  {
    icon: <MapPin size={32} />,
    title: "Expert Guidance",
    description:
      "Benefit from our team's seasoned expertise for a smooth buying experience",
  },
  {
    icon: <User size={32} />,
    title: "Personalized Service",
    description:
      "Our services adapt to your unique needs, making your journey stress-free",
  },
  {
    icon: <ClipboardList size={32} />,
    title: "Transparent Process",
    description:
      "Stay informed with our clear and honest approach to buying your home",
  },
  {
    icon: <Handshake size={32} />,
    title: "Exceptional Support",
    description:
      "Providing peace of mind with our responsive and attentive customer service",
  },
];

export default function OurJourney() {
  const ourStory = useRef<HTMLDivElement | null>(null);
  const scrollToNext = () => {
    if (ourStory.current) {
      const yOffset = -50;
      const y =
        ourStory.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      <Navbar />
      <section className="relative w-full h-[70vh] md:h-[100vh] flex items-center justify-center pt-32">
        {/* Background Image */}
        <Image
          src={aboutImage}
          alt="Our Journey"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 ">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-widest">
            About Us
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto tracking-widest">
            From vision to reality - building trust, homes, and futures
          </p>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </div>
      </section>

      <section ref={ourStory} className="py-16">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Image */}
          <div className="relative w-full h-full z-10">
            <Image
              src={banner}
              alt="our story"
              width={600}
              height={400}
              className="relative z-10 w-full h-[300px] md:h-[400px] object-cover "
            />
          </div>

          {/* Right Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--title)] mb-6 tracking-widest">
              Our Story
            </h2>
            <p className="text-md text-gray-800 dark:text-gray-200 leading-loose mb-4 tracking-widest text-justify">
              What began as a small team with a passion for real estate has
              grown into a trusted brand that helps people turn dreams of owning
              property into reality. From modest beginnings, we’ve expanded our
              presence across prime locations, offering premium residences,
              investment opportunities, and lifestyle spaces that stand the test
              of time.
            </p>

            <p className="text-md text-gray-800 dark:text-gray-200 leading-loose tracking-widest text-justify">
              Our journey is built on a foundation of trust, transparency, and
              commitment to excellence. Every project we undertake reflects our
              belief that real estate is more than just buildings, it’s about
              creating communities, securing futures, and adding value to lives.
              Whether it’s a first home, a luxury villa, or an investment
              property, we are here to make your real estate journey seamless,
              rewarding, and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12   tracking-widest">
        <div
          className="w-11/12 md:w-5/6 mx-auto text-center"
          data-aos="fade-up"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[var(--title)] tracking-widest ">
            Why Choose Us
          </h2>
          <p className="text-lg md:text-xl text-[var(--primary-color)] mb-12">
            Elevating Your Home Buying Experience with Expertise, Integrity,{" "}
            <br />
            and Unmatched Personalized Service
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[var(--bg-color)] text-left p-6 shadow-sm hover:shadow-md transition-all"
                data-aos="zoom-in-up"
                data-aos-delay={index * 200} // stagger animation
              >
                <div className=" p-3 rounded-md w-fit mb-4 text-[var(--title)]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--title)]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--primary-color)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactInfo />
      <HelpSection />

      <Footer />
    </div>
  );
}
