import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function DataPage(){

    const [searchParams] = useSearchParams();
    const [data, setData] = useState<any[]>([]);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    const grade = searchParams.get("grade");

    useEffect(()=>{
        getData();
    },[type, id, grade]);

    const getData = async()=>{
      let url = "";
      try {
            if(type === "student"){
            url = `http://localhost:3000/student/${id}`
        }
        else if(type === "teacher"){
            url = `http://localhost:3000/teacher/${id}`
        }
        else if(type === "students" && grade){
            url = `http://localhost:3000/student/grade/${grade}`
        }
        else if(type === "students"){
            url = `http://localhost:3000/student`
        }
        else if(type === "teachers"){
            url = `http://localhost:3000/teacher`
        }
        else{
            alert("שגיאה: מספר זהות שגוי")
            return;
        }
        const bringData = await fetch(url);
        const Data = await bringData.json();
        setData(Array.isArray(Data)?Data:[Data]);
            
      } catch (error) {
          alert(error);
        } 
    }

    const navigate = useNavigate();

    function goBack(): void{
      navigate("/teacher");
    }

    const title =
        type === "students" && grade ? `תלמידות כיתה ${grade}` :
        type === "students" ? "כל התלמידות" :
        type === "teachers" ? "כל המורות" :
        type === "student" ? "פרטי תלמידה" :
        type === "teacher" ? "פרטי מורה" : "";

   return (
      <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.2rem' }}>{data.length} רשומות</div>
        </div>
        <button className="btn btn-ghost" onClick={goBack}>← חזרה</button>
      </div>
      <div className="cards-grid">
        {data.map(item => (
          <Card
            key={item.id}
            id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            grade={item.grade}
          />
        ))}
      </div>
    </div>
  );
}