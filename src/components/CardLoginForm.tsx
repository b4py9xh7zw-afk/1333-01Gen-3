import { CreditCard, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLoginStore } from "@/store/useLoginStore";
import ErrorAlert from "./ErrorAlert";

export default function CardLoginForm() {
  const { cardForm, setCardForm, loading, error, setError, clearError, setLoading, setLoggedIn } =
    useLoginStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (cardForm.cardNumber.length < 8) {
      setError("account_not_found", "请输入正确的就诊卡号");
      return;
    }

    if (cardForm.password.length < 6) {
      setError("account_not_found", "密码长度不少于6位");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (cardForm.cardNumber === "88888888") {
      setError("realname_mismatch");
      setLoading(false);
      return;
    }

    if (cardForm.cardNumber === "99999999") {
      setError("account_not_found");
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
        <label className="text-sm font-medium text-gray-700">就诊卡号</label>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white transition-all duration-200 ${
            error === "account_not_found"
              ? "border-orange-400 bg-orange-50/30"
              : "border-gray-100 focus-within:border-medical-400 focus-within:bg-medical-50/30"
          }`}
        >
          <CreditCard className="w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type="text"
            placeholder="请输入就诊卡号"
            value={cardForm.cardNumber}
            onChange={(e) => {
              setCardForm("cardNumber", e.target.value.replace(/\D/g, ""));
              if (error === "account_not_found") clearError();
            }}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">密码</label>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white transition-all duration-200 ${
            error === "account_not_found"
              ? "border-orange-400 bg-orange-50/30"
              : "border-gray-100 focus-within:border-medical-400 focus-within:bg-medical-50/30"
          }`}
        >
          <Lock className="w-5 h-5 text-gray-400" strokeWidth={2} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="请输入查询密码"
            value={cardForm.password}
            onChange={(e) => {
              setCardForm("password", e.target.value);
              if (error === "account_not_found") clearError();
            }}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Eye className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <button type="button" className="text-gray-500 hover:text-medical-500 transition-colors">
          忘记密码？
        </button>
        <button type="button" className="text-medical-500 hover:text-medical-600 transition-colors">
          首次登录？激活账号
        </button>
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
    </form>
  );
}
