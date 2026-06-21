import { useNavigate } from "react-router-dom";
import { CalendarClock, FileText, Pill, User, LogOut, Activity } from "lucide-react";
import { useLoginStore } from "@/store/useLoginStore";

const quickActions = [
  { icon: CalendarClock, title: "预约挂号", desc: "在线预约专家号", color: "bg-medical-500" },
  { icon: FileText, title: "报告查询", desc: "查看检查检验报告", color: "bg-health-500" },
  { icon: Pill, title: "处方药品", desc: "在线购药配送上门", color: "bg-warm-500" },
  { icon: User, title: "个人中心", desc: "管理您的就诊信息", color: "bg-purple-500" },
];

export default function Home() {
  const navigate = useNavigate();
  const { setLoggedIn, resetForms } = useLoginStore();

  const handleLogout = () => {
    setLoggedIn(false);
    resetForms();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-medical-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-gray-800">仁爱综合医院</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-medical-600 hover:bg-medical-50 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            <span className="text-sm">退出登录</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-medical-500 to-medical-600 rounded-3xl p-8 text-white mb-8 shadow-soft">
          <h1 className="text-2xl font-bold mb-2">欢迎回来！</h1>
          <p className="text-medical-100 mb-6">您已成功登录，今天有什么可以帮您？</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
              <span className="text-sm">门诊预约已开放</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
              <span className="text-sm">2份新报告待查看</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                className="group bg-white rounded-2xl p-6 text-left hover:shadow-hover transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.desc}</p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
