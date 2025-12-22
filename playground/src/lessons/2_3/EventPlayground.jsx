import { useState } from 'react';

export default function EventPlayground() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    newsletter: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (Number(formData.age) < 18) {
      newErrors.age = 'Must be 18 or older';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', age: '', newsletter: false });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', age: '', newsletter: false });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '500px' }}>
        {/* Form */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid #334155' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Interactive Form with Validation
          </div>

          {submitted ? (
            <div
              style={{
                padding: '2rem',
                backgroundColor: '#22c55e22',
                borderRadius: '0.5rem',
                border: '1px solid #22c55e',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
              <div
                style={{
                  color: '#22c55e',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                }}
              >
                Form Submitted Successfully!
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                Check the state panel to see the submitted data
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    marginBottom: '0.25rem',
                  }}
                >
                  Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#0f172a',
                    border: errors.name ? '1px solid #ef4444' : '1px solid #334155',
                    borderRadius: '0.375rem',
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                  }}
                />
                {errors.name && (
                  <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    marginBottom: '0.25rem',
                  }}
                >
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#0f172a',
                    border: errors.email ? '1px solid #ef4444' : '1px solid #334155',
                    borderRadius: '0.375rem',
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                  }}
                />
                {errors.email && (
                  <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Age */}
              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    marginBottom: '0.25rem',
                  }}
                >
                  Age <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#0f172a',
                    border: errors.age ? '1px solid #ef4444' : '1px solid #334155',
                    borderRadius: '0.375rem',
                    color: '#f8fafc',
                    fontSize: '0.875rem',
                  }}
                />
                {errors.age && (
                  <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>
                    {errors.age}
                  </div>
                )}
              </div>

              {/* Newsletter */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    style={{ width: '1rem', height: '1rem' }}
                  />
                  Subscribe to newsletter
                </label>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#3b82f6',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: '#475569',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>

        {/* State & Events */}
        <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Form State (Live)
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <pre
              style={{
                margin: 0,
                padding: '1rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: 1.6,
                overflow: 'auto',
                maxHeight: '200px',
              }}
            >
              <code style={{ color: '#94a3b8' }}>{JSON.stringify(formData, null, 2)}</code>
            </pre>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.5rem' }}>
              ERRORS:
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.5rem',
                fontSize: '0.75rem',
                lineHeight: 1.6,
              }}
            >
              <code
                style={{ color: errors.name || errors.email || errors.age ? '#ef4444' : '#64748b' }}
              >
                {Object.keys(errors).length === 0 ? 'No errors' : JSON.stringify(errors, null, 2)}
              </code>
            </pre>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              border: '1px dashed #334155',
            }}
          >
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
              EVENTS USED:
            </div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <div>
                • <code style={{ color: '#3b82f6' }}>onChange</code> - Updates state on input
              </div>
              <div>
                • <code style={{ color: '#3b82f6' }}>onSubmit</code> - Handles form submission
              </div>
              <div>
                • <code style={{ color: '#3b82f6' }}>onClick</code> - Reset button
              </div>
              <div>
                • <code style={{ color: '#22c55e' }}>e.preventDefault()</code> - Prevents page
                refresh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
