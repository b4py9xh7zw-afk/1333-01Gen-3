import { useEffect } from "react";
import { Smartphone, Shield, Loader2 } from "lucide-react";
import { useLoginStore } from "@/store/useLoginStore";
import ErrorAlert from "./ErrorAlert";

export default function PhoneLoginForm() {
  const {
    phoneForm,
    setPhoneForm,
    loading,
    error,
    codeCountdown,
    setCodeCountdown,
    decrementCountdown,
    setError,
    clearError,
    setLoading,
    setLoggedIn,
  } = useLoginStore();

  useEffect(() => {
    if (codeCountdown > 0) {
      const timer = setInterval(() => {
        decrementCountdown();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [codeCountdown, decrementCountdown]);

  const handleSendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
      setError("account_not_found", "请输入正确的手机号码");
      return;
    }
    clearError();
    setCodeCountdown(60);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
      setError("account_not_found", "请输入正确的手机号码");
      return;
    }

    if (phoneForm.code.length !== 6) {
      setError("code_expired", "请输入6位验证码");
      return;
    }

    if (codeCountdown === 0 && phoneForm.code !== "") {
      setError("code_expired");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (phoneForm.code === "000000") {
      setError("realname_mismatch");
      setLoading(false);
      return;
    }

    if (phoneForm.code === "111111") {
      setError("account_not_found");
      setLoading(false);
      return;
    }

    if (phoneForm.code === "222222") {
      setError("network_error");
      setLoading(false);
      return;
    }

    setLoading(false);
    setLoggedIn(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <ErrorAlert />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">手机号码</label>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white transition-all duration-200 ${
            error === "account_not_found"
              ? "border-orange-400 bg-orange-50/30"
              : "border-gray-100 focus-within:border-medical-400 focus-within:bg-medical-50/30"
          }`}
        >
          <Smartphone className="w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type="tel"
            placeholder="请输入手机号码"
            value={phoneForm.phone}
            onChange={(e) => {
              setPhoneForm("phone", e.target.value.replace(/\D/g, "").slice(0, 11));
              if (error === "account_not_found") clearError();
            }}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
            maxLength={11}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">验证码</label>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white transition-all duration-200 ${
            error === "code_expired"
              ? "border-amber-400 bg-amber-50/30"
              : "border-gray-100 focus-within:border-medical-400 focus-within:bg-medical-50/30"
          }`}
        >
          <Shield className="w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="请输入6位验证码"
            value={phoneForm.code}
            onChange={(e) => {
              setPhoneForm("code", e.target.value.replace(/\D/g, "").slice(0, 6));
              if (error === "code_expired") clearError();
            }}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 tracking-widest"
            maxLength={6}
          />
          <button
            type="button"
            onClick={handleSendCode}
            disabled={codeCountdown > 0 || loading}
            className={`text-sm font-medium whitespace-nowrap px-3 py-1 rounded-lg transition-all duration-200 ${
              codeCountdown > 0 || loading
                ? "text-gray-400 cursor-not-allowed"
                : "text-medical-500 hover:text-medical-600 hover:bg-medical-50"
            }`}
          >
            {codeCountdown > 0 ? `${codeCountdown}秒后重试` : "获取验证码"}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 text-white font-semibold rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
            <span>登录中...</span>
          </>
        ) : (
          <span>登 录</span>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        登录即表示您已同意
        <a href="#" className="text-medical-500 hover:underline mx-1">《用户服务协议》</a>
        和
        <a href="#" className="text-medical-500 hover:underline mx-1">《隐私政策》</a>
      </p>
    </form>
  );
}
