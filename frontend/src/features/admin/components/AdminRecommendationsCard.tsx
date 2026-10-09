import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { RecommendationItem } from '../types';

interface AdminRecommendationsCardProps {
  recommendations: RecommendationItem[];
  onDecision?: (id: number, decision: 'approve' | 'dismiss') => void;
  showAll?: boolean;
}

export const AdminRecommendationsCard: React.FC<AdminRecommendationsCardProps> = ({
  recommendations,
  onDecision,
  showAll = false
}) => {
  const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);

  const pendingCount = recommendations.filter((r) => r.status === 'pending').length;
  const displayRecs = showAll ? recommendations : recommendations.slice(0, 1);

  return (
    <div className="panel recs-panel">
      <div className="panel-head">
        <div>
          <h2>
            Recommendations{' '}
            <span className="pill-count amber" id="recCount">
              {pendingCount} pending
            </span>
          </h2>
          <p className="subtext">Suggested actions based on current operations</p>
        </div>
        {!showAll && (
          <Link to="/admin/reports" className="link-btn">
            View all recommendations <i className="bi bi-arrow-right"></i>
          </Link>
        )}
      </div>

      <div id="recList">
        {displayRecs.map((r) => (
          <div key={r.id} className="rec-card" data-id={r.id}>
            <div className="rec-top">
              <div className="rec-meta">
                <span className="priority-badge">{r.priority}</span>
                <span className="rec-time">{r.suggested}</span>
              </div>
              <button
                onClick={() => setSelectedRec(r)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                title="Expand details"
              >
                <i className="bi bi-arrows-angle-expand" style={{ color: 'var(--muted)' }}></i>
              </button>
            </div>

            <div className="rec-title">{r.title}</div>
            <div className="rec-desc">{r.detail}</div>

            <div className="reasoning-box">
              <div className="r-title">
                <i className="bi bi-stars" style={{ color: 'var(--purple)' }}></i> Agent reasoning &amp; plan
              </div>
              <div className="r-text">{r.reasoning}</div>
            </div>

            <div className="rec-bottom">
              <div className="rec-action">
                <span style={{ color: 'var(--muted)' }}>Recommended action</span> &nbsp;
                <strong>{r.action}</strong>
              </div>

              {r.status === 'pending' ? (
                <div className="rec-buttons">
                  <button className="btn-details" onClick={() => setSelectedRec(r)}>
                    Details
                  </button>
                  <button
                    className="btn-dismiss"
                    onClick={() => onDecision && onDecision(r.id, 'dismiss')}
                  >
                    Dismiss
                  </button>
                  <button
                    className="btn-approve"
                    onClick={() => onDecision && onDecision(r.id, 'approve')}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <span className={`status-pill ${r.status}`}>
                  {r.status === 'approved' && <i className="bi bi-check-lg"></i>}
                  {r.status.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}

        {displayRecs.length === 0 && (
          <div className="empty-state">
            <i className="bi bi-check2-circle"></i>
            No recommendations right now.
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedRec && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedRec(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="priority-badge">{selectedRec.priority}</span>
                <h3>{selectedRec.title}</h3>
              </div>
              <button
                onClick={() => setSelectedRec(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--muted)' }}
              >
                &times;
              </button>
            </div>

            <div className="admin-modal-body">
              <p style={{ color: '#4B5563', lineHeight: '1.5', marginTop: 0 }}>
                {selectedRec.detail}
              </p>

              <div className="reasoning-box" style={{ marginTop: '16px' }}>
                <div className="r-title">
                  <i className="bi bi-stars" style={{ color: 'var(--purple)' }}></i> Clinical / Operational Reasoning
                </div>
                <div className="r-text">{selectedRec.reasoning}</div>
              </div>

              <div style={{ marginTop: '16px', padding: '12px', background: 'var(--green-bg)', borderRadius: '9px', color: 'var(--text)' }}>
                <div style={{ fontSize: '.78rem', color: 'var(--green)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Target Operational Action
                </div>
                <div style={{ fontSize: '.9rem', fontWeight: 600, marginTop: '4px' }}>
                  {selectedRec.action}
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="btn-outline" onClick={() => setSelectedRec(null)}>
                Close
              </button>
              {selectedRec.status === 'pending' && (
                <>
                  <button
                    className="btn-outline"
                    onClick={() => {
                      onDecision && onDecision(selectedRec.id, 'dismiss');
                      setSelectedRec(null);
                    }}
                  >
                    Dismiss
                  </button>
                  <button
                    className="btn-approve"
                    onClick={() => {
                      onDecision && onDecision(selectedRec.id, 'approve');
                      setSelectedRec(null);
                    }}
                  >
                    Approve Action
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
