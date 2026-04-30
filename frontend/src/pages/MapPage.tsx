import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationIcon from "../img/location.png"
import RedLocationIcon from "../img/locationRed.png"
import { useEffect, useState, useRef } from "react";
import { createNewLocation, distance, map} from "../Helper"
import { useNavigate } from "react-router-dom";



export default function Map() {

    const [markers, setMarkers] = useState<{ id: number; geocode: [number, number] }[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [teacherMarkers,setTeacherMarkers] = useState<{ id: number; geocode: [number, number] }[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [farStudentsId, setFarStudentsId] = useState<number[]>([]); 
    const farArray= useRef<number[]>([]);

    


    useEffect(() => {   
        const getLocations = async () => {
        try {
            const location = await fetch("http://localhost:3000/location");
            const locationData = await location.json();
            const mapped = map(locationData);
            setMarkers(mapped);
            } catch (err) {
                console.error("שגיאה בטעינת מיקומים", err);
            }
        };
        const getTeachersLocations = async () =>{
            try {
            const location = await fetch("http://localhost:3000/location/teachers");
            const locationData = await location.json();
            const mapped = map(locationData);
            setTeacherMarkers(mapped);
            } catch (err) {
                console.error("שגיאה בטעינת מיקומים", err);
            }
        }
        const getStudents = async()=>{
            const bringStudents = await fetch("http://localhost:3000/student");
            const studentsData = await bringStudents.json();
            setStudents(studentsData);
        }
        const getTeachers = async()=>{
            const bringTeachers = await fetch("http://localhost:3000/teacher");
            const teachersData = await bringTeachers.json();
            setTeachers(teachersData);
        }
        getLocations(); 
        getStudents();
        getTeachers();
        getTeachersLocations();
        const interval = setInterval(getLocations, 5000); 
        return () => {clearInterval(interval)}; 
    }, []);

    const checkIfStudentIsFar = ()=> {
            markers.forEach(item=>{
                const student = students.find(s=> s.id === item.id);
                if(student){
                    const teacher = teachers.find(t=>t.grade === student.grade);
                    if(teacher){
                        const marker = teacherMarkers.find(m=> m.id === teacher.id);
                        if(marker){
                            const Distance = distance(item.geocode[0],item.geocode[1], marker.geocode[0], marker.geocode[1]);
                            if( Distance > 3  ){
                                if(!farArray.current.includes(item.id)){
                                    farArray.current.push(item.id);
                                    alert(`התלמידה ${student.firstName} ${student.lastName} התרחקה!!`)
                                }  
                            }
                            else if(farArray.current.includes(item.id)){
                                farArray.current = farArray.current.filter(fId=> fId != item.id);
                            } 
                        }
                
                    }
                
                }
                
            })
            setFarStudentsId([...farArray.current]);
        }

    useEffect(() => {
    if (
        markers.length &&
        students.length &&
        teachers.length &&
        teacherMarkers.length
    ) {
        checkIfStudentIsFar();
    }
    }, [markers, students, teachers, teacherMarkers]);

    
    const myIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize:[45,45]
    })
    const RedIcon = new Icon({
        iconUrl: RedLocationIcon,
        iconSize:[50,50]
    })

    const changeLocation = async()=>{
        students.forEach(async(item)=>{
            await createNewLocation(item.id,false);
        });
    }
    async function changeToFarLocation() {
        const rand = Math.floor(Math.random() * students.length);
        await createNewLocation(students[rand].id,true);
    }  

    const navigate = useNavigate();
    function goBack(): void{
        navigate("/teacher");
    }


  return (
  <div style={{ position: 'relative' }}>

    <div style={{
      position: 'absolute', top: '1rem', right: '1rem', zIndex: 1000,
      display: 'flex', flexDirection: 'column', gap: '0.5rem'
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '0.75rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '0.5rem'
      }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          פעולות
        </div>
        <button className="btn btn-secondary" onClick={changeLocation} style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}>
          שינוי מיקומים
        </button>
        <button className="btn btn-danger" onClick={changeToFarLocation} style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}>
          הרחקת תלמידה אקראית
        </button>
        <button className="btn btn-ghost" onClick={goBack} style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}>
          ← חזרה
        </button>
      </div>

    </div>

    <MapContainer center={[31.7683, 35.2137]} zoom={14} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {markers.map(item => {
        const student = students.find(s => s.id === item.id);
        const isFar = student ? farStudentsId.includes(student.id) : false;
        return (
          <Marker key={item.id} position={item.geocode} icon={isFar ? RedIcon : myIcon}>
            <Popup>
              <strong>{student ? `${student.firstName} ${student.lastName} ${item.id}` : item.id}</strong>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  </div>
);
}



