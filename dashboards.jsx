// dashboards.jsx — AppShell: sidebar, header, content area
window.AppShell = function AppShell({ user, page, onNavigate, onLogout, children, toast, onToastDone }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [notifOpen, setNotifOpen] = React.useState(false);

  const roleMenus = {
    admin:        ['home','patients','medical','rx','receipt','staff','settings'],
    doctor:       ['home','patients','medical','rx'],
    receptionist: ['home','patients','receipt'],
    pharmacist:   ['home','rx'],
    nurse:        ['home','patients','medical'],
  };

  const navItems = [
    { id:'home',     label:'Dashboard',     icon:'🏠' },
    { id:'patients', label:'Patients',      icon:'👥' },
    { id:'medical',  label:'Medical',       icon:'📋' },
    { id:'rx',       label:'Prescriptions', icon:'💊' },
    { id:'receipt',  label:'Billing',       icon:'🧾' },
    { id:'staff',    label:'Staff',         icon:'👤' },
    { id:'settings', label:'Settings',      icon:'⚙️' },
  ];

  const allowed = roleMenus[user.role] || ['home'];
  const visibleNav = navItems.filter(n => allowed.includes(n.id));

  const roleBadgeColor = {
    admin:'purple', doctor:'blue', receptionist:'teal', pharmacist:'yellow', nurse:'green',
  };

  const roleLabel = {
    admin:'Administrator', doctor:'Doctor', receptionist:'Receptionist', pharmacist:'Pharmacist', nurse:'Nurse',
  };

  const SIDEBAR_W = sidebarOpen ? 240 : 64;

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:T.colors.bg }}>
      {/* Sidebar */}
      <aside style={{ width:SIDEBAR_W, background:'#fff', borderRight:`1px solid ${T.colors.border}`,
        display:'flex', flexDirection:'column', flexShrink:0, transition:'width 0.2s ease',
        boxShadow:T.shadow.sm, zIndex:20, overflow:'hidden' }}>

        {/* Logo */}
        <div style={{ padding:'16px', display:'flex', alignItems:'center', gap:'10px',
          borderBottom:`1px solid ${T.colors.border}`, minHeight:64 }}>
          <div style={{ width:36, height:36, borderRadius:T.radius.md, flexShrink:0,
            background:`linear-gradient(135deg, ${T.colors.primary}, ${T.colors.accent})`,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>
            🏥
          </div>
          {sidebarOpen && (
            <div style={{ overflow:'hidden' }}>
              <div style={{ fontWeight:'800', fontSize:T.font.md, color:T.colors.text, whiteSpace:'nowrap' }}>Alkhidmat</div>
              <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, whiteSpace:'nowrap' }}>Clinic System</div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav style={{ flex:1, padding:'12px 8px', overflowY:'auto', overflowX:'hidden' }}>
          {visibleNav.map(item => {
            const active = page === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)}
                title={!sidebarOpen ? item.label : ''}
                style={{ width:'100%', display:'flex', alignItems:'center',
                  gap:'10px', padding:'10px 10px', marginBottom:'2px',
                  borderRadius:T.radius.md, border:'none', cursor:'pointer', textAlign:'left',
                  fontFamily:'inherit', fontWeight: active ? '700' : '500',
                  fontSize:T.font.base, transition:'all 0.12s',
                  background: active ? T.colors.primaryLight : 'transparent',
                  color: active ? T.colors.primary : T.colors.textSec,
                  borderLeft: active ? `3px solid ${T.colors.primary}` : '3px solid transparent',
                }}>
                <span style={{ fontSize:'18px', flexShrink:0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div style={{ padding:'12px 8px', borderTop:`1px solid ${T.colors.border}` }}>
          {sidebarOpen ? (
            <div style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px', borderRadius:T.radius.md,
              background:T.colors.bg }}>
              <Avatar name={user.name} size={36} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:'700', fontSize:T.font.sm, color:T.colors.text,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.name}</div>
                <Badge color={roleBadgeColor[user.role] || 'gray'}>{roleLabel[user.role] || user.role}</Badge>
              </div>
            </div>
          ) : (
            <div style={{ display:'flex', justifyContent:'center' }}>
              <Avatar name={user.name} size={36} />
            </div>
          )}
          <button onClick={onLogout} title="Sign out"
            style={{ width:'100%', marginTop:'8px', display:'flex', alignItems:'center', gap:'8px',
              justifyContent: sidebarOpen ? 'flex-start' : 'center', padding:'8px 10px',
              background:'none', border:'none', cursor:'pointer', borderRadius:T.radius.md,
              color:T.colors.red, fontSize:T.font.sm, fontFamily:'inherit', fontWeight:'600' }}>
            🚪 {sidebarOpen && 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header */}
        <header style={{ height:64, background:'#fff', borderBottom:`1px solid ${T.colors.border}`,
          display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 24px',
          boxShadow:T.shadow.sm, flexShrink:0, zIndex:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background:'none', border:`1px solid ${T.colors.border}`, borderRadius:T.radius.md,
                padding:'6px 10px', cursor:'pointer', fontSize:'16px', color:T.colors.textSec }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <div style={{ fontWeight:'800', fontSize:T.font.lg, color:T.colors.text }}>
                {navItems.find(n => n.id === page)?.label || 'Dashboard'}
              </div>
              <div style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>
                {new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
              </div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ position:'relative' }}>
              <button onClick={() => setNotifOpen(!notifOpen)}
                style={{ background:'none', border:`1px solid ${T.colors.border}`, borderRadius:T.radius.md,
                  padding:'6px 12px', cursor:'pointer', fontSize:'18px', position:'relative' }}>
                🔔
                <span style={{ position:'absolute', top:2, right:2, width:8, height:8,
                  background:T.colors.red, borderRadius:'50%', border:'2px solid #fff' }} />
              </button>
              {notifOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:320,
                  background:'#fff', borderRadius:T.radius.lg, boxShadow:T.shadow.lg,
                  border:`1px solid ${T.colors.border}`, zIndex:100 }}
                  onClick={() => setNotifOpen(false)}>
                  <div style={{ padding:'14px 16px', borderBottom:`1px solid ${T.colors.border}`,
                    fontWeight:'700', fontSize:T.font.base }}>Notifications</div>
                  {[
                    { msg:'2 prescriptions pending dispensing', time:'10 min ago', icon:'💊' },
                    { msg:'New patient registered: Khalid Mahmood', time:'1 hr ago', icon:'👥' },
                    { msg:"Today's appointments: 7 patients", time:'8:00 AM', icon:'📅' },
                  ].map((n, i) => (
                    <div key={i} style={{ padding:'12px 16px', display:'flex', gap:'12px',
                      borderBottom: i < 2 ? `1px solid ${T.colors.border}` : 'none',
                      fontSize:T.font.sm }}>
                      <span style={{ fontSize:'20px' }}>{n.icon}</span>
                      <div>
                        <div style={{ color:T.colors.text }}>{n.msg}</div>
                        <div style={{ color:T.colors.textMuted, fontSize:T.font.xs, marginTop:'2px' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'6px 12px',
              background:T.colors.bg, borderRadius:T.radius.md, border:`1px solid ${T.colors.border}` }}>
              <Avatar name={user.name} size={28} />
              <span style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.text }}>{user.name.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:'auto', padding:'28px' }}>
          {children}
        </main>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDone={onToastDone} />}
    </div>
  );
};
