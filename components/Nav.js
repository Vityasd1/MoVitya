import React from 'react';
import {useRouter} from "next/router";
import {useSetRecoilState} from "recoil";

import {searchOpenState} from "../recoil/atoms/search";

const Nav = ({genres,localFilter}) => {
    const router = useRouter();
    const setShowSearchInput = useSetRecoilState(searchOpenState);
    const handleWheel = (e) => {
        document.getElementById("scrollContainer").scrollLeft += e.deltaY;
    }
    const handleAllClick = () => {
        setShowSearchInput(false);
        if(localFilter){
            router.push(router.pathname);
        }else{
            router.push(`/?page=1`)
        }
    }
    const handleGenreClick = (id,name) => {
        setShowSearchInput(false);
        if(localFilter){
            router.push(`${router.pathname}/?genre=${id}`);
        }else{
        router.push(`/?genre=${name}&page=1`)
        }
    }

 return (
    <nav  className='relative overflow-y-hidden' onWheel={(e) => handleWheel(e)}>
        <div id={"scrollContainer"}  className="flex px-10 sm:px-20 pb-5 text-2xl whitespace-nowrap space-x-10 overflow-x-scroll overflow-y-hidden sm:space-20 scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-cyan-900 mx-3 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <h2 onClick={handleAllClick} className="last:pr-24 cursor-pointer focus:scale-125 focus:text-white transition  duration-100 transform hover:scale-125 hover:text-white active:text-red-300">All</h2>
            {genres.map(({name,id}) => (
                <button  key={id} onClick={() => handleGenreClick(id,name) } className="last:pr-24 focus:scale-125 focus:text-white cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-300">{name}</button>
            ))}
        </div>
        <div className='absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12'/>
    </nav>
 );}

export default Nav;