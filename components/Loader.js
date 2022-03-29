import React from 'react';

const Loader = (props) => {
 return (
     <div className="flex justify-center items-center h-full w-full">
         <div className="flex items-center justify-center ">
             <div className="w-16 h-16 border-b-2 border-white rounded-full animate-spin"></div>
         </div>
     </div>
 );}

export default Loader;