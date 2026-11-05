// tokens.jsx — Design tokens, data store, shared UI primitives
const { useState, useEffect, useRef, useCallback } = React;

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
window.T = {
  colors: {
    primary:       '#0c6e43',
    primaryDark:   '#085230',
    primaryLight:  '#e7f4ed',
    primaryMid:    '#c8e6d4',
    accent:        '#16a34a',
    bg:            '#f0eee9',
    surface:       '#ffffff',
    border:        '#e2e8f0',
    borderDark:    '#cbd5e1',
    text:          '#1e293b',
    textSec:       '#475569',
    textMuted:     '#94a3b8',
    red:           '#dc2626',
    redLight:      '#fef2f2',
    yellow:        '#d97706',
    yellowLight:   '#fffbeb',
    green:         '#16a34a',
    greenLight:    '#f0fdf4',
    blue:          '#2563eb',
    blueLight:     '#eff6ff',
    purple:        '#7c3aed',
    purpleLight:   '#f5f3ff',
    teal:          '#0d9488',
    tealLight:     '#f0fdfa',
  },
  font: {
    xs: '11px', sm: '12px', base: '14px', md: '15px',
    lg: '16px', xl: '18px', '2xl': '20px', '3xl': '24px',
    '4xl': '30px', '5xl': '36px',
  },
  radius: { sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', full: '9999px' },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 8px 24px rgba(0,0,0,0.10)',
    xl: '0 20px 60px rgba(0,0,0,0.18)',
  },
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────
window.fmt = {
  date: (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  },
  dateInput: (d) => {
    if (!d) return '';
    return new Date(d).toISOString().split('T')[0];
  },
  time: (d) => {
    if (!d) return '—';
    const dt = new Date(d);
    return dt.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
  },
  datetime: (d) => {
    if (!d) return '—';
    return fmt.date(d) + ' · ' + fmt.time(d);
  },
  currency: (n) => 'PKR ' + Number(n || 0).toLocaleString('en-PK'),
  age: (dob) => {
    if (!dob) return '—';
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000)) + ' yrs';
  },
  mrn: (n) => 'MRN-' + String(n).padStart(5, '0'),
  initials: (name) => (name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
  id: () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
  today: () => new Date().toISOString().split('T')[0],
};

// ─── DATA STORE ───────────────────────────────────────────────────────────────
window.DB = (() => {
  const KEY = {
    users: 'ak_users', patients: 'ak_patients', appointments: 'ak_appointments',
    consultations: 'ak_consultations', prescriptions: 'ak_prescriptions',
    receipts: 'ak_receipts', settings: 'ak_settings',
  };

  const SEED = {
    users: [
      { id:'u1', name:'Admin User',       email:'admin@alkhidmat.org',     password:'admin123',     role:'admin',        phone:'0300-1234567', joinDate:'2023-01-01', status:'active', specialty:'', qualification:'' },
      { id:'u2', name:'Dr. Ahmed Raza',   email:'doctor@alkhidmat.org',    password:'doctor123',    role:'doctor',       phone:'0301-2345678', joinDate:'2023-02-15', status:'active', specialty:'General Medicine', qualification:'MBBS, FCPS' },
      { id:'u3', name:'Sara Khan',        email:'reception@alkhidmat.org', password:'reception123', role:'receptionist', phone:'0302-3456789', joinDate:'2023-03-01', status:'active', specialty:'', qualification:'' },
      { id:'u4', name:'Imran Malik',      email:'pharmacy@alkhidmat.org',  password:'pharmacy123',  role:'pharmacist',   phone:'0303-4567890', joinDate:'2023-03-15', status:'active', specialty:'', qualification:'Pharm-D' },
      { id:'u5', name:'Dr. Fatima Noor', email:'doctor2@alkhidmat.org',   password:'doctor123',    role:'doctor',       phone:'0304-5678901', joinDate:'2023-04-01', status:'active', specialty:'Gynecology & Obstetrics', qualification:'MBBS, MCPS' },
      { id:'u6', name:'Ali Hassan',      email:'nurse@alkhidmat.org',     password:'nurse123',     role:'nurse',        phone:'0305-6789012', joinDate:'2023-05-01', status:'active', specialty:'', qualification:'RN' },
    ],
    patients: [
      { id:'p1',  mrn:1,  name:'Muhammad Ali Khan',    dob:'1978-05-15', gender:'male',   phone:'0311-1234567', address:'House 12, Gulberg III, Lahore',       bloodGroup:'B+',  allergies:'Penicillin',  medicalHistory:'Hypertension, Type 2 Diabetes', registrationDate:'2024-01-10', lastVisit:'2024-12-15', status:'active' },
      { id:'p2',  mrn:2,  name:'Fatima Begum',         dob:'1991-08-22', gender:'female', phone:'0322-2345678', address:'Flat 5, DHA Phase 1, Lahore',          bloodGroup:'A+',  allergies:'None',        medicalHistory:'Iron Deficiency Anemia', registrationDate:'2024-01-15', lastVisit:'2024-12-20', status:'active' },
      { id:'p3',  mrn:3,  name:'Abdul Rahman Sheikh',  dob:'1956-03-10', gender:'male',   phone:'0333-3456789', address:'Mohallah Islamia, Sheikhupura',         bloodGroup:'O+',  allergies:'Sulfa drugs', medicalHistory:'Cardiac disease, Hypertension', registrationDate:'2024-02-01', lastVisit:'2024-11-30', status:'active' },
      { id:'p4',  mrn:4,  name:'Ayesha Siddiqui',     dob:'1995-11-28', gender:'female', phone:'0344-4567890', address:'House 7, Model Town, Lahore',           bloodGroup:'AB+', allergies:'None',        medicalHistory:'', registrationDate:'2024-02-10', lastVisit:'2024-12-18', status:'active' },
      { id:'p5',  mrn:5,  name:'Zubair Ahmed',         dob:'1969-07-04', gender:'male',   phone:'0355-5678901', address:'Ferozepur Road, Lahore',                bloodGroup:'B-',  allergies:'Aspirin',     medicalHistory:'Arthritis, Gout', registrationDate:'2024-02-20', lastVisit:'2024-12-10', status:'active' },
      { id:'p6',  mrn:6,  name:'Nadia Hussain',        dob:'1988-12-15', gender:'female', phone:'0366-6789012', address:'Street 8, Johar Town, Lahore',          bloodGroup:'A-',  allergies:'None',        medicalHistory:'PCOS, Thyroid disorder', registrationDate:'2024-03-05', lastVisit:'2024-12-22', status:'active' },
      { id:'p7',  mrn:7,  name:'Tariq Mehmood',        dob:'1972-09-30', gender:'male',   phone:'0377-7890123', address:'Ravi Road, Lahore',                     bloodGroup:'O-',  allergies:'None',        medicalHistory:'Hepatitis C', registrationDate:'2024-03-15', lastVisit:'2024-11-25', status:'active' },
      { id:'p8',  mrn:8,  name:'Rukhsana Bibi',        dob:'1945-04-18', gender:'female', phone:'0388-8901234', address:'Village Gujra, Nankana Sahib',           bloodGroup:'AB-', allergies:'NSAIDs',      medicalHistory:'Osteoporosis, Hypertension', registrationDate:'2024-04-01', lastVisit:'2024-12-05', status:'active' },
      { id:'p9',  mrn:9,  name:'Usman Ghani',          dob:'2003-02-14', gender:'male',   phone:'0399-9012345', address:'Green Town, Lahore',                    bloodGroup:'B+',  allergies:'None',        medicalHistory:'Bronchial Asthma', registrationDate:'2024-04-20', lastVisit:'2024-12-19', status:'active' },
      { id:'p10', mrn:10, name:'Sana Perveen',         dob:'1983-06-25', gender:'female', phone:'0300-0123456', address:'Cavalry Ground, Lahore',                bloodGroup:'A+',  allergies:'Codeine',     medicalHistory:'Migraine, Hypothyroidism', registrationDate:'2024-05-10', lastVisit:'2024-12-21', status:'active' },
      { id:'p11', mrn:11, name:'Khalid Mahmood',       dob:'1960-01-08', gender:'male',   phone:'0321-1122334', address:'Ichhra, Lahore',                        bloodGroup:'O+',  allergies:'None',        medicalHistory:'Type 2 Diabetes, Obesity', registrationDate:'2024-06-01', lastVisit:'2024-12-01', status:'active' },
      { id:'p12', mrn:12, name:'Bushra Parveen',       dob:'1975-09-12', gender:'female', phone:'0332-2233445', address:'Samanabad, Lahore',                     bloodGroup:'B+',  allergies:'Latex',       medicalHistory:'Asthma, Eczema', registrationDate:'2024-06-15', lastVisit:'2024-11-15', status:'active' },
    ],
    appointments: [
      { id:'a1', patientId:'p1', doctorId:'u2', date:fmt.today(), time:'09:00', type:'follow-up',  status:'scheduled',   notes:'BP and sugar monitoring' },
      { id:'a2', patientId:'p2', doctorId:'u2', date:fmt.today(), time:'09:30', type:'general',    status:'completed',   notes:'Iron levels recheck' },
      { id:'a3', patientId:'p4', doctorId:'u5', date:fmt.today(), time:'10:00', type:'new',        status:'scheduled',   notes:'New patient - first visit' },
      { id:'a4', patientId:'p5', doctorId:'u2', date:fmt.today(), time:'11:00', type:'follow-up',  status:'in-progress', notes:'Joint pain management' },
      { id:'a5', patientId:'p9', doctorId:'u2', date:fmt.today(), time:'11:30', type:'emergency',  status:'scheduled',   notes:'Breathing difficulty' },
      { id:'a6', patientId:'p6', doctorId:'u5', date:fmt.today(), time:'14:00', type:'follow-up',  status:'scheduled',   notes:'Gynecology follow-up' },
      { id:'a7', patientId:'p3', doctorId:'u2', date:fmt.today(), time:'15:00', type:'follow-up',  status:'scheduled',   notes:'Cardiac review' },
    ],
    consultations: [
      { id:'c1', patientId:'p1', doctorId:'u2', date:'2024-12-15T09:30:00', chiefComplaint:'Headache and elevated blood pressure', vitals:{bp:'150/95',pulse:'88',temp:'37.0',weight:'82',height:'172',spo2:'98'}, examination:'Patient alert, BP elevated bilaterally. Regular heart sounds, no murmur.', diagnosis:'Uncontrolled Hypertension', icd10:'I10', treatment:'Increase Amlodipine to 10mg OD. Continue Metformin. Strict low-sodium diet. Daily BP monitoring.', followUpDate:'2025-01-15', notes:'Patient counseled about lifestyle modifications and medication adherence.' },
      { id:'c2', patientId:'p2', doctorId:'u2', date:'2024-12-20T10:00:00', chiefComplaint:'Fatigue, dizziness, pallor', vitals:{bp:'110/70',pulse:'96',temp:'37.2',weight:'55',height:'160',spo2:'97'}, examination:'Pallor noted in conjunctivae and nail beds. Mild tachycardia. No hepatosplenomegaly.', diagnosis:'Iron Deficiency Anemia', icd10:'D50.9', treatment:'Ferrous Sulfate 200mg BD for 3 months. Folic Acid 5mg OD. Vitamin C 500mg OD. High iron diet.', followUpDate:'2025-01-20', notes:'CBC to repeat after 1 month. Review ferritin levels.' },
      { id:'c3', patientId:'p9', doctorId:'u2', date:'2024-12-19T14:00:00', chiefComplaint:'Wheezing, difficulty breathing since morning', vitals:{bp:'120/80',pulse:'104',temp:'37.4',weight:'68',height:'175',spo2:'94'}, examination:'Bilateral wheezing. Prolonged expiration. Use of accessory muscles. No cyanosis.', diagnosis:'Acute Exacerbation of Bronchial Asthma', icd10:'J45.901', treatment:'Salbutamol nebulization 2.5mg q20min x3. Prednisolone 40mg OD x5 days. Continue Budesonide inhaler.', followUpDate:'2024-12-26', notes:'SpO2 improved to 98% after nebulization. Patient advised on trigger avoidance.' },
    ],
    prescriptions: [
      { id:'rx1', patientId:'p1', doctorId:'u2', consultationId:'c1', date:'2024-12-15', medications:[{name:'Amlodipine',dosage:'10mg',frequency:'Once daily (morning)',duration:'30 days',instructions:'Take on empty stomach'},{name:'Metformin',dosage:'500mg',frequency:'Twice daily',duration:'30 days',instructions:'Take with meals'},{name:'Aspirin',dosage:'75mg',frequency:'Once daily',duration:'30 days',instructions:'Take after breakfast'}], status:'dispensed', dispensedDate:'2024-12-15', dispensedBy:'u4', notes:'' },
      { id:'rx2', patientId:'p2', doctorId:'u2', consultationId:'c2', date:'2024-12-20', medications:[{name:'Ferrous Sulfate',dosage:'200mg',frequency:'Twice daily',duration:'90 days',instructions:'Take on empty stomach, avoid tea/coffee within 1hr'},{name:'Folic Acid',dosage:'5mg',frequency:'Once daily',duration:'90 days',instructions:''},{name:'Vitamin C',dosage:'500mg',frequency:'Once daily',duration:'90 days',instructions:'Take together with iron tablet'}], status:'pending', dispensedDate:null, dispensedBy:null, notes:'' },
      { id:'rx3', patientId:'p9', doctorId:'u2', consultationId:'c3', date:'2024-12-19', medications:[{name:'Prednisolone',dosage:'40mg',frequency:'Once daily (morning)',duration:'5 days',instructions:'Take after breakfast'},{name:'Salbutamol Inhaler',dosage:'100mcg',frequency:'2 puffs every 4-6 hours as needed',duration:'30 days',instructions:'Shake before use'},{name:'Budesonide Inhaler',dosage:'200mcg',frequency:'2 puffs twice daily',duration:'30 days',instructions:'Rinse mouth after use'}], status:'dispensed', dispensedDate:'2024-12-19', dispensedBy:'u4', notes:'Patient demonstrated correct inhaler technique.' },
    ],
    receipts: [
      { id:'bill1', patientId:'p1', date:'2024-12-15', receiptNo:1, items:[{description:'Consultation Fee',qty:1,unitPrice:200,total:200},{description:'Medicines (30 days supply)',qty:1,unitPrice:450,total:450}], subtotal:650, discount:0, total:650, paymentMethod:'cash', status:'paid', notes:'' },
      { id:'bill2', patientId:'p2', date:'2024-12-20', receiptNo:2, items:[{description:'Consultation Fee',qty:1,unitPrice:200,total:200},{description:'Iron Supplements (3 months)',qty:1,unitPrice:380,total:380},{description:'Blood Test (CBC + Iron Studies)',qty:1,unitPrice:600,total:600}], subtotal:1180, discount:200, total:980, paymentMethod:'cash', status:'paid', notes:'Charity discount applied' },
      { id:'bill3', patientId:'p4', date:'2024-12-18', receiptNo:3, items:[{description:'Consultation Fee',qty:1,unitPrice:200,total:200}], subtotal:200, discount:200, total:0, paymentMethod:'free', status:'paid', notes:'Zakat patient — free of charge' },
      { id:'bill4', patientId:'p9', date:'2024-12-19', receiptNo:4, items:[{description:'Emergency Consultation',qty:1,unitPrice:300,total:300},{description:'Nebulization x3',qty:3,unitPrice:150,total:450},{description:'Medicines',qty:1,unitPrice:350,total:350}], subtotal:1100, discount:0, total:1100, paymentMethod:'cash', status:'paid', notes:'' },
      { id:'bill5', patientId:'p5', date:'2024-12-10', receiptNo:5, items:[{description:'Consultation Fee',qty:1,unitPrice:200,total:200},{description:'X-Ray (both knees)',qty:1,unitPrice:800,total:800}], subtotal:1000, discount:0, total:1000, paymentMethod:'easypaisa', status:'paid', notes:'' },
    ],
    settings: {
      clinicName:'Alkhidmat Clinic',
      tagline:'Serving Humanity',
      address:'Near Jamia Masjid, Main Boulevard, Lahore',
      phone:'042-35761234',
      email:'clinic@alkhidmat.org',
      website:'www.alkhidmat.org',
      consultationFee:200,
      emergencyFee:300,
      currency:'PKR',
      workingHours:'8:00 AM – 8:00 PM',
      workingDays:'Monday – Saturday',
    },
  };

  const load = (k) => { try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; } catch { return null; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

  const col = {};
  Object.entries(KEY).forEach(([n, k]) => {
    const ex = load(k);
    col[n] = ex !== null ? ex : SEED[n];
    if (ex === null) save(k, SEED[n]);
  });

  const persist = (n) => save(KEY[n], col[n]);

  return {
    getAll: (n) => [...(col[n] || [])],
    getById: (n, id) => (col[n] || []).find(x => x.id === id) || null,
    add: (n, item) => { col[n] = [...(col[n] || []), item]; persist(n); return item; },
    update: (n, id, u) => { col[n] = (col[n] || []).map(x => x.id === id ? { ...x, ...u } : x); persist(n); },
    remove: (n, id) => { col[n] = (col[n] || []).filter(x => x.id !== id); persist(n); },
    getSettings: () => ({ ...col.settings }),
    updateSettings: (u) => { col.settings = { ...col.settings, ...u }; persist('settings'); },
    authenticate: (email, pw) => (col.users || []).find(u => u.email === email && u.password === pw && u.status === 'active') || null,
    nextMRN: () => { const p = col.patients || []; return p.length ? Math.max(...p.map(x => x.mrn)) + 1 : 1; },
    nextReceiptNo: () => { const r = col.receipts || []; return r.length ? Math.max(...r.map(x => x.receiptNo)) + 1 : 1; },
    reset: () => Object.entries(KEY).forEach(([n, k]) => { col[n] = SEED[n]; save(k, SEED[n]); }),
  };
})();

// ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────

window.Btn = function Btn({ children, variant='primary', size='md', onClick, disabled, type='button', style={}, full }) {
  const base = {
    display:'inline-flex', alignItems:'center', gap:'6px', justifyContent:'center',
    fontFamily:'inherit', fontWeight:'600', cursor: disabled ? 'not-allowed' : 'pointer',
    border:'none', transition:'all 0.15s', opacity: disabled ? 0.55 : 1,
    width: full ? '100%' : undefined,
  };
  const sizes = {
    sm: { padding:'5px 12px', fontSize:T.font.sm, borderRadius:T.radius.md },
    md: { padding:'8px 18px', fontSize:T.font.base, borderRadius:T.radius.md },
    lg: { padding:'12px 26px', fontSize:T.font.lg, borderRadius:T.radius.lg },
  };
  const variants = {
    primary: { background:T.colors.primary, color:'#fff' },
    secondary: { background:T.colors.primaryLight, color:T.colors.primary },
    ghost: { background:'transparent', color:T.colors.textSec, border:`1px solid ${T.colors.border}` },
    danger: { background:T.colors.redLight, color:T.colors.red, border:`1px solid #fecaca` },
    dark: { background:T.colors.text, color:'#fff' },
    outline: { background:'transparent', color:T.colors.primary, border:`1.5px solid ${T.colors.primary}` },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {children}
    </button>
  );
};

window.Card = function Card({ children, style={}, onClick, pad=true }) {
  return (
    <div onClick={onClick}
      style={{ background:T.colors.surface, borderRadius:T.radius.lg, border:`1px solid ${T.colors.border}`,
        boxShadow:T.shadow.sm, overflow:'hidden', padding: pad ? undefined : 0,
        cursor: onClick ? 'pointer' : undefined, ...style }}>
      {children}
    </div>
  );
};

window.Inp = function Inp({ label, value, onChange, placeholder, type='text', required, error, readOnly, autoFocus, style={} }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px', ...style }}>
      {label && <label style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.textSec }}>
        {label}{required && <span style={{ color:T.colors.red }}> *</span>}
      </label>}
      <input type={type} value={value ?? ''} onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} required={required} autoFocus={autoFocus} readOnly={readOnly}
        style={{ padding:'9px 12px', fontSize:T.font.base, fontFamily:'inherit',
          border:`1.5px solid ${error ? T.colors.red : T.colors.border}`, borderRadius:T.radius.md,
          outline:'none', background: readOnly ? '#f8fafc' : '#fff', color:T.colors.text,
          width:'100%', boxSizing:'border-box', transition:'border-color 0.15s' }}
        onFocus={e => { if(!readOnly) e.target.style.borderColor = T.colors.primary; }}
        onBlur={e => { e.target.style.borderColor = error ? T.colors.red : T.colors.border; }} />
      {error && <span style={{ fontSize:T.font.xs, color:T.colors.red }}>{error}</span>}
    </div>
  );
};

window.Txta = function Txta({ label, value, onChange, placeholder, rows=3, style={} }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px', ...style }}>
      {label && <label style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.textSec }}>{label}</label>}
      <textarea value={value ?? ''} onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder} rows={rows}
        style={{ padding:'9px 12px', fontSize:T.font.base, fontFamily:'inherit',
          border:`1.5px solid ${T.colors.border}`, borderRadius:T.radius.md, outline:'none',
          resize:'vertical', color:T.colors.text, width:'100%', boxSizing:'border-box', transition:'border-color 0.15s' }}
        onFocus={e => e.target.style.borderColor = T.colors.primary}
        onBlur={e => e.target.style.borderColor = T.colors.border} />
    </div>
  );
};

window.Sel = function Sel({ label, value, onChange, options, required, style={} }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5px', ...style }}>
      {label && <label style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.textSec }}>
        {label}{required && <span style={{ color:T.colors.red }}> *</span>}
      </label>}
      <select value={value ?? ''} onChange={e => onChange && onChange(e.target.value)} required={required}
        style={{ padding:'9px 12px', fontSize:T.font.base, fontFamily:'inherit',
          border:`1.5px solid ${T.colors.border}`, borderRadius:T.radius.md, outline:'none',
          background:'#fff', color:T.colors.text, cursor:'pointer', width:'100%', boxSizing:'border-box' }}
        onFocus={e => e.target.style.borderColor = T.colors.primary}
        onBlur={e => e.target.style.borderColor = T.colors.border}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
};

window.Badge = function Badge({ children, color='gray' }) {
  const map = {
    green: { bg:T.colors.greenLight, text:T.colors.green },
    red:   { bg:T.colors.redLight,   text:T.colors.red   },
    yellow:{ bg:T.colors.yellowLight,text:T.colors.yellow },
    blue:  { bg:T.colors.blueLight,  text:T.colors.blue  },
    purple:{ bg:T.colors.purpleLight,text:T.colors.purple },
    teal:  { bg:T.colors.tealLight,  text:T.colors.teal  },
    gray:  { bg:'#f1f5f9', text:T.colors.textSec },
    primary:{ bg:T.colors.primaryLight, text:T.colors.primary },
  };
  const c = map[color] || map.gray;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 9px',
      borderRadius:T.radius.full, fontSize:T.font.xs, fontWeight:'700',
      background:c.bg, color:c.text, letterSpacing:'0.02em', whiteSpace:'nowrap' }}>
      {children}
    </span>
  );
};

window.Avatar = function Avatar({ name, size=36, style={} }) {
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', flexShrink:0,
      background:`linear-gradient(135deg, ${T.colors.primary}, ${T.colors.accent})`,
      color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:size*0.36+'px', fontWeight:'700', userSelect:'none', ...style }}>
      {fmt.initials(name)}
    </div>
  );
};

window.Modal = function Modal({ open, onClose, title, children, width=600 }) {
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(15,23,42,0.45)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
      onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:T.radius.xl, boxShadow:T.shadow.xl,
        width:'100%', maxWidth:width, maxHeight:'92vh', overflow:'auto' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'18px 24px', borderBottom:`1px solid ${T.colors.border}`,
          position:'sticky', top:0, background:'#fff', zIndex:1 }}>
          <h3 style={{ margin:0, fontSize:T.font.xl, fontWeight:'700', color:T.colors.text }}>{title}</h3>
          <button onClick={onClose} style={{ border:'none', background:'none', cursor:'pointer',
            fontSize:'20px', color:T.colors.textMuted, lineHeight:1, padding:'4px' }}>✕</button>
        </div>
        <div style={{ padding:'24px' }}>{children}</div>
      </div>
    </div>
  );
};

window.StatCard = function StatCard({ label, value, icon, color='primary', sub, trend }) {
  const bgMap = {
    primary: T.colors.primaryLight, blue: T.colors.blueLight,
    yellow: T.colors.yellowLight, green: T.colors.greenLight,
    red: T.colors.redLight, purple: T.colors.purpleLight,
  };
  return (
    <Card style={{ padding:'20px' }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'12px' }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:T.font.sm, color:T.colors.textSec, fontWeight:'600', marginBottom:'8px' }}>{label}</div>
          <div style={{ fontSize:T.font['4xl'], fontWeight:'800', color:T.colors.text, lineHeight:1 }}>{value}</div>
          {sub && <div style={{ fontSize:T.font.xs, color:T.colors.textMuted, marginTop:'6px' }}>{sub}</div>}
          {trend && <div style={{ fontSize:T.font.xs, color:trend > 0 ? T.colors.green : T.colors.red, marginTop:'4px', fontWeight:'600' }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </div>}
        </div>
        <div style={{ width:46, height:46, borderRadius:T.radius.lg, background:bgMap[color] || bgMap.primary,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', flexShrink:0 }}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

window.Toast = function Toast({ message, type='success', onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, []);
  const colors = { success:T.colors.green, error:T.colors.red, info:T.colors.blue, warning:T.colors.yellow };
  return (
    <div style={{ position:'fixed', bottom:'28px', right:'28px', zIndex:9999, background:'#fff',
      border:`1px solid ${T.colors.border}`, borderLeft:`4px solid ${colors[type] || colors.info}`,
      borderRadius:T.radius.md, padding:'14px 20px', boxShadow:T.shadow.lg,
      fontSize:T.font.base, color:T.colors.text, minWidth:'280px', maxWidth:'380px',
      animation:'slideIn 0.2s ease' }}>
      {message}
    </div>
  );
};

window.Spinner = function Spinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'48px' }}>
      <div style={{ width:36, height:36, border:`3px solid ${T.colors.border}`,
        borderTopColor:T.colors.primary, borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
    </div>
  );
};

window.EmptyState = function EmptyState({ icon='📋', title, message, action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'64px 24px', textAlign:'center', color:T.colors.textMuted }}>
      <div style={{ fontSize:'48px', marginBottom:'16px' }}>{icon}</div>
      <div style={{ fontSize:T.font.xl, fontWeight:'700', color:T.colors.textSec, marginBottom:'8px' }}>{title}</div>
      {message && <div style={{ fontSize:T.font.base, marginBottom:'24px', maxWidth:'360px' }}>{message}</div>}
      {action}
    </div>
  );
};

// Inject global keyframe animations
const style = document.createElement('style');
style.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
`;
document.head.appendChild(style);
