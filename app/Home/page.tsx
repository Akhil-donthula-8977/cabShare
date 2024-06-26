"use client";
import { useEffect, useState, useCallback, useContext } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import WebSocketContext from "@/components/context/WebsocketContext";
import LocationSearchBox from "@/components/Custom/LocationSearchBox";
import { findNearbyLocations } from "@/actions/shareRequest.action";
import { Button } from "@/components/ui/button";
import SkeletonLoad from "@/utils/loaders";
import CabShareRequestBox from "@/components/Custom/CabShareRequestBox";
import { FormData, place } from "@/lib/types";
import useDebounce from "../(hooks)/useDebounce";
import { getLocation } from "@/utils/locationUtils";
import { raleway } from "@/lib/fonts";
const ListOfRequests = ({ data }) => {
  return (
    <div>
      {data?.map((e, index: number) => (
        <CabShareRequestBox key={index} data={e} />
      ))}
    </div>
  );
};
const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const socketContext = useContext(WebSocketContext);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [formLocationsData, setFormLocationsData] = useState({ fromLocation: "", toLocation: "", fromCoords: { type: "point", coordinates: [0, 0] }, toCoords: { type: "point", coordinates: [0, 0] } });
  const [inputValue, setInputValue] = useState('in');
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [listPlace, setListPlace] = useState<place[] | null>([]);
  const [LoadingStatus, setLoadingStatus] = useState("Search something");

  const handleSearch = useCallback(async () => {
    if (!formLocationsData.fromLocation || !formLocationsData.toLocation) {
      setLoadingStatus("Search something");
      return;
    }
    setLoadingStatus("loading");
    const res = await findNearbyLocations({ fromCoords: formLocationsData.fromCoords, toCoords: formLocationsData.toCoords });
    if (!res.length) {
      setLoadingStatus("NotFound");
      return;
    }
    setListPlace(res);
    setLoadingStatus("");
  }, [formLocationsData.fromLocation, formLocationsData.toLocation]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    getLocation((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);

  useEffect(() => {
    const { instance, id } = socketContext;
    if (instance && id) {
      instance.on("requestAccepted", (data) => {
        toast({ title: "Your cabshare request has been accepted, have a check" });
      });

      instance.on("requestNotification", (data) => {
        toast({ title: "You received a cabshare request" });
      });

      return () => {

      };
    }
  }, [socketContext, toast]);

  return (
    <main className={`${raleway.className} mt-2 flex flex-col items-center `}>
      <div className="flex flex-col md:flex-row justify-evenly sm:items-center  w-full max-w-4xl px-4 ">
        <div className="flex flex-col items-start mb-4 sm:mb-0">
          <label className="text-sm font-medium mb-1">From:</label>
          <LocationSearchBox
            value={formLocationsData.fromLocation}
            formLocationsData={formLocationsData}
            name="fromLocation"
            coords="fromCoords"
            setResult={setFormLocationsData}
          />
        </div>
        <div className="flex flex-col items-start mb-4 sm:mb-0">
          <label className="text-sm font-medium mb-1">To:</label>
          <LocationSearchBox
            value={formLocationsData.toLocation}
            formLocationsData={formLocationsData}
            name="toLocation"
            coords="toCoords"
            setResult={setFormLocationsData}
          />
        </div>
        <Button
          className="ml-2 sm:ml-4 h-8 text-xs px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="w-full max-w-4xl p-4 border-2 rounded-lg bg-white shadow-md mt-4">
        {LoadingStatus === "Search something" && <p className="text-center text-gray-500">Search something</p>}
        {LoadingStatus === "NotFound" && <p className="text-center text-red-500">Not Found</p>}
        {LoadingStatus === "loading" && <SkeletonLoad />}
        {LoadingStatus === "" && <ListOfRequests data={listPlace} />}
      </div>
    </main>
  );
};

export default Home;
