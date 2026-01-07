// @ts-nocheck
interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

// Define initial state once (with type)
const initialState: LoginForm = {
  email: '',
  password: '',
  remember: false,
};

// Use it for initial value
const [form, setForm] = useState<LoginForm>(initialState);

// Reset = set back to initial
const handleReset = () => {
  setForm(initialState);
};
