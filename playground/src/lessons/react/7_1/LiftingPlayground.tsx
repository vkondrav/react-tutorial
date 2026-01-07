// ============================================
// Lifting State Playground
// ============================================

import { useState } from 'react';
import {
  HiOutlineShoppingCart,
  HiOutlineClipboardList,
  HiOutlineSwitchHorizontal,
  HiPlus,
  HiMinus,
  HiTrash,
  HiCheck,
  HiArrowRight,
  HiArrowLeft,
} from 'react-icons/hi';

// ============================================
// Demo 1: Shopping Cart
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, image: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99, image: '⌨️' },
  { id: 3, name: 'Gaming Mouse', price: 59.99, image: '🖱️' },
  { id: 4, name: 'USB-C Hub', price: 49.99, image: '🔌' },
];

interface ProductGridProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

function ProductGrid({ products, cart, onAddToCart }: ProductGridProps) {
  const isInCart = (id: number) => cart.some((item) => item.id === id);

  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-3 text-sm">Products</h4>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-200 p-3 text-center">
            <div className="text-3xl mb-2">{product.image}</div>
            <div className="text-sm font-medium truncate">{product.name}</div>
            <div className="text-primary font-bold">${product.price}</div>
            <button
              onClick={() => onAddToCart(product)}
              disabled={isInCart(product.id)}
              className={`btn btn-xs mt-2 w-full ${
                isInCart(product.id) ? 'btn-success' : 'btn-primary'
              }`}
            >
              {isInCart(product.id) ? (
                <>
                  <HiCheck size={14} /> Added
                </>
              ) : (
                <>
                  <HiPlus size={14} /> Add
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CartSummaryProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

function CartSummary({ cart, onUpdateQuantity, onRemove }: CartSummaryProps) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
        <HiOutlineShoppingCart size={16} />
        Cart ({itemCount} items)
      </h4>
      {cart.length === 0 ? (
        <p className="text-base-content/60 text-sm">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-2 mb-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-base-200 p-2 rounded"
              >
                <div className="flex items-center gap-2">
                  <span>{item.image}</span>
                  <span className="text-sm">{item.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="btn btn-xs btn-ghost"
                  >
                    <HiMinus size={12} />
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="btn btn-xs btn-ghost"
                  >
                    <HiPlus size={12} />
                  </button>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="btn btn-xs btn-ghost text-error"
                  >
                    <HiTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-base-content/20 pt-2 flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}

function ShoppingCartDemo() {
  // Lifted state - shared between ProductGrid and CartSummary
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <ProductGrid products={PRODUCTS} cart={cart} onAddToCart={addToCart} />
      <CartSummary cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
    </div>
  );
}

// ============================================
// Demo 2: Multi-Step Form Wizard
// ============================================

interface FormData {
  name: string;
  email: string;
  plan: string;
  features: string[];
}

interface StepProps {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
}

function Step1PersonalInfo({ data, onChange }: StepProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-bold">Step 1: Personal Information</h4>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="input input-bordered"
          placeholder="Enter your name"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="input input-bordered"
          placeholder="Enter your email"
        />
      </div>
    </div>
  );
}

function Step2SelectPlan({ data, onChange }: StepProps) {
  const plans = ['Basic', 'Pro', 'Enterprise'];

  return (
    <div className="space-y-4">
      <h4 className="font-bold">Step 2: Select Plan</h4>
      <div className="grid grid-cols-3 gap-2">
        {plans.map((plan) => (
          <button
            key={plan}
            onClick={() => onChange({ plan })}
            className={`btn ${data.plan === plan ? 'btn-primary' : 'btn-ghost'}`}
          >
            {plan}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3Features({ data, onChange }: StepProps) {
  const availableFeatures = ['API Access', 'Priority Support', 'Custom Domain', 'Analytics'];

  const toggleFeature = (feature: string) => {
    const features = data.features.includes(feature)
      ? data.features.filter((f) => f !== feature)
      : [...data.features, feature];
    onChange({ features });
  };

  return (
    <div className="space-y-4">
      <h4 className="font-bold">Step 3: Add Features</h4>
      <div className="space-y-2">
        {availableFeatures.map((feature) => (
          <label key={feature} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.features.includes(feature)}
              onChange={() => toggleFeature(feature)}
              className="checkbox checkbox-primary"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface SummaryPanelProps {
  data: FormData;
  currentStep: number;
}

function SummaryPanel({ data, currentStep }: SummaryPanelProps) {
  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
        <HiOutlineClipboardList size={16} />
        Summary (Live Preview)
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-base-content/60">Name:</span>
          <span className={data.name ? 'text-success' : 'text-base-content/40'}>
            {data.name || 'Not entered'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/60">Email:</span>
          <span className={data.email ? 'text-success' : 'text-base-content/40'}>
            {data.email || 'Not entered'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/60">Plan:</span>
          <span className={data.plan ? 'text-success' : 'text-base-content/40'}>
            {data.plan || 'Not selected'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-content/60">Features:</span>
          <span className={data.features.length ? 'text-success' : 'text-base-content/40'}>
            {data.features.length ? data.features.join(', ') : 'None'}
          </span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-base-content/20">
        <div className="text-xs text-base-content/60">Progress</div>
        <div className="flex gap-1 mt-1">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded ${
                step <= currentStep ? 'bg-primary' : 'bg-base-content/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FormWizardDemo() {
  // Lifted state - shared across all steps and summary
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    plan: '',
    features: [],
  });

  const handleChange = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canGoNext = () => {
    if (currentStep === 1) return formData.name && formData.email;
    if (currentStep === 2) return formData.plan;
    return true;
  };

  const steps = [
    <Step1PersonalInfo key={1} data={formData} onChange={handleChange} />,
    <Step2SelectPlan key={2} data={formData} onChange={handleChange} />,
    <Step3Features key={3} data={formData} onChange={handleChange} />,
  ];

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card bg-base-300 p-4">
        {steps[currentStep - 1]}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 1}
            className="btn btn-ghost btn-sm"
          >
            <HiArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={currentStep === 3 || !canGoNext()}
            className="btn btn-primary btn-sm"
          >
            Next
            <HiArrowRight size={16} />
          </button>
        </div>
      </div>
      <SummaryPanel data={formData} currentStep={currentStep} />
    </div>
  );
}

// ============================================
// Demo 3: Currency Converter (Extended)
// ============================================

interface CurrencyInputProps {
  currency: string;
  amount: string;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
  currencies: string[];
}

function CurrencyInput({
  currency,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencies,
}: CurrencyInputProps) {
  return (
    <div className="card bg-base-300 p-4">
      <div className="flex gap-2">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="select select-bordered w-24"
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="input input-bordered flex-1"
          placeholder="0.00"
        />
      </div>
    </div>
  );
}

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25,
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar',
};

function CurrencyConverterDemo() {
  // Lifted state - both inputs share the base value
  const [baseAmount, setBaseAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const currencies = Object.keys(EXCHANGE_RATES);

  // Convert base amount to USD, then to target currency
  const convert = (amount: string, from: string, to: string): string => {
    if (!amount || isNaN(parseFloat(amount))) return '';
    const inUSD = parseFloat(amount) / EXCHANGE_RATES[from];
    const result = inUSD * EXCHANGE_RATES[to];
    return result.toFixed(2);
  };

  const handleFromAmountChange = (amount: string) => {
    setBaseAmount(amount);
  };

  const handleToAmountChange = (amount: string) => {
    // Convert back to "from" currency
    const converted = convert(amount, toCurrency, fromCurrency);
    setBaseAmount(converted);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toAmount = convert(baseAmount, fromCurrency, toCurrency);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <CurrencyInput
            currency={fromCurrency}
            amount={baseAmount}
            onAmountChange={handleFromAmountChange}
            onCurrencyChange={setFromCurrency}
            currencies={currencies}
          />
        </div>
        <button onClick={swapCurrencies} className="btn btn-circle btn-ghost">
          <HiOutlineSwitchHorizontal size={20} />
        </button>
        <div className="flex-1">
          <CurrencyInput
            currency={toCurrency}
            amount={toAmount}
            onAmountChange={handleToAmountChange}
            onCurrencyChange={setToCurrency}
            currencies={currencies}
          />
        </div>
      </div>
      <div className="text-center text-sm text-base-content/60">
        1 {fromCurrency} ({CURRENCY_NAMES[fromCurrency]}) ={' '}
        {(EXCHANGE_RATES[toCurrency] / EXCHANGE_RATES[fromCurrency]).toFixed(4)} {toCurrency} (
        {CURRENCY_NAMES[toCurrency]})
      </div>
    </div>
  );
}

// ============================================
// Main Component with Tabs
// ============================================

type DemoTab = 'cart' | 'wizard' | 'converter';

interface TabConfig {
  id: DemoTab;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const TABS: TabConfig[] = [
  {
    id: 'cart',
    label: 'Shopping Cart',
    icon: <HiOutlineShoppingCart size={18} />,
    description: 'Products and cart share selection state',
  },
  {
    id: 'wizard',
    label: 'Form Wizard',
    icon: <HiOutlineClipboardList size={18} />,
    description: 'Multi-step form with live summary',
  },
  {
    id: 'converter',
    label: 'Currency Converter',
    icon: <HiOutlineSwitchHorizontal size={18} />,
    description: 'Two-way synced currency inputs',
  },
];

export default function LiftingPlayground(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<DemoTab>('cart');

  const renderDemo = () => {
    switch (activeTab) {
      case 'cart':
        return <ShoppingCartDemo />;
      case 'wizard':
        return <FormWizardDemo />;
      case 'converter':
        return <CurrencyConverterDemo />;
    }
  };

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-base-content/70">{currentTab.description}</p>

      {/* Demo Content */}
      <div className="card bg-base-200 p-6">{renderDemo()}</div>

      {/* Hint */}
      <div className="alert">
        <HiCheck className="text-success" size={20} />
        <span>
          <strong>Notice:</strong> In each demo, sibling components stay in sync because they share
          state lifted to their common parent!
        </span>
      </div>
    </div>
  );
}
