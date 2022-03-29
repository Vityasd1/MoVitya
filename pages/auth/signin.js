import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import {LoginIcon} from "@heroicons/react/outline";
import Head from "next/head";
import {signInAnonymously} from "firebase/auth";
import {auth} from "../../firebase";

export default function SignIn({ providers }) {

    const handleLogin = async (id) => {
        await signInAnonymously(auth).then((res) => {
            console.log("Anonymous login");
        }).catch(e => console.log(e));
        signIn(id);

    }

    return (
        <>
            <Head>
                <title>MoVitya Login</title>
                <meta name="description" content="Login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <div className="mx-auto w-96 h-64 bg-[#35464c] z-10 rounded-md flex flex-col drop-shadow-xl">
                <div>
                    <h1 className={"text-center pt-3 text-3xl tracking-widest font-semibold text-white"}>MoVitya</h1>
                    <p className="text-center text-gray-400">Login to your account</p>
                </div>
                <div className="flex flex-col flex-1 justify-end pb-12 items-center">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className="group flex items-center border-2 border-cyan-900 p-3 rounded-xl drop-shadow-lg bg-[#06202a] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-[#06202a] duration-700" onClick={() => handleLogin(provider.id)}>
                               <LoginIcon className={"transition duration-700 group-hover:translate-x-2 h-6 pr-2"}/> Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}