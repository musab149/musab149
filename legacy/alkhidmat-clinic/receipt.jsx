// receipt.jsx — Billing and receipts
window.ReceiptPage = function ReceiptPage({ user, showToast }) {
  const [view, setView] = React.useState('list');
  const [receipts, setReceipts] = React.useState(() => DB.getAll('receipts'));
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('');

  const reload = () => setReceipts(DB.getAll('receipts'));

  const enriched = receipts.map(r => ({
    ...r, patient: DB.getById('patients', r.patientId),
  }));

  const filtered = enriched.filter(r => {
    const q = search.toLowerCase();
    const matchQ = !q || r.patient?.name.toLowerCase().includes(q)
      || String(r.receiptNo).includes(q);
    const matchS = !filterStatus || r.status === filterStatus;
    return matchQ && matchS;
  });

  const totalRevenue = receipts.reduce((s, r) => s + r.total, 0);
  const todayRevenue = receipts.filter(r => r.date === fmt.today()).reduce((s, r) => s + r.total, 0);

  const canCreate = ['admin','receptionist'].includes(user.role);

  const openNew    = ()  => { setSelected(null); setView('form'); };
  const openDetail = (r) => { setSelected(r); setView('detail'); };
  const backToList = ()  => { setSelected(null); setView('list'); reload(); };

  if (view === 'form')   return <ReceiptForm receipt={selected} user={user} onSave={backToList} onCancel={backToList} showToast={showToast} />;
  if (view === 'detail') return <ReceiptDetail receipt={selected} user={user} onBack={backToList} showToast={showToast} />;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px', animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
        <div>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Billing & Receipts</h2>
          <p style={{ margin:0, color:T.colors.textSec }}>
            {receipts.length} receipts · Total: {fmt.currency(totalRevenue)}
          </p>
        </div>
        {canCreate && <Btn onClick={openNew}>+ Generate Receipt</Btn>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'14px' }}>
        <StatCard label="Total Revenue"  value={fmt.currency(totalRevenue)} icon="💰" color="green" />
        <StatCard label="Today's Revenue" value={fmt.currency(todayRevenue)} icon="📈" color="primary" />
        <StatCard label="Total Receipts"  value={receipts.length}            icon="🧾" color="blue" />
        <StatCard label="Free Consults"   value={receipts.filter(r=>r.total===0).length} icon="🤲" color="yellow" />
      </div>

      <Card style={{ padding:'14px' }}>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          <Inp value={search} onChange={setSearch} placeholder="Search by patient name or receipt #…" style={{ flex:'1 1 260px' }} />
          <Sel value={filterStatus} onChange={setFilterStatus}
            options={[{value:'',label:'All Status'},{value:'paid',label:'Paid'},{value:'unpaid',label:'Unpaid'},{value:'partial',label:'Partial'}]}
            style={{ flex:'0 0 150px' }} />
          {(search || filterStatus) && <Btn variant="ghost" size="sm" onClick={() => { setSearch(''); setFilterStatus(''); }}>Clear</Btn>}
        </div>
      </Card>

      <Card pad={false}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:T.font.sm }}>
            <thead>
              <tr style={{ background:T.colors.bg, borderBottom:`2px solid ${T.colors.border}` }}>
                {['Receipt #','Patient','Date','Items','Subtotal','Discount','Total','Method','Status',''].map(h => (
                  <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontWeight:'700',
                    color:T.colors.textSec, fontSize:T.font.xs, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} style={{ padding:'48px', textAlign:'center', color:T.colors.textMuted }}>
                  No receipts found.
                </td></tr>
              ) : filtered.map(r => (
                <tr key={r.id} style={{ borderBottom:`1px solid ${T.colors.border}`, transition:'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding:'12px 14px', fontWeight:'700', color:T.colors.primary }}>
                    #{String(r.receiptNo).padStart(4,'0')}
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <div style={{ fontWeight:'600', color:T.colors.text }}>{r.patient?.name || '—'}</div>
                    <div style={{ fontSize:T.font.xs, color:T.colors.textMuted }}>{fmt.mrn(r.patient?.mrn)}</div>
                  </td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec, whiteSpace:'nowrap' }}>{fmt.date(r.date)}</td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec }}>{r.items.length} item{r.items.length !== 1 ? 's' : ''}</td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec }}>{fmt.currency(r.subtotal)}</td>
                  <td style={{ padding:'12px 14px', color: r.discount > 0 ? T.colors.green : T.colors.textMuted }}>
                    {r.discount > 0 ? `- ${fmt.currency(r.discount)}` : '—'}
                  </td>
                  <td style={{ padding:'12px 14px', fontWeight:'700', color:T.colors.text }}>{fmt.currency(r.total)}</td>
                  <td style={{ padding:'12px 14px', color:T.colors.textSec, textTransform:'capitalize' }}>{r.paymentMethod}</td>
                  <td style={{ padding:'12px 14px' }}>
                    <Badge color={r.status === 'paid' ? 'green' : r.status === 'partial' ? 'yellow' : 'red'}>
                      {r.status}
                    </Badge>
                  </td>
                  <td style={{ padding:'12px 14px' }}>
                    <Btn variant="ghost" size="sm" onClick={() => openDetail(r)}>View</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div style={{ padding:'10px 14px', borderTop:`1px solid ${T.colors.border}`,
            fontSize:T.font.xs, color:T.colors.textMuted, display:'flex', justifyContent:'space-between' }}>
            <span>Showing {filtered.length} of {receipts.length} receipts</span>
            <strong style={{ color:T.colors.text }}>Filtered Total: {fmt.currency(filtered.reduce((s,r) => s+r.total, 0))}</strong>
          </div>
        )}
      </Card>
    </div>
  );
};

// ─── Receipt Form ─────────────────────────────────────────────────────────────
function ReceiptForm({ receipt, user, onSave, onCancel, showToast }) {
  const isEdit   = !!receipt;
  const patients = DB.getAll('patients');
  const settings = DB.getSettings();
  const emptyItem = { description:'', qty:1, unitPrice:0, total:0 };

  const [form, setForm] = React.useState({
    patientId:     receipt?.patientId     || '',
    date:          receipt?.date          || fmt.today(),
    items:         receipt?.items         || [{ ...emptyItem }],
    discount:      receipt?.discount      || 0,
    paymentMethod: receipt?.paymentMethod || 'cash',
    status:        receipt?.status        || 'paid',
    notes:         receipt?.notes         || '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const setItem = (i, k, v) => setForm(f => {
    const items = f.items.map((it, idx) => {
      if (idx !== i) return it;
      const updated = { ...it, [k]: k === 'description' ? v : Number(v) || 0 };
      updated.total = updated.qty * updated.unitPrice;
      return updated;
    });
    return { ...f, items };
  });

  const addItem    = ()  => setForm(f => ({ ...f, items: [...f.items, { ...emptyItem }] }));
  const removeItem = (i) => setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));

  const subtotal = form.items.reduce((s, it) => s + (it.qty * it.unitPrice), 0);
  const total    = Math.max(0, subtotal - Number(form.discount || 0));

  const quickItems = [
    { description:'Consultation Fee', unitPrice: settings.consultationFee },
    { description:'Emergency Consultation', unitPrice: settings.emergencyFee },
    { description:'Blood Test (CBC)', unitPrice: 600 },
    { description:'Urinalysis', unitPrice: 400 },
    { description:'X-Ray', unitPrice: 800 },
    { description:'ECG', unitPrice: 500 },
    { description:'Medicines', unitPrice: 300 },
    { description:'Dressing/Procedure', unitPrice: 200 },
  ];

  const addQuick = (qi) => setForm(f => ({
    ...f, items: [...f.items, { description: qi.description, qty:1, unitPrice: qi.unitPrice, total: qi.unitPrice }],
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientId) { showToast('Please select a patient.', 'error'); return; }
    if (form.items.every(it => !it.description)) { showToast('Add at least one item.', 'error'); return; }

    const data = { ...form, subtotal, total };
    if (isEdit) {
      DB.update('receipts', receipt.id, data);
      showToast('Receipt updated.', 'success');
    } else {
      const receiptNo = DB.nextReceiptNo();
      DB.add('receipts', { id: fmt.id(), receiptNo, ...data });
      showToast(`Receipt #${String(receiptNo).padStart(4,'0')} generated.`, 'success');
    }
    onSave();
  };

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
        <button onClick={onCancel} style={{ background:'none', border:'none', cursor:'pointer',
          fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
        <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>
          {isEdit ? 'Edit Receipt' : 'Generate Receipt'}
        </h2>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:'20px', alignItems:'start' }}>
        <Card style={{ padding:'24px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'14px' }}>
                <Sel label="Patient" value={form.patientId} onChange={v => set('patientId', v)} required
                  options={[{value:'',label:'Select patient…'}, ...patients.map(p => ({value:p.id,label:`${p.name} (${fmt.mrn(p.mrn)})`}))]} />
                <Inp label="Date" type="date" value={form.date} onChange={v => set('date', v)} required />
                <Sel label="Payment Method" value={form.paymentMethod} onChange={v => set('paymentMethod', v)}
                  options={[{value:'cash',label:'Cash'},{value:'easypaisa',label:'EasyPaisa'},
                    {value:'jazzcash',label:'JazzCash'},{value:'bank',label:'Bank Transfer'},
                    {value:'free',label:'Free (Charity)'}]} />
              </div>

              {/* Items */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
                  <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
                    textTransform:'uppercase', letterSpacing:'0.06em' }}>Bill Items</div>
                  <Btn variant="secondary" size="sm" type="button" onClick={addItem}>+ Add Row</Btn>
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:T.font.sm }}>
                  <thead>
                    <tr style={{ borderBottom:`2px solid ${T.colors.border}` }}>
                      {['Description','Qty','Unit Price (PKR)','Total','']. map(h => (
                        <th key={h} style={{ padding:'8px', textAlign:'left', fontWeight:'700',
                          color:T.colors.textSec, fontSize:T.font.xs }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {form.items.map((it, i) => (
                      <tr key={i} style={{ borderBottom:`1px solid ${T.colors.border}` }}>
                        <td style={{ padding:'6px 8px' }}>
                          <input value={it.description} onChange={e => setItem(i,'description',e.target.value)}
                            placeholder="Service / item description" required
                            style={{ width:'100%', padding:'7px 10px', border:`1px solid ${T.colors.border}`,
                              borderRadius:T.radius.md, fontSize:T.font.sm, fontFamily:'inherit', outline:'none' }} />
                        </td>
                        <td style={{ padding:'6px 8px', width:70 }}>
                          <input type="number" min="1" value={it.qty} onChange={e => setItem(i,'qty',e.target.value)}
                            style={{ width:'100%', padding:'7px 8px', border:`1px solid ${T.colors.border}`,
                              borderRadius:T.radius.md, fontSize:T.font.sm, fontFamily:'inherit', outline:'none', textAlign:'center' }} />
                        </td>
                        <td style={{ padding:'6px 8px', width:130 }}>
                          <input type="number" min="0" value={it.unitPrice} onChange={e => setItem(i,'unitPrice',e.target.value)}
                            style={{ width:'100%', padding:'7px 8px', border:`1px solid ${T.colors.border}`,
                              borderRadius:T.radius.md, fontSize:T.font.sm, fontFamily:'inherit', outline:'none', textAlign:'right' }} />
                        </td>
                        <td style={{ padding:'6px 8px', fontWeight:'600', color:T.colors.text, whiteSpace:'nowrap' }}>
                          {fmt.currency(it.qty * it.unitPrice)}
                        </td>
                        <td style={{ padding:'6px 8px' }}>
                          {form.items.length > 1 && (
                            <button type="button" onClick={() => removeItem(i)}
                              style={{ background:'none', border:'none', cursor:'pointer',
                                color:T.colors.red, fontSize:'16px' }}>✕</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div style={{ background:T.colors.bg, borderRadius:T.radius.md, padding:'16px',
                display:'flex', flexDirection:'column', gap:'10px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:T.font.sm, color:T.colors.textSec }}>
                  <span>Subtotal</span><span style={{ fontWeight:'600' }}>{fmt.currency(subtotal)}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:T.font.sm, color:T.colors.textSec }}>Discount (PKR)</span>
                  <input type="number" min="0" max={subtotal} value={form.discount}
                    onChange={e => set('discount', Number(e.target.value))}
                    style={{ width:120, padding:'5px 8px', border:`1px solid ${T.colors.border}`,
                      borderRadius:T.radius.md, fontSize:T.font.sm, fontFamily:'inherit',
                      outline:'none', textAlign:'right' }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', paddingTop:'10px',
                  borderTop:`2px solid ${T.colors.border}` }}>
                  <span style={{ fontWeight:'800', fontSize:T.font.lg, color:T.colors.text }}>Total</span>
                  <span style={{ fontWeight:'800', fontSize:T.font.xl, color:T.colors.primary }}>{fmt.currency(total)}</span>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                <Sel label="Status" value={form.status} onChange={v => set('status', v)}
                  options={[{value:'paid',label:'Paid'},{value:'unpaid',label:'Unpaid'},{value:'partial',label:'Partial'}]} />
                <Txta label="Notes" value={form.notes} onChange={v => set('notes', v)}
                  placeholder="e.g. Charity case, partial payment…" rows={1} />
              </div>

              <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end' }}>
                <Btn variant="ghost" type="button" onClick={onCancel}>Cancel</Btn>
                <Btn type="submit">{isEdit ? 'Save Changes' : 'Generate Receipt'}</Btn>
              </div>
            </div>
          </form>
        </Card>

        {/* Quick add panel */}
        <Card style={{ padding:'20px' }}>
          <h4 style={{ margin:'0 0 14px', fontWeight:'700', color:T.colors.text }}>Quick Add Items</h4>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {quickItems.map((qi, i) => (
              <button key={i} type="button" onClick={() => addQuick(qi)}
                style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                  padding:'10px 12px', background:T.colors.bg, border:`1px solid ${T.colors.border}`,
                  borderRadius:T.radius.md, cursor:'pointer', fontFamily:'inherit', transition:'all 0.12s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.colors.primary; e.currentTarget.style.background = T.colors.primaryLight; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.colors.border; e.currentTarget.style.background = T.colors.bg; }}>
                <span style={{ fontSize:T.font.sm, color:T.colors.text }}>{qi.description}</span>
                <span style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary }}>{fmt.currency(qi.unitPrice)}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Receipt Detail (Print View) ──────────────────────────────────────────────
function ReceiptDetail({ receipt, user, onBack, showToast }) {
  const p = DB.getById('patients', receipt.patientId);
  const settings = DB.getSettings();

  const handlePrint = () => window.print();

  return (
    <div style={{ animation:'fadeIn 0.3s' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer',
            fontSize:T.font.base, color:T.colors.textSec, fontFamily:'inherit' }}>← Back</button>
          <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Receipt Detail</h2>
        </div>
        <Btn variant="secondary" onClick={handlePrint}>🖨️ Print</Btn>
      </div>

      <Card style={{ padding:'36px', maxWidth:700 }}>
        {/* Clinic header */}
        <div style={{ textAlign:'center', marginBottom:'24px', paddingBottom:'20px', borderBottom:`2px solid ${T.colors.border}` }}>
          <div style={{ fontSize:'32px', marginBottom:'8px' }}>🏥</div>
          <h2 style={{ margin:'0 0 4px', fontWeight:'900', fontSize:T.font['3xl'], color:T.colors.text }}>{settings.clinicName}</h2>
          <p style={{ margin:'0 0 2px', color:T.colors.textSec, fontSize:T.font.sm }}>{settings.address}</p>
          <p style={{ margin:0, color:T.colors.textSec, fontSize:T.font.sm }}>{settings.phone} · {settings.email}</p>
        </div>

        {/* Receipt info */}
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'12px' }}>
          <div>
            <div style={{ fontWeight:'800', fontSize:T.font['2xl'], color:T.colors.text }}>
              Receipt #{String(receipt.receiptNo).padStart(4,'0')}
            </div>
            <div style={{ fontSize:T.font.sm, color:T.colors.textSec, marginTop:'4px' }}>
              Date: {fmt.date(receipt.date)}
            </div>
          </div>
          <Badge color={receipt.status === 'paid' ? 'green' : receipt.status === 'partial' ? 'yellow' : 'red'}>
            {receipt.status.toUpperCase()}
          </Badge>
        </div>

        {/* Patient info */}
        <div style={{ background:T.colors.bg, borderRadius:T.radius.md, padding:'14px 16px', marginBottom:'20px' }}>
          <div style={{ fontSize:T.font.xs, fontWeight:'700', color:T.colors.textMuted,
            textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'6px' }}>Patient</div>
          <div style={{ fontWeight:'700', fontSize:T.font.lg, color:T.colors.text }}>{p?.name || '—'}</div>
          <div style={{ fontSize:T.font.sm, color:T.colors.textSec }}>
            {fmt.mrn(p?.mrn)} · {p?.phone}
          </div>
        </div>

        {/* Items table */}
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:T.font.sm, marginBottom:'16px' }}>
          <thead>
            <tr style={{ background:T.colors.bg, borderBottom:`2px solid ${T.colors.border}` }}>
              {['Description','Qty','Unit Price','Amount'].map(h => (
                <th key={h} style={{ padding:'10px 12px', textAlign: h==='Amount'||h==='Unit Price'||h==='Qty' ? 'right' : 'left',
                  fontWeight:'700', color:T.colors.textSec, fontSize:T.font.xs }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {receipt.items.map((it, i) => (
              <tr key={i} style={{ borderBottom:`1px solid ${T.colors.border}` }}>
                <td style={{ padding:'10px 12px', color:T.colors.text }}>{it.description}</td>
                <td style={{ padding:'10px 12px', textAlign:'right', color:T.colors.textSec }}>{it.qty}</td>
                <td style={{ padding:'10px 12px', textAlign:'right', color:T.colors.textSec }}>{fmt.currency(it.unitPrice)}</td>
                <td style={{ padding:'10px 12px', textAlign:'right', fontWeight:'600', color:T.colors.text }}>{fmt.currency(it.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <div style={{ width:260, display:'flex', flexDirection:'column', gap:'8px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:T.font.sm, color:T.colors.textSec }}>
              <span>Subtotal</span><span>{fmt.currency(receipt.subtotal)}</span>
            </div>
            {receipt.discount > 0 && (
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:T.font.sm, color:T.colors.green }}>
                <span>Discount</span><span>- {fmt.currency(receipt.discount)}</span>
              </div>
            )}
            <div style={{ display:'flex', justifyContent:'space-between', paddingTop:'10px',
              borderTop:`2px solid ${T.colors.border}` }}>
              <span style={{ fontWeight:'800', fontSize:T.font.lg, color:T.colors.text }}>Total</span>
              <span style={{ fontWeight:'900', fontSize:T.font.xl, color:T.colors.primary }}>{fmt.currency(receipt.total)}</span>
            </div>
            <div style={{ fontSize:T.font.sm, color:T.colors.textSec, textAlign:'right', textTransform:'capitalize' }}>
              Payment: {receipt.paymentMethod}
            </div>
          </div>
        </div>

        {receipt.notes && (
          <div style={{ marginTop:'16px', padding:'12px 14px', background:T.colors.yellowLight,
            borderRadius:T.radius.md, fontSize:T.font.sm, color:T.colors.text }}>
            <strong>Note:</strong> {receipt.notes}
          </div>
        )}

        <div style={{ textAlign:'center', marginTop:'28px', paddingTop:'20px',
          borderTop:`1px dashed ${T.colors.border}`, color:T.colors.textMuted, fontSize:T.font.xs }}>
          Thank you for visiting Alkhidmat Clinic · Serving Humanity
        </div>
      </Card>
    </div>
  );
}
