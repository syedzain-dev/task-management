import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({ user, onLogout }) {
  return (
    <div className="dashboard">
      {/* Top Global Header */}
      <div className="top-header">
        <h1 className="top-header-title">Abdul Hamid World!</h1>
      </div>

      {/* Main Layout */}
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li className="active">🏠 Dashboard</li>
            <li>👤 Profile</li>
            <li>⚙️ Settings</li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Page Header (with user + logout) */}
          <header className="header">
            <h2 className="header-title">Abdul Hamid</h2>
            <div className="user-section">
              <span className="username">{user?.name || 'User'}</span>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
          </header>

          <h2>Welcome, <strong>{user?.name || 'User'}</strong> 👋</h2>
          <p>This is your main dashboard where you can display user info, stats, and more.</p>

          {/* Example Cards */}
          <div className="card-grid">
            <div className="card">
              <h3>📊 Stats</h3>
              <p>View your latest performance metrics here.</p>
            </div>
            <div className="card">
              <h3>📝 Tasks</h3>
              <p>Keep track of your tasks and to-dos.</p>
            </div>
            <div className="card">
              <h3>⚡ Quick Actions</h3>
              <p>Access your most used features quickly.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
