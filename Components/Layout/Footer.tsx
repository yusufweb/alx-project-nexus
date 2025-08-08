import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="text-white p-4 text-center py-6 mt-6">
      <div className="flex justify-center items-center space-x-3">
        <p>
          Made with{" "}
        </p>
        <Image
            src="/heart-saved.png"
            width={20}
            height={20}
            alt="heart-footer"
          />
          <p className="text-gray-400">Yusuf Ajao</p>
      </div>
    </footer>
  );
};

export default Footer;
