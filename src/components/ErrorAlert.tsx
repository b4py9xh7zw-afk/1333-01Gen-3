import { AlertTriangle, Clock, UserX, UserCheck, WifiOff } from "lucide-react";
import { useLoginStore, ErrorType } from "@/store/useLoginStore";

const errorConfig: Record<
  Exclude<ErrorType, null>,
  { icon: typeof AlertTriangle; color: string; bg: string; border: string }
> = {
  account_not_found: {
    icon: UserX,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  code_expired: {
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  realname_mismatch: {
    icon: UserCheck,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  network_error: {
    icon: WifiOff,
    color: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
};

export default function ErrorAlert() {
  const { error, errorMessage } = useLoginStore();

  if (!error) return null;

  const config = errorConfig[error];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border} animate-slide-up`}
    >
      <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.color}`} strokeWidth={2} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${config.color}`}>
          {error === "account_not_found" && "账号不存在"}
          {error === "code_expired" && "验证码已过期"}
          {error === "realname_mismatch" && "实名信息不匹配"}
          {error === "network_error" && "网络连接异常"}
        </p>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{errorMessage}</p>
      </div>
    </div>
  );
}
