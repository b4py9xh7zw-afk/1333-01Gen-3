import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import BrandPanel from "@/components/BrandPanel";
import ElderModeToggle from "@/components/ElderModeToggle";
import LoginTabs from "@/components/LoginTabs";
import PhoneLoginForm from "@/components/PhoneLoginForm";
import CardLoginForm from "@/components/CardLoginForm";
import InsuranceLoginForm from "@/components/InsuranceLoginForm";
import QuickEntries from "@/components/QuickEntries";
import { useLoginStore } from "@/store/useLoginStore";

export default function Login() {
  const { loginMethod, elderMode, isLoggedIn, setLoggedIn } = useLoginStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const renderForm = () => {
    switch (loginMethod) {
      case "phone":
        return <PhoneLoginForm />;
      case "card":
        return <CardLoginForm />;
      case "insurance":
        return <InsuranceLoginForm />;
      default:
        return <PhoneLoginForm />;
    }
  };

  return (
    <div className={`min-h-screen flex bg-gray-50 ${elderMode ? "eldermode" : ""}`}>
      <BrandPanel />

      <div className="flex-1 flex flex-col">
        <header className="lg:hidden flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-gray-800">仁爱综合医院</span>
          </div>
          <ElderModeToggle />
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-8 lg:py-12">
          <div className="w-full max-w-md space-y-8 animate-slide-up">
            <div className="hidden lg:flex justify-end mb-8">
              <ElderModeToggle />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">欢迎登录</h1>
              <p className="text-gray-500">选择登录方式，开启便捷就医服务</p>
            </div>

            <LoginTabs />

            <div className="min-h-[380px]">
              {renderForm()}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <QuickEntries />
            </div>
          </div>
        </main>

        <footer className="py-6 text-center text-sm text-gray-400">
          <p>© 2026 仁爱综合医院 版权所有 | 互联网医院服务平台</p>
        </footer>
      </div>
    </div>
  );
}
