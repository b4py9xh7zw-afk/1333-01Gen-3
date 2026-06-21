import { CalendarClock, FileText, Baby } from "lucide-react";

const entries = [
  {
    icon: CalendarClock,
    title: "当日号源",
    desc: "查看今日可预约号源",
    color: "medical",
    bg: "bg-medical-50",
    iconColor: "text-medical-500",
    tag: "热门",
  },
  {
    icon: FileText,
    title: "报告查询",
    desc: "检查检验报告在线查看",
    color: "health",
    bg: "bg-health-50",
    iconColor: "text-health-500",
    tag: "便捷",
  },
  {
    icon: Baby,
    title: "儿童账号",
    desc: "绑定儿童就诊信息",
    color: "warm",
    bg: "bg-warm-50",
    iconColor: "text-warm-500",
    tag: "关爱",
  },
];

export default function QuickEntries() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">快捷服务</h3>
        <span className="text-xs text-gray-400">无需登录即可使用</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {entries.map((entry, idx) => {
          const Icon = entry.icon;
          return (
            <button
              key={idx}
              className="group relative flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 hover:border-transparent hover:shadow-hover transition-all duration-300 text-center"
            >
              <div
                className={`relative w-12 h-12 ${entry.bg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={`w-6 h-6 ${entry.iconColor}`} strokeWidth={2} />
                <span className="absolute -top-1 -right-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white shadow-sm text-gray-500 border border-gray-100">
                  {entry.tag}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{entry.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{entry.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
