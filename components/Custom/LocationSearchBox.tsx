import React, { useCallback, useState, useEffect } from 'react'
import useDebounce from '@/app/(hooks)/useDebounce';
import { Coordinates, place } from '@/lib/types';
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?"
const params = {
  q: "",
  format: "json",
  addressDetails: "addressdetails"
}

const LocationSearchBox = ({ setResult, formLocationsData, name, value, coords }: { setResult: Function, name: string, formLocationsData: object, value: string, coords: string }) => {
  const [listPlace, setListPlace] = useState([]);
  const [query,setQuery]=useState<string>("");
  const debouncedInputValue = useDebounce(query, 500);
  const [showResults, setShowResults] = useState<boolean>(true);
 
  const fetchSearchResults = useCallback(async (query: string) => {
    const params = {
      q: value,
      format: "json",
      addressdetails: "1", // Convert number to string
      polygon_geojson: "0",

    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect, // Explicitly typecast to RequestRedirect
    };
    if(value=="")return
    await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  }, [value]);


  const handleChange =useCallback ((e: React.FormEvent<HTMLInputElement>) => {

    e.preventDefault();
    const { name, value } = e.currentTarget;
    if(!showResults)setShowResults(true)
    setQuery(prev=>value);
    setResult((prev: object) => ({
      ...prev,
      [name]: value,
    }));
  },[value,query]);

  useEffect(() => {
    async function fun() {
      fetchSearchResults(debouncedInputValue);
    }
    fun();
  }, [debouncedInputValue]);
  return (
    <div className='relative   rounded-[14px] '>
      <input autoComplete="off" className=" ml-2 min-w-[400px] text-[13px] w-full mx-4 sm:ml-0 sm:w-[400px] m-1 rounded-[16px] sm:h-[35px] h-[28px] pl-[9px] border-[3px]" type="text" name={name} value={value} onChange={handleChange}  ></input>
      {showResults&&
        <div className="w-full left-3 z-10 text-[10px] max-[450px]:left-[10px] rounded-xl absolute bg-slate-300 ">
          {
            listPlace?.map((e: place,index) => {
              return <li className="w-full hover:bg-slate-500 p-2 text-sm border-b-2 border-x-2" key={index} onClick={() => {
                setResult((prev: object) => ({
                  ...prev,
                  [`${name}`]: e.display_name,
                  [`${coords}`]:{
                    ["type"]:"Point",
                    ["coordinates"]:[e.lat, e.lon]

                  } 

                }))
                setShowResults(false)
                setListPlace([]);
              }}  >{e.display_name}</li>
            })

          }
        </div>
      }

    </div>
  )
}

export default LocationSearchBox