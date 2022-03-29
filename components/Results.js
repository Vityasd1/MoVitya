import React, {useEffect, useState} from 'react';
import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";
import axios from "axios";
import requests from "../utils/requests";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {watchListState as watchAtom} from "../recoil/atoms/movies";
import {useRouter} from "next/router";
import ReactPaginate from "react-paginate";
import Loader from "./Loader";

const Results = ({results, watchList}) => {
    const router= useRouter();
    const [initalPage, setInitalPage] = useState(results?.page || 1);
    const [loading, setLoading] = useState(false);
    const pagginationHandler = (page) => {
        setLoading(true);
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.page = page.selected + 1;

        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
        setLoading(false);
    };
    if(loading){
        return <Loader/>
    }

    return (
        <>
            <FlipMove className='px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center'>
            {results ? results.results.map((result) => (
                    <Thumbnail key={result.id} movie={result}/>
                ))
                :
                watchList.map((result) => {
                    return <Thumbnail key={result.id} fromWatchList={true} movie={result}/>
            })
            }
        </FlipMove>
            {results &&
                <div className="flex justify-center items-center mb-3">
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        activeClassName={'bg-cyan-700 !text-white'}
                        containerClassName={'tesztcss flex items-center justify-center bg-white'}
                        subContainerClassName={'asd'}
                        pageClassName={"text-[#06202A] font-bold border border-[#06202A] border-solid p-2"}
                        previousClassName={"bg-white !text-[#06202A] font-bold border border-[#06202A] border-solid p-2"}
                        nextClassName={"bg-white !text-[#06202A] font-bold border border-[#06202A] border-solid p-2"}
                        breakClassName={"bg-white !text-[#06202A] font-bold border border-[#06202A] border-solid p-2"}
                        forcePage={results?.page - 1}
                        pageCount={results?.total_pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={pagginationHandler}
                    />
                </div>
            }
        </>

    );
}

export default Results;