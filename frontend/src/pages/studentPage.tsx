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

   return (
    <div className="page" style={{ maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '1rem' }}> שלום {student ? `${student.firstName}` : ""}</h2> 
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div className="avatar" style={{
            width: 70, height: 70, borderRadius: '60%',
            background: 'var(--blue-light)', color: 'var(--blue)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1.1rem', flexShrink: 0
          }}></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{student?.firstName} {student?.lastName}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>תלמידה</div>
          </div>
        </div>
        <hr className="divider" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gray-400)' }}>מספר זהות</span>
            <span style={{ fontWeight: 500 }}>{student?.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--gray-400)' }}>כיתה</span>
            <span className="badge badge-blue">{student?.grade}</span>
          </div>
        </div>
        <hr className="divider" />
        <button className="btn btn-ghost" onClick={goBack}>← יציאה</button>
      </div>
    </div>
);
}