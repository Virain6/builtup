import { Phone, Mail } from "lucide-react";

const QuoteSection = () => {
  return (
    <section
      className="bg-[rgb(160,89,48)] py-12 px-6 md:px-12 text-center text-white"
      id="contact"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Build? Get a Quote Today.
        </h2>
        <p className="mt-4 text-lg">
          Contact us for a free consultation or estimate on your next project.
        </p>

        <div className="mt-8 space-y-4 text-lg">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            <strong>Phone:</strong>
            <a
              href="tel:+16471234567"
              className="underline hover:text-gray-200"
            >
              +1 (647) 123-4567
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            <strong>Email:</strong>
            <a
              href="mailto:info@builtupconstruction.ca"
              className="underline hover:text-gray-200"
            >
              info@builtupconstruction.ca
            </a>
          </p>
        </div>

        <a
          href="mailto:info@builtupconstruction.ca"
          className="mt-8 inline-block bg-white text-[rgb(160,89,48)] font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
};

export default QuoteSection;
