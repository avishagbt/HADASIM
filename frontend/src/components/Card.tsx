import type { CSSProperties } from "react";

interface CardProps {
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
}

function Card ({id, firstName, lastName, grade}: CardProps) {

    
    return (
      <div >
        <div className="name">{firstName} {lastName}</div>
        <div className="detail">כיתה: {grade}</div>
        <div className="detail" style={{ marginTop: '0.25rem' }}>ת.ז. {id}</div>
      </div>
    )
}
export default Card