import {Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from './pages/loginPage'
import StudentPage from './pages/studentPage'
import TeacherPage from './pages/teacherPage'
import DataPage from './pages/dataPage'
import MapPage from './pages/MapPage'
import "./index.css"



function App() {

  return (<div>
    <header className="app-header">
      <h1>🏫 בית הספר "בנות משה" — טיול שנתי</h1>
    </header>
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
