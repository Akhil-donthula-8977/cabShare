"use server"
import mongoose from "mongoose";
import { connectDatabase } from "@/lib/db"
import ShareTransportRequest from "@/app/models/ShareTransportRequest";
import { Coordinates } from "@/lib/types";
interface IShareTransportRequest {
  name: string;
  numberOfPeople: number;
  anyone: boolean;
  male: boolean;
  female: boolean;
  split: boolean;
  splitMoney: number;
  startLocation: string;
  endLocation: string;
  date: string;
  startLocationCoords: Coordinates;
  endLocationCoords: Coordinates;
}


export const getShareRequest = async (FormData: IShareTransportRequest) => {
  try {
    await connectDatabase();
    const data = new ShareTransportRequest(FormData);
    const savedFormData = await data.save();
    await ShareTransportRequest.create(FormData)
    console.log(FormData)
    return JSON.parse(JSON.stringify(data));

  }
  catch (error) {

    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.keys(error.errors).map(key => ({
        field: key,
        //@ts-ignore
        message: error.errors[key].message
      }));
      console.log(errors)
      return errors
    }
  }
}
function calculateDistance(coords1: [number, number], coords2: [number, number]) {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon1 - lon2) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

export async function findNearbyLocations(formdata: { fromCoords: Coordinates, toCoords: Coordinates }) {
  await connectDatabase();
  try {
      //@ts-ignore
     
      const locationsNearStart = await ShareTransportRequest.find({
        startLocationCoords: {
          $near: {
            $geometry: formdata.fromCoords,
            $maxDistance: 10000 // 5 km in meters
          }
        }
    });

     setInterval(()=>{
        
     },10000)

    const nearbyLocations = locationsNearStart.filter(location => {
      const endCoords: [number, number] = [location.endLocationCoords.coordinates[0], location.endLocationCoords.coordinates[1]];
      return calculateDistance(endCoords, formdata.toCoords.coordinates) <= 5000;
    });

    console.log("near",nearbyLocations)
    return JSON.parse(JSON.stringify( nearbyLocations));
  } catch (error) {
    console.error('Error finding nearby locations:', error);
    throw error;
  }
}
