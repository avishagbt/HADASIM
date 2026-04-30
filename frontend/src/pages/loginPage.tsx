import Login from '../components/Login'

export default function LoginPage(){
  return (
    <div className="login-page">
      <div className="login-box">
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏫</div>
          <h2>ברוכות הבאות</h2>
          <p>בית ספר בנות משה — טיול שנתי</p>
        </div>
        <Login />
      </div>
    </div>
  )
}