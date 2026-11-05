// auth.jsx — Login page
window.LoginPage = function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPw, setShowPw] = React.useState(false);

  const demos = [
    { label:'Admin',        email:'admin@alkhidmat.org',     pw:'admin123',     icon:'⚙️' },
    { label:'Doctor',       email:'doctor@alkhidmat.org',    pw:'doctor123',    icon:'🩺' },
    { label:'Receptionist', email:'reception@alkhidmat.org', pw:'reception123', icon:'📞' },
    { label:'Pharmacist',   email:'pharmacy@alkhidmat.org',  pw:'pharmacy123',  icon:'💊' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = DB.authenticate(email.trim().toLowerCase(), password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid email or password. Please try again.');
        setLoading(false);
      }
    }, 400);
  };

  const fillDemo = (d) => { setEmail(d.email); setPassword(d.pw); setError(''); };

  return (
    <div style={{ minHeight:'100vh', background:T.colors.bg, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', padding:'24px' }}>

      {/* Back link */}
      <button onClick={onBack} style={{ position:'fixed', top:20, left:24, background:'none', border:'none',
        cursor:'pointer', color:T.colors.textSec, fontSize:T.font.base, fontFamily:'inherit',
        display:'flex', alignItems:'center', gap:'6px' }}>
        ← Back to Home
      </button>

      {/* Logo */}
      <div style={{ textAlign:'center', marginBottom:'32px' }}>
        <div style={{ width:60, height:60, borderRadius:T.radius.xl,
          background:`linear-gradient(135deg, ${T.colors.primary}, ${T.colors.accent})`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px',
          margin:'0 auto 16px' }}>
          🏥
        </div>
        <h1 style={{ margin:'0 0 4px', fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
          Alkhidmat Clinic
        </h1>
        <p style={{ margin:0, fontSize:T.font.base, color:T.colors.textSec }}>Sign in to the management system</p>
      </div>

      {/* Login Card */}
      <Card style={{ width:'100%', maxWidth:420, padding:'32px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
            <Inp label="Email Address" type="email" value={email} onChange={setEmail}
              placeholder="your@email.com" required autoFocus />

            <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
              <label style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.textSec }}>
                Password <span style={{ color:T.colors.red }}>*</span>
              </label>
              <div style={{ position:'relative' }}>
                <input type={showPw ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  style={{ padding:'9px 40px 9px 12px', fontSize:T.font.base, fontFamily:'inherit',
                    border:`1.5px solid ${error ? T.colors.red : T.colors.border}`, borderRadius:T.radius.md,
                    outline:'none', color:T.colors.text, width:'100%', boxSizing:'border-box' }}
                  onFocus={e => e.target.style.borderColor = T.colors.primary}
                  onBlur={e => e.target.style.borderColor = error ? T.colors.red : T.colors.border} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', color:T.colors.textMuted, fontSize:'16px' }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ background:T.colors.redLight, border:`1px solid #fecaca`, borderRadius:T.radius.md,
                padding:'10px 14px', fontSize:T.font.sm, color:T.colors.red }}>
                {error}
              </div>
            )}

            <Btn type="submit" full disabled={loading} size="lg" style={{ marginTop:'4px' }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Btn>
          </div>
        </form>
      </Card>

      {/* Demo Accounts */}
      <div style={{ width:'100%', maxWidth:420, marginTop:'24px' }}>
        <div style={{ textAlign:'center', fontSize:T.font.sm, color:T.colors.textMuted, marginBottom:'12px', fontWeight:'600' }}>
          — DEMO ACCOUNTS —
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {demos.map((d, i) => (
            <button key={i} type="button" onClick={() => fillDemo(d)}
              style={{ background:'#fff', border:`1px solid ${T.colors.border}`, borderRadius:T.radius.md,
                padding:'10px 14px', cursor:'pointer', textAlign:'left', fontFamily:'inherit',
                transition:'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.colors.primary; e.currentTarget.style.background = T.colors.primaryLight; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.colors.border; e.currentTarget.style.background = '#fff'; }}>
              <div style={{ fontSize:'18px', marginBottom:'4px' }}>{d.icon}</div>
              <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.text }}>{d.label}</div>
              <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, marginTop:'2px' }}>{d.pw}</div>
            </button>
          ))}
        </div>
        <p style={{ textAlign:'center', fontSize:T.font.xs, color:T.colors.textMuted, marginTop:'12px' }}>
          Click any card to auto-fill credentials
        </p>
      </div>
    </div>
  );
};
