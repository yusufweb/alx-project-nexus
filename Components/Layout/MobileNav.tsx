import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMobileVibrate } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const MobileNav: React.FC = () => {
    return (
        <div className='md:hidden lg:hidden flex fixed bottom-0 left-0 w-full bg-[#010822] text-white justify-around items-center h-[50px] shadow-lg z-50 py-8'>
            <Link href="/favourite"><div className='text-lg flex flex-col justify-center items-center'><FontAwesomeIcon icon={faHeart} className="text-white"/> <p >Favorite</p></div></Link>
            <Link href="/"><div className='text-xl'>CineHub</div></Link>
            <Link href="genre"><div className='text-lg flex flex-col justify-center items-center'><FontAwesomeIcon icon={faMobileVibrate} className="text-white"/> Genre</div></Link>
        </div>
    );
};

export default MobileNav;