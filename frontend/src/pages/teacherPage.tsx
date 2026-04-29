import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {createNewLocation} from "../Helper"

export default function TeacherPage(){

    const[teacher, setTeacher] = useState<any>(null);
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [grade, setGrade] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const showTeacher = async ()=>{
            const ID = localStorage.getItem("id");
            const teacherFetch = await fetch(`http://localhost:3000/teacher/${ID}`);
            const teacherData = await teacherFetch.json();
            setTeacher(teacherData);
        }
        showTeacher();
    },[]);

    const showAllStudents = async()=>{
        navigate("/data?type=students");
    }

    const showAllStudentsInGrade = async()=>{
        if(!teacher?.grade){
            alert("error");
            return;
        }
        navigate(`/data?type=students&grade=${teacher?.grade}`);
    }

    const showAllTeachers = async()=>{
        navigate("/data?type=teachers");
    }

    const searchStudent = async()=>{
        if(!id){
            alert("נא להכניס מספר זהות");
            return;
        }
        navigate(`/data?type=student&id=${id}`);
    }
    const searchTeacher = async()=>{
        if(!id){
            alert("נא להכניס מספר זהות");
            return;
        }
        navigate(`/data?type=teacher&id=${id}`);
    }

    const addStudent = async()=>{
        if(!id || !firstName || !lastName ||!grade){
            alert("נא להכניס פרטי תלמידה")
            return;
        }
        await fetch("http://localhost:3000/student", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            id: Number(id),
            firstName: firstName,
            lastName: lastName,
            grade: grade
            })
        });
        await createNewLocation(Number(id));
        alert("נוסף בהצלחה");
    }
    const addTeacher = async()=>{
        if(!id || !firstName || !lastName ||!grade){
            alert("נא להכניס פרטי מורה")
            return;
        }
        await fetch("http://localhost:3000/teacher", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            grade: grade
            })
        });
        alert("נוסף בהצלחה");
    }

     


    return(
        <div>
            <div>
            <h1> שלום {teacher?.firstName} {teacher?.lastName}</h1>
            <p>תז:  {teacher?.id} </p>
            <p> כיתה: {teacher?.grade}</p>
            <button onClick={searchStudent}>חיפוש תלמידה</button>
            <button onClick={searchTeacher}>חיפוש מורה</button>
            <button onClick={showAllStudents}>כל התלמידות</button>
            <button onClick={showAllStudentsInGrade}> התלמידות שלי</button>
            <button onClick={showAllTeachers}>כל המורות</button>
        </div>
        <div>
            <input
            value={id}
            onChange={(e)=> setId(e.target.value)}
            placeholder="נא להכניס מס' זהות"
            />
            <input
            value={firstName}
            onChange={(e)=> setFirstName(e.target.value)}
            placeholder="נא להכניס שם פרטי"
            />
            <input
            value={lastName}
            onChange={(e)=> setLastName(e.target.value)}
            placeholder="נא להכניס שם משפחה"
            />
            <input
            value={grade}
            onChange={(e)=> setGrade(e.target.value)}
            placeholder="נא להכניס פרטי כיתה"
            />
            <button onClick={addStudent}>הוספת תלמידה</button>
            <button onClick={addTeacher}>הוספת מורה</button>
        </div>
        <div>
            <button onClick={()=>navigate("/Map")}>לצפייה במיקומי התלמידות</button>
        </div>

        </div>
        
        
    )
}