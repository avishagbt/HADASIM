import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationIcon from "../img/location.png"
import { useEffect, useState } from "react";
import { createNewLocation} from "../Helper"

function convertDMSToDecimal(degrees: number, minutes: number, seconds: number): number {
  return Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600;
}

export default function Map() {

    const [markers, setMarkers] = useState<{ id: number; geocode: [number, number] }[]>([]);
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {   
        const getLocations = async () => {
        try {
            const location = await fetch("http://localhost:3000/location");
            const locationData = await location.json();

            const mapped = locationData
                .filter((item: any) => item.Coordinates && item.Coordinates.Latitude && item.Coordinates.Longitude)
                .map((item: any) => ({
                    id: item.id,
                    geocode: [
                    convertDMSToDecimal(
                    item.Coordinates.Latitude.Degrees,
                    item.Coordinates.Latitude.Minutes,
                    item.Coordinates.Latitude.Seconds
                    ),
                    convertDMSToDecimal(
                    item.Coordinates.Longitude.Degrees,
                    item.Coordinates.Longitude.Minutes,
                    item.Coordinates.Longitude.Seconds
                    ),
                ] as [number, number],
            }));
            setMarkers(mapped);
            } catch (err) {
                    console.error("שגיאה בטעינת מיקומים", err);
            }
        };
        const getStudents = async()=>{
            const bringStudents = await fetch("http://localhost:3000/student");
            const studentsData = await bringStudents.json();
            setStudents(studentsData);
        }
        getLocations(); 
        getStudents();
        const interval = setInterval(getLocations, 60000); 
        return () => clearInterval(interval); 
    }, []);

    
    const myIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize:[50,50]
    })

     const changeLocation = async()=>{
        students.forEach(async(item)=>{
            await createNewLocation(item.id);
        });
}


  return (
    <div>
        <button onClick={changeLocation}>לשינוי מקום של התלמידות</button>
        <MapContainer center={[31.7683, 35.2137]} zoom={14} style={{ height: "100vh", width: "100%" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
        {
            markers.map(item =>
                {const student = students.find(s=> s.id === item.id);
                return(
                <Marker key={item.id} position={item.geocode} icon={myIcon}>
                    <Popup> {item.id} {student?student.firstName:""} {student?student.lastName:""}</Popup>
                </Marker>
            )})
        }
        </MapContainer>
    </div>
    
  );
}



