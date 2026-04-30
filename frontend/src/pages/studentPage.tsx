import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function StudentPage(){

    const [student,setStudent] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(()=> {
        const showStudent = async()=>{
            const id = localStorage.getItem("id");
            const studentFetch = await fetch(`http://localhost:3000/student/${id}`);
            const studentData = await studentFetch.json();
            setStudent(studentData);
        }
        showStudent();
    },[]);

    function goBack(): void{
        navigate("/login");
    }

    return(
        <div>
            <h1> שלום {student?.firstName} {student?.lastName}</h1>
            <p>תז:  {student?.id}</p>
            <p> כיתה: {student?.grade}</p>
            <p>
                <button onClick={goBack}> חזרה לעמוד הקודם</button>
            </p>
        </div>
    )
}