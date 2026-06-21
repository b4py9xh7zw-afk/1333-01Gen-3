import { Heart, Activity, Shield, Clock } from "lucide-react";

export default function BrandPanel() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 bg-gradient-to-br from-medical-500 via-medical-600 to-medical-800 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-health-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-medical-300/10 rounded-full blur-2xl animate-pulse-soft" />
      </div>

      <div className="absolute top-20 left-16 animate-float" style={{ animationDelay: "0s" }}>
        <Heart className="w-12 h-12 text-white/30" strokeWidth={1.5} />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <Activity className="w-16 h-16 text-white/20" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-40 left-24 animate-float" style={{ animationDelay: "2s" }}>
        <Shield className="w-14 h-14 text-white/25" strokeWidth={1.5} />
      </div>
      <div className="absolute bottom-20 right-28 animate-float" style={{ animationDelay: "0.5s" }}>
        <Clock className="w-10 h-10 text-white/20" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 flex flex-col justify-center px-16 py-12 w-full">
        <div className="flex items-center gap-3 mb-12 animate-slide-up">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="w-8 h-8 text-medical-500" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">仁爱综合医院</h1>
            <p className="text-white/70 text-sm">RenAi General Hospital</p>
          </div>
        </div>

        <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-4xl font-bold text-white leading-tight">
            智慧医疗
            <br />
            <span className="text-medical-200">健康触手可及</span>
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            在线预约挂号、报告查询、就诊记录一站式管理，
            让您的就医体验更便捷、更高效。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {[
            { num: "50+", label: "专科医生" },
            { num: "10万+", label: "服务患者" },
            { num: "99%", label: "患者满意度" },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{item.num}</div>
              <div className="text-white/60 text-sm">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-12 flex items-center gap-6 text-white/60 text-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>数据安全加密</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>7×24小时服务</span>
          </div>
        </div>
      </div>
    </div>
  );
}
