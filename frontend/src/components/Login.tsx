import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


export default function Login(){

    const [id, setId] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            id: Number(id)
            })
        });

        
        if(!response.ok){
            alert("משתמש לא קיים שגיאה");
            return;
        }
        const data = await response.json();
        
        localStorage.setItem("id",data.id);

        if(data.type === "teacher"){
            navigate("/teacher");
        }
        else if(data.type === "student"){
            navigate("/student");
        }
        else{
            alert("משתמש לא קיים");
            return;
        }
  };
  /*return(
    <div>        
        <input
            value={id}
            onChange={(e)=> setId(e.target.value)}
            placeholder="נא להכניס מס' זהות"
        />
        <button onClick={handleLogin}>להתחברות</button>
    </div>
  )*/
 return (
  <div>
    <div className="input-group">
      <label>מספר זהות</label>
      <input
        type="text"
        value={id}
        onChange={e => setId(e.target.value)}
        placeholder="הכניסי מס' זהות..."
        onKeyDown={e => e.key === 'Enter' && handleLogin()}
      />
    </div>
    <button
      className="btn btn-primary"
      onClick={handleLogin}
      style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', padding: '0.7rem' }}
    >להתחברות </button>
  </div>
);
}