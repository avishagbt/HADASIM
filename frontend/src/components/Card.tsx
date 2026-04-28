import type { CSSProperties } from "react";

interface CardProps {
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
}

function Card ({id, firstName, lastName, grade}: CardProps) {

    const Style: CSSProperties = {border: '1px solid #e0e0e0', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      width: '260px', 
      margin: '10px', 
      padding: '12px',
      backgroundColor: '#ad63f3ff',
      boxShadow: '0 4px 8px rgba(16, 3, 36, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.2s',
      cursor: 'default' 
      }
    return (
      <div style={Style}>
        <h1>{firstName} {lastName}</h1>
        <h2> כיתה: {grade}</h2>
        <p> ת.ז. {id}</p>
      </div>
    )
}
export default Card