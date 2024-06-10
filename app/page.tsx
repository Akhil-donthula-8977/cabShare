// "use client"
// import { FaLocationArrow } from "react-icons/fa6";
// import { createRoot } from 'react-dom/client';
// import { raleway } from "@/lib/fonts"
// import { useCallback, useEffect, useState, memo, useMemo, useRef, useContext } from 'react';
// import { getLocation } from "@/utils/locationUtils";
// import { Button } from "@/components/ui/button";
// import useDebounce from "./(hooks)/useDebounce";
// import { place, Coordinates } from "@/lib/types";
// import LocationSearchBox from "@/components/Custom/LocationSearchBox";
// import { findNearbyLocations } from "@/actions/shareRequest.action";
// import CabShareRequestBox from "@/components/Custom/CabShareRequestBox";
// import SkeletonLoad from "@/utils/loaders";
// import { FormData } from "@/lib/types";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import WebSocketContext from "@/components/context/WebsocketContext";
// import { userSetSocketID } from "@/actions/user.actions";
// import { Toast } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";
// interface ListOfRequestsProps {
//   data: FormData[] | null;
// }

// const ListOfRequests: React.FC<ListOfRequestsProps> = ({ data }) => {
//   return (
//     <div>
//       {data?.map((e, index) => (
//         <CabShareRequestBox key={index} data={e} />
//       ))}
//     </div>
//   );
// };

import { redirect } from "next/navigation";
function Home() {

return redirect("/Home")
 // return (
    // <main className={`mt-2 ${raleway.className} flex flex-col items-center`}>
    //   <div className="flex flex-col sm:flex-row justify-evenly sm:items-center w-full max-w-4xl px-4">
    //     <div className="flex flex-col items-start mb-4 sm:mb-0">
    //       <label className="text-sm font-medium mb-1">From:</label>
    //       <LocationSearchBox
    //         value={formLocationsData.fromLocation}
    //         formLocationsData={formLocationsData}
    //         name="fromLocation"
    //         coords="fromCoords"
    //         setResult={setFormLocationsData}
           
    //       />
    //     </div>
    //     <div className="flex flex-col items-start mb-4 sm:mb-0">
    //       <label className="text-sm font-medium mb-1">To:</label>
    //       <LocationSearchBox
    //         value={formLocationsData.toLocation}
    //         formLocationsData={formLocationsData}
    //         name="toLocation"
    //         coords="toCoords"
    //         setResult={setFormLocationsData}
    //       />
    //     </div>
    //     <Button
    //       className="ml-2 sm:ml-4 h-8 text-xs px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    //       onClick={handleSearch}
    //     >
    //       Search
    //     </Button>
    //   </div>
    //   <div className="w-full max-w-4xl p-4 border-2 rounded-lg bg-white shadow-md mt-4">
    //     {LoadingStatus === "Search something" && <p className="text-center text-gray-500">Search something</p>}
    //     {LoadingStatus === "NotFound" && <p className="text-center text-red-500">Not Found</p>}
    //     {LoadingStatus === "loading" && <SkeletonLoad />}
    //     {LoadingStatus === "" && <ListOfRequests data={listPlace} socket={socketInstance} />}
    //   </div>
    // </main>
  //);
}

export default Home;
