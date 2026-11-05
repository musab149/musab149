// main.jsx — Root app component, routing, and ReactDOM mount
(function () {
  const { useState, useEffect } = React;

  const SESSION_KEY = 'ak_session';

  function App() {
    const [page, setPage] = useState('landing');         // landing | login | app
    const [appPage, setAppPage] = useState('home');      // home | patients | medical | rx | receipt | staff | settings
    const [currentUser, setCurrentUser] = useState(null);
    const [toast, setToast] = useState(null);

    // Restore session on mount
    useEffect(() => {
      try {
        const saved = sessionStorage.getItem(SESSION_KEY);
        if (saved) {
          const u = JSON.parse(saved);
          // re-verify user still exists and is active
          const fresh = DB.getById('users', u.id);
          if (fresh && fresh.status === 'active') {
            setCurrentUser(fresh);
            setPage('app');
          }
        }
      } catch {}
    }, []);

    const showToast = (message, type = 'success') => setToast({ message, type });
    const clearToast = () => setToast(null);

    const handleLogin = (user) => {
      setCurrentUser(user);
      setPage('app');
      setAppPage('home');
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch {}
      showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
    };

    const handleLogout = () => {
      setCurrentUser(null);
      setPage('landing');
      setAppPage('home');
      try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    };

    const navigate = (p) => setAppPage(p);

    // Role-based page guard
    const allowed = {
      admin:        ['home','patients','medical','rx','receipt','staff','settings'],
      doctor:       ['home','patients','medical','rx'],
      receptionist: ['home','patients','receipt'],
      pharmacist:   ['home','rx'],
      nurse:        ['home','patients','medical'],
    };

    const renderAppPage = () => {
      const role  = currentUser?.role;
      const perms = allowed[role] || ['home'];
      const safe  = perms.includes(appPage) ? appPage : 'home';

      switch (safe) {
        case 'home':     return <RoleDashboard user={currentUser} onNavigate={navigate} />;
        case 'patients': return <PatientsPage  user={currentUser} showToast={showToast} />;
        case 'medical':  return <MedicalPage   user={currentUser} showToast={showToast} />;
        case 'rx':       return <RxPage        user={currentUser} showToast={showToast} />;
        case 'receipt':  return <ReceiptPage   user={currentUser} showToast={showToast} />;
        case 'staff':    return <StaffPage     user={currentUser} showToast={showToast} />;
        case 'settings': return <SettingsPage  user={currentUser} showToast={showToast} />;
        default:         return <RoleDashboard user={currentUser} onNavigate={navigate} />;
      }
    };

    if (page === 'landing') return <LandingPage onLogin={() => setPage('login')} />;
    if (page === 'login')   return <LoginPage   onLogin={handleLogin} onBack={() => setPage('landing')} />;

    if (page === 'app' && currentUser) {
      return (
        <AppShell
          user={currentUser}
          page={appPage}
          onNavigate={navigate}
          onLogout={handleLogout}
          toast={toast}
          onToastDone={clearToast}
        >
          {renderAppPage()}
        </AppShell>
      );
    }

    // Fallback
    return <LandingPage onLogin={() => setPage('login')} />;
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
})();
