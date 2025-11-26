"use client";

// import PhoneInput, { Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function ContactPage() {
  return (
    <div className=" bg-white min-h-screen text-black">
      <Navbar />

      <section className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-8  mt-20 md:mt-32">
        <div className="pt-4">
          <h2 className="text-2xl md:text-3xl mb-2 font-semibold text-[var(--primary-color)] font-amatic border-l-4 border-[var(--primary-color)] pl-3">
            Head Office
          </h2>
          <hr />

          <p className="mb-1 text-lg font-semibold">Delhi, India</p>
          <p className="mb-4">
            Plot # 2, Sanjay Nagar, Gulabi Bagh, Delhi 110007, India
          </p>
          <h2 className=" mt-6 text-2xl md:text-3xl mb-2 font-semibold text-[var(--primary-color)] font-amatic border-l-4 border-[var(--primary-color)] pl-3">
            Branch Offices
          </h2>
          <hr />

          <p className="mb-1 text-lg font-semibold">Goa, India</p>
          <p className="mb-4">
            Office No FF-15, 5th Floor, Prabhu Chambers, Mapusa Bardez Goa
          </p>

          <p className="text-gray-400 mt-8">
            Our business operating hours are as follows:
          </p>
          <p className="mt-2">Monday to Saturday: 11:00am - 7:30pm</p>
        </div>

        <div className="pt-4">
          <h2 className="text-2xl md:text-3xl mb-2 font-semibold text-[var(--primary-color)] font-amatic border-l-4 border-[var(--primary-color)] pl-3">
            Get in Touch
          </h2>
          <hr />
          <p className="mb-4 text-gray-400 font-sans">
            Please contact us via phone or email below or visit us at our Head
            Office in Business Bay during operating hours.
          </p>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-md p-4 flex items-center gap-4 shadow-sm hover:bg-gray-200 transition font-sans">
              <Phone className="w-6 h-6 text-gray-700" />
              <span className="text-sm text-gray-700">+91 9623858108</span>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/+919623858108"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-md p-4 flex items-center gap-4 shadow-sm hover:bg-gray-200 transition font-sans"
            >
              <FaWhatsapp className="w-6 h-6 text-green-600" />
              <span className="text-sm text-gray-700">+91 9623858108</span>
            </a>

            {/* Email Button */}
            <a
              href="mailto:info@khalsaproperty.in"
              className="bg-white rounded-md p-4 flex items-center gap-4 shadow-sm hover:bg-gray-200 transition font-sans"
            >
              <Mail className="w-6 h-6 text-gray-700" />
              <span className="text-sm text-gray-700">
                info@khalsaproperty.in
              </span>
            </a>
          </div>
        </div>
      </section>

      <div className="w-11/12 md:w-5/6 mx-auto">
        <h2 className="  text-lg text-[var(--secondary-color)]">
          Have questions, need marketing advice, or interested in growing your
          brand online?
        </h2>
        <p className=" text-md text-gray-400">
          Reach out to us via email, phone, or simply fill out the form below.
          Your inquiry will be directed to the right Bigwig Digital marketing
          expert, and we’ll get back to you within 24 hours.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-start py-8 gap-10 mb-7  ">
          {/* Form Section */}
          {/* <div className="w-full md:w-1/2 max-w-lg bg-gray-100 rounded-lg p-8 shadow-lg text-left  border border-[var(--primary-color)]">
          <form className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              className="bg-white border border-gray-600 placeholder-gray-400 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="bg-white border border-gray-600  placeholder-gray-400 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />

            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="IN"
              international
              className="bg-white border border-gray-600 px-4 py-3 text-[16px] rounded-lg w-full text-black placeholder-gray-400"
              onChange={function (_value?: Value): void {
                throw new Error("Function not implemented.");
              }}
            />

            <textarea
              rows={4}
              name="message"
              placeholder="Your Message"
              className="bg-white border border-gray-600 placeholder-gray-400 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-[var(--primary-color)] hover:opacity-80 text-white py-3 px-6 rounded-lg w-full transition font-semibold"
            >
              Submit
            </button>
          </form>
        </div> */}

          {/* Map Section */}
          <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg border border-[var(--primary-color)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.456367506469!2d77.18617288098022!3d28.675992012833134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0278ebc00fbb%3A0x64f8a1ecc1a04cb6!2sKhalsa%20Property%20Dealer!5e0!3m2!1sen!2sin!4v1748007332649!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
