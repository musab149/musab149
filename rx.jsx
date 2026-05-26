// rx.jsx — Prescription management
window.RxPage = function RxPage({ user, showToast }) {
  const [view, setView] = React.useState('list');
  const [prescriptions, setPrescriptions] = React.useState(() => DB.getAll('prescriptions'));
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const reload = () => setPrescriptions(DB.getAll('prescriptions'));

  const enriched = prescriptions.map(rx => ({
    ...rx,
    patient: DB.getById('patients', rx.patientId),
    doctor:  DB.getById('users',    rx.doctorId),
  }));

  const filtered = enriched.filter(rx => {
    const q = search.toLowerCase();
    const matchQ = !q || rx.patient?.name.toLowerCase().includes(q)
      || rx.medications.some(m => m.name.toLowerCase().includes(q));
    const matchS = !filterStatus || rx.status === filterStatus;
    return matchQ && matchS;
  });

  const canWrite   = ['admin','doctor'].includes(user.role);
  const canDispense = ['admin','pharmacist'].includes(user.role);

  const openNew    = ()  => { setSelected(null); setView('form'); };
  const openDetail = (r) => { setSelected(r); setView('detail'); };
  const backToList = ()  => { setSelected(null); setView('list'); reload(); };

  const dispense = (rx) => {
    DB.update('prescriptions', rx.id, {
      status: 'dispensed', dispensedDate: fmt.today(), dispensedBy: user.id,
    });
    showToast('Prescription marked as dispensed.', 'success');
    reload();
  };

  if (view === 'form')   return <RxForm prescription={selected} user={user} onSave={backToList} onCancel={backToList} showToast={showToast} />;
  if (view === 'detail') return <RxDetail prescription={selected} user={user} onBack={backToList} onDispense={dispense} canDispense={canDispense} showToast={showToast} />;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px', animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Prescriptions</h2>
          <p style={{ margin:0, color:T.colors.textSec }}>
            {prescriptions.filter(r => r.status === 'pending').length} pending · {prescriptions.length} total
          </p>
        </div>
        {canWrite && <Btn onClick={openNew}>+ Write Prescription</Btn>}
      </div>

      <Card style={{ padding:'14px' }}>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          <Inp value={search} onChange={setSearch} placeholder="Search by patient or medication…" style={{ flex:'1 1 260px' }} />
          <Sel value={filterStatus} onChange={setFilterStatus}
            options={[{value:'',label:'All Status'},{value:'pending',label:'Pending'},{value:'dispensed',label:'Dispensed'}]}
            style={{ flex:'0 0 160px' }} />
          {(search || filterStatus) && <Btn variant="ghost" size="sm" onClick={() => { setSearch(''); setFilterStatus(''); }}>Clear</Btn>}
        </div>
      </Card>

      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {filtered.length === 0
          ? <EmptyState icon="💊" title="No prescriptions found" message={search ? 'Try a different search.' : 'No prescriptions written yet.'} action={canWrite && <Btn onClick={openNew}>+ Write Prescription</Btn>} />
          : filtered.map(rx => (
            <Card key={rx.id} style={{ padding:'20px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'16px', flexWrap:'wrap' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                  <Avatar name={rx.patient?.name || '?'} size={44} />
                  <div>
                    <div style={{ fontWeight:'700', color:T.colors.text, fontSize:T.font.lg }}>{rx.patient?.name || '—'}</div>
                    <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>
                      {fmt.mrn(rx.patient?.mrn)} · {rx.doctor?.name} · {fmt.date(rx.date)}
                    </div>
                    <div style={{ marginTop:'6px', display:'flex', gap:'6px', flexWrap:'wrap' }}>
                      {rx.medications.slice(0, 3).map((m, i) => (
                        <span key={i} style={{ background:T.colors.primaryLight, color:T.colors.primary,
                          fontSize:T.font.xs, fontWeight:'600', padding:'2px 8px', borderRadius:T.radius.full }}>
                          {m.name} {m.dosage}
                        </span>
                      ))}
                      {rx.medications.length > 3 && (
                        <span style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>+{rx.medications.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px', alignItems:'flex-end' }}>
                  <Badge color={rx.status === 'dispensed' ? 'green' : 'yellow'}>
                    {rx.status === 'dispensed' ? '✓ Dispensed' : '⏳ Pending'}
                  </Badge>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <Btn variant="ghost" size="sm" onClick={() => openDetail(rx)}>View</Btn>
                    {canDispense && rx.status === 'pending' && (
                      <Btn variant="secondary" size="sm" onClick={() => dispense(rx)}>Dispense</Btn>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  );
};

// ─── Prescription Form ────────────────────────────────────────────────────────
function RxForm({ prescription, user, onSave, onCancel, showToast }) {
  const isEdit  = !!prescription;
  const patients = DB.getAll('patients');
  const doctors  = DB.getAll('users').filter(u => u.role === 'doctor');
  const consultations = DB.getAll('consultations');

  const emptyMed = { name:'', dosage:'', frequency:'', duration:'', instructions:'' };

  const [form, setForm] = React.useState({
    patientId:      prescription?.patientId      || '',
    doctorId:       prescription?.doctorId       || (user.role === 'doctor' ? user.id : ''),
    consultationId: prescription?.consultationId || '',
    date:           prescription?.date           || fmt.today(),
    medications:    prescription?.medications    || [{ ...emptyMed }],
    notes:          prescription?.notes          || '',
  });

  const set     = (k, v)       => setForm(f => ({ ...f, [k]: v }));
  const setMed  = (i, k, v)    => setForm(f => ({
    ...f,
    medications: f.medications.map((m, idx) => idx === i ? { ...m, [k]: v } : m),
  }));
  const addMed  = ()           => setForm(f => ({ ...f, medications: [...f.medications, { ...emptyMed }] }));
  const removeMed = (i)        => setForm(f => ({ ...f, medications: f.medications.filter((_, idx) => idx !== i) }));

  const patientConsults = form.patientId
    ? consultations.filter(c => c.patientId === form.patientId)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId) { showToast('Patient and doctor are required.', 'error'); return; }
    if (form.medications.some(m => !m.name.trim())) { showToast('All medication names are required.', 'error'); return; }
    if (isEdit) {
      DB.update('prescriptions', prescription.id, form);
      showToast('Prescription updated.', 'success');
    } else {
      DB.add('prescriptions', { id: fmt.id(), ...form, status:'pending', dispensedDate:null, dispensedBy:null });
      showToast('Prescription written successfully.', 'success');
    }
    onSave();
  };

  const freqOptions = ['Once daily','Twice daily','Three times daily','Four times daily',
    'Every 4 hours','Every 6 hours','Every 8 hours','As needed','At bedtime'];
  const durOptions  = ['3 days','5 days','7 days','10 days','14 days','1 month','2 months','3 months','Ongoing'];

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
        <button onClick={onCancel} style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
        <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
          {isEdit ? 'Edit Prescription' : 'Write Prescription'}
        </h2>
      </div>

      <Card style={{ padding:'28px', maxWidth:900 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'14px' }}>
              <Sel label="Patient" value={form.patientId} onChange={v => { set('patientId', v); set('consultationId', ''); }} required
                options={[{value:'',label:'Select patient…'}, ...patients.map(p => ({value:p.id,label:`${p.name} (${fmt.mrn(p.mrn)})`}))]} />
              <Sel label="Doctor" value={form.doctorId} onChange={v => set('doctorId', v)} required
                options={[{value:'',label:'Select doctor…'}, ...doctors.map(d => ({value:d.id,label:d.name}))]} />
              <Sel label="Linked Consultation (optional)" value={form.consultationId} onChange={v => set('consultationId', v)}
                options={[{value:'',label:'None'}, ...patientConsults.map(c => ({value:c.id,label:`${c.diagnosis} — ${fmt.date(c.date)}`}))]} />
              <Inp label="Date" type="date" value={form.date} onChange={v => set('date', v)} required />
            </div>

            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
                <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
                  textTransform:'uppercase', letterSpacing:'0.06em' }}>Medications</div>
                <Btn variant="secondary" size="sm" type="button" onClick={addMed}>+ Add Medication</Btn>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {form.medications.map((m, i) => (
                  <div key={i} style={{ background:T.colors.bg, borderRadius:T.radius.lg, padding:'16px',
                    border:`1px solid ${T.colors.border}` }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'12px' }}>
                      <span style={{ fontWeight:'700', color:T.colors.textSec, fontSize:T.font.sm }}>
                        Medication {i + 1}
                      </span>
                      {form.medications.length > 1 && (
                        <button type="button" onClick={() => removeMed(i)}
                          style={{ background:'none', border:'none', cursor:'pointer',
                            color:T.colors.red, fontSize:T.font.sm, fontWeight:'600' }}>Remove</button>
                      )}
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 2fr 1fr', gap:'12px', marginBottom:'10px' }}>
                      <Inp label="Drug Name" value={m.name} onChange={v => setMed(i,'name',v)}
                        placeholder="e.g. Amlodipine" required />
                      <Inp label="Dosage" value={m.dosage} onChange={v => setMed(i,'dosage',v)} placeholder="e.g. 10mg" />
                      <Sel label="Frequency" value={m.frequency} onChange={v => setMed(i,'frequency',v)}
                        options={[{value:'',label:'Select…'}, ...freqOptions.map(f => ({value:f,label:f}))]} />
                      <Sel label="Duration" value={m.duration} onChange={v => setMed(i,'duration',v)}
                        options={[{value:'',label:'Select…'}, ...durOptions.map(d => ({value:d,label:d}))]} />
                    </div>
                    <Inp label="Instructions" value={m.instructions} onChange={v => setMed(i,'instructions',v)}
                      placeholder="e.g. Take after meals, avoid grapefruit juice" />
                  </div>
                ))}
              </div>
            </div>

            <Txta label="Pharmacist Notes" value={form.notes} onChange={v => set('notes', v)}
              placeholder="Additional instructions for the pharmacist…" rows={2} />

            <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end' }}>
              <Btn variant="ghost" type="button" onClick={onCancel}>Cancel</Btn>
              <Btn type="submit">{isEdit ? 'Save Changes' : 'Write Prescription'}</Btn>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

// ─── Prescription Detail ──────────────────────────────────────────────────────
function RxDetail({ prescription, user, onBack, onDispense, canDispense }) {
  const p       = DB.getById('patients', prescription.patientId);
  const doc     = DB.getById('users',    prescription.doctorId);
  const dispBy  = DB.getById('users',    prescription.dispensedBy);
  const [rx, setRx] = React.useState(prescription);

  const handleDispense = () => {
    onDispense(rx);
    setRx({ ...rx, status:'dispensed', dispensedDate:fmt.today() });
  };

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
            fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Prescription</h2>
        </div>
        {canDispense && rx.status === 'pending' && (
          <Btn onClick={handleDispense}>✓ Mark as Dispensed</Btn>
        )}
      </div>

      <Card style={{ padding:'32px', maxWidth:720 }}>
        {/* Rx header */}
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'24px',
          paddingBottom:'20px', borderBottom:`2px dashed ${T.colors.border}`, flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
              <span style={{ fontSize:'24px' }}>🏥</span>
              <div>
                <div style={{ fontWeight:'800', fontSize:T.font.xl, color:T.colors.text }}>Alkhidmat Clinic</div>
                <div style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>
                  {DB.getSettings().address} · {DB.getSettings().phone}
                </div>
              </div>
            </div>
            <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>
              <strong>{doc?.name}</strong> — {doc?.specialty}<br/>
              <span style={{ fontSize:T.font.xs }}>{doc?.qualification}</span>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontWeight:'700', color:T.colors.text }}>Date: {fmt.date(rx.date)}</div>
            <Badge color={rx.status === 'dispensed' ? 'green' : 'yellow'} style={{ marginTop:'6px' }}>
              {rx.status === 'dispensed' ? '✓ Dispensed' : '⏳ Pending Dispensing'}
            </Badge>
          </div>
        </div>

        {/* Patient */}
        <div style={{ background:T.colors.bg, borderRadius:T.radius.md, padding:'14px 16px',
          marginBottom:'20px', fontSize:T.font.sm }}>
          <div style={{ display:'flex', gap:'24px', flexWrap:'wrap' }}>
            <div><span style={{ color:T.colors.textMuted }}>Patient: </span><strong>{p?.name}</strong></div>
            <div><span style={{ color:T.colors.textMuted }}>Age: </span>{fmt.age(p?.dob)}</div>
            <div><span style={{ color:T.colors.textMuted }}>MRN: </span>{fmt.mrn(p?.mrn)}</div>
            <div><span style={{ color:T.colors.textMuted }}>Gender: </span>{p?.gender}</div>
            {p?.allergies && p.allergies !== 'None' && (
              <div style={{ color:T.colors.red }}><strong>⚠ Allergies: {p.allergies}</strong></div>
            )}
          </div>
        </div>

        {/* Medications */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
            textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'12px' }}>℞ Medications</div>
          {rx.medications.map((m, i) => (
            <div key={i} style={{ display:'flex', gap:'16px', padding:'14px 0',
              borderBottom:`1px solid ${T.colors.border}`, alignItems:'flex-start' }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:T.colors.primaryLight,
                color:T.colors.primary, display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:'800', fontSize:T.font.sm, flexShrink:0 }}>
                {i + 1}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:'700', color:T.colors.text, fontSize:T.font.md }}>{m.name} <span style={{ fontWeight:'400', color:T.colors.textSec }}>— {m.dosage}</span></div>
                <div style={{ fontSize:T.font.sm, color:T.colors.textSec, marginTop:'3px' }}>
                  {m.frequency} · {m.duration}
                </div>
                {m.instructions && (
                  <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, marginTop:'3px', fontStyle:'italic' }}>
                    {m.instructions}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {rx.notes && (
          <div style={{ background:T.colors.yellowLight, borderRadius:T.radius.md, padding:'12px 14px',
            fontSize:T.font.sm, color:T.colors.text, marginBottom:'16px' }}>
            <strong>Notes:</strong> {rx.notes}
          </div>
        )}

        {rx.status === 'dispensed' && (
          <div style={{ background:T.colors.greenLight, borderRadius:T.radius.md, padding:'12px 14px',
            fontSize:T.font.sm, color:T.colors.green, fontWeight:'600' }}>
            ✓ Dispensed on {fmt.date(rx.dispensedDate)} by {dispBy?.name || '—'}
          </div>
        )}
      </Card>
    </div>
  );
}
