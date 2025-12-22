import { useState } from 'react';

export default function ConditionalPlayground() {
  // User profile state
  const [user, setUser] = useState({
    name: 'Alex',
    isLoggedIn: true,
    isPremium: false,
    notifications: 5,
    role: 'user',
  });

  // Feature toggles
  const [features, setFeatures] = useState({
    showAvatar: true,
    showBadge: true,
    showNotifications: true,
    darkMode: true,
  });

  const updateUser = (key, value) => {
    setUser(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (key) => {
    setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginTop: '1rem',
    }}>
      {/* Controls Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        {/* User State Controls */}
        <div style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          padding: '1rem',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#3b82f6',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}>
            👤 User State
          </div>
          
          {/* Name Input */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
              Name
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => updateUser('name', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: 'white',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Toggle Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              onClick={() => updateUser('isLoggedIn', !user.isLoggedIn)}
              style={{
                padding: '0.375rem 0.75rem',
                backgroundColor: user.isLoggedIn ? '#22c55e' : '#475569',
                border: 'none',
                borderRadius: '0.25rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              {user.isLoggedIn ? '✓ Logged In' : '✗ Logged Out'}
            </button>
            <button
              onClick={() => updateUser('isPremium', !user.isPremium)}
              style={{
                padding: '0.375rem 0.75rem',
                backgroundColor: user.isPremium ? '#f59e0b' : '#475569',
                border: 'none',
                borderRadius: '0.25rem',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              {user.isPremium ? '⭐ Premium' : '○ Free'}
            </button>
          </div>

          {/* Role Selector */}
          <div style={{ marginTop: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
              Role
            </label>
            <select
              value={user.role}
              onChange={(e) => updateUser('role', e.target.value)}
              style={{
                padding: '0.5rem',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.375rem',
                color: 'white',
                fontSize: '0.875rem',
              }}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Notifications Counter */}
          <div style={{ marginTop: '0.75rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
              Notifications: {user.notifications}
            </label>
            <input
              type="range"
              min="0"
              max="99"
              value={user.notifications}
              onChange={(e) => updateUser('notifications', Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Feature Toggles */}
        <div style={{
          backgroundColor: '#0f172a',
          borderRadius: '0.5rem',
          padding: '1rem',
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#8b5cf6',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}>
            🎛️ Feature Toggles
          </div>
          
          {Object.entries(features).map(([key, value]) => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleFeature(key)}
                style={{ accentColor: '#8b5cf6' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div style={{
        backgroundColor: features.darkMode ? '#0f172a' : '#f8fafc',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        border: '2px solid #3b82f6',
        transition: 'all 0.3s',
      }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: '#3b82f6',
          marginBottom: '1rem',
        }}>
          🎬 LIVE RESULT
        </div>

        {/* Conditional: Show logged out state OR logged in UI */}
        {!user.isLoggedIn ? (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: features.darkMode ? '#64748b' : '#475569',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
            <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
              Please Log In
            </div>
            <div style={{ fontSize: '0.875rem' }}>
              Toggle "Logged In" above to see the dashboard
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: features.darkMode ? '#1e293b' : '#e2e8f0',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Conditional: Show avatar */}
                {features.showAvatar && (
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                  }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: features.darkMode ? '#f8fafc' : '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    {user.name || 'Anonymous'}
                    
                    {/* Conditional: Premium badge */}
                    {features.showBadge && user.isPremium && (
                      <span style={{
                        padding: '0.125rem 0.375rem',
                        backgroundColor: '#f59e0b',
                        borderRadius: '0.25rem',
                        fontSize: '0.625rem',
                        fontWeight: '700',
                        color: 'white',
                      }}>
                        ⭐ PRO
                      </span>
                    )}
                    
                    {/* Conditional: Role badge (ternary for different colors) */}
                    {features.showBadge && user.role !== 'user' && (
                      <span style={{
                        padding: '0.125rem 0.375rem',
                        backgroundColor: user.role === 'admin' ? '#ef4444' : '#8b5cf6',
                        borderRadius: '0.25rem',
                        fontSize: '0.625rem',
                        fontWeight: '700',
                        color: 'white',
                      }}>
                        {user.role === 'admin' ? '👑 ADMIN' : '🛡️ MOD'}
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: features.darkMode ? '#64748b' : '#475569',
                  }}>
                    {user.isPremium ? 'Premium Member' : 'Free Account'}
                  </div>
                </div>
              </div>

              {/* Conditional: Notifications */}
              {features.showNotifications && (
                <div style={{ position: 'relative' }}>
                  <span style={{
                    fontSize: '1.5rem',
                    filter: features.darkMode ? 'none' : 'grayscale(0.3)',
                  }}>
                    🔔
                  </span>
                  {/* Conditional: Badge only if > 0 */}
                  {user.notifications > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-8px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontSize: '0.625rem',
                      fontWeight: '700',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '9999px',
                      minWidth: '18px',
                      textAlign: 'center',
                    }}>
                      {user.notifications > 99 ? '99+' : user.notifications}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Admin Panel - Conditional */}
            {user.role === 'admin' && (
              <div style={{
                padding: '1rem',
                backgroundColor: features.darkMode ? '#450a0a' : '#fef2f2',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: `1px dashed ${features.darkMode ? '#ef4444' : '#fca5a5'}`,
              }}>
                <div style={{
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: features.darkMode ? '#fca5a5' : '#b91c1c',
                }}>
                  🔧 Admin Controls
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: features.darkMode ? '#fecaca' : '#dc2626',
                }}>
                  You have full access to system settings
                </div>
              </div>
            )}

            {/* Moderator Panel - Conditional */}
            {user.role === 'moderator' && (
              <div style={{
                padding: '1rem',
                backgroundColor: features.darkMode ? '#2e1065' : '#f3e8ff',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                border: `1px dashed ${features.darkMode ? '#8b5cf6' : '#c4b5fd'}`,
              }}>
                <div style={{
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: features.darkMode ? '#c4b5fd' : '#6b21a8',
                }}>
                  🛡️ Moderator Tools
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: features.darkMode ? '#ddd6fe' : '#7c3aed',
                }}>
                  You can manage content and users
                </div>
              </div>
            )}

            {/* Welcome Message */}
            <div style={{
              padding: '1rem',
              backgroundColor: features.darkMode ? '#1e293b' : '#e2e8f0',
              borderRadius: '0.5rem',
              color: features.darkMode ? '#94a3b8' : '#475569',
            }}>
              Welcome to your dashboard, <strong style={{ color: features.darkMode ? '#f8fafc' : '#1e293b' }}>
                {user.name || 'Guest'}
              </strong>!
              {user.isPremium && (
                <span style={{ color: '#f59e0b' }}> Enjoy your premium features ✨</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Current Conditions Display */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#0f172a',
        borderRadius: '0.5rem',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
      }}>
        <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>
          // Current conditions being evaluated:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: user.isLoggedIn ? '#22c55e' : '#ef4444' }}>
            isLoggedIn={String(user.isLoggedIn)}
          </span>
          <span style={{ color: '#94a3b8' }}>|</span>
          <span style={{ color: user.isPremium ? '#f59e0b' : '#64748b' }}>
            isPremium={String(user.isPremium)}
          </span>
          <span style={{ color: '#94a3b8' }}>|</span>
          <span style={{ color: user.role !== 'user' ? '#8b5cf6' : '#64748b' }}>
            role="{user.role}"
          </span>
          <span style={{ color: '#94a3b8' }}>|</span>
          <span style={{ color: user.notifications > 0 ? '#3b82f6' : '#64748b' }}>
            notifications={user.notifications}
          </span>
        </div>
      </div>
    </div>
  );
}

