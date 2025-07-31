import Link from "next/link";
import Button from "../common/Button";

const Header: React.FC = () => {
  return (
    <header className="w-full px-2 lg:px-8 md:px-8 sm:px-8 py-4 flex items-center fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl hidden sm:block lg:block md:block">
            Cine
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>
        </div>
        <div className="lg:w-[70%] md:w-[70%] sm:w-[70%] w-[100%]">
          <form>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows..."
                className="w-full p-4 pl-12 rounded-full bg-[#010a2b] bg-opacity-90 text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-white text-lg"
              />
              {/* Simple Search Icon */}
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <Button
                title="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition-colors duration-300 text-lg shadow-sm cursor-pointer"
              />
            </div>
          </form>
        </div>
        <div className="hidden lg:block md:block sm:block">
          <Link href="/">
            <p className="text-[16px] font-semibold">Favorite</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
