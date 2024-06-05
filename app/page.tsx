"use client"
import { FaLocationArrow } from "react-icons/fa6";
import { createRoot } from 'react-dom/client';
import { raleway } from "@/lib/fonts"
import { useCallback, useEffect, useState, memo, useMemo, useRef, useContext } from 'react';
import { getLocation } from "@/utils/locationUtils";
import { Button } from "@/components/ui/button";
import useDebounce from "./(hooks)/useDebounce";
import { place, Coordinates } from "@/lib/types";
import LocationSearchBox from "@/components/Custom/LocationSearchBox";
import { findNearbyLocations } from "@/actions/shareRequest.action";
import CabShareRequestBox from "@/components/Custom/CabShareRequestBox";
import SkeletonLoad from "@/utils/loaders";
import { FormData } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WebSocketContext from "@/components/context/WebsocketContext";
import { unstable_noStore } from "next/cache";
import { userSetSocketID } from "@/actions/user.actions";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
interface ListOfRequestsProps {
  data: FormData[] | null;
}

const ListOfRequests: React.FC<ListOfRequestsProps> = ({ data }) => {
  return (
    <div>
      {data?.map((e, index) => (
        <CabShareRequestBox key={index} data={e} />
      ))}
    </div>
  );
};


function Home() {
  //  unstable_noStore()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [selectPosition, setSelectPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [formLocationsData, setFormLocationsData] = useState({ fromLocation: "", toLocation: "", fromCoords: { type: "point", coordinates: [0, 0] }, toCoords: { type: "point", coordinates: [0, 0] } });
  const [inputValue, setInputValue] = useState('in');
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [listPlace, setListPlace] = useState<place[] | null>([]);
  const [LoadingStatus, setLoadingStatus] = useState<string>("Search something")
  const socketInstance = useContext(WebSocketContext)
  const { toast } = useToast()


  const handleSearch = async () => {
    if (formLocationsData.fromLocation == "" || formLocationsData.toLocation == "") {
      setLoadingStatus("Search something");
      return;
    }
    setLoadingStatus("loading")
    //@ts-ignore
    const res = await findNearbyLocations({ fromCoords: formLocationsData.fromCoords, toCoords: formLocationsData.toCoords })
    console.log(res)
    if (res.length == 0) {
      setLoadingStatus("NotFound")
      return;
    }
    setListPlace(res);
    setLoadingStatus("");
  };
  if (status === "unauthenticated") {
    router.replace("/auth/signin")
  }
  useEffect(() => {
    async function fun() {
      const hasEffectRunBefore = localStorage.getItem("socketID");
      if (hasEffectRunBefore !== socketInstance?.id && session?.user?._id) {
        console.log("Socket ID changed:", socketInstance?.id);
        // Perform your logic here
        console.log(session?.user?._id)
        if (socketInstance?.id && session?.user?._id) {
          console.log("changing")
          await userSetSocketID(socketInstance?.id, session?.user?._id);
        }
        localStorage.setItem("socketID", socketInstance?.id);
      }
    }

    fun();
  }, [socketInstance?.id, session?.user?._id]);


  useEffect(() => {
    getLocation((position: GeolocationPosition) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);
  useEffect(() => {
    socketInstance?.instance?.on("requestAccepted", (data) => {
      console.log(data)
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    })
  }, [])

  useEffect(() => {
    let socket = socketInstance?.instance;
    if (!socket) return;
    socket.on('requestNotification', (data) => {
      console.log('Received request notification:', data);
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    });
  }, []);

  return (
    <main className={`mt-2 ${raleway.className}  flex flex-col items-center`}>

      <div className="flex flex-col sm:flex-row justify-evenly sm:items-center  ">
        <div className="flex flex-start flex-col items-start ">
          <label className="text-[13px]"> from:</label>
          <LocationSearchBox value={formLocationsData.fromLocation} formLocationsData={formLocationsData} name={"fromLocation"} coords={"fromCoords"} setResult={setFormLocationsData} ></LocationSearchBox>
        </div>
        <div className="flex flex-start flex-col items-start">
          <label className="text-[13px]"> To :</label>
          <LocationSearchBox value={formLocationsData.toLocation} formLocationsData={formLocationsData} name={"toLocation"} coords={"toCoords"} setResult={(setFormLocationsData)}></LocationSearchBox>
        </div>
        <Button className=" ml-2 sm:ml-0 sm:mt-4  h-[26px]  text-[12px]" onClick={handleSearch}>Search</Button>
      </div>
      <div className="md:w-[80%] smd:w-[60%]  w-full p-1  border-2 h-screen ">
        {LoadingStatus === "Search something" && <p className="text-center">Search something</p>}
        {LoadingStatus === "NotFound" && <p className="text-center">Not Found</p>}
        {LoadingStatus == "loading" && <SkeletonLoad></SkeletonLoad>}
        {LoadingStatus == "" && <ListOfRequests data={listPlace} socket={socketInstance} />}
      </div>
    </main >
  );
}

export default memo(Home);
