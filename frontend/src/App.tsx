import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/loginPage'
import StudentPage from './pages/studentPage'
import TeacherPage from './pages/teacherPage'
import DataPage from './pages/dataPage'
import MapPage from './pages/MapPage'



const styles: { [key: string]: React.CSSProperties } = {
  headerStyle: {
    fontSize: '3.5em',
    color: '#9f0bc4ff',
    marginBottom: '10px',
    fontWeight: '800',
  },
}

function App() {

  return (<div>
    <h1 style={styles.headerStyle}>בית הספר "בנות משה" טיול שנתי</h1>
    <Routes>
      <Route path= "/" element = {<Navigate to={"/login"}/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/Map" element={<MapPage />} />
    </Routes>
  </div>
    )
}

export default App
