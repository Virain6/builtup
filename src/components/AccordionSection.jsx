const AccordionSection = ({ title, description, isOpen, onClickTitle }) => {
  return (
    <div
      className={`transition-all duration-700 overflow-hidden ${
        isOpen ? "max-h-[500px] p-6" : "max-h-20 p-4"
      }`}
    >
      {/* Title only (always visible) */}
      <div
        onClick={onClickTitle}
        className={`cursor-pointer text-xl font-semibold flex items-center gap-4 ${
          isOpen ? "mb-4 text-black" : "text-gray-400"
        } transition-colors duration-300`}
      >
        {isOpen && <div className="h-6 w-1 bg-black"></div>}
        <span>{title}</span>
      </div>

      {/* Open state content */}
      {isOpen && (
        <div className="flex flex-col justify-start gap-4">
          <p className="text-gray-700">{description}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
