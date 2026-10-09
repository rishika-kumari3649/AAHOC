import React, { useState } from 'react';

export const AdminSettingsPage: React.FC = () => {
  const [hitlMode, setHitlMode] = useState(true);
  const [edThreshold, setEdThreshold] = useState('85');
  const [icuThreshold, setIcuThreshold] = useState('90');
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div>
      <div className="eyebrow">
        SYSTEM CONFIGURATION &amp; POLICIES <span className="eyebrow-line"></span>
      </div>

      <div className="header-row">
        <div>
          <h1>Hospital Administrative Settings</h1>
          <p className="subtext">
            Operational parameters, AI Agent supervision controls, surge thresholds, and facility parameters.
          </p>
        </div>

        <div className="header-actions">
          {savedSuccess && (
            <span style={{ color: 'var(--green)', fontSize: '.84rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              <i className="bi bi-check-circle-fill"></i> Settings updated!
            </span>
          )}
          <button className="btn-dark" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Card 1: AI Agent Supervision */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>AI Agent Supervision &amp; HITL</h2>
              <p className="subtext">Configure Human-in-the-Loop decision governance</p>
            </div>
            <div className="agent-row" style={{ margin: 0 }}>
              <span className="dot-pulse"></span>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#FAFBFC', border: '1px solid var(--border)', borderRadius: '9px' }}>
              <div>
                <strong style={{ fontSize: '.86rem', display: 'block' }}>Human-in-the-Loop (HITL) Mode</strong>
                <span style={{ fontSize: '.76rem', color: 'var(--muted)' }}>
                  Require operational coordinator approval before dispatching actions
                </span>
              </div>
              <input
                type="checkbox"
                checked={hitlMode}
                onChange={(e) => setHitlMode(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--green)', cursor: 'pointer' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '6px' }}>
                Operational Refresh Frequency (Seconds)
              </label>
              <select
                className="range-select"
                style={{ width: '100%', padding: '8px 12px' }}
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
              >
                <option value="15">15 seconds (Real-time telemetry)</option>
                <option value="30">30 seconds (Standard operations)</option>
                <option value="60">60 seconds (Consolidated polling)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Card 2: Surge & Capacity Thresholds */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Capacity Alert Thresholds</h2>
              <p className="subtext">Automatic trigger levels for hospital warnings</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Emergency Department Surge Warning (%)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  className="search-input"
                  style={{ width: '100%', padding: '8px 12px' }}
                  value={edThreshold}
                  onChange={(e) => setEdThreshold(e.target.value)}
                />
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>%</span>
              </div>
              <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>
                Triggers High Severity alert when ED capacity exceeds this percentage.
              </span>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                ICU Critical Care Occupancy Alert (%)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  className="search-input"
                  style={{ width: '100%', padding: '8px 12px' }}
                  value={icuThreshold}
                  onChange={(e) => setIcuThreshold(e.target.value)}
                />
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>%</span>
              </div>
              <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>
                Alerts medical director when only 1 or 2 staffed ICU beds remain.
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Operations Facility Command */}
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Facility Command Center</h2>
              <p className="subtext">Hospital identification and emergency dispatch parameters</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '14px', fontSize: '.84rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Hospital Name
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                defaultValue="AAHOC St. Jude Memorial Medical Center"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Trauma Center Accreditation
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                defaultValue="Level 1 Adult & Pediatric Trauma Center"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: '4px' }}>
                Command Dispatch Direct Line
              </label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%', padding: '8px 12px' }}
                defaultValue="+1 (555) 911-0000 (Direct Ops Desk)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};