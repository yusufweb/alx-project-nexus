import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHome, faMobileVibrate } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const MobileNav: React.FC = () => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className='md:hidden lg:hidden flex fixed bottom-0 left-0 w-full bg-[#010822] text-white justify-around items-center h-[50px] shadow-lg z-50 py-8'>
            <Link href="/favourite"><div className='flex flex-col justify-center items-center'><FontAwesomeIcon icon={faHeart} className="text-white text-2xl"/><p className='text-sm'>Favorite</p></div></Link>
            <Link href="/"><div className='flex flex-col justify-center items-center'><FontAwesomeIcon icon={faHome} className="text-white text-2xl"/><p className='text-sm'>CineHub</p></div></Link>
            <Link href="/genre"><div className='flex flex-col justify-center items-center'><FontAwesomeIcon icon={faMobileVibrate} className="text-white text-2xl"/><p>Genre</p></div></Link>
        </div>
    );
};

export default MobileNav;