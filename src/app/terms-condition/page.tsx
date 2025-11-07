"use client";

import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 prose prose-lg pt-36">
        <h1 className="text-4xl pb-5">Terms and Conditions</h1>
        <p>
          <strong>Last updated:</strong> September 16, 2025
        </p>

        <p>
          Please read these terms and conditions carefully before using Our
          Service.
        </p>

        <h2>Interpretation and Definitions</h2>

        <h3>Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>

        <h3>Definitions</h3>
        <p>
          <strong>Affiliate</strong> means an entity that controls, is
          controlled by or is under common control with a party, where
          &#34;control&#34; means ownership of 50% or more of the shares, equity
          interest or other securities entitled to vote for election of
          directors or other managing authority.
        </p>
        <p>
          <strong>Country:</strong> Goa, India
        </p>
        <p>
          <strong>Company:</strong> Homes and Land Goa
        </p>
        <p>
          <strong>Device:</strong> Any device that can access the Service such
          as a computer, a cellphone or a digital tablet.
        </p>
        <p>
          <strong>Service:</strong> The Website.
        </p>
        <p>
          <strong>Terms and Conditions:</strong> These Terms and Conditions that
          form the entire agreement between You and the Company regarding the
          use of the Service.
        </p>
        <p>
          <strong>Third-party Social Media Service:</strong> Any services or
          content provided by a third party that may be displayed or included by
          the Service.
        </p>
        <p>
          <strong>Website:</strong> Homes and Land Goa, accessible from{" "}
          <a
            href="https://homesandlandgoa.com"
            target="_blank"
            className="text-blue-600 underline"
          >
            https://homesandlandgoa.com/
          </a>
        </p>
        <p>
          <strong>You:</strong> The individual or entity using the Service.
        </p>

        <h2>Acknowledgment</h2>
        <p>
          These are the Terms and Conditions governing the use of this Service
          and the agreement that operates between You and the Company. These
          Terms and Conditions set out the rights and obligations of all users
          regarding the use of the Service.
        </p>
        <p>
          Your access to and use of the Service is conditioned on Your
          acceptance of and compliance with these Terms and Conditions.
        </p>
        <p>
          By accessing or using the Service You agree to be bound by these Terms
          and Conditions.
        </p>
        <p>
          You represent that you are over the age of 18. The Company does not
          permit those under 18 to use the Service.
        </p>
        <p>
          Your access to and use of the Service is also conditioned on Your
          acceptance of and compliance with the Privacy Policy of the Company.
        </p>

        <h2>Links to Other Websites</h2>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by the Company.
        </p>
        <p>
          The Company has no control over, and assumes no responsibility for,
          the content, privacy policies, or practices of any third party web
          sites or services.
        </p>
        <p>
          We strongly advise You to read the terms and conditions and privacy
          policies of any third-party web sites or services that You visit.
        </p>

        <h2>Termination</h2>
        <p>
          We may terminate or suspend Your access immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if You breach these Terms and Conditions.
        </p>
        <p>
          Upon termination, Your right to use the Service will cease
          immediately.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Notwithstanding any damages that You might incur, the entire liability
          of the Company and any of its suppliers under any provision of this
          Terms and Your exclusive remedy for all of the foregoing shall be
          limited to the amount actually paid by You through the Service or 100
          USD if You haven&#39;t purchased anything through the Service.
        </p>
        <p>
          To the maximum extent permitted by applicable law, the Company or its
          suppliers shall not be liable for any special, incidental, indirect,
          or consequential damages whatsoever.
        </p>

        <h2>&#34;AS IS&#34; and &#34;AS AVAILABLE&#34; Disclaimer</h2>
        <p>
          The Service is provided to You &#34;AS IS&#34; and &#34;AS
          AVAILABLE&#34; and with all faults and defects without warranty of any
          kind.
        </p>
        <p>
          Neither the Company nor any of the company&#39;s provider makes any
          representation or warranty of any kind, express or implied, including
          availability, accuracy, or freedom from harmful components.
        </p>

        <h2>Governing Law</h2>
        <p>
          The laws of the Country, excluding its conflicts of law rules, shall
          govern this Terms and Your use of the Service.
        </p>

        <h2>Disputes Resolution</h2>
        <p>
          If You have any concern or dispute about the Service, You agree to
          first try to resolve the dispute informally by contacting the Company.
        </p>

        <h2>For European Union (EU) Users</h2>
        <p>
          You will benefit from any mandatory provisions of the law of the
          country in which You are resident.
        </p>

        <h2>United States Legal Compliance</h2>
        <p>
          You represent and warrant that (i) You are not located in a country
          subject to US government embargo, and (ii) You are not listed on any
          restricted party list.
        </p>

        <h2>Severability and Waiver</h2>
        <p>
          If any provision of these Terms is held unenforceable, it will be
          reinterpreted and the remaining provisions will remain valid.
        </p>

        <h2>Translation Interpretation</h2>
        <p>
          In case of any dispute, the original English version shall prevail.
        </p>

        <h2>Changes to These Terms and Conditions</h2>
        <p>
          We reserve the right, at Our sole discretion, to modify or replace
          these Terms at any time. Changes become effective when posted.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms and Conditions, you can
          contact us at{" "}
          <a
            href="mailto:supports@homesandlandgoa.com"
            className="text-blue-600 underline"
          >
            supports@homesandlandgoa.com
          </a>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
}
