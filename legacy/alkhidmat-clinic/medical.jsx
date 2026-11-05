// medical.jsx — Consultations / Medical Records
window.MedicalPage = function MedicalPage({ user, showToast }) {
  const [view, setView] = React.useState('list');
  const [consultations, setConsultations] = React.useState(() => DB.getAll('consultations'));
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const reload = () => setConsultations(DB.getAll('consultations'));

  const withPatient = consultations.map(c => ({
    ...c,
    patient: DB.getById('patients', c.patientId),
    doctor:  DB.getById('users',    c.doctorId),
  }));

  const filtered = withPatient.filter(c => {
    const q = search.toLowerCase();
    return !q
      || c.patient?.name.toLowerCase().includes(q)
      || c.diagnosis.toLowerCase().includes(q)
      || c.doctor?.name.toLowerCase().includes(q);
  });

  const canCreate = ['admin','doctor','nurse'].includes(user.role);

  const openNew    = ()  => { setSelected(null); setView('form'); };
  const openDetail = (c) => { setSelected(c); setView('detail'); };
  const openEdit   = (c) => { setSelected(c); setView('form'); };
  const backToList = ()  => { setSelected(null); setView('list'); reload(); };

  if (view === 'form')   return <ConsultationForm consultation={selected} user={user} onSave={backToList} onCancel={backToList} showToast={showToast} />;
  if (view === 'detail') return <ConsultationDetail consultation={selected} user={user} onBack={backToList} onEdit={() => openEdit(selected)} showToast={showToast} />;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px', animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Medical Records</h2>
          <p style={{ margin:0, color:T.colors.textSec }}>{consultations.length} consultations recorded</p>
        </div>
        {canCreate && <Btn onClick={openNew}>+ New Consultation</Btn>}
      </div>

      <Card style={{ padding:'14px' }}>
        <Inp value={search} onChange={setSearch} placeholder="Search by patient name, diagnosis or doctor…" />
      </Card>

      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {filtered.length === 0
          ? <EmptyState icon="📋" title="No records found" message={search ? 'Try a different search term.' : 'No consultations recorded yet.'} action={canCreate && <Btn onClick={openNew}>+ New Consultation</Btn>} />
          : filtered.map(c => (
            <Card key={c.id} style={{ padding:'20px', cursor:'pointer', transition:'box-shadow 0.15s' }}
              onClick={() => openDetail(c)}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'16px', flexWrap:'wrap' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                  <Avatar name={c.patient?.name || '?'} size={44} />
                  <div>
                    <div style={{ fontWeight:'700', color:T.colors.text, fontSize:T.font.lg }}>{c.patient?.name || 'Unknown Patient'}</div>
                    <div style={{ fontSize:T.font.sm, color:T.colors.textSec, marginTop:'2px' }}>
                      {c.doctor?.name} · {fmt.date(c.date)}
                    </div>
                    <div style={{ fontSize:T.font.sm, color:T.colors.textSec, marginTop:'4px' }}>
                      <span style={{ fontWeight:'600', color:T.colors.text }}>{c.diagnosis}</span>
                      {c.icd10 && <span style={{ marginLeft:'6px', color:T.colors.textMuted }}>({c.icd10})</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'6px', alignItems:'flex-end' }}>
                  {c.followUpDate && <Badge color="blue">Follow-up: {fmt.date(c.followUpDate)}</Badge>}
                  <div style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>{fmt.mrn(c.patient?.mrn)}</div>
                </div>
              </div>
              {c.chiefComplaint && (
                <div style={{ marginTop:'12px', padding:'10px 14px', background:T.colors.bg,
                  borderRadius:T.radius.md, fontSize:T.font.sm, color:T.colors.textSec,
                  borderLeft:`3px solid ${T.colors.primaryMid}` }}>
                  <strong>Chief Complaint:</strong> {c.chiefComplaint}
                </div>
              )}
            </Card>
          ))
        }
      </div>
    </div>
  );
};

// ─── Consultation Form ────────────────────────────────────────────────────────
function ConsultationForm({ consultation, user, onSave, onCancel, showToast }) {
  const isEdit = !!consultation;
  const patients = DB.getAll('patients');
  const doctors  = DB.getAll('users').filter(u => u.role === 'doctor');

  const [form, setForm] = React.useState({
    patientId:       consultation?.patientId  || '',
    doctorId:        consultation?.doctorId   || (user.role === 'doctor' ? user.id : ''),
    date:            consultation?.date       || new Date().toISOString().slice(0, 16),
    chiefComplaint:  consultation?.chiefComplaint || '',
    examination:     consultation?.examination    || '',
    diagnosis:       consultation?.diagnosis      || '',
    icd10:           consultation?.icd10          || '',
    treatment:       consultation?.treatment      || '',
    followUpDate:    consultation?.followUpDate   || '',
    notes:           consultation?.notes          || '',
    vitals: {
      bp:     consultation?.vitals?.bp     || '',
      pulse:  consultation?.vitals?.pulse  || '',
      temp:   consultation?.vitals?.temp   || '',
      weight: consultation?.vitals?.weight || '',
      height: consultation?.vitals?.height || '',
      spo2:   consultation?.vitals?.spo2   || '',
    },
  });

  const set    = (k, v)    => setForm(f => ({ ...f, [k]: v }));
  const setVit = (k, v)    => setForm(f => ({ ...f, vitals: { ...f.vitals, [k]: v } }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId || !form.doctorId || !form.diagnosis) {
      showToast('Patient, Doctor and Diagnosis are required.', 'error'); return;
    }
    if (isEdit) {
      DB.update('consultations', consultation.id, form);
      showToast('Consultation updated.', 'success');
    } else {
      DB.add('consultations', { id: fmt.id(), ...form });
      // Update patient's lastVisit
      DB.update('patients', form.patientId, { lastVisit: fmt.today() });
      showToast('Consultation saved successfully.', 'success');
    }
    onSave();
  };

  const section = (title) => (
    <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
      textTransform:'uppercase', letterSpacing:'0.06em', paddingBottom:'8px',
      borderBottom:`2px solid ${T.colors.primaryLight}`, marginTop:'8px' }}>{title}</div>
  );

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
        <button onClick={onCancel} style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
        <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
          {isEdit ? 'Edit Consultation' : 'New Consultation'}
        </h2>
      </div>

      <Card style={{ padding:'28px', maxWidth:900 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            {section('Patient & Doctor')}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'16px' }}>
              <Sel label="Patient" value={form.patientId} onChange={v => set('patientId', v)} required
                options={[{value:'',label:'Select patient…'}, ...patients.map(p => ({value:p.id,label:`${p.name} (${fmt.mrn(p.mrn)})`}))]} />
              <Sel label="Doctor" value={form.doctorId} onChange={v => set('doctorId', v)} required
                options={[{value:'',label:'Select doctor…'}, ...doctors.map(d => ({value:d.id,label:d.name}))]} />
              <Inp label="Date & Time" type="datetime-local" value={form.date} onChange={v => set('date', v)} required />
            </div>

            {section('Vitals')}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:'12px' }}>
              {[['bp','BP (mmHg)','120/80'],['pulse','Pulse (bpm)','72'],
                ['temp','Temp (°C)','37.0'],['spo2','SpO2 (%)','98'],
                ['weight','Weight (kg)','70'],['height','Height (cm)','170']
              ].map(([k, l, ph]) => (
                <Inp key={k} label={l} value={form.vitals[k]} onChange={v => setVit(k, v)} placeholder={ph} />
              ))}
            </div>

            {section('Clinical Notes')}
            <Txta label="Chief Complaint" value={form.chiefComplaint} onChange={v => set('chiefComplaint', v)}
              placeholder="Patient's main complaint in their own words…" rows={2} />
            <Txta label="Examination Findings" value={form.examination} onChange={v => set('examination', v)}
              placeholder="Physical examination findings…" rows={3} />
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'16px' }}>
              <Inp label="Diagnosis" value={form.diagnosis} onChange={v => set('diagnosis', v)}
                placeholder="e.g. Hypertension, Diabetes Mellitus Type 2" required />
              <Inp label="ICD-10 Code" value={form.icd10} onChange={v => set('icd10', v)} placeholder="e.g. I10" />
            </div>
            <Txta label="Treatment Plan" value={form.treatment} onChange={v => set('treatment', v)}
              placeholder="Medications, lifestyle advice, procedures ordered…" rows={3} />
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
              <Inp label="Follow-up Date" type="date" value={form.followUpDate} onChange={v => set('followUpDate', v)} />
              <Txta label="Additional Notes" value={form.notes} onChange={v => set('notes', v)} rows={1} />
            </div>

            <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end' }}>
              <Btn variant="ghost" type="button" onClick={onCancel}>Cancel</Btn>
              <Btn type="submit">{isEdit ? 'Save Changes' : 'Save Consultation'}</Btn>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

// ─── Consultation Detail ──────────────────────────────────────────────────────
function ConsultationDetail({ consultation, user, onBack, onEdit }) {
  const p   = DB.getById('patients', consultation.patientId);
  const doc = DB.getById('users',    consultation.doctorId);
  const canEdit = ['admin','doctor'].includes(user.role);

  const vitals = consultation.vitals || {};
  const vitalItems = [
    ['Blood Pressure', vitals.bp,     'mmHg'],
    ['Pulse Rate',     vitals.pulse,  'bpm'],
    ['Temperature',    vitals.temp,   '°C'],
    ['SpO2',           vitals.spo2,   '%'],
    ['Weight',         vitals.weight, 'kg'],
    ['Height',         vitals.height, 'cm'],
  ].filter(([,v]) => v);

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
            fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Consultation Detail</h2>
        </div>
        {canEdit && <Btn variant="secondary" onClick={onEdit}>Edit</Btn>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
        {/* Left column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <Card style={{ padding:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
              <Avatar name={p?.name || '?'} size={48} />
              <div>
                <div style={{ fontWeight:'700', fontSize:T.font.xl, color:T.colors.text }}>{p?.name || '—'}</div>
                <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>{p && fmt.mrn(p.mrn)} · {fmt.age(p?.dob)}</div>
              </div>
            </div>
            <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>
              <strong>Doctor:</strong> {doc?.name} ({doc?.specialty})<br/>
              <strong>Date:</strong> {fmt.datetime(consultation.date)}
            </div>
          </Card>

          <Card style={{ padding:'20px' }}>
            <h4 style={{ margin:'0 0 12px', color:T.colors.primary, fontWeight:'700' }}>Vitals</h4>
            {vitalItems.length === 0
              ? <p style={{ color:T.colors.textMuted, fontSize:T.font.sm }}>No vitals recorded.</p>
              : <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                  {vitalItems.map(([l, v, u]) => (
                    <div key={l} style={{ background:T.colors.bg, borderRadius:T.radius.md, padding:'10px 12px' }}>
                      <div style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>{l}</div>
                      <div style={{ fontWeight:'700', fontSize:T.font.lg, color:T.colors.text }}>
                        {v} <span style={{ fontSize:T.font.xs, fontWeight:'400', color:T.colors.textSec }}>{u}</span>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </Card>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <Card style={{ padding:'20px' }}>
            <h4 style={{ margin:'0 0 4px', color:T.colors.text, fontWeight:'700', fontSize:T.font.xl }}>{consultation.diagnosis}</h4>
            {consultation.icd10 && <Badge color="blue" style={{ marginBottom:'12px' }}>ICD-10: {consultation.icd10}</Badge>}

            {[
              ['Chief Complaint',    consultation.chiefComplaint],
              ['Examination',        consultation.examination],
              ['Treatment Plan',     consultation.treatment],
              ['Notes',              consultation.notes],
            ].map(([l, v]) => v ? (
              <div key={l} style={{ marginTop:'14px' }}>
                <div style={{ fontSize:T.font.xs, fontWeight:'700', color:T.colors.textMuted,
                  textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'4px' }}>{l}</div>
                <div style={{ fontSize:T.font.sm, color:T.colors.text, lineHeight:1.65 }}>{v}</div>
              </div>
            ) : null)}

            {consultation.followUpDate && (
              <div style={{ marginTop:'16px', padding:'10px 14px', background:T.colors.blueLight,
                borderRadius:T.radius.md, fontSize:T.font.sm, color:T.colors.blue, fontWeight:'600' }}>
                📅 Follow-up: {fmt.date(consultation.followUpDate)}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
