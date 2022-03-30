import React from 'react';
import Image from 'next/image';
import {
    BadgeCheckIcon,
    CollectionIcon,
    HomeIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon
} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import {signOut, useSession} from "next-auth/react";
import {useRecoilState} from "recoil";

import LogoutItem from "./LogoutImage";
import {searchOpenState} from "../recoil/atoms/search";
import HeaderItem from "./HeaderItem";

const Header = ({searchTerm, setSearchTerm}) => {
    const session = useSession();
    const router = useRouter();
    const [showSearchInput, setShowSearchInput] = useRecoilState(searchOpenState);
    const handleHomeClick = () => {
        setShowSearchInput(false);
        router.push('/')
    }
    const handleSignInClick = () => {
        setShowSearchInput(false);
        router.push('/auth/signin')
    }
    const handleWatchListClick = () => {
        setShowSearchInput(false);
        router.push('/watchlist')
    }
    const handleLogout = () => {
        setShowSearchInput(false);
        signOut();
    }
    const handleSearchClick = () => {
        setShowSearchInput(current => !current);
    }

    return (
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
            <div className="flex flex-grow justify-evenly max-w-2xl">
                <HeaderItem onClick={handleHomeClick} title={"HOME"} Icon={HomeIcon}/>
                <HeaderItem title={"TRENDING"} Icon={LightningBoltIcon}/>
                <HeaderItem title={"VERIFIED"} Icon={BadgeCheckIcon}/>
                {showSearchInput &&
                <div
                    className="flex focus-within:shadow-sm justify-start items-center w-full sm:p-4 p-2 mt-1 sm:mt-0 rounded-md h-6 bg-cyan-700 border-none outline-none">
                    <SearchIcon className="hidden sm:block sm:ml-1 text-white h-6"/>
                    <input type="text"
                           autoFocus
                           onChange={(e) => setSearchTerm(e.target.value)}
                           value={searchTerm}
                           className={"sm:px-2 text-sm sm:text-lg w-full text-white outline-none placeholder-gray-300 placeholder-opacity-0 sm:placeholder-opacity-100  bg-cyan-700"}
                           placeholder={"search"}
                    />
                </div>

                }
                {
                    <div className={showSearchInput ? "hidden sm:block" : ""}>
                        <HeaderItem onClick={handleSearchClick} title={"SEARCH"} Icon={SearchIcon}/>

                    </div>
                }
                {session.data ?
                    <>
                        <HeaderItem onClick={handleWatchListClick} title={"WATCHLIST"} Icon={CollectionIcon}/>
                        <LogoutItem onClick={handleLogout} title={"LOGOUT"}/>
                    </>
                    : <HeaderItem onClick={handleSignInClick} title={"LOGIN"} Icon={UserIcon}/>
                }
            </div>
            <Image
                className="object-cover"
                src={'/img/logo.png'}
                width={200}
                height={100}
                alt={"Logo"}
            />
        </header>
    );
}


export default Header;