import { RefObject } from 'react';
export const getLocation = (getCurrentLocation: PositionCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCurrentLocation, (error) => console.error("Error getting location:", error));
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};


// to get geo coords of a place
export const geocodeAddress = async (address: string) => {
  return new Promise<[number, number]>((resolve) => {
    const geocoding = new google.maps.Geocoder();
    geocoding.geocode({ address }, (results, status) => {
      if (status === 'OK' && results) {
        const location = results[0].geometry.location;
        let lng = location.lng();
        let lat = location.lat();
        let arr:[number,number] = [lat, lng];
        resolve(arr);
      } else {
        resolve([0, 0]);
      }
    });
  });
};


export async function fetchDirections(
  originRef: RefObject<HTMLInputElement>,
  destinationRef: RefObject<HTMLInputElement>,
  setDistance: (distance: string) => void,
  setDuration: (duration: string) => void,
  setDirectionsResponse: ((response: any) => void) | undefined = undefined,
  // setDirectionsResponse?: (response: any) => void // Optional function
): Promise<void> {
  if (!originRef.current || !destinationRef.current) {
    return;
  }
  const directionsService = new google.maps.DirectionsService();
  const results = await directionsService.route({
    origin: originRef.current.value,
    destination: destinationRef.current.value,
    travelMode: google.maps.TravelMode.DRIVING,
  });
  if (!results) {
    return;
  }
  if (setDirectionsResponse) {
    setDirectionsResponse(results);
  }
  const firstRoute = results.routes?.[0];
  if (firstRoute) {
    const firstLeg = firstRoute.legs?.[0];
    if (firstLeg) {
      setDistance(firstLeg.distance?.text ?? '');
      setDuration(firstLeg.duration?.text ?? '');
    }
  }
}
