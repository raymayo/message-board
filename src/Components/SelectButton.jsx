import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SelectButton = ({ options, value, onChange, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setTimeout(() => setIsOpen(false), 0); // Ensures state updates properly
  };

  return (
    <div className="relative w-full">
      <button
        className="w-full px-3 py-2 border border-gray-300 text-sm rounded-md flex justify-between items-center bg-white shadow-sm hover:bg-gray-100 focus:outline-none cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10 transition-all duration-300 p-1.5">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100 text-sm rounded"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectButton;
