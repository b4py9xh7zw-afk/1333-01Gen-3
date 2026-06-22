import { useState } from "react";
import { CalendarClock, FileText, Baby, Clock, Stethoscope, FileText as Report, CheckCircle2, UserPlus, Shield, AlertCircle, LogIn } from "lucide-react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

type EntryKey = "appointment" | "report" | "child" | null;

const entries = [
  {
    key: "appointment" as EntryKey,
    icon: CalendarClock,
    title: "当日号源",
    desc: "查看今日可预约号源",
    color: "medical",
    bg: "bg-medical-50",
    iconColor: "text-medical-500",
    tag: "热门",
  },
  {
    key: "report" as EntryKey,
    icon: FileText,
    title: "报告查询",
    desc: "检查检验报告在线查看",
    color: "health",
    bg: "bg-health-50",
    iconColor: "text-health-500",
    tag: "便捷",
  },
  {
    key: "child" as EntryKey,
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
  const [activeEntry, setActiveEntry] = useState<EntryKey>(null);
  const navigate = useNavigate();

  const handleClose = () => setActiveEntry(null);

  const goLogin = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">快捷服务</h3>
          <span className="text-xs text-gray-400">点击查看详情</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {entries.map((entry) => {
            const Icon = entry.icon;
            return (
              <button
                key={entry.key}
                onClick={() => setActiveEntry(entry.key)}
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

      <Modal
        isOpen={activeEntry === "appointment"}
        onClose={handleClose}
        title="当日号源查询"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-4 p-4 bg-medical-50 rounded-2xl">
            <div className="w-12 h-12 bg-medical-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="font-semibold text-medical-800 mb-1">实时号源查询</p>
              <p className="text-sm text-medical-600 leading-relaxed">
                查询今日各科室剩余可预约号源，在线挂号更便捷
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">今日号源概览</p>
            {[
              { dept: "内科门诊", total: 50, remain: 12, time: "上午 / 下午" },
              { dept: "儿科门诊", total: 40, remain: 3, time: "上午 / 下午" },
              { dept: "皮肤科", total: 30, remain: 8, time: "上午" },
              { dept: "眼科", total: 25, remain: 0, time: "上午 / 下午" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800">{item.dept}</p>
                    {item.remain === 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">
                        已约满
                      </span>
                    )}
                    {item.remain > 0 && item.remain <= 5 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-warm-50 text-warm-600">
                        紧张
                      </span>
                    )}
                    {item.remain > 5 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-health-50 text-health-600">
                        充足
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <Clock className="w-3 h-3 inline mr-1" strokeWidth={2} />
                    {item.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{item.remain}</p>
                  <p className="text-xs text-gray-500">/ 共{item.total}号</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-sm text-amber-700 leading-relaxed">
              完整预约挂号功能需登录后使用，登录后可选择具体时段、医生并完成挂号支付
            </p>
          </div>

          <button
            onClick={goLogin}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-medical-500 to-medical-600 hover:from-medical-600 hover:to-medical-700 text-white font-semibold rounded-xl shadow-soft hover:shadow-hover transition-all duration-300"
          >
            <LogIn className="w-5 h-5" strokeWidth={2} />
            <span>登录后立即预约</span>
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeEntry === "report"} onClose={handleClose} title="报告查询">
        <div className="space-y-5">
          <div className="flex items-start gap-4 p-4 bg-health-50 rounded-2xl">
            <div className="w-12 h-12 bg-health-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Report className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="font-semibold text-health-800 mb-1">在线查收报告</p>
              <p className="text-sm text-health-600 leading-relaxed">
                检查检验报告出具后第一时间推送，无需往返医院取纸质报告
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">查询方式</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 border-2 border-gray-100 rounded-2xl">
                <FileText className="w-6 h-6 text-gray-600 mb-2" strokeWidth={2} />
                <p className="font-medium text-gray-800 text-sm mb-1">门诊号查询</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  输入就诊卡号和门诊号查询
                </p>
              </div>
              <div className="p-4 border-2 border-gray-100 rounded-2xl">
                <UserPlus className="w-6 h-6 text-gray-600 mb-2" strokeWidth={2} />
                <p className="font-medium text-gray-800 text-sm mb-1">身份证查询</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  输入身份证号和姓名查询
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-health-500" strokeWidth={2} />
              <p className="text-sm text-gray-700">支持的报告类型</p>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {["血常规", "生化检查", "影像学", "心电图", "B超", "病理报告", "CT/MRI"].map(
                (type, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {type}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-health-50 rounded-xl">
            <Shield className="w-5 h-5 text-health-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-sm text-health-700 leading-relaxed">
              您的报告数据经过加密存储和传输，确保个人健康信息安全
            </p>
          </div>

          <button
            onClick={goLogin}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-health-500 to-health-600 hover:from-health-600 hover:to-health-700 text-white font-semibold rounded-xl shadow-soft hover:shadow-hover transition-all duration-300"
          >
            <LogIn className="w-5 h-5" strokeWidth={2} />
            <span>登录查看我的报告</span>
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeEntry === "child"} onClose={handleClose} title="儿童账号绑定">
        <div className="space-y-5">
          <div className="flex items-start gap-4 p-4 bg-warm-50 rounded-2xl">
            <div className="w-12 h-12 bg-warm-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Baby className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="font-semibold text-warm-800 mb-1">关爱儿童健康</p>
              <p className="text-sm text-warm-600 leading-relaxed">
                一个主账号可绑定多名儿童，方便家长统一管理孩子的就诊信息
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">绑定需准备的材料</p>
            {[
              { step: "1", title: "儿童身份证号", desc: "户口本上的18位身份证号码" },
              { step: "2", title: "监护人身份证明", desc: "需进行实名信息核验" },
              { step: "3", title: "儿童就诊卡(可选)", desc: "已有就诊卡可直接关联" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-7 h-7 bg-warm-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 p-4 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-sm font-medium text-gray-700">绑定后可享受</p>
            <ul className="space-y-1.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-warm-500" strokeWidth={2} />
                为孩子在线预约挂号
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-warm-500" strokeWidth={2} />
                接收儿童报告推送提醒
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-warm-500" strokeWidth={2} />
                查看儿童历史就诊记录
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-warm-500" strokeWidth={2} />
                儿童疫苗接种提醒
              </li>
            </ul>
          </div>

          <button
            onClick={goLogin}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-warm-500 to-warm-600 hover:from-warm-600 hover:to-warm-700 text-white font-semibold rounded-xl shadow-soft hover:shadow-hover transition-all duration-300"
          >
            <LogIn className="w-5 h-5" strokeWidth={2} />
            <span>登录后绑定儿童账号</span>
          </button>
        </div>
      </Modal>
    </>
  );
}
