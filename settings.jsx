// settings.jsx — Clinic settings & user preferences
window.SettingsPage = function SettingsPage({ user, showToast }) {
  const [tab, setTab] = React.useState('clinic');
  const [settings, setSettings] = React.useState(() => DB.getSettings());
  const [profile, setProfile] = React.useState({ ...user });
  const [pwForm, setPwForm] = React.useState({ current:'', newPw:'', confirm:'' });
  const [showPw, setShowPw] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const setS   = (k, v) => setSettings(s => ({ ...s, [k]: v }));
  const setP   = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const setPw  = (k, v) => setPwForm(f => ({ ...f, [k]: v }));

  const saveSettings = (e) => {
    e.preventDefault();
    DB.updateSettings(settings);
    showToast('Clinic settings saved successfully.', 'success');
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    DB.update('users', user.id, { name: profile.name, phone: profile.phone, specialty: profile.specialty, qualification: profile.qualification });
    showToast('Profile updated. Please reload to see changes in the header.', 'success');
  };

  const changePassword = (e) => {
    e.preventDefault();
    const currentUser = DB.getById('users', user.id);
    if (currentUser.password !== pwForm.current) { showToast('Current password is incorrect.', 'error'); return; }
    if (pwForm.newPw.length < 6) { showToast('New password must be at least 6 characters.', 'error'); return; }
    if (pwForm.newPw !== pwForm.confirm) { showToast('New passwords do not match.', 'error'); return; }
    DB.update('users', user.id, { password: pwForm.newPw });
    setPwForm({ current:'', newPw:'', confirm:'' });
    showToast('Password changed successfully.', 'success');
  };

  const resetData = () => {
    if (window.confirm('Reset ALL data to default seed data? This cannot be undone!')) {
      DB.reset();
      showToast('Data reset to defaults.', 'success');
    }
  };

  const tabs = [
    { id:'clinic',   label:'Clinic Info',  icon:'🏥' },
    { id:'profile',  label:'My Profile',   icon:'👤' },
    { id:'security', label:'Security',     icon:'🔒' },
    { id:'data',     label:'Data',         icon:'🗄️' },
  ];
  if (user.role !== 'admin') tabs.splice(0, 1); // non-admins skip clinic settings

  const section = (title) => (
    <div style={{ fontSize:T.font.sm, fontWeight:'700', color:T.colors.primary,
      textTransform:'uppercase', letterSpacing:'0.06em', paddingBottom:'8px',
      borderBottom:`2px solid ${T.colors.primaryLight}`, marginBottom:'4px' }}>{title}</div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px', animation:'fadeIn 0.3s' }}>
      <div>
        <h2 style={{ margin:0, fontSize:T.font['3xl'], fontWeight:'800', color:T.colors.text }}>Settings</h2>
        <p style={{ margin:0, color:T.colors.textSec }}>Manage clinic information and your account</p>
      </div>

      <div style={{ display:'flex', gap:'24px', alignItems:'flex-start' }}>
        {/* Tab sidebar */}
        <Card style={{ padding:'8px', width:200, flexShrink:0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ width:'100%', display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px',
                marginBottom:'2px', borderRadius:T.radius.md, border:'none', cursor:'pointer',
                fontFamily:'inherit', fontWeight: tab === t.id ? '700' : '500', fontSize:T.font.base,
                background: tab === t.id ? T.colors.primaryLight : 'transparent',
                color: tab === t.id ? T.colors.primary : T.colors.textSec,
                textAlign:'left', transition:'all 0.12s' }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </Card>

        {/* Content */}
        <div style={{ flex:1 }}>
          {/* Clinic Info */}
          {tab === 'clinic' && user.role === 'admin' && (
            <Card style={{ padding:'28px' }}>
              <form onSubmit={saveSettings}>
                <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                  {section('Basic Information')}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                    <Inp label="Clinic Name" value={settings.clinicName} onChange={v => setS('clinicName', v)} required />
                    <Inp label="Tagline" value={settings.tagline} onChange={v => setS('tagline', v)} />
                    <Inp label="Phone" value={settings.phone} onChange={v => setS('phone', v)} />
                    <Inp label="Email" type="email" value={settings.email} onChange={v => setS('email', v)} />
                    <Inp label="Website" value={settings.website} onChange={v => setS('website', v)} />
                  </div>
                  <Txta label="Address" value={settings.address} onChange={v => setS('address', v)} rows={2} />

                  {section('Operations')}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                    <Inp label="Working Hours" value={settings.workingHours} onChange={v => setS('workingHours', v)}
                      placeholder="8:00 AM – 8:00 PM" />
                    <Inp label="Working Days" value={settings.workingDays} onChange={v => setS('workingDays', v)}
                      placeholder="Monday – Saturday" />
                  </div>

                  {section('Fee Structure')}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'16px' }}>
                    <Inp label="Consultation Fee (PKR)" type="number" value={settings.consultationFee}
                      onChange={v => setS('consultationFee', Number(v))} />
                    <Inp label="Emergency Fee (PKR)" type="number" value={settings.emergencyFee}
                      onChange={v => setS('emergencyFee', Number(v))} />
                    <Inp label="Currency" value={settings.currency} onChange={v => setS('currency', v)} readOnly />
                  </div>

                  <div style={{ display:'flex', justifyContent:'flex-end', gap:'10px' }}>
                    <Btn type="submit">{saved ? '✓ Saved!' : 'Save Settings'}</Btn>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Profile */}
          {tab === 'profile' && (
            <Card style={{ padding:'28px' }}>
              <form onSubmit={saveProfile}>
                <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                  {section('Personal Information')}
                  <div style={{ display:'flex', alignItems:'center', gap:'16px', padding:'16px',
                    background:T.colors.bg, borderRadius:T.radius.lg, marginBottom:'8px' }}>
                    <Avatar name={profile.name} size={64} />
                    <div>
                      <div style={{ fontWeight:'700', fontSize:T.font.xl, color:T.colors.text }}>{profile.name}</div>
                      <div style={{ color:T.colors.textSec, fontSize:T.font.sm }}>{user.email}</div>
                      <Badge color={{ admin:'purple', doctor:'blue', receptionist:'teal',
                        pharmacist:'yellow', nurse:'green' }[user.role] || 'gray'} style={{ marginTop:'4px' }}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                    <Inp label="Full Name" value={profile.name} onChange={v => setP('name', v)} required />
                    <Inp label="Phone" value={profile.phone} onChange={v => setP('phone', v)} placeholder="0300-1234567" />
                    {user.role === 'doctor' && (
                      <>
                        <Inp label="Specialization" value={profile.specialty} onChange={v => setP('specialty', v)} />
                        <Inp label="Qualification" value={profile.qualification} onChange={v => setP('qualification', v)} />
                      </>
                    )}
                  </div>
                  <Inp label="Email (read-only)" value={user.email} readOnly />
                  <div style={{ display:'flex', justifyContent:'flex-end' }}>
                    <Btn type="submit">Save Profile</Btn>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Security */}
          {tab === 'security' && (
            <Card style={{ padding:'28px' }}>
              <form onSubmit={changePassword}>
                <div style={{ display:'flex', flexDirection:'column', gap:'18px', maxWidth:400 }}>
                  {section('Change Password')}
                  <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                    {[
                      ['Current Password', 'current', 'Enter your current password'],
                      ['New Password', 'newPw', 'Minimum 6 characters'],
                      ['Confirm New Password', 'confirm', 'Re-enter new password'],
                    ].map(([label, key, ph]) => (
                      <div key={key} style={{ display:'flex', flexDirection:'column', gap:'5px' }}>
                        <label style={{ fontSize:T.font.sm, fontWeight:'600', color:T.colors.textSec }}>{label}</label>
                        <div style={{ position:'relative' }}>
                          <input type={showPw ? 'text' : 'password'} value={pwForm[key]}
                            onChange={e => setPw(key, e.target.value)} placeholder={ph} required
                            style={{ padding:'9px 40px 9px 12px', fontSize:T.font.base, fontFamily:'inherit',
                              border:`1.5px solid ${T.colors.border}`, borderRadius:T.radius.md,
                              outline:'none', color:T.colors.text, width:'100%', boxSizing:'border-box' }} />
                          {key === 'current' && (
                            <button type="button" onClick={() => setShowPw(!showPw)}
                              style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)',
                                background:'none', border:'none', cursor:'pointer', color:T.colors.textMuted }}>
                              {showPw ? '🙈' : '👁️'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Btn type="submit">Change Password</Btn>
                  </div>
                </div>
              </form>
            </Card>
          )}

          {/* Data management */}
          {tab === 'data' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <Card style={{ padding:'24px' }}>
                <h4 style={{ margin:'0 0 8px', fontWeight:'700', color:T.colors.text }}>System Information</h4>
                <div style={{ display:'flex', flexDirection:'column', gap:'10px', fontSize:T.font.sm }}>
                  {[
                    ['Total Patients',       DB.getAll('patients').length],
                    ['Total Consultations',  DB.getAll('consultations').length],
                    ['Total Prescriptions',  DB.getAll('prescriptions').length],
                    ['Total Receipts',       DB.getAll('receipts').length],
                    ['Total Staff Members',  DB.getAll('users').length],
                    ['Data Storage',         'Browser localStorage'],
                    ['App Version',          '1.0.0'],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0',
                      borderBottom:`1px solid ${T.colors.border}` }}>
                      <span style={{ color:T.colors.textSec }}>{l}</span>
                      <span style={{ fontWeight:'600', color:T.colors.text }}>{v}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {user.role === 'admin' && (
                <Card style={{ padding:'24px', borderColor:'#fecaca' }}>
                  <h4 style={{ margin:'0 0 8px', fontWeight:'700', color:T.colors.red }}>⚠ Danger Zone</h4>
                  <p style={{ margin:'0 0 16px', fontSize:T.font.sm, color:T.colors.textSec }}>
                    Reset all data back to the default sample data. This will permanently erase all records you've added.
                  </p>
                  <Btn variant="danger" onClick={resetData}>Reset to Default Data</Btn>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
