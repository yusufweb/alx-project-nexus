import { ButtonProps } from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ title, className = "" }) => {
  return (
    <button
      type="submit"
      className={`px-6 py-2 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition-colors duration-300 text-lg shadow-sm cursor-pointer ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
