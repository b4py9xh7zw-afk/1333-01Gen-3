import { QrCode, Smartphone, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function InsuranceLoginForm() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="relative p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-soft">
          <div className="w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-4 grid grid-cols-8 gap-0.5">
              {Array.from({ length: 64 }).map((_, i) => {
                const isDark =
                  (i % 7 === 0) ||
                  (i % 5 === 0 && i % 3 !== 0) ||
                  (Math.floor(i / 8) % 2 === 0 && i % 2 === 0);
                return (
                  <div
                    key={i}
                    className={`rounded-sm ${isDark ? "bg-gray-800" : "bg-transparent"}`}
                  />
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg border-2 border-medical-50">
                <QrCode className="w-8 h-8 text-medical-500" strokeWidth={2.5} />
              </div>
            </div>
            {refreshing && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-medical-500 animate-spin" strokeWidth={2} />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-medical-500 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} strokeWidth={2} />
          <span>刷新二维码</span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-medical-50 rounded-xl">
          <Smartphone className="w-5 h-5 text-medical-500 flex-shrink-0" strokeWidth={2} />
          <div>
            <p className="text-sm font-medium text-medical-700">使用国家医保服务平台App扫码</p>
            <p className="text-xs text-medical-600 mt-0.5">打开App → 点击右上角"扫一扫"</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-health-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-sm font-medium text-gray-700">安全保障</p>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              医保电子凭证扫码登录经过国家医保局安全认证，全程数据加密传输，
              确保您的个人信息安全。
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400">
          二维码有效期5分钟，请尽快扫码完成登录
        </p>
      </div>
    </div>
  );
}
