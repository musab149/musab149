// staff.jsx — Staff management
window.StaffPage = function StaffPage({ user, showToast }) {
  const [view, setView] = React.useState('list');
  const [staff, setStaff] = React.useState(() => DB.getAll('users'));
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filterRole, setFilterRole] = React.useState('');
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  const reload = () => setStaff(DB.getAll('users'));

  const filtered = staff.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchR = !filterRole || s.role === filterRole;
    return matchQ && matchR;
  });

  const roleColors = { admin:'purple', doctor:'blue', receptionist:'teal', pharmacist:'yellow', nurse:'green' };
  const roleLabels = { admin:'Administrator', doctor:'Doctor', receptionist:'Receptionist', pharmacist:'Pharmacist', nurse:'Nurse' };

  const openForm   = (s=null) => { setSelected(s); setView('form'); };
  const backToList = ()        => { setSelected(null); setView('list'); reload(); };

  const handleDelete = (s) => {
    if (s.id === user.id) { showToast("You can't delete your own account.", 'error'); return; }
    DB.remove('users', s.id);
    reload();
    setDeleteConfirm(null);
    showToast('Staff member removed.', 'success');
  };

  const toggleStatus = (s) => {
    if (s.id === user.id) { showToast("You can't deactivate yourself.", 'error'); return; }
    const newStatus = s.status === 'active' ? 'inactive' : 'active';
    DB.update('users', s.id, { status: newStatus });
    showToast(`${s.name} marked as ${newStatus}.`, 'success');
    reload();
  };

  if (view === 'form') return <StaffForm member={selected} currentUser={user} onSave={backToList} onCancel={backToList} showToast={showToast} />;

  const byRole = {};
  filtered.forEach(s => {
    if (!byRole[s.role]) byRole[s.role] = [];
    byRole[s.role].push(s);
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px', animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Staff Management</h2>
          <p style={{ margin:0, color:T.colors.textSec }}>
            {staff.filter(s => s.status === 'active').length} active · {staff.length} total
          </p>
        </div>
        <Btn onClick={() => openForm()}>+ Add Staff Member</Btn>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'12px' }}>
        {['doctor','receptionist','pharmacist','nurse'].map(role => {
          const count = staff.filter(s => s.role === role && s.status === 'active').length;
          const icons = { doctor:'🩺', receptionist:'📞', pharmacist:'💊', nurse:'🏥' };
          const colorMap = { doctor:'blue', receptionist:'teal', pharmacist:'yellow', nurse:'green' };
          return (
            <Card key={role} style={{ padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ fontSize:'24px' }}>{icons[role]}</div>
              <div>
                <div style={{ fontWeight:'800', fontSize:T.font['2xl'], color:T.colors.text }}>{count}</div>
                <div style={{ fontSize:T.font.xs, color:T.colors.textSec, fontWeight:'600', textTransform:'capitalize' }}>{role}s</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card style={{ padding:'14px' }}>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          <Inp value={search} onChange={setSearch} placeholder="Search by name or email…" style={{ flex:'1 1 260px' }} />
          <Sel value={filterRole} onChange={setFilterRole}
            options={[{value:'',label:'All Roles'},{value:'admin',label:'Admin'},{value:'doctor',label:'Doctor'},
              {value:'receptionist',label:'Receptionist'},{value:'pharmacist',label:'Pharmacist'},{value:'nurse',label:'Nurse'}]}
            style={{ flex:'0 0 170px' }} />
          {(search || filterRole) && <Btn variant="ghost" size="sm" onClick={() => { setSearch(''); setFilterRole(''); }}>Clear</Btn>}
        </div>
      </Card>

      {/* Staff cards */}
      {filtered.length === 0
        ? <EmptyState icon="👤" title="No staff found" message="No staff members match your filter." action={<Btn onClick={() => openForm()}>+ Add Staff Member</Btn>} />
        : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'16px' }}>
            {filtered.map(s => (
              <Card key={s.id} style={{ padding:'20px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'14px', marginBottom:'14px' }}>
                  <div style={{ position:'relative' }}>
                    <Avatar name={s.name} size={48} />
                    <div style={{ position:'absolute', bottom:0, right:0, width:12, height:12,
                      borderRadius:'50%', background: s.status === 'active' ? T.colors.green : T.colors.textMuted,
                      border:'2px solid #fff' }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:'700', fontSize:T.font.lg, color:T.colors.text,
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.name}</div>
                    <Badge color={roleColors[s.role] || 'gray'}>{roleLabels[s.role] || s.role}</Badge>
                    {s.specialty && (
                      <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, marginTop:'4px' }}>{s.specialty}</div>
                    )}
                  </div>
                </div>

                <div style={{ display:'flex', flexDirection:'column', gap:'6px', fontSize:T.font.sm,
                  marginBottom:'14px' }}>
                  {[['📧', s.email],['📱', s.phone],['📅', 'Joined ' + fmt.date(s.joinDate)]].map(([icon, val], i) => (
                    <div key={i} style={{ display:'flex', gap:'8px', alignItems:'center', color:T.colors.textSec }}>
                      <span>{icon}</span><span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{val}</span>
                    </div>
                  ))}
                  {s.qualification && (
                    <div style={{ display:'flex', gap:'8px', alignItems:'center', color:T.colors.textSec }}>
                      <span>🎓</span><span>{s.qualification}</span>
                    </div>
                  )}
                </div>

                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', paddingTop:'14px',
                  borderTop:`1px solid ${T.colors.border}` }}>
                  <Btn variant="secondary" size="sm" onClick={() => openForm(s)}>Edit</Btn>
                  <Btn variant={s.status === 'active' ? 'ghost' : 'secondary'} size="sm"
                    onClick={() => toggleStatus(s)} style={{ fontSize:T.font.xs }}>
                    {s.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Btn>
                  {user.role === 'admin' && s.id !== user.id && (
                    <Btn variant="danger" size="sm" onClick={() => setDeleteConfirm(s)}>Remove</Btn>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )
      }

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Remove Staff Member" width={400}>
        <p style={{ color:T.colors.textSec, marginTop:0 }}>
          Remove <strong>{deleteConfirm?.name}</strong> from the system? This cannot be undone.
        </p>
        <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
          <Btn variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Btn>
          <Btn variant="danger" onClick={() => handleDelete(deleteConfirm)}>Remove</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ─── Staff Form ───────────────────────────────────────────────────────────────
function StaffForm({ member, currentUser, onSave, onCancel, showToast }) {
  const isEdit = !!member;
  const [form, setForm] = React.useState({
    name:          member?.name          || '',
    email:         member?.email         || '',
    password:      member?.password      || '',
    role:          member?.role          || 'receptionist',
    phone:         member?.phone         || '',
    specialty:     member?.specialty     || '',
    qualification: member?.qualification || '',
    joinDate:      member?.joinDate      || fmt.today(),
    status:        member?.status        || 'active',
  });
  const [showPw, setShowPw] = React.useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { showToast('Name and email are required.', 'error'); return; }
    if (!isEdit && !form.password)  { showToast('Password is required for new staff.', 'error'); return; }

    // Check duplicate email
    const existing = DB.getAll('users').find(u => u.email === form.email && u.id !== member?.id);
    if (existing) { showToast('An account with this email already exists.', 'error'); return; }

    if (isEdit) {
      const updates = { ...form };
      if (!updates.password) delete updates.password; // don't clear existing pw if left blank
      DB.update('users', member.id, updates);
      showToast('Staff member updated.', 'success');
    } else {
      DB.add('users', { id: fmt.id(), ...form });
      showToast(`${form.name} added to staff.`, 'success');
    }
    onSave();
  };

  const row = (ch) => <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>{ch}</div>;

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
        <button onClick={onCancel} style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
        <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
          {isEdit ? 'Edit Staff Member' : 'Add Staff Member'}
        </h2>
      </div>

      <Card style={{ padding:'28px', maxWidth:720 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
            {row(
              <>
                <Inp label="Full Name" value={form.name} onChange={v => set('name', v)} placeholder="Dr. Ahmed Ali" required autoFocus />
                <Sel label="Role" value={form.role} onChange={v => set('role', v)} required
                  options={[{value:'admin',label:'Administrator'},{value:'doctor',label:'Doctor'},
                    {value:'receptionist',label:'Receptionist'},{value:'pharmacist',label:'Pharmacist'},{value:'nurse',label:'Nurse'}]} />
              </>
            )}
            {row(
              <>
                <Inp label="Email Address" type="email" value={form.email} onChange={v => set('email', v)}
                  placeholder="staff@alkhidmat.org" required />
                <div style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                  <label style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.textSec }}>
                    Password {!isEdit && <span style={{ color:T.colors.red }}>*</span>}
                    {isEdit && <span style={{ fontWeight:'400', color:T.colors.textMuted }}> (leave blank to keep)</span>}
                  </label>
                  <div style={{ position:'relative' }}>
                    <input type={showPw ? 'text' : 'password'} value={form.password}
                      onChange={e => set('password', e.target.value)}
                      placeholder={isEdit ? '(unchanged)' : 'Minimum 6 characters'}
                      style={{ padding:'9px 40px 9px 12px', fontSize:T.font.base, fontFamily:'inherit',
                        border:`1.5px solid ${T.colors.border}`, borderRadius:T.radius.md,
                        outline:'none', color:T.colors.text, width:'100%', boxSizing:'border-box' }} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                        background:'none', border:'none', cursor:'pointer', color:T.colors.textMuted }}>
                      {showPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </>
            )}
            {row(
              <>
                <Inp label="Phone" value={form.phone} onChange={v => set('phone', v)} placeholder="0300-1234567" />
                <Inp label="Join Date" type="date" value={form.joinDate} onChange={v => set('joinDate', v)} />
              </>
            )}
            {(form.role === 'doctor') && row(
              <>
                <Inp label="Specialization" value={form.specialty} onChange={v => set('specialty', v)}
                  placeholder="e.g. General Medicine, Cardiology" />
                <Inp label="Qualification" value={form.qualification} onChange={v => set('qualification', v)}
                  placeholder="e.g. MBBS, FCPS, MD" />
              </>
            )}
            {form.role !== 'doctor' && (
              <Inp label="Qualification" value={form.qualification} onChange={v => set('qualification', v)}
                placeholder="e.g. Pharm-D, RN, BS" />
            )}
            <Sel label="Status" value={form.status} onChange={v => set('status', v)}
              options={[{value:'active',label:'Active'},{value:'inactive',label:'Inactive'}]} />

            <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end', paddingTop:'8px' }}>
              <Btn variant="ghost" type="button" onClick={onCancel}>Cancel</Btn>
              <Btn type="submit">{isEdit ? 'Save Changes' : 'Add Staff Member'}</Btn>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
