import { create } from "zustand";

export type LoginMethod = "phone" | "card" | "insurance";

export type ErrorType =
  | "account_not_found"
  | "code_expired"
  | "realname_mismatch"
  | "network_error"
  | null;

interface PhoneForm {
  phone: string;
  code: string;
}

interface CardForm {
  cardNumber: string;
  password: string;
}

interface LoginState {
  loginMethod: LoginMethod;
  elderMode: boolean;
  phoneForm: PhoneForm;
  cardForm: CardForm;
  loading: boolean;
  error: ErrorType;
  errorMessage: string;
  codeCountdown: number;
  isLoggedIn: boolean;

  setLoginMethod: (method: LoginMethod) => void;
  toggleElderMode: () => void;
  setPhoneForm: (field: keyof PhoneForm, value: string) => void;
  setCardForm: (field: keyof CardForm, value: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: ErrorType, message?: string) => void;
  clearError: () => void;
  setCodeCountdown: (count: number) => void;
  decrementCountdown: () => void;
  setLoggedIn: (value: boolean) => void;
  resetForms: () => void;
}

const ERROR_MESSAGES: Record<Exclude<ErrorType, null>, string> = {
  account_not_found: "账号不存在，请检查输入信息或前往注册新账号",
  code_expired: "验证码已过期，请重新获取验证码",
  realname_mismatch: "实名信息不匹配，请确认身份证号和姓名是否正确",
  network_error: "网络连接异常，请稍后重试",
};

export const useLoginStore = create<LoginState>((set, get) => ({
  loginMethod: "phone",
  elderMode: false,
  phoneForm: {
    phone: "",
    code: "",
  },
  cardForm: {
    cardNumber: "",
    password: "",
  },
  loading: false,
  error: null,
  errorMessage: "",
  codeCountdown: 0,
  isLoggedIn: false,

  setLoginMethod: (method) => {
    set({ loginMethod: method });
    get().clearError();
  },

  toggleElderMode: () => {
    set((state) => ({ elderMode: !state.elderMode }));
  },

  setPhoneForm: (field, value) => {
    set((state) => ({
      phoneForm: { ...state.phoneForm, [field]: value },
    }));
  },

  setCardForm: (field, value) => {
    set((state) => ({
      cardForm: { ...state.cardForm, [field]: value },
    }));
  },

  setLoading: (loading) => set({ loading }),

  setError: (error, message) => {
    set({
      error,
      errorMessage: error ? message || ERROR_MESSAGES[error] : "",
    });
  },

  clearError: () => set({ error: null, errorMessage: "" }),

  setCodeCountdown: (count) => set({ codeCountdown: count }),

  decrementCountdown: () => {
    set((state) => ({
      codeCountdown: state.codeCountdown > 0 ? state.codeCountdown - 1 : 0,
    }));
  },

  setLoggedIn: (value) => set({ isLoggedIn: value }),

  resetForms: () => {
    set({
      phoneForm: { phone: "", code: "" },
      cardForm: { cardNumber: "", password: "" },
    });
  },
}));
