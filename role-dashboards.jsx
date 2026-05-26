// role-dashboards.jsx — Role-specific home dashboards
window.RoleDashboard = function RoleDashboard({ user, onNavigate }) {
  const patients = DB.getAll('patients');
  const appointments = DB.getAll('appointments');
  const consultations = DB.getAll('consultations');
  const prescriptions = DB.getAll('prescriptions');
  const receipts = DB.getAll('receipts');
  const staff = DB.getAll('users');
  const today = fmt.today();

  const todayAppts = appointments.filter(a => a.date === today);
  const pending = prescriptions.filter(p => p.status === 'pending');
  const totalRevenue = receipts.reduce((s, r) => s + r.total, 0);
  const todayRevenue = receipts.filter(r => r.date === today).reduce((s, r) => s + r.total, 0);

  // Simple bar chart SVG
  const BarChart = ({ data, color }) => {
    const max = Math.max(...data.map(d => d.v), 1);
    const W = 360, H = 80;
    const bw = (W - data.length * 4) / data.length;
    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ display:'block' }}>
        {data.map((d, i) => {
          const bh = Math.max((d.v / max) * H, 2);
          const x = i * (bw + 4) + 2;
          return (
            <g key={i}>
              <rect x={x} y={H - bh} width={bw} height={bh} rx={3}
                fill={color || T.colors.primary} opacity={0.85} />
              <text x={x + bw / 2} y={H + 14} textAnchor="middle"
                fontSize={8} fill={T.colors.textMuted}>{d.l}</text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Recent appointments table
  const ApptTable = ({ appts }) => (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:T.font.sm }}>
        <thead>
          <tr style={{ borderBottom:`2px solid ${T.colors.border}` }}>
            {['Patient','Time','Type','Doctor','Status'].map(h => (
              <th key={h} style={{ padding:'8px 12px', textAlign:'left', color:T.colors.textSec, fontWeight:'700', fontSize:T.font.xs, whiteSpace:'nowrap' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appts.length === 0 ? (
            <tr><td colSpan={5} style={{ textAlign:'center', padding:'24px', color:T.colors.textMuted }}>No appointments today</td></tr>
          ) : appts.slice(0, 8).map(a => {
            const p = DB.getById('patients', a.patientId);
            const d = DB.getById('users', a.doctorId);
            const statusColors = { scheduled:'blue', completed:'green', 'in-progress':'yellow', cancelled:'red' };
            return (
              <tr key={a.id} style={{ borderBottom:`1px solid ${T.colors.border}` }}>
                <td style={{ padding:'10px 12px', fontWeight:'600', color:T.colors.text }}>{p?.name || '—'}</td>
                <td style={{ padding:'10px 12px', color:T.colors.textSec }}>{a.time}</td>
                <td style={{ padding:'10px 12px' }}>
                  <Badge color={a.type === 'emergency' ? 'red' : a.type === 'new' ? 'blue' : 'gray'}>
                    {a.type}
                  </Badge>
                </td>
                <td style={{ padding:'10px 12px', color:T.colors.textSec }}>{d?.name || '—'}</td>
                <td style={{ padding:'10px 12px' }}>
                  <Badge color={statusColors[a.status] || 'gray'}>{a.status}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Admin Dashboard
  if (user.role === 'admin') {
    const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const weekData = weekDays.map((l, i) => ({ l, v: Math.floor(Math.random() * 15 + 5) }));
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'24px', animation:'fadeIn 0.3s' }}>
        <div>
          <h2 style={{ margin:'0 0 4px', fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user.name.split(' ')[0]}!
          </h2>
          <p style={{ margin:0, color:T.colors.textSec }}>Here's what's happening at the clinic today.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
          <StatCard label="Total Patients" value={patients.length} icon="👥" color="blue" sub="All registered patients" />
          <StatCard label="Today's Appointments" value={todayAppts.length} icon="📅" color="primary" sub={`${todayAppts.filter(a=>a.status==='completed').length} completed`} />
          <StatCard label="Pending Prescriptions" value={pending.length} icon="💊" color="yellow" sub="Awaiting dispensing" />
          <StatCard label="Today's Revenue" value={fmt.currency(todayRevenue)} icon="💰" color="green" sub={`Total: ${fmt.currency(totalRevenue)}`} />
          <StatCard label="Active Staff" value={staff.filter(s=>s.status==='active').length} icon="👤" color="purple" sub="All roles combined" />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px' }}>
          <Card style={{ padding:'20px' }}>
            <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>Today's Appointments</h3>
            <ApptTable appts={todayAppts} />
          </Card>
          <Card style={{ padding:'20px' }}>
            <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>Weekly Visits</h3>
            <BarChart data={weekData} color={T.colors.primary} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginTop:'16px' }}>
              <div style={{ background:T.colors.primaryLight, borderRadius:T.radius.md, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:T.font['2xl'], fontWeight:'800', color:T.colors.primary }}>{consultations.length}</div>
                <div style={{ fontSize:T.font.xs, color:T.colors.textSec }}>Total Consults</div>
              </div>
              <div style={{ background:T.colors.blueLight, borderRadius:T.radius.md, padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:T.font['2xl'], fontWeight:'800', color:T.colors.blue }}>{prescriptions.length}</div>
                <div style={{ fontSize:T.font.xs, color:T.colors.textSec }}>Prescriptions</div>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px' }}>
          {[
            { label:'Manage Patients', icon:'👥', page:'patients', color:T.colors.blue, bg:T.colors.blueLight },
            { label:'Medical Records', icon:'📋', page:'medical',  color:T.colors.primary, bg:T.colors.primaryLight },
            { label:'Prescriptions',   icon:'💊', page:'rx',       color:T.colors.purple, bg:T.colors.purpleLight },
            { label:'Billing',         icon:'🧾', page:'receipt',  color:T.colors.green,  bg:T.colors.greenLight },
            { label:'Staff',           icon:'👤', page:'staff',    color:T.colors.teal,   bg:T.colors.tealLight },
            { label:'Settings',        icon:'⚙️', page:'settings', color:T.colors.yellow, bg:T.colors.yellowLight },
          ].map((q, i) => (
            <button key={i} onClick={() => onNavigate(q.page)}
              style={{ background:q.bg, border:`1px solid transparent`, borderRadius:T.radius.lg,
                padding:'20px', cursor:'pointer', textAlign:'left', fontFamily:'inherit', transition:'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = q.color; e.currentTarget.style.boxShadow = T.shadow.md; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontSize:'28px', marginBottom:'8px' }}>{q.icon}</div>
              <div style={{ fontWeight:'700', color:q.color, fontSize:T.font.md }}>{q.label}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Doctor Dashboard
  if (user.role === 'doctor') {
    const myAppts = todayAppts.filter(a => a.doctorId === user.id);
    const myConsults = consultations.filter(c => c.doctorId === user.id);
    const myRx = prescriptions.filter(r => r.doctorId === user.id);
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'24px', animation:'fadeIn 0.3s' }}>
        <div>
          <h2 style={{ margin:'0 0 4px', fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
            Welcome, {user.name}
          </h2>
          <p style={{ margin:0, color:T.colors.textSec }}>
            {user.specialty} · {myAppts.length} appointments today
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
          <StatCard label="Today's Appointments" value={myAppts.length} icon="📅" color="primary"
            sub={`${myAppts.filter(a=>a.status==='completed').length} completed`} />
          <StatCard label="My Consultations" value={myConsults.length} icon="📋" color="blue" sub="All time" />
          <StatCard label="My Prescriptions" value={myRx.length} icon="💊" color="purple" sub="Written" />
          <StatCard label="Pending Rx" value={myRx.filter(r=>r.status==='pending').length} icon="⏳" color="yellow" sub="Awaiting dispensing" />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px' }}>
          <Card style={{ padding:'20px' }}>
            <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>Today's Queue</h3>
            <ApptTable appts={myAppts} />
          </Card>
          <Card style={{ padding:'20px' }}>
            <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>Quick Actions</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {[
                { label:'New Consultation', icon:'📋', page:'medical' },
                { label:'Write Prescription', icon:'💊', page:'rx' },
                { label:'Patient List', icon:'👥', page:'patients' },
              ].map((q, i) => (
                <button key={i} onClick={() => onNavigate(q.page)}
                  style={{ display:'flex', alignItems:'center', gap:'10px', padding:'12px 14px',
                    background:T.colors.primaryLight, border:'none', borderRadius:T.radius.md,
                    cursor:'pointer', fontFamily:'inherit', fontWeight:'600', color:T.colors.primary,
                    fontSize:T.font.base, textAlign:'left' }}>
                  <span style={{ fontSize:'20px' }}>{q.icon}</span> {q.label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Receptionist Dashboard
  if (user.role === 'receptionist') {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'24px', animation:'fadeIn 0.3s' }}>
        <div>
          <h2 style={{ margin:'0 0 4px', fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
            Welcome, {user.name}
          </h2>
          <p style={{ margin:0, color:T.colors.textSec }}>Reception dashboard — {today}</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
          <StatCard label="Total Patients" value={patients.length} icon="👥" color="blue" />
          <StatCard label="Today's Appointments" value={todayAppts.length} icon="📅" color="primary"
            sub={`${todayAppts.filter(a=>a.status==='scheduled').length} waiting`} />
          <StatCard label="Today's Revenue" value={fmt.currency(todayRevenue)} icon="💰" color="green" />
          <StatCard label="Total Receipts" value={receipts.length} icon="🧾" color="yellow" />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px' }}>
          <Card style={{ padding:'20px' }}>
            <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>Today's Appointments</h3>
            <ApptTable appts={todayAppts} />
          </Card>
          <Card style={{ padding:'20px' }}>
            <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>Quick Actions</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {[
                { label:'Register New Patient', icon:'👤', page:'patients' },
                { label:'Generate Receipt', icon:'🧾', page:'receipt' },
              ].map((q, i) => (
                <button key={i} onClick={() => onNavigate(q.page)}
                  style={{ display:'flex', alignItems:'center', gap:'10px', padding:'14px',
                    background:T.colors.primaryLight, border:'none', borderRadius:T.radius.md,
                    cursor:'pointer', fontFamily:'inherit', fontWeight:'600', color:T.colors.primary,
                    fontSize:T.font.base }}>
                  <span style={{ fontSize:'22px' }}>{q.icon}</span> {q.label}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Pharmacist Dashboard
  if (user.role === 'pharmacist') {
    const pendingRx = prescriptions.filter(p => p.status === 'pending');
    const dispensedToday = prescriptions.filter(p => p.dispensedDate === today);
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'24px', animation:'fadeIn 0.3s' }}>
        <div>
          <h2 style={{ margin:'0 0 4px', fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
            Pharmacy Dashboard
          </h2>
          <p style={{ margin:0, color:T.colors.textSec }}>Welcome, {user.name}</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
          <StatCard label="Pending Prescriptions" value={pendingRx.length} icon="⏳" color="yellow" sub="Awaiting dispensing" />
          <StatCard label="Dispensed Today" value={dispensedToday.length} icon="✅" color="green" />
          <StatCard label="Total Prescriptions" value={prescriptions.length} icon="💊" color="primary" />
        </div>
        <Card style={{ padding:'20px' }}>
          <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700', color:T.colors.text }}>
            Pending Prescriptions
          </h3>
          {pendingRx.length === 0 ? (
            <EmptyState icon="✅" title="All clear!" message="No pending prescriptions to dispense." />
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {pendingRx.map(rx => {
                const p = DB.getById('patients', rx.patientId);
                const d = DB.getById('users', rx.doctorId);
                return (
                  <div key={rx.id} style={{ display:'flex', alignItems:'center', gap:'14px',
                    padding:'14px', background:T.colors.yellowLight, borderRadius:T.radius.md,
                    border:`1px solid #fde68a` }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:'700', color:T.colors.text }}>{p?.name || '—'}</div>
                      <div style={{ fontSize:T.font.xs, color:T.colors.textSec }}>By {d?.name} · {fmt.date(rx.date)}</div>
                      <div style={{ fontSize:T.font.xs, color:T.colors.textSec, marginTop:'4px' }}>
                        {rx.medications.length} medication{rx.medications.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <Badge color="yellow">Pending</Badge>
                  </div>
                );
              })}
            </div>
          )}
          {pendingRx.length > 0 && (
            <div style={{ marginTop:'16px' }}>
              <Btn onClick={() => onNavigate('rx')}>Go to Prescriptions →</Btn>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Nurse Dashboard
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', animation:'fadeIn 0.3s' }}>
      <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
        Welcome, {user.name}
      </h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px' }}>
        <StatCard label="Today's Appointments" value={todayAppts.length} icon="📅" color="primary" />
        <StatCard label="Total Patients" value={patients.length} icon="👥" color="blue" />
      </div>
      <Card style={{ padding:'20px' }}>
        <h3 style={{ margin:'0 0 16px', fontSize:T.font.lg, fontWeight:'700' }}>Today's Schedule</h3>
        <ApptTable appts={todayAppts} />
      </Card>
    </div>
  );
};
