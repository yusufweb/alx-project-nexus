import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faMobileVibrate } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/favourite', icon: faHeart, label: 'Favorite' },
  { href: '/', icon: faHome, label: 'CineHub' },
  { href: '/genre', icon: faMobileVibrate, label: 'Genre' },
];

const MobileNav: React.FC = () => {
  const router = useRouter();

  return (
    <div className="md:hidden lg:hidden flex fixed bottom-0 left-0 w-full bg-[#010822] text-white justify-around items-center h-[50px] shadow-lg z-50 py-8">
      {navLinks.map((link) => {
        const isActive = router.pathname === link.href;

        return (
          <Link href={link.href} key={link.href}>
            <div
              className={`flex flex-col justify-center items-center space-y-1.5 ${
                isActive ? 'text-cyan-300' : 'text-white'
              }`}
            >
              <FontAwesomeIcon icon={link.icon} className="text-2xl" />
              <p className="text-[12px]">{link.label}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;
