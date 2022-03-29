import {useSession} from "next-auth/react";

function LogoutItem({title,onClick}) {
    const session = useSession();
    return (<div onClick={onClick} className={'group flex flex-col justify-center items-center overflow-visible cursor-pointer w-12 sm:w-20 hover:text-white'}>
        <img
            src={session.data.user.image ?? 'https://links.papareact.com/ua6'}
            width={32}
            height={32}
            alt={"User profile"}

            className={"rounded-full group-hover:animate-bounce !overflow-visible  group-hover:z-40"}
        />
            <p className='tracking-widest opacity-0 group-hover:opacity-100'>{title}</p>
        </div>)


}
export default (LogoutItem);