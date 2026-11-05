// landing.jsx — Public landing / marketing page
window.LandingPage = function LandingPage({ onLogin }) {
  const features = [
    { icon:'🏥', title:'Patient Management', desc:'Register patients, maintain complete medical histories, and track visits across all departments.' },
    { icon:'📋', title:'Electronic Medical Records', desc:'Digital consultations, vitals, diagnoses, and treatment plans — all in one place.' },
    { icon:'💊', title:'Prescription System', desc:'Doctors write digital prescriptions; pharmacists dispense with a single click.' },
    { icon:'🧾', title:'Billing & Receipts', desc:'Generate itemized invoices, apply charity discounts, and accept multiple payment methods.' },
    { icon:'📅', title:'Appointment Scheduling', desc:'Manage daily queues, book follow-ups, and handle walk-ins and emergencies.' },
    { icon:'👥', title:'Multi-Role Access', desc:'Separate dashboards and permissions for Admin, Doctors, Reception, Pharmacy & Nursing.' },
  ];

  const stats = [
    { value:'50,000+', label:'Patients Served' },
    { value:'12+',     label:'Specialist Doctors' },
    { value:'Free',    label:'Charity Consultations' },
    { value:'Daily',   label:'Operations' },
  ];

  const roles = [
    { role:'Admin',        email:'admin@alkhidmat.org',     pw:'admin123',     icon:'⚙️', color:T.colors.purple },
    { role:'Doctor',       email:'doctor@alkhidmat.org',    pw:'doctor123',    icon:'🩺', color:T.colors.blue },
    { role:'Receptionist', email:'reception@alkhidmat.org', pw:'reception123', icon:'📞', color:T.colors.teal },
    { role:'Pharmacist',   email:'pharmacy@alkhidmat.org',  pw:'pharmacy123',  icon:'💊', color:T.colors.yellow },
  ];

  return (
    <div style={{ minHeight:'100vh', background:T.colors.bg, fontFamily:'Manrope, system-ui' }}>
      {/* Navbar */}
      <nav style={{ background:'#fff', borderBottom:`1px solid ${T.colors.border}`, boxShadow:T.shadow.sm,
        position:'sticky', top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex',
          alignItems:'center', justifyContent:'space-between', height:64 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:36, height:36, borderRadius:T.radius.md,
              background:`linear-gradient(135deg, ${T.colors.primary}, ${T.colors.accent})`,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>
              🏥
            </div>
            <div>
              <div style={{ fontWeight:'800', fontSize:T.font.lg, color:T.colors.text, lineHeight:1.1 }}>Alkhidmat Clinic</div>
              <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, letterSpacing:'0.05em' }}>SERVING HUMANITY</div>
            </div>
          </div>
          <Btn onClick={onLogin} size="md">
            Sign In →
          </Btn>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg, ${T.colors.primaryDark} 0%, ${T.colors.primary} 60%, #1a9a5c 100%)`,
        padding:'100px 24px', textAlign:'center', color:'#fff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.05,
          backgroundImage:'radial-gradient(circle at 25% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 75% 20%, #fff 0%, transparent 40%)' }} />
        <div style={{ position:'relative', maxWidth:700, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.12)',
            padding:'6px 16px', borderRadius:T.radius.full, fontSize:T.font.sm, fontWeight:'600', marginBottom:'24px' }}>
            ✦ Free Clinic Management System
          </div>
          <h1 style={{ margin:'0 0 20px', fontSize:'clamp(32px, 5vw, 54px)', fontWeight:'900', lineHeight:1.15 }}>
            Modern Clinic Management<br/>for Alkhidmat Foundation
          </h1>
          <p style={{ margin:'0 0 40px', fontSize:T.font.xl, opacity:0.88, lineHeight:1.65, maxWidth:560, margin:'0 auto 40px' }}>
            A complete digital system for patient registration, medical records, prescriptions, billing, and staff management — built for charity healthcare.
          </p>
          <Btn onClick={onLogin} size="lg" style={{ background:'#fff', color:T.colors.primary, boxShadow:T.shadow.lg }}>
            Access the System
          </Btn>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background:T.colors.text, padding:'0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'grid',
          gridTemplateColumns:'repeat(4, 1fr)', borderTop:`1px solid rgba(255,255,255,0.1)` }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding:'28px 20px', textAlign:'center',
              borderRight: i < 3 ? `1px solid rgba(255,255,255,0.1)` : 'none' }}>
              <div style={{ fontSize:T.font['4xl'], fontWeight:'900', color:T.colors.primaryMid }}>{s.value}</div>
              <div style={{ fontSize:T.font.sm, color:'rgba(255,255,255,0.55)', marginTop:'4px', fontWeight:'600' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'80px 24px', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'60px' }}>
          <h2 style={{ fontSize:T.font['4xl'], fontWeight:'800', color:T.colors.text, margin:'0 0 12px' }}>
            Everything Your Clinic Needs
          </h2>
          <p style={{ fontSize:T.font.lg, color:T.colors.textSec, margin:0 }}>
            Integrated tools for every role in your healthcare team
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px' }}>
          {features.map((f, i) => (
            <Card key={i} style={{ padding:'28px' }}>
              <div style={{ fontSize:'36px', marginBottom:'16px' }}>{f.icon}</div>
              <h3 style={{ margin:'0 0 10px', fontSize:T.font.xl, fontWeight:'700', color:T.colors.text }}>{f.title}</h3>
              <p style={{ margin:0, fontSize:T.font.base, color:T.colors.textSec, lineHeight:1.65 }}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Demo access */}
      <section style={{ background:T.colors.primaryLight, padding:'80px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text, margin:'0 0 12px' }}>
            Try with Demo Accounts
          </h2>
          <p style={{ fontSize:T.font.lg, color:T.colors.textSec, margin:'0 0 48px' }}>
            Each role has its own dashboard and permissions
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(190px, 1fr))', gap:'16px' }}>
            {roles.map((r, i) => (
              <Card key={i} style={{ padding:'24px', textAlign:'center', cursor:'pointer', transition:'box-shadow 0.15s' }}
                onClick={onLogin}>
                <div style={{ fontSize:'32px', marginBottom:'12px' }}>{r.icon}</div>
                <div style={{ fontWeight:'700', fontSize:T.font.lg, color:T.colors.text, marginBottom:'8px' }}>{r.role}</div>
                <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, lineHeight:1.6 }}>
                  {r.email}<br/>{r.pw}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background:T.colors.text, color:'rgba(255,255,255,0.6)', padding:'40px 24px', textAlign:'center' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'12px' }}>
          <div style={{ fontSize:'24px' }}>🏥</div>
          <div style={{ fontWeight:'800', color:'#fff', fontSize:T.font.lg }}>Alkhidmat Clinic</div>
        </div>
        <div style={{ fontSize:T.font.sm }}>
          A comprehensive clinic management system for Alkhidmat Foundation — Serving Humanity
        </div>
      </footer>
    </div>
  );
};
