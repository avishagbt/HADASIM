import { useEffect, useState } from "react";


export default function StudentPage(){

    const [student,setStudent] = useState<any>(null);

    useEffect(()=> {
        const showStudent = async()=>{
            const id = localStorage.getItem("id");
            const studentFetch = await fetch(`http://localhost:3000/student/${id}`);
            const studentData = await studentFetch.json();
            setStudent(studentData);
        }
        showStudent();
    },[]);

    return(
        <div>
            <h1> שלום {student?.firstName} {student?.lastName}</h1>
            <p>תז:  {student?.id}</p>
            <p> כיתה: {student?.grade}</p>
        </div>
    )
}