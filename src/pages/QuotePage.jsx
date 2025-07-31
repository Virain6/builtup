const QuoteSection = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-12 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(160,89,48)]">
          Ready to Build? Get a Quote Today.
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Contact us for a free consultation or estimate on your next project.
        </p>

        <div className="mt-8 space-y-4 text-lg text-gray-800">
          <p>
            📞 <strong>Phone:</strong>{" "}
            <a
              href="tel:+16471234567"
              className="text-blue-600 hover:underline"
            >
              +1 (647) 123-4567
            </a>
          </p>
          <p>
            📧 <strong>Email:</strong>{" "}
            <a
              href="mailto:info@builtupconstruction.ca"
              className="text-blue-600 hover:underline"
            >
              info@builtupconstruction.ca
            </a>
          </p>
        </div>

        <a
          href="mailto:info@builtupconstruction.ca"
          className="mt-8 inline-block bg-[rgb(160,89,48)] text-white font-medium px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
};

export default QuoteSection;
