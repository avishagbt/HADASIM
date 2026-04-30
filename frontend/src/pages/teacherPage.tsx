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
        try {
            if(!id){
            alert("נא להכניס מספר זהות");
            return;
        }
        const url = await fetch(`http://localhost:3000/student/${id}`);
        if(!url.ok){
            alert("התלמידה לא קיימת");
            return;
        }
        const data = await url.json();

        if (!data) {
            alert("התלמידה לא קיימת");
            return;
        }
        navigate(`/data?type=student&id=${id}`);
        } catch (error) {
            alert("התלמידה לא קיימת");
        }
        
    }
    const searchTeacher = async()=>{
        try {
            if(!id){
            alert("נא להכניס מספר זהות");
            return;
        }
        const url = await fetch(`http://localhost:3000/teacher/${id}`);
        if(!url.ok){
            alert("המורה לא קיימת");
            return;
        }
        const data = await url.json();

        if (!data) {
            alert("המורה לא קיימת");
            return;
        }
        navigate(`/data?type=teacher&id=${id}`);
        } catch (error) {
            alert("המורה לא קיימת");
        }
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
        await createNewLocation(Number(id),false);
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
    function goBack(): void{
        navigate("/login");
    }

    /*return(
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
            <button onClick={goBack}> חזרה לעמוד הקודם</button>
        </div>

        </div>
        
        
    )*/

        return (
  <div className="page">

    {/* Greeting */}
    <div className="greeting" style={{ marginBottom: '1.5rem' }}>
      <h1>שלום, {teacher?.firstName} {teacher?.lastName} 👋</h1>
      <p>ת.ז. {teacher?.id} &nbsp;|&nbsp; כיתה {teacher?.grade}</p>
    </div>

    {/* Quick actions */}
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="section-title">צפייה ברשימות</div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => navigate("/Map")}>🗺️ מפת תלמידות</button>
        <button className="btn btn-secondary" onClick={() => navigate(`/data?type=students&grade=${teacher?.grade}`)}>התלמידות שלי</button>
        <button className="btn btn-secondary" onClick={() => navigate("/data?type=students")}>כל התלמידות</button>
        <button className="btn btn-secondary" onClick={() => navigate("/data?type=teachers")}>כל המורות</button>
        <button className="btn btn-ghost" onClick={() => navigate("/login")}>← יציאה</button>
      </div>
    </div>

    {/* Search */}
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="section-title">חיפוש</div>
      <div className="input-group">
        <label>מספר זהות</label>
        <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="הכניסי מס' זהות..." />
      </div>
      <div className="btn-group" style={{ marginTop: '0.5rem' }}>
        <button className="btn btn-ghost" onClick={searchStudent}>חיפוש תלמידה</button>
        <button className="btn btn-ghost" onClick={searchTeacher}>חיפוש מורה</button>
      </div>
    </div>

    {/* Add person */}
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div className="section-title">הוספת תלמידה / מורה</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div className="input-group">
          <label>מספר זהות</label>
          <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="מס' זהות" />
        </div>
        <div className="input-group">
          <label>כיתה</label>
          <input type="text" value={grade} onChange={e => setGrade(e.target.value)} placeholder="כיתה" />
        </div>
        <div className="input-group">
          <label>שם פרטי</label>
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="שם פרטי" />
        </div>
        <div className="input-group">
          <label>שם משפחה</label>
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="שם משפחה" />
        </div>
      </div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={addStudent}>+ הוספת תלמידה</button>
        <button className="btn btn-secondary" onClick={addTeacher}>+ הוספת מורה</button>
      </div>
    </div>

    
  </div>
);
}