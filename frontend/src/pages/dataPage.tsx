import { useSearchParams } from "react-router-dom";
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
    return (
        <div>
            {data.map(item =>(
                <Card
                    id= {item.id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    grade={item.grade}
                />
            ))}
        </div>
    )
}