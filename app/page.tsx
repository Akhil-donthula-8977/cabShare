"use client"
import { FaLocationArrow } from "react-icons/fa6";
import { raleway } from "@/lib/fonts"
import { useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api';
import { getLocation } from "@/utils/locationUtils";
import { fetchDirections } from "@/utils/locationUtils";
import { Button } from "@/components/ui/button";

function Home() {
  const [center, setCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | undefined>(undefined);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null)
  const [distance, setDistance] = useState<string | undefined>(''); // Initialize as undefined
  const [duration, setDuration] = useState<string | undefined>('');
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API || '',
    libraries: ["places", "geocoding"]
  });
  const calculateDistance = useCallback(async () =>
    await fetchDirections(originRef, destinationRef, setDistance, setDuration, setDirectionsResponse)
    , [originRef.current?.value, destinationRef.current?.value]);
  useEffect(() => {
    getLocation((position: GeolocationPosition) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);


  if (!isLoaded) {
    return
    <main className={`mt-2 ${raleway.className} font-semibold`}>
      <p>Loading...</p>
    </main>
  }

  return (
    <main className={`mt-2 ${raleway.className}`}>
      <div className="flex flex-col sm:flex-row justify-evenly sm:items-center  ">
        <Autocomplete>
          <input className="w-full ml-2 sm:ml-0 sm:w-[400px] m-1 rounded-[16px] sm:h-[35px] pl-[9px] border-[3px]" type="text" name="fromLocation" ref={originRef}></input>
        </Autocomplete>
        <Autocomplete>
          <input className="w-full ml-2 sm:ml-0  sm:w-[400px] m-1 rounded-[16px] sm:h-[35px] pl-[9px] border-[3px]" type="text" name="toLocation" ref={destinationRef}></input>
        </Autocomplete>
        <Button className=" ml-2 sm:ml-0  h-[26px] text-[12px]" onClick={() => {
        }}>Search</Button>
      </div >
      <div className="w-[100px] h-[100px]">

        <div className="border w-fit p-1 rounded-[50px] text-center hover:bg-slate-300 hover:text-slate-800 " onClick={() => {
          map?.panTo(center ? center : { lat: 0, lng: 0 })
        }}>
          <FaLocationArrow className="w-5 h-5 text-slate-500  m-1 " />
        </div>
        <Button className="h-[26px] text-[12px]" onClick={calculateDistance}>calculate Distance</Button>
        <GoogleMap center={center} zoom={15} mapContainerClassName="w-[400px] h-[400px]"
          onLoad={map => setMap(map)}
          options={{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          }} >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          <Marker position={center ? center : { lat: 0, lng: 0 }}></Marker>
        </GoogleMap>
        {distance}
        {duration}
      </div>
    </main >
  );
}

export default memo(Home);
