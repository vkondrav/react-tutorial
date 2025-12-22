// ============================================
// ControlledBenefitsDemo - Benefits of controlled components
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import formattingCode from './examples/Formatting.tsx?raw';

type BenefitTab = 'validation' | 'formatting' | 'conditional' | 'computed';

export default function ControlledBenefitsDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<BenefitTab>('validation');

  const tabs: { id: BenefitTab; label: string }[] = [
    { id: 'validation', label: 'Instant Validation' },
    { id: 'formatting', label: 'Auto Formatting' },
    { id: 'conditional', label: 'Conditional Logic' },
    { id: 'computed', label: 'Computed Values' },
  ];

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card bg-base-300 p-6">
        {activeTab === 'validation' && <ValidationDemo />}
        {activeTab === 'formatting' && <FormattingDemo />}
        {activeTab === 'conditional' && <ConditionalDemo />}
        {activeTab === 'computed' && <ComputedDemo />}
      </div>
    </div>
  );
}

// ===== Instant Validation Demo =====
function ValidationDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = email.includes('@') && email.includes('.');
  const isStrongPassword = password.length >= 8;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <span className="text-primary">Instant Validation</span>
        <span className="text-xs text-base-content/60">— feedback as you type</span>
      </h4>

      <div className="grid gap-4">
        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`input input-bordered w-full ${
              email ? (isValidEmail ? 'input-success' : 'input-error') : ''
            }`}
          />
          {email && (
            <div
              className={`flex items-center gap-1 mt-1 text-xs ${
                isValidEmail ? 'text-success' : 'text-error'
              }`}
            >
              {isValidEmail ? <HiCheck size={14} /> : <HiX size={14} />}
              {isValidEmail ? 'Valid email format' : 'Must include @ and .'}
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className={`input input-bordered w-full ${
              password ? (isStrongPassword ? 'input-success' : 'input-error') : ''
            }`}
          />
          {password && (
            <div
              className={`flex items-center gap-1 mt-1 text-xs ${
                isStrongPassword ? 'text-success' : 'text-error'
              }`}
            >
              {isStrongPassword ? <HiCheck size={14} /> : <HiX size={14} />}
              {isStrongPassword ? 'Strong password' : `Need ${8 - password.length} more characters`}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm bg-primary/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
        <p className="text-base-content/70">
          Validation happens on every keystroke because we have the value in state. No need to wait
          for form submit!
        </p>
      </div>
    </div>
  );
}

// ===== Auto Formatting Demo =====
function FormattingDemo() {
  const [phone, setPhone] = useState('');
  const [creditCard, setCreditCard] = useState('');

  // Format phone: (123) 456-7890
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  // Format credit card: 1234 5678 9012 3456
  const formatCreditCard = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.match(/.{1,4}/g)?.join(' ') || '';
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <span className="text-secondary">Auto Formatting</span>
        <span className="text-xs text-base-content/60">— format as you type</span>
      </h4>

      <div className="grid gap-4">
        {/* Phone */}
        <div>
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(123) 456-7890"
            className="input input-bordered w-full"
          />
          <div className="text-xs text-base-content/60 mt-1">
            Raw digits: {phone.replace(/\D/g, '') || '(none)'}
          </div>
        </div>

        {/* Credit Card */}
        <div>
          <label className="label">
            <span className="label-text">Credit Card</span>
          </label>
          <input
            type="text"
            value={creditCard}
            onChange={(e) => setCreditCard(formatCreditCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className="input input-bordered w-full font-mono"
          />
          <div className="text-xs text-base-content/60 mt-1">
            Raw digits: {creditCard.replace(/\D/g, '') || '(none)'}
          </div>
        </div>
      </div>

      <div>
        <CodeSnippet code={formattingCode} language="tsx" />
      </div>
    </div>
  );
}

// ===== Conditional Logic Demo =====
function ConditionalDemo() {
  const [delivery, setDelivery] = useState<'pickup' | 'shipping'>('pickup');
  const [address, setAddress] = useState('');

  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <span className="text-accent">Conditional Logic</span>
        <span className="text-xs text-base-content/60">— show/hide based on input</span>
      </h4>

      <div className="space-y-4">
        {/* Delivery Method */}
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Delivery Method</span>
          </label>
          <div className="flex gap-4">
            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={delivery === 'pickup'}
                onChange={(e) => setDelivery(e.target.value as 'pickup' | 'shipping')}
                className="radio radio-accent"
              />
              <span className="label-text">Store Pickup</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                name="delivery"
                value="shipping"
                checked={delivery === 'shipping'}
                onChange={(e) => setDelivery(e.target.value as 'pickup' | 'shipping')}
                className="radio radio-accent"
              />
              <span className="label-text">Ship to Address</span>
            </label>
          </div>
        </div>

        {/* Conditional Address Field */}
        {delivery === 'shipping' && (
          <div className="animate-fadeIn">
            <label className="label">
              <span className="label-text">Shipping Address</span>
              <span className="label-text-alt text-accent">Required</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address..."
              className="input input-bordered input-accent w-full"
            />
          </div>
        )}

        {delivery === 'pickup' && (
          <div className="bg-base-200 rounded-lg p-4 animate-fadeIn">
            <p className="text-sm text-base-content/70">
              📍 Pick up at: <strong>123 React Street</strong>
            </p>
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 text-sm bg-accent/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-accent shrink-0 mt-0.5" size={18} />
        <p className="text-base-content/70">
          Because we know the delivery method in state, we can conditionally show or hide the
          address field!
        </p>
      </div>
    </div>
  );
}

// ===== Computed Values Demo =====
function ComputedDemo() {
  const [quantity, setQuantity] = useState(1);
  const [pricePerItem] = useState(29.99);
  const [discount, setDiscount] = useState(false);

  const subtotal = quantity * pricePerItem;
  const discountAmount = discount ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold flex items-center gap-2">
        <span className="text-success">Computed Values</span>
        <span className="text-xs text-base-content/60">— derive from state</span>
      </h4>

      <div className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="input input-bordered w-24"
          />
          <span className="ml-3 text-base-content/60">× ${pricePerItem.toFixed(2)} each</span>
        </div>

        {/* Discount */}
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            checked={discount}
            onChange={(e) => setDiscount(e.target.checked)}
            className="checkbox checkbox-success"
          />
          <span className="label-text">Apply 10% discount</span>
        </label>

        {/* Order Summary */}
        <div className="bg-base-200 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount && (
            <div className="flex justify-between text-sm text-success">
              <span>Discount (10%):</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-base-300 pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-success">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm bg-success/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-success shrink-0 mt-0.5" size={18} />
        <p className="text-base-content/70">
          <code>subtotal</code>, <code>discountAmount</code>, and <code>total</code> are computed
          from state — they update automatically when inputs change!
        </p>
      </div>
    </div>
  );
}
