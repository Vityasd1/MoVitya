import React from 'react';

const HeaderItem = ({Icon,title,onClick}) => {
 return (
    <div onClick={onClick} className={'group flex flex-col justify-center items-center cursor-pointer w-12 sm:w-20 hover:text-white'}>
        <Icon key={Icon?.render?.name || "1"} className={"h-8 mb-1 group-hover:animate-bounce"}></Icon>
        <p className='tracking-widest opacity-0 group-hover:opacity-100'>{title}</p>
    </div>
 );}

export default HeaderItem;