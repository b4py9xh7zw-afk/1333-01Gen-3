import { Smartphone, CreditCard, QrCode } from "lucide-react";
import { useLoginStore, LoginMethod } from "@/store/useLoginStore";

const tabs: { key: LoginMethod; label: string; icon: typeof Smartphone }[] = [
  { key: "phone", label: "手机号", icon: Smartphone },
  { key: "card", label: "就诊卡", icon: CreditCard },
  { key: "insurance", label: "医保电子凭证", icon: QrCode },
];

export default function LoginTabs() {
  const { loginMethod, setLoginMethod } = useLoginStore();

  return (
    <div className="relative flex bg-gray-50 rounded-2xl p-1.5">
      {tabs.map((tab) => {
        const isActive = loginMethod === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => setLoginMethod(tab.key)}
            className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-medium transition-all duration-300 ${
              isActive
                ? "bg-white text-medical-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={2} />
            <span className="text-sm">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
