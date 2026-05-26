// patients.jsx — Patient list, registration, and detail view
window.PatientsPage = function PatientsPage({ user, showToast }) {
  const [view, setView] = React.useState('list'); // list | form | detail
  const [patients, setPatients] = React.useState(() => DB.getAll('patients'));
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filterGender, setFilterGender] = React.useState('');
  const [deleteConfirm, setDeleteConfirm] = React.useState(null);

  const reload = () => setPatients(DB.getAll('patients'));

  const filtered = patients.filter(p => {
    const q = search.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || fmt.mrn(p.mrn).toLowerCase().includes(q) || p.phone.includes(q);
    const matchG = !filterGender || p.gender === filterGender;
    return matchQ && matchG;
  });

  const canEdit = ['admin','receptionist'].includes(user.role);

  const openDetail = (p) => { setSelected(p); setView('detail'); };
  const openNew    = ()  => { setSelected(null); setView('form'); };
  const openEdit   = (p) => { setSelected(p); setView('form'); };
  const backToList = ()  => { setSelected(null); setView('list'); reload(); };

  const handleDelete = (p) => {
    DB.remove('patients', p.id);
    reload();
    setDeleteConfirm(null);
    showToast('Patient record deleted.', 'success');
  };

  if (view === 'form') return <PatientForm patient={selected} onSave={backToList} onCancel={backToList} showToast={showToast} />;
  if (view === 'detail') return <PatientDetail patient={selected} user={user} onBack={backToList} onEdit={() => openEdit(selected)} showToast={showToast} />;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px', animation:'fadeIn 0.3s' }}>
      {/* Header row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Patients</h2>
          <p style={{ margin:0, color:T.colors.textSec }}>{patients.length} registered patients</p>
        </div>
        {canEdit && <Btn onClick={openNew}>+ Register Patient</Btn>}
      </div>

      {/* Filters */}
      <Card style={{ padding:'16px' }}>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'flex-end' }}>
          <Inp value={search} onChange={setSearch} placeholder="Search by name, MRN or phone…"
            style={{ flex:'1 1 260px' }} />
          <Sel value={filterGender} onChange={setFilterGender}
            options={[{value:'',label:'All Genders'},{value:'male',label:'Male'},{value:'female',label:'Female'}]}
            style={{ flex:'0 0 150px' }} />
          {(search || filterGender) && (
            <Btn variant="ghost" size="sm" onClick={() => { setSearch(''); setFilterGender(''); }}>Clear</Btn>
          )}
        </div>
      </Card>

      {/* Table */}
      <Card pad={false}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:T.font.sm }}>
            <thead>
              <tr style={{ background:T.colors.bg, borderBottom:`2px solid ${T.colors.border}` }}>
                {['MRN','Patient','Age / Gender','Phone','Blood Group','Last Visit','Status',''].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:'700',
                    color:T.colors.textSec, fontSize:T.font.xs, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ padding:'48px', textAlign:'center', color:T.colors.textMuted }}>
                  {search ? 'No patients match your search.' : 'No patients registered yet.'}
                </td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} style={{ borderBottom:`1px solid ${T.colors.border}`, transition:'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding:'12px 14px', fontWeight:'700', color:T.colors.primary, whiteSpace:'nowrap' }}>
                    {fmt.mrn(p.mrn)}
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <Avatar name={p.name} size={32} />
                      <div>
                        <div style={{ fontWeight:'700', color:T.colors.text }}>{p.name}</div>
                        {p.medicalHistory && (
                          <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, maxWidth:'180px',
                            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {p.medicalHistory}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec, whiteSpace:'nowrap' }}>
                    {fmt.age(p.dob)} · {p.gender === 'male' ? '♂ Male' : '♀ Female'}
                  </td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec }}>{p.phone}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <Badge color={p.bloodGroup?.includes('-') ? 'red' : 'blue'}>{p.bloodGroup || '—'}</Badge>
                  </td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec, whiteSpace:'nowrap' }}>
                    {fmt.date(p.lastVisit)}
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <Badge color={p.status === 'active' ? 'green' : 'gray'}>{p.status}</Badge>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ display:'flex', gap:'6px' }}>
                      <Btn variant="ghost" size="sm" onClick={() => openDetail(p)}>View</Btn>
                      {canEdit && <Btn variant="ghost" size="sm" onClick={() => openEdit(p)}>Edit</Btn>}
                      {user.role === 'admin' && (
                        <Btn variant="danger" size="sm" onClick={() => setDeleteConfirm(p)}>Del</Btn>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div style={{ padding:'10px 14px', borderTop:`1px solid ${T.colors.border}`,
            fontSize:T.font.xs, color:T.colors.textMuted }}>
            Showing {filtered.length} of {patients.length} patients
          </div>
        )}
      </Card>

      {/* Delete confirm */}
      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Patient" width={400}>
        <p style={{ color:T.colors.textSec, marginTop:0 }}>
          Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This cannot be undone.
        </p>
        <div style={{ display:'flex', gap:'10px', justifyContent:'flex-end' }}>
          <Btn variant="ghost" onClick={() => setDeleteConfirm(null)}>Cancel</Btn>
          <Btn variant="danger" onClick={() => handleDelete(deleteConfirm)}>Delete</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ─── Patient Form ─────────────────────────────────────────────────────────────
function PatientForm({ patient, onSave, onCancel, showToast }) {
  const isEdit = !!patient;
  const [form, setForm] = React.useState({
    name: patient?.name || '',
    dob: patient?.dob || '',
    gender: patient?.gender || 'male',
    phone: patient?.phone || '',
    address: patient?.address || '',
    bloodGroup: patient?.bloodGroup || '',
    allergies: patient?.allergies || '',
    medicalHistory: patient?.medicalHistory || '',
    status: patient?.status || 'active',
  });
  const [errors, setErrors] = React.useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.dob) e.dob = 'Date of birth is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    if (isEdit) {
      DB.update('patients', patient.id, { ...form, lastVisit: patient.lastVisit });
      showToast('Patient updated successfully.', 'success');
    } else {
      const mrn = DB.nextMRN();
      DB.add('patients', { id: fmt.id(), mrn, ...form, registrationDate: fmt.today(), lastVisit: null });
      showToast(`Patient registered — ${fmt.mrn(mrn)}`, 'success');
    }
    onSave();
  };

  const row = (children) => (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>{children}</div>
  );

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
        <button onClick={onCancel} style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
        <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
          {isEdit ? 'Edit Patient' : 'Register New Patient'}
        </h2>
      </div>

      <Card style={{ padding:'28px', maxWidth:800 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
              textTransform:'uppercase', letterSpacing:'0.06em', paddingBottom:'8px',
              borderBottom:`2px solid ${T.colors.primaryLight}` }}>Personal Information</div>

            {row(
              <>
                <Inp label="Full Name" value={form.name} onChange={v => set('name', v)}
                  placeholder="Muhammad Ali Khan" required error={errors.name} />
                <Inp label="Phone Number" value={form.phone} onChange={v => set('phone', v)}
                  placeholder="0300-1234567" required error={errors.phone} />
              </>
            )}
            {row(
              <>
                <Inp label="Date of Birth" type="date" value={form.dob} onChange={v => set('dob', v)}
                  required error={errors.dob} />
                <Sel label="Gender" value={form.gender} onChange={v => set('gender', v)}
                  options={[{value:'male',label:'Male'},{value:'female',label:'Female'},{value:'other',label:'Other'}]} required />
              </>
            )}
            <Txta label="Address" value={form.address} onChange={v => set('address', v)}
              placeholder="House #, Street, Area, City" rows={2} />

            <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
              textTransform:'uppercase', letterSpacing:'0.06em', paddingBottom:'8px',
              borderBottom:`2px solid ${T.colors.primaryLight}`, marginTop:'8px' }}>Medical Information</div>

            {row(
              <>
                <Sel label="Blood Group" value={form.bloodGroup} onChange={v => set('bloodGroup', v)}
                  options={[{value:'',label:'Unknown'},{value:'A+',label:'A+'},{value:'A-',label:'A-'},
                    {value:'B+',label:'B+'},{value:'B-',label:'B-'},{value:'AB+',label:'AB+'},
                    {value:'AB-',label:'AB-'},{value:'O+',label:'O+'},{value:'O-',label:'O-'}]} />
                <Sel label="Status" value={form.status} onChange={v => set('status', v)}
                  options={[{value:'active',label:'Active'},{value:'inactive',label:'Inactive'}]} />
              </>
            )}
            <Inp label="Allergies" value={form.allergies} onChange={v => set('allergies', v)}
              placeholder="e.g. Penicillin, Aspirin, None" />
            <Txta label="Medical History" value={form.medicalHistory} onChange={v => set('medicalHistory', v)}
              placeholder="Pre-existing conditions, past surgeries, chronic illnesses…" rows={3} />

            <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end', marginTop:'8px' }}>
              <Btn variant="ghost" type="button" onClick={onCancel}>Cancel</Btn>
              <Btn type="submit">{isEdit ? 'Save Changes' : 'Register Patient'}</Btn>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

// ─── Patient Detail ───────────────────────────────────────────────────────────
function PatientDetail({ patient, user, onBack, onEdit, showToast }) {
  const [tab, setTab] = React.useState('info');
  const consultations = DB.getAll('consultations').filter(c => c.patientId === patient.id);
  const prescriptions = DB.getAll('prescriptions').filter(r => r.patientId === patient.id);
  const receipts = DB.getAll('receipts').filter(r => r.patientId === patient.id);
  const appointments = DB.getAll('appointments').filter(a => a.patientId === patient.id);

  const tabs = [
    { id:'info',    label:'Patient Info',  count: null },
    { id:'visits',  label:'Consultations', count: consultations.length },
    { id:'rx',      label:'Prescriptions', count: prescriptions.length },
    { id:'billing', label:'Billing',       count: receipts.length },
  ];

  const canEdit = ['admin','receptionist'].includes(user.role);

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      {/* Header */}
      <div style={{ marginBottom:'24px' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit', marginBottom:'12px' }}>← Back to Patients</button>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'16px', flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <Avatar name={patient.name} size={64} />
            <div>
              <h2 style={{ margin:'0 0 4px', fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>{patient.name}</h2>
              <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center' }}>
                <Badge color="primary">{fmt.mrn(patient.mrn)}</Badge>
                <Badge color={patient.gender === 'male' ? 'blue' : 'purple'}>{patient.gender}</Badge>
                <Badge color={patient.status === 'active' ? 'green' : 'gray'}>{patient.status}</Badge>
                {patient.bloodGroup && <Badge color="red">{patient.bloodGroup}</Badge>}
              </div>
            </div>
          </div>
          {canEdit && <Btn onClick={onEdit} variant="secondary">Edit Patient</Btn>}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display:'flex', gap:'4px', marginBottom:'20px', borderBottom:`2px solid ${T.colors.border}`,
        paddingBottom:'0' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding:'10px 18px', background:'none', border:'none', cursor:'pointer',
              fontFamily:'inherit', fontWeight:'600', fontSize:T.font.base, transition:'all 0.15s',
              color: tab === t.id ? T.colors.primary : T.colors.textSec,
              borderBottom: tab === t.id ? `2px solid ${T.colors.primary}` : '2px solid transparent',
              marginBottom:'-2px', display:'flex', alignItems:'center', gap:'6px' }}>
            {t.label}
            {t.count !== null && (
              <span style={{ background: tab === t.id ? T.colors.primaryLight : T.colors.bg,
                color: tab === t.id ? T.colors.primary : T.colors.textMuted,
                borderRadius:T.radius.full, padding:'0 7px', fontSize:T.font.xs, fontWeight:'700' }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Info tab */}
      {tab === 'info' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
          <Card style={{ padding:'20px' }}>
            <h4 style={{ margin:'0 0 16px', color:T.colors.primary, fontSize:T.font.base, fontWeight:'700' }}>Personal Details</h4>
            {[
              ['Full Name',          patient.name],
              ['Date of Birth',      fmt.date(patient.dob)],
              ['Age',                fmt.age(patient.dob)],
              ['Gender',             patient.gender],
              ['Phone',              patient.phone],
              ['Address',            patient.address || '—'],
              ['Registration Date',  fmt.date(patient.registrationDate)],
              ['Last Visit',         fmt.date(patient.lastVisit)],
            ].map(([l, v]) => (
              <div key={l} style={{ display:'flex', gap:'12px', padding:'8px 0',
                borderBottom:`1px solid ${T.colors.border}` }}>
                <div style={{ flex:'0 0 150px', fontSize:T.font.sm, color:T.colors.textSec, fontWeight:'600' }}>{l}</div>
                <div style={{ fontSize:T.font.sm, color:T.colors.text }}>{v || '—'}</div>
              </div>
            ))}
          </Card>
          <Card style={{ padding:'20px' }}>
            <h4 style={{ margin:'0 0 16px', color:T.colors.primary, fontSize:T.font.base, fontWeight:'700' }}>Medical Summary</h4>
            <InfoField label="Blood Group"     value={patient.bloodGroup} />
            <InfoField label="Allergies"        value={patient.allergies} warn={patient.allergies && patient.allergies !== 'None'} />
            <InfoField label="Medical History"  value={patient.medicalHistory} multiline />
            <div style={{ marginTop:'16px', padding:'12px', background:T.colors.primaryLight,
              borderRadius:T.radius.md, textAlign:'center' }}>
              <div style={{ fontSize:T.font['2xl'], fontWeight:'800', color:T.colors.primary }}>{appointments.length}</div>
              <div style={{ fontSize:T.font.xs, color:T.colors.textSec }}>Total Appointments</div>
            </div>
          </Card>
        </div>
      )}

      {/* Consultations tab */}
      {tab === 'visits' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {consultations.length === 0
            ? <EmptyState icon="📋" title="No consultations yet" message="No medical records found for this patient." />
            : consultations.map(c => {
              const doc = DB.getById('users', c.doctorId);
              return (
                <Card key={c.id} style={{ padding:'20px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px', flexWrap:'wrap', gap:'8px' }}>
                    <div>
                      <div style={{ fontWeight:'700', color:T.colors.text, fontSize:T.font.lg }}>{c.diagnosis}</div>
                      <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>{doc?.name} · {fmt.date(c.date)}</div>
                    </div>
                    {c.icd10 && <Badge color="blue">ICD-10: {c.icd10}</Badge>}
                  </div>
                  <InfoField label="Chief Complaint" value={c.chiefComplaint} />
                  <InfoField label="Treatment"       value={c.treatment} />
                  {c.followUpDate && <InfoField label="Follow-up" value={fmt.date(c.followUpDate)} />}
                  {c.vitals && (
                    <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'12px' }}>
                      {[['BP', c.vitals.bp,'mmHg'],['Pulse',c.vitals.pulse,'bpm'],
                        ['Temp',c.vitals.temp,'°C'],['SpO2',c.vitals.spo2,'%'],
                        ['Weight',c.vitals.weight,'kg'],['Height',c.vitals.height,'cm']
                      ].map(([l,v,u]) => v ? (
                        <div key={l} style={{ background:T.colors.bg, borderRadius:T.radius.md, padding:'6px 10px', textAlign:'center' }}>
                          <div style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>{l}</div>
                          <div style={{ fontWeight:'700', fontSize:T.font.sm, color:T.colors.text }}>{v} <span style={{ fontSize:T.font.xs, fontWeight:'400' }}>{u}</span></div>
                        </div>
                      ) : null)}
                    </div>
                  )}
                </Card>
              );
            })
          }
        </div>
      )}

      {/* Prescriptions tab */}
      {tab === 'rx' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {prescriptions.length === 0
            ? <EmptyState icon="💊" title="No prescriptions" message="No prescriptions written for this patient." />
            : prescriptions.map(rx => {
              const doc = DB.getById('users', rx.doctorId);
              return (
                <Card key={rx.id} style={{ padding:'20px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px', flexWrap:'wrap', gap:'8px' }}>
                    <div>
                      <div style={{ fontWeight:'700', color:T.colors.text }}>Prescription — {fmt.date(rx.date)}</div>
                      <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>{doc?.name}</div>
                    </div>
                    <Badge color={rx.status === 'dispensed' ? 'green' : 'yellow'}>{rx.status}</Badge>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                    {rx.medications.map((m, i) => (
                      <div key={i} style={{ background:T.colors.bg, borderRadius:T.radius.md, padding:'10px 14px',
                        fontSize:T.font.sm, display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'center' }}>
                        <strong style={{ color:T.colors.text }}>{m.name}</strong>
                        <span style={{ color:T.colors.textSec }}>{m.dosage}</span>
                        <span style={{ color:T.colors.textMuted }}>·</span>
                        <span style={{ color:T.colors.textSec }}>{m.frequency}</span>
                        <span style={{ color:T.colors.textMuted }}>·</span>
                        <span style={{ color:T.colors.textSec }}>{m.duration}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })
          }
        </div>
      )}

      {/* Billing tab */}
      {tab === 'billing' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {receipts.length === 0
            ? <EmptyState icon="🧾" title="No bills" message="No billing records found for this patient." />
            : receipts.map(r => (
              <Card key={r.id} style={{ padding:'20px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px', flexWrap:'wrap', gap:'8px' }}>
                  <div>
                    <div style={{ fontWeight:'700', color:T.colors.text }}>Receipt #{r.receiptNo}</div>
                    <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>{fmt.date(r.date)} · {r.paymentMethod}</div>
                  </div>
                  <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
                    <strong style={{ color:T.colors.text, fontSize:T.font.lg }}>{fmt.currency(r.total)}</strong>
                    <Badge color="green">{r.status}</Badge>
                  </div>
                </div>
                <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>
                  {r.items.map(it => `${it.description} × ${it.qty}`).join(' · ')}
                  {r.discount > 0 && <span style={{ color:T.colors.green }}> · Discount: {fmt.currency(r.discount)}</span>}
                </div>
              </Card>
            ))
          }
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value, multiline, warn }) {
  return (
    <div style={{ padding:'8px 0', borderBottom:`1px solid ${T.colors.border}` }}>
      <div style={{ fontSize:T.font.xs, fontWeight:'700', color:T.colors.textMuted,
        textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'3px' }}>{label}</div>
      <div style={{ fontSize:T.font.sm, color: warn ? T.colors.red : T.colors.text,
        fontWeight: warn ? '700' : '400', lineHeight: multiline ? 1.6 : 'normal' }}>
        {value || '—'}
      </div>
    </div>
  );
}
window.InfoField = InfoField;
