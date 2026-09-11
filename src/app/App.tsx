import { useState, useEffect, useRef } from "react";
import {
  Star,
  MapPin,
  Utensils,
  Bus,
  AlertTriangle,
  Mic,
  Globe,
  LogOut,
  Bot,
  Phone,
  Telescope,
  Mountain,
  Clock,
  ChevronLeft,
  Send,
  Coffee,
  Hotel,
  ShoppingBag,
  Car,
  Building2,
  Headphones,
  MessageSquare,
  Navigation,
  Flame,
  Wifi,
  Volume2,
  RotateCcw,
  CheckCircle,
  Info,
  Map,
  Search,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen =
  | "bienvenida"
  | "idioma"
  | "cargando"
  | "menu"
  | "observatorio"
  | "lugares"
  | "detalle-lugar"
  | "mapa"
  | "gastronomia"
  | "transporte"
  | "emergencias"
  | "asistente"
  | "respuesta-asistente"
  | "encuesta"
  | "cierre";

// ─── Star Field Background ────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `twinkle ${2 + s.delay}s ease-in-out infinite alternate`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          from { opacity: 0.1; }
          to { opacity: 0.8; }
        }
        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 12px rgba(200,169,74,0.3); }
          50% { box-shadow: 0 0 28px rgba(200,169,74,0.7); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes progress-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,169,74,0.4); border-radius: 2px; }
      `}</style>
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────
function TotemHeader({ title, onBack }: { title?: string; onBack?: () => void }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex-none flex items-center justify-between px-6 py-3"
      style={{
        background: "linear-gradient(180deg, #020914 0%, rgba(4,12,30,0) 100%)",
        borderBottom: "1px solid rgba(200,169,74,0.3)",
      }}
    >
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#C8A94A] hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(200,169,74,0.15)", border: "1px solid rgba(200,169,74,0.5)" }}
          >
            <Star size={14} className="text-[#C8A94A]" />
          </div>
        )}
        <div>
          <p
            className="text-[10px] tracking-[0.25em] uppercase text-[#7A9CC4]"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            Brújula Digital
          </p>
          {title && (
            <h1
              className="text-white font-bold leading-none text-sm"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {title}
            </h1>
          )}
        </div>
      </div>
      <div className="text-right">
        <p
          className="text-[#C8A94A] font-bold text-base tabular-nums"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          {time.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="text-[#7A9CC4] text-[10px]" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
          {time.toLocaleDateString("es-CL", { weekday: "short", day: "numeric", month: "short" })}
        </p>
      </div>
    </div>
  );
}

function TotemFooter() {
  return (
    <div
      className="flex-none flex items-center justify-center gap-2 py-2"
      style={{
        borderTop: "1px solid rgba(200,169,74,0.2)",
        background: "linear-gradient(0deg, #020914 0%, rgba(4,12,30,0) 100%)",
      }}
    >
      <Wifi size={10} className="text-[#4A9AE8]" />
      <p
        className="text-[10px] tracking-widest text-[#3A5A80] uppercase"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        Observatorio Cruz del Sur · Combarbalá, Chile
      </p>
      <Volume2 size={10} className="text-[#4A9AE8]" />
    </div>
  );
}

function BigButton({
  onClick,
  children,
  variant = "primary",
  icon,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold" | "danger" | "ghost";
  icon?: React.ReactNode;
  className?: string;
}) {
  const styles: Record<string, string> = {
    primary: "bg-[#1A5DC8] hover:bg-[#2070E0] text-white border border-[#2A6DD8]",
    secondary: "bg-[#0F2554] hover:bg-[#142E6A] text-white border border-[#1A3A6B]",
    gold: "bg-[#C8A94A] hover:bg-[#DFC25E] text-[#040C1E] border border-[#E8C86A]",
    danger: "bg-[#8B1A1A] hover:bg-[#A52020] text-white border border-[#C0392B]",
    ghost: "bg-transparent hover:bg-[#0F2554] text-[#7A9CC4] border border-[rgba(200,169,74,0.25)] hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 w-full min-h-[72px] rounded-xl font-bold text-lg transition-all duration-150 active:scale-[0.98] ${styles[variant]} ${className}`}
      style={{ fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.04em" }}
    >
      {icon && <span className="flex-none">{icon}</span>}
      {children}
    </button>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(200,169,74,0.3)]" />
      <span
        className="text-[10px] tracking-[0.3em] text-[#C8A94A] uppercase flex-none"
        style={{ fontFamily: "Barlow Condensed, sans-serif" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(200,169,74,0.3)]" />
    </div>
  );
}

// ─── Screen 1: Bienvenida ─────────────────────────────────────────────────────
function BienvenidaScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader />
        <div className="flex-1 flex flex-col items-center justify-between py-8 px-6">
          {/* Logo zone */}
          <div className="flex flex-col items-center gap-4 animate-[slide-up_0.8s_ease_forwards]">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center relative"
              style={{
                background: "radial-gradient(circle, rgba(26,93,200,0.3) 0%, rgba(4,12,30,0) 70%)",
                border: "2px solid rgba(200,169,74,0.5)",
                animation: "pulse-gold 3s ease-in-out infinite",
              }}
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{ background: "radial-gradient(circle, #0F2554 0%, #040C1E 100%)" }}
              >
                <Star size={48} className="text-[#C8A94A]" style={{ animation: "spin-slow 20s linear infinite" }} />
              </div>
            </div>

            <div className="text-center">
              <h1
                className="text-6xl font-bold tracking-[0.08em] text-white"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                BRÚJULA
              </h1>
              <h1
                className="text-6xl font-bold tracking-[0.08em]"
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  background: "linear-gradient(90deg, #C8A94A, #F0D878, #C8A94A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                DIGITAL
              </h1>
            </div>

            <div
              className="h-px w-48"
              style={{ background: "linear-gradient(90deg, transparent, #C8A94A, transparent)" }}
            />

            <p
              className="text-center text-[#4A9AE8] text-xl font-semibold tracking-wide"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Bienvenido al Observatorio Cruz del Sur
            </p>
            <p
              className="text-center text-[#7A9CC4] text-base leading-relaxed max-w-[280px]"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              Información turística, astronómica y servicios locales
            </p>
          </div>

          {/* Touch zone */}
          <div className="w-full space-y-4">
            <button
              onClick={onNext}
              className="w-full py-7 rounded-2xl text-2xl font-bold tracking-widest transition-all duration-200 active:scale-[0.97]"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                background: "linear-gradient(135deg, #1A5DC8 0%, #0F3A8A 100%)",
                border: "2px solid rgba(74,154,232,0.6)",
                color: "white",
                animation: "pulse-gold 2.5s ease-in-out infinite",
                boxShadow: "0 0 30px rgba(26,93,200,0.4)",
              }}
            >
              ✦ TOCAR PARA COMENZAR ✦
            </button>

            <div className="flex items-center justify-center gap-2">
              <Mic size={14} className="text-[#4A9AE8]" />
              <p
                className="text-[#5A8AB0] text-sm"
                style={{ fontFamily: "Barlow, sans-serif" }}
              >
                También puedes usar asistencia por voz
              </p>
            </div>
          </div>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 2: Idioma ─────────────────────────────────────────────────────────
function IdiomaScreen({ onSelect }: { onSelect: (lang: string) => void }) {
  const idiomas = [
    { code: "es", label: "Español", sublabel: "Spanish", flag: "🇨🇱" },
    { code: "en", label: "English", sublabel: "Inglés", flag: "🇬🇧" },
    { code: "pt", label: "Português", sublabel: "Portugués", flag: "🇧🇷" },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Selección de idioma" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <div className="text-center">
            <Globe size={48} className="text-[#4A9AE8] mx-auto mb-4" />
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Selecciona tu idioma
            </h2>
            <p className="text-[#7A9CC4] mt-2" style={{ fontFamily: "Barlow, sans-serif" }}>
              Select your language · Selecione seu idioma
            </p>
          </div>

          <div className="w-full space-y-4">
            {idiomas.map((idioma) => (
              <button
                key={idioma.code}
                onClick={() => onSelect(idioma.code)}
                className="w-full flex items-center gap-5 px-8 py-7 rounded-2xl transition-all duration-150 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #081428 0%, #0C1E3A 100%)",
                  border: "2px solid rgba(200,169,74,0.35)",
                  fontFamily: "Rajdhani, sans-serif",
                }}
              >
                <span className="text-5xl">{idioma.flag}</span>
                <div className="text-left">
                  <p className="text-white text-3xl font-bold leading-none">{idioma.label}</p>
                  <p className="text-[#7A9CC4] text-sm mt-1" style={{ fontFamily: "Barlow, sans-serif" }}>
                    {idioma.sublabel}
                  </p>
                </div>
                <ChevronLeft size={24} className="text-[#C8A94A] ml-auto rotate-180" />
              </button>
            ))}
          </div>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 3: Cargando ───────────────────────────────────────────────────────
function CargandoScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-10">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #0F2554 0%, #040C1E 100%)",
                border: "3px solid rgba(200,169,74,0.4)",
              }}
            >
              <Star
                size={52}
                className="text-[#C8A94A]"
                style={{ animation: "spin-slow 3s linear infinite" }}
              />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2
              className="text-4xl font-bold text-white tracking-wider"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              Cargando interfaz
              <span style={{ animation: "blink-cursor 1s step-end infinite" }}>…</span>
            </h2>
            <p className="text-[#7A9CC4] text-lg" style={{ fontFamily: "Barlow, sans-serif" }}>
              Preparando contenido en el idioma seleccionado
            </p>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
              <span className="text-[#7A9CC4]">Cargando recursos</span>
              <span className="text-[#C8A94A] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#0F2554] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #1A5DC8, #4A9AE8, #C8A94A)",
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {["Información turística", "Datos astronómicos", "Servicios locales"].map((item, i) => (
                <div
                  key={i}
                  className="text-center py-2 rounded-lg"
                  style={{
                    background: progress > (i + 1) * 30 ? "rgba(26,93,200,0.3)" : "rgba(15,37,84,0.3)",
                    border: `1px solid ${progress > (i + 1) * 30 ? "rgba(74,154,232,0.5)" : "rgba(200,169,74,0.1)"}`,
                  }}
                >
                  {progress > (i + 1) * 30 ? (
                    <CheckCircle size={14} className="text-[#4A9AE8] mx-auto mb-1" />
                  ) : (
                    <Clock size={14} className="text-[#3A5A80] mx-auto mb-1" />
                  )}
                  <p
                    className="text-[9px] leading-tight"
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      color: progress > (i + 1) * 30 ? "#4A9AE8" : "#3A5A80",
                    }}
                  >
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 4: Menú Principal ─────────────────────────────────────────────────
const menuItems = [
  { id: "observatorio", label: "Observatorio Cruz del Sur", icon: Telescope, color: "#4A9AE8" },
  { id: "lugares", label: "Lugares turísticos", icon: Mountain, color: "#7AC87A" },
  { id: "mapa", label: "Mapa e indicaciones", icon: Map, color: "#C8A94A" },
  { id: "gastronomia", label: "Gastronomía y servicios", icon: Utensils, color: "#E87A4A" },
  { id: "transporte", label: "Transporte", icon: Bus, color: "#9A7AE8" },
  { id: "emergencias", label: "Emergencias", icon: AlertTriangle, color: "#E84A4A" },
  { id: "asistente", label: "Asistente IA", icon: Bot, color: "#4AE8C8" },
  { id: "idioma", label: "Cambiar idioma", icon: Globe, color: "#7A9CC4" },
  { id: "encuesta", label: "Finalizar sesión", icon: LogOut, color: "#5A7A9A" },
];

function MenuScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Menú Principal" />
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p
            className="text-center text-[#7A9CC4] text-sm mb-4"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            ¿En qué podemos ayudarte hoy?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isEmergency = item.id === "emergencias";
              const isExit = item.id === "encuesta";
              const isFull = item.id === "observatorio" || item.id === "asistente";

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id as Screen)}
                  className={`flex flex-col items-center justify-center gap-3 py-6 px-3 rounded-2xl transition-all duration-150 active:scale-[0.96] ${isFull ? "col-span-2" : ""}`}
                  style={{
                    background: isEmergency
                      ? "linear-gradient(135deg, #2A0808 0%, #1A0404 100%)"
                      : isExit
                      ? "rgba(10,20,48,0.6)"
                      : "linear-gradient(135deg, #081428 0%, #0C1E3A 100%)",
                    border: `2px solid ${isEmergency ? "rgba(232,74,74,0.5)" : isExit ? "rgba(90,122,154,0.3)" : `${item.color}30`}`,
                    minHeight: isFull ? "80px" : "90px",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}18` }}
                  >
                    <Icon size={isFull ? 26 : 22} style={{ color: item.color }} />
                  </div>
                  <p
                    className="text-white text-center leading-tight font-semibold"
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: isFull ? "18px" : "14px",
                    }}
                  >
                    {item.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 5: Observatorio ───────────────────────────────────────────────────
function ObservatorioScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [tab, setTab] = useState(0);
  const tabs = ["Información", "Horarios", "Recomendaciones", "Actividades"];

  const content: Record<number, React.ReactNode> = {
    0: (
      <div className="space-y-4">
        <div
          className="w-full h-36 rounded-2xl overflow-hidden relative"
          style={{ background: "#0F2554" }}
        >
          <img
            src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=540&h=200&fit=crop&auto=format"
            alt="Cielo estrellado del observatorio"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040C1E] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-white font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Observatorio Cruz del Sur
            </p>
            <p className="text-[#7A9CC4] text-xs" style={{ fontFamily: "Barlow, sans-serif" }}>
              Combarbalá, IV Región de Coquimbo · Chile
            </p>
          </div>
        </div>
        <InfoCard label="Altitud" value="1.100 m.s.n.m." icon={<Mountain size={14} />} />
        <InfoCard label="Coordenadas" value="30°42′S / 71°00′O" icon={<MapPin size={14} />} />
        <InfoCard label="Telescopios" value="8 telescopios disponibles" icon={<Telescope size={14} />} />
        <p className="text-[#8BB8D4] text-sm leading-relaxed" style={{ fontFamily: "Barlow, sans-serif" }}>
          El Observatorio Cruz del Sur es uno de los centros de astronomía turística más completos de Chile.
          Ubicado en la oscura y prístina atmósfera del desierto de Combarbalá, ofrece cielos de categoría mundial.
        </p>
      </div>
    ),
    1: (
      <div className="space-y-3">
        {[
          { turno: "Turno vespertino", hora: "21:00 – 23:00", tipo: "Observación lunar y planetas" },
          { turno: "Turno nocturno", hora: "23:00 – 01:30", tipo: "Cúmulos, nebulosas y galaxias" },
          { turno: "Madrugada especial", hora: "02:00 – 04:00", tipo: "Vía Láctea completa (temporada verano)" },
        ].map((t, i) => (
          <div key={i} className="p-4 rounded-xl" style={{ background: "#081428", border: "1px solid rgba(200,169,74,0.25)" }}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-white font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>{t.turno}</p>
                <p className="text-[#7A9CC4] text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>{t.tipo}</p>
              </div>
              <span className="text-[#C8A94A] font-bold text-sm whitespace-nowrap" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                {t.hora}
              </span>
            </div>
          </div>
        ))}
        <div className="p-4 rounded-xl" style={{ background: "rgba(200,169,74,0.08)", border: "1px solid rgba(200,169,74,0.3)" }}>
          <p className="text-[#C8A94A] text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            ★ Reserva anticipada recomendada
          </p>
          <p className="text-[#8BB8D4] text-xs mt-1" style={{ fontFamily: "Barlow, sans-serif" }}>
            Grupos de máximo 20 personas por sesión. Abrigo recomendado.
          </p>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3">
        {[
          { tip: "Vestimenta", desc: "Lleva ropa de abrigo. Las noches en Combarbalá pueden bajar de 5°C incluso en verano." },
          { tip: "Fotografía", desc: "Trae trípode para fotografía nocturna. Exposiciones de 20-30 segundos a ISO alto." },
          { tip: "Sin luces blancas", desc: "Usa solo linternas con luz roja para no alterar la adaptación visual al oscuro." },
          { tip: "Lentes de contacto", desc: "El aire seco del desierto puede incomodar. Se recomienda usar anteojos." },
        ].map((r, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "#081428", border: "1px solid rgba(74,154,232,0.2)" }}>
            <div className="w-8 h-8 rounded-lg flex-none flex items-center justify-center bg-[#0F2554]">
              <Info size={14} className="text-[#4A9AE8]" />
            </div>
            <div>
              <p className="text-[#C8A94A] text-sm font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>{r.tip}</p>
              <p className="text-[#8BB8D4] text-xs leading-relaxed mt-0.5" style={{ fontFamily: "Barlow, sans-serif" }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    3: (
      <div className="space-y-3">
        {[
          { act: "Charla astronómica", dur: "45 min", desc: "Introducción al cielo austral y sus constelaciones principales." },
          { act: "Observación telescópica", dur: "90 min", desc: "Observación dirigida de planetas, cúmulos y nebulosas en distintos telescopios." },
          { act: "Fotografía nocturna", dur: "60 min", desc: "Taller práctico de astrofotografía con instructor certificado." },
          { act: "Planetario digital", dur: "30 min", desc: "Proyección inmersiva del cielo del hemisferio sur en domo inflable." },
        ].map((a, i) => (
          <div key={i} className="p-4 rounded-xl flex gap-3" style={{ background: "#081428", border: "1px solid rgba(200,169,74,0.2)" }}>
            <div className="flex-none w-10 h-10 rounded-xl bg-[#0F2554] flex items-center justify-center">
              <Star size={16} className="text-[#C8A94A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>{a.act}</p>
                <span className="text-[#4A9AE8] text-xs bg-[#0F2554] px-2 py-0.5 rounded-full" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>{a.dur}</span>
              </div>
              <p className="text-[#8BB8D4] text-xs mt-1" style={{ fontFamily: "Barlow, sans-serif" }}>{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Observatorio Cruz del Sur" onBack={() => navigate("menu")} />
        <div className="flex-none flex gap-1 px-4 pt-3">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setTab(i)}
              className="flex-1 py-2 text-xs rounded-lg transition-all duration-150"
              style={{
                fontFamily: "Barlow Condensed, sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
                background: tab === i ? "#1A5DC8" : "rgba(15,37,84,0.5)",
                color: tab === i ? "white" : "#7A9CC4",
                border: `1px solid ${tab === i ? "rgba(74,154,232,0.5)" : "rgba(200,169,74,0.15)"}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">{content[tab]}</div>
        <div className="flex-none px-4 pb-3 grid grid-cols-2 gap-3">
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
          <BigButton onClick={() => setTab((tab + 1) % 4)} variant="primary" icon={<Info size={18} />}>
            Ver más info
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ background: "#081428", border: "1px solid rgba(200,169,74,0.2)" }}
    >
      <div className="text-[#C8A94A]">{icon}</div>
      <div className="flex-1">
        <p className="text-[#7A9CC4] text-xs" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>{label}</p>
        <p className="text-white text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Screen 6: Lugares Turísticos ─────────────────────────────────────────────
const lugares = [
  {
    nombre: "Valle del Encanto",
    desc: "Sitio arqueológico con petroglifos precolombinos. Uno de los yacimientos de arte rupestre más importantes del norte chico.",
    foto: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&h=220&fit=crop&auto=format",
    distancia: "26 km de Combarbalá",
    tipo: "Arqueología",
    detalle: {
      desc: "El Valle del Encanto alberga más de 30 petroglifos y grabados rupestres atribuidos a culturas precolombinas como los Molle (200-700 d.C.). El lugar tiene un paisaje de quebradas y roqueríos de gran valor paisajístico.",
      recomendaciones: ["Usar calzado cómodo para caminar en terreno irregular", "Llevar agua y protector solar", "Visitas con guía local disponible", "No tocar los petroglifos"],
    },
  },
  {
    nombre: "Embalse La Paloma",
    desc: "El embalse de agua más grande de Chile. Ideal para deportes náuticos, pesca y contemplación del paisaje semiárido.",
    foto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&h=220&fit=crop&auto=format",
    distancia: "40 km de Combarbalá",
    tipo: "Naturaleza",
    detalle: {
      desc: "El Embalse La Paloma tiene una capacidad de 750 millones de metros cúbicos, siendo el mayor de Chile. Sus aguas azul turquesa contrastan con el paisaje semiárido del norte chico, creando una postal única.",
      recomendaciones: ["Excelente para fotografía al amanecer", "Pesca deportiva con permiso", "Área de camping cercana", "Embarcaciones disponibles en temporada"],
    },
  },
  {
    nombre: "Centro Histórico",
    desc: "Arquitectura colonial y la famosa combarbalita, piedra semipreciosa única en el mundo extraída solo en esta zona.",
    foto: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=480&h=220&fit=crop&auto=format",
    distancia: "En Combarbalá",
    tipo: "Cultura",
    detalle: {
      desc: "El centro de Combarbalá conserva su arquitectura colonial y alberga talleres de artesanos que trabajan la combarbalita, una piedra semipreciosa de colores únicos encontrada solo en esta localidad y reconocida por UNESCO.",
      recomendaciones: ["Visitar talleres artesanales locales", "Comprar artesanías de combarbalita directamente al artesano", "Ver la iglesia de 1857", "Plaza de armas ideal para descanso"],
    },
  },
  {
    nombre: "Cerro Chamonate",
    desc: "Mirador natural con vista panorámica a 360° sobre el valle de Combarbalá y el cielo prístino nocturno.",
    foto: "https://images.unsplash.com/photo-1531366936-29de47d42cfc?w=480&h=220&fit=crop&auto=format",
    distancia: "5 km de Combarbalá",
    tipo: "Naturaleza",
    detalle: {
      desc: "Desde la cima del Cerro Chamonate se aprecia una vista panorámica única del valle de Combarbalá y sus alrededores. Ideal para observar el atardecer y para fotografía astronómica nocturna lejos de las luces del pueblo.",
      recomendaciones: ["Subida de 45 minutos a pie", "Llevar linterna para descenso nocturno", "Punto ideal para astrofotografía", "Abrigo necesario en las noches"],
    },
  },
];

function LugaresScreen({
  navigate,
  onSelect,
}: {
  navigate: (s: Screen) => void;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Lugares turísticos" onBack={() => navigate("menu")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <p className="text-[#7A9CC4] text-sm text-center" style={{ fontFamily: "Barlow, sans-serif" }}>
            Descubre lo mejor de Combarbalá y sus alrededores
          </p>
          {lugares.map((lugar, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(200,169,74,0.25)", background: "#081428" }}
            >
              <div className="relative h-32 bg-[#0F2554]">
                <img
                  src={lugar.foto}
                  alt={lugar.nombre}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.85 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081428] via-transparent to-transparent" />
                <span
                  className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    background: "rgba(200,169,74,0.85)",
                    color: "#040C1E",
                    fontWeight: 700,
                  }}
                >
                  {lugar.tipo}
                </span>
              </div>
              <div className="p-4">
                <h3
                  className="text-white text-xl font-bold"
                  style={{ fontFamily: "Rajdhani, sans-serif" }}
                >
                  {lugar.nombre}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin size={11} className="text-[#4A9AE8]" />
                  <span className="text-[#4A9AE8] text-xs" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                    {lugar.distancia}
                  </span>
                </div>
                <p className="text-[#8BB8D4] text-sm mb-4 leading-relaxed" style={{ fontFamily: "Barlow, sans-serif" }}>
                  {lugar.desc}
                </p>
                <button
                  onClick={() => { onSelect(i); navigate("detalle-lugar"); }}
                  className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.97]"
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    background: "linear-gradient(135deg, #1A5DC8, #0F3A8A)",
                    border: "1px solid rgba(74,154,232,0.4)",
                    color: "white",
                    letterSpacing: "0.05em",
                  }}
                >
                  VER DETALLE →
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-none px-4 pb-3">
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 7: Detalle Lugar ──────────────────────────────────────────────────
function DetalleLugarScreen({
  navigate,
  selectedIdx,
}: {
  navigate: (s: Screen) => void;
  selectedIdx: number;
}) {
  const lugar = lugares[selectedIdx];
  if (!lugar) return null;

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title={lugar.nombre} onBack={() => navigate("lugares")} />
        <div className="flex-1 overflow-y-auto">
          <div className="relative h-48 bg-[#0F2554]">
            <img
              src={lugar.foto}
              alt={lugar.nombre}
              className="w-full h-full object-cover"
              style={{ opacity: 0.9 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040C1E] via-[rgba(4,12,30,0.3)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2
                className="text-white text-3xl font-bold"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {lugar.nombre}
              </h2>
            </div>
          </div>

          <div className="px-4 py-4 space-y-4">
            <div className="flex gap-3">
              <div
                className="flex items-center gap-2 flex-1 p-3 rounded-xl"
                style={{ background: "#081428", border: "1px solid rgba(74,154,232,0.25)" }}
              >
                <MapPin size={16} className="text-[#4A9AE8]" />
                <div>
                  <p className="text-[#7A9CC4] text-xs" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>UBICACIÓN</p>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {lugar.distancia}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 flex-1 p-3 rounded-xl"
                style={{ background: "#081428", border: "1px solid rgba(200,169,74,0.25)" }}
              >
                <Star size={16} className="text-[#C8A94A]" />
                <div>
                  <p className="text-[#7A9CC4] text-xs" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>TIPO</p>
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {lugar.tipo}
                  </p>
                </div>
              </div>
            </div>

            <SectionDivider label="Descripción" />
            <p className="text-[#8BB8D4] text-sm leading-relaxed" style={{ fontFamily: "Barlow, sans-serif" }}>
              {lugar.detalle.desc}
            </p>

            <SectionDivider label="Recomendaciones para visitantes" />
            <div className="space-y-2">
              {lugar.detalle.recomendaciones.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#081428", border: "1px solid rgba(200,169,74,0.15)" }}>
                  <div className="w-6 h-6 rounded-full flex-none flex items-center justify-center bg-[#C8A94A] text-[#040C1E] text-xs font-bold" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                    {i + 1}
                  </div>
                  <p className="text-[#C8DEFF] text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-none px-4 pb-3 grid grid-cols-2 gap-3">
          <BigButton onClick={() => navigate("lugares")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Ver lugares
          </BigButton>
          <BigButton onClick={() => navigate("menu")} variant="secondary" icon={<ChevronLeft size={18} />}>
            Menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 8: Mapa ───────────────────────────────────────────────────────────
function MapaScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const points = [
    { x: 50, y: 50, label: "Tótem", color: "#C8A94A", icon: "★" },
    { x: 50, y: 30, label: "Observatorio", color: "#4A9AE8", icon: "◉" },
    { x: 25, y: 55, label: "Valle del Encanto", color: "#7AC87A", icon: "▲" },
    { x: 75, y: 65, label: "Embalse La Paloma", color: "#4A9AE8", icon: "◆" },
    { x: 60, y: 45, label: "Cerro Chamonate", color: "#E87A4A", icon: "▲" },
    { x: 45, y: 72, label: "Plaza de Combarbalá", color: "#C8A94A", icon: "◉" },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Mapa e indicaciones" onBack={() => navigate("menu")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Schematic Map */}
          <div
            className="w-full rounded-2xl overflow-hidden relative"
            style={{
              height: "260px",
              background: "linear-gradient(135deg, #040C1E 0%, #081828 50%, #0A1535 100%)",
              border: "2px solid rgba(200,169,74,0.4)",
            }}
          >
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i}>
                  <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#4A9AE8" strokeWidth="0.5" />
                  <line x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#4A9AE8" strokeWidth="0.5" />
                </g>
              ))}
            </svg>

            {/* Roads */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="rgba(74,154,232,0.25)" strokeWidth="3" strokeDasharray="8,4" />
              <line x1="0%" y1="55%" x2="100%" y2="55%" stroke="rgba(74,154,232,0.2)" strokeWidth="2" strokeDasharray="6,4" />
              <path d="M 50% 50% Q 30% 40% 25% 55%" stroke="rgba(122,200,122,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4,3" />
              <path d="M 50% 50% Q 65% 60% 75% 65%" stroke="rgba(74,154,232,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4,3" />
              <text x="52%" y="15%" fill="rgba(74,154,232,0.5)" fontSize="8" fontFamily="Barlow Condensed" letterSpacing="2">RUTA D-55</text>
              <text x="2%" y="52%" fill="rgba(74,154,232,0.4)" fontSize="7" fontFamily="Barlow Condensed">RUTA D-535</text>
            </svg>

            {/* Map points */}
            {points.map((p, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  style={{
                    background: i === 0 ? p.color : "rgba(8,20,40,0.9)",
                    border: `2px solid ${p.color}`,
                    color: i === 0 ? "#040C1E" : p.color,
                    fontFamily: "Barlow Condensed",
                  }}
                >
                  {p.icon}
                </div>
                {i === 0 && (
                  <div
                    className="mt-1 px-2 py-0.5 rounded text-center"
                    style={{ background: "rgba(200,169,74,0.9)", color: "#040C1E" }}
                  >
                    <p className="text-[9px] font-bold whitespace-nowrap" style={{ fontFamily: "Barlow Condensed" }}>
                      USTED ESTÁ AQUÍ
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Compass */}
            <div className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: "rgba(8,20,40,0.9)",
                  border: "1px solid rgba(200,169,74,0.5)",
                  color: "#C8A94A",
                  fontFamily: "Barlow Condensed",
                }}
              >
                N↑
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {points.slice(1).map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: "#081428", border: "1px solid rgba(200,169,74,0.15)" }}
              >
                <span className="text-sm font-bold" style={{ color: p.color }}>{p.icon}</span>
                <p className="text-white text-xs leading-tight" style={{ fontFamily: "Barlow, sans-serif" }}>{p.label}</p>
              </div>
            ))}
          </div>

          <SectionDivider label="Cómo llegar" />
          <div className="space-y-3">
            {[
              { desde: "Santiago", dist: "390 km", via: "Ruta 5 Norte → Ovalle → D-55" },
              { desde: "La Serena", dist: "175 km", via: "Ruta 5 Sur → Ovalle → D-55" },
              { desde: "Ovalle", dist: "72 km", via: "Ruta D-55 hacia el interior" },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#081428", border: "1px solid rgba(74,154,232,0.2)" }}>
                <Navigation size={16} className="text-[#4A9AE8] flex-none" />
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    Desde {r.desde}
                  </p>
                  <p className="text-[#8BB8D4] text-xs" style={{ fontFamily: "Barlow, sans-serif" }}>{r.via}</p>
                </div>
                <span className="text-[#C8A94A] font-bold text-sm whitespace-nowrap" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                  {r.dist}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-none px-4 pb-3 grid grid-cols-2 gap-3">
          <BigButton onClick={() => {}} variant="primary" icon={<Navigation size={18} />}>
            Cómo llegar
          </BigButton>
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 9: Gastronomía ────────────────────────────────────────────────────
const gastroCats = [
  {
    cat: "Restaurantes",
    icon: Utensils,
    color: "#E87A4A",
    items: [
      { nombre: "Restaurant El Arriero", desc: "Cocina tradicional chilena. Cabrito al horno, empanadas y vinos regionales.", hora: "12:00–23:00" },
      { nombre: "La Quinta de Combarbalá", desc: "Carnes a las brasas y mariscos frescos en ambiente familiar.", hora: "13:00–22:00" },
      { nombre: "Café del Observatorio", desc: "Café, pasteles artesanales y sándwiches. Vista al cielo nocturno.", hora: "09:00–01:00" },
    ],
  },
  {
    cat: "Alojamientos",
    icon: Hotel,
    color: "#9A7AE8",
    items: [
      { nombre: "Hotel Cruz del Sur", desc: "Hotel boutique con terraza astronómica y telescope en la habitación.", hora: "24 horas" },
      { nombre: "Hostal Los Algarrobos", desc: "Cómodo hostal familiar en el centro. Desayuno incluido.", hora: "24 horas" },
      { nombre: "Cabañas Valle Verde", desc: "Cabañas en entorno natural. Ideal para grupos y familias.", hora: "Check-in 15:00" },
    ],
  },
  {
    cat: "Comercio local",
    icon: ShoppingBag,
    color: "#7AC87A",
    items: [
      { nombre: "Artesanías Combarbalita", desc: "Tallado en piedra combarbalita, joyería y souvenirs únicos en el mundo.", hora: "10:00–20:00" },
      { nombre: "Feria artesanal municipal", desc: "Productos locales, frutas, conservas y artesanías. Fines de semana.", hora: "Sáb y Dom 10:00–18:00" },
    ],
  },
  {
    cat: "Servicios turísticos",
    icon: Headphones,
    color: "#4A9AE8",
    items: [
      { nombre: "Turismo Combarbalá", desc: "Tours al Valle del Encanto, Embalse La Paloma y ruta astronómica.", hora: "09:00–19:00" },
      { nombre: "Arriendo de vehículos", desc: "4x4 y autos para recorrer los alrededores del valle.", hora: "08:00–20:00" },
    ],
  },
];

function GastronomiaScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [activeCat, setActiveCat] = useState(0);
  const cat = gastroCats[activeCat];
  const Icon = cat.icon;

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Gastronomía y servicios" onBack={() => navigate("menu")} />
        <div className="flex-none grid grid-cols-4 gap-1 px-4 pt-3">
          {gastroCats.map((c, i) => {
            const CatIcon = c.icon;
            return (
              <button
                key={i}
                onClick={() => setActiveCat(i)}
                className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all"
                style={{
                  background: activeCat === i ? `${c.color}20` : "rgba(15,37,84,0.3)",
                  border: `1px solid ${activeCat === i ? `${c.color}60` : "rgba(200,169,74,0.1)"}`,
                }}
              >
                <CatIcon size={18} style={{ color: activeCat === i ? c.color : "#3A5A80" }} />
                <p
                  className="text-center leading-tight"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: "9px",
                    color: activeCat === i ? "white" : "#3A5A80",
                    fontWeight: 600,
                  }}
                >
                  {c.cat}
                </p>
              </button>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Icon size={20} style={{ color: cat.color }} />
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "Rajdhani, sans-serif", color: cat.color }}
            >
              {cat.cat}
            </h3>
          </div>
          {cat.items.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl"
              style={{ background: "#081428", border: `1px solid ${cat.color}25` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-white font-bold text-base" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  {item.nombre}
                </p>
                <span
                  className="text-xs px-2 py-1 rounded-full whitespace-nowrap flex-none"
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    background: `${cat.color}18`,
                    color: cat.color,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  <Clock size={10} className="inline mr-1" />
                  {item.hora}
                </span>
              </div>
              <p className="text-[#8BB8D4] text-sm leading-relaxed" style={{ fontFamily: "Barlow, sans-serif" }}>
                {item.desc}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <MapPin size={12} style={{ color: cat.color }} />
                <span className="text-xs" style={{ color: cat.color, fontFamily: "Barlow Condensed, sans-serif" }}>
                  Centro de Combarbalá
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-none px-4 pb-3">
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 10: Transporte ────────────────────────────────────────────────────
function TransporteScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Transporte" onBack={() => navigate("menu")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <SectionDivider label="Rutas de bus disponibles" />

          {[
            {
              ruta: "Santiago → Ovalle → Combarbalá",
              empresa: "Tur Bus / Pullman Bus",
              horarios: ["08:00", "12:30", "17:00", "22:00"],
              precio: "$12.000 – $16.000",
              duracion: "~6 horas",
              color: "#4A9AE8",
            },
            {
              ruta: "La Serena → Ovalle → Combarbalá",
              empresa: "Buses Intercomunal",
              horarios: ["09:30", "13:00", "16:30"],
              precio: "$5.500 – $8.000",
              duracion: "~3,5 horas",
              color: "#7AC87A",
            },
            {
              ruta: "Ovalle → Combarbalá (local)",
              empresa: "Buses Combarbalá",
              horarios: ["07:00", "10:00", "13:00", "16:00", "19:00", "21:30"],
              precio: "$2.500 – $3.500",
              duracion: "~1,5 horas",
              color: "#C8A94A",
            },
          ].map((bus, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#081428", border: `1px solid ${bus.color}25` }}>
              <div className="px-4 py-3" style={{ borderBottom: `1px solid ${bus.color}20` }}>
                <div className="flex items-center gap-2 mb-1">
                  <Bus size={16} style={{ color: bus.color }} />
                  <p className="text-white font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>{bus.ruta}</p>
                </div>
                <div className="flex items-center gap-4 text-xs" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                  <span style={{ color: bus.color }}>{bus.empresa}</span>
                  <span className="text-[#7A9CC4]">⏱ {bus.duracion}</span>
                  <span className="text-[#C8A94A] font-bold">{bus.precio}</span>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-[#7A9CC4] text-xs mb-2 uppercase tracking-widest" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                  Horarios de salida
                </p>
                <div className="flex flex-wrap gap-2">
                  {bus.horarios.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold"
                      style={{
                        fontFamily: "Barlow Condensed, sans-serif",
                        background: `${bus.color}18`,
                        color: bus.color,
                        border: `1px solid ${bus.color}35`,
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <SectionDivider label="Opciones de traslado local" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { tipo: "Taxi local", info: "Disponibles en la Plaza de Armas. Precio por negociación.", icon: Car, color: "#C8A94A" },
              { tipo: "Arriendo auto 4x4", info: "Ideal para visitar zonas rurales. Reserva anticipada.", icon: Car, color: "#E87A4A" },
            ].map((t, i) => {
              const TIcon = t.icon;
              return (
                <div key={i} className="p-4 rounded-xl" style={{ background: "#081428", border: `1px solid ${t.color}25` }}>
                  <TIcon size={20} style={{ color: t.color }} className="mb-2" />
                  <p className="text-white font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>{t.tipo}</p>
                  <p className="text-[#8BB8D4] text-xs mt-1" style={{ fontFamily: "Barlow, sans-serif" }}>{t.info}</p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl" style={{ background: "rgba(200,169,74,0.08)", border: "1px solid rgba(200,169,74,0.3)" }}>
            <p className="text-[#C8A94A] font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              ★ Información útil para el visitante
            </p>
            <ul className="mt-2 space-y-1">
              {[
                "Terminal de buses en Av. O'Higgins 230",
                "Horarios pueden variar en festivos",
                "Se recomienda revisar en línea antes del viaje",
                "Desde el terminal al observatorio: taxi ~10 min",
              ].map((info, i) => (
                <li key={i} className="text-[#8BB8D4] text-xs flex items-start gap-2" style={{ fontFamily: "Barlow, sans-serif" }}>
                  <span className="text-[#C8A94A] flex-none">·</span>{info}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-none px-4 pb-3">
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 11: Emergencias ───────────────────────────────────────────────────
const emergencias = [
  { nombre: "Carabineros de Chile", numero: "133", extra: "Comisaría de Combarbalá", icon: Phone, color: "#1A5DC8", bg: "#081428" },
  { nombre: "SAMU · Ambulancia", numero: "131", extra: "Servicio de Atención Médica de Urgencia", icon: Headphones, color: "#E84A4A", bg: "#1A0404" },
  { nombre: "Bomberos", numero: "132", extra: "Primera Compañía de Combarbalá", icon: Flame, color: "#E87A1A", bg: "#1A0A04" },
  { nombre: "Municipalidad", numero: "+56 53 2741100", extra: "Municipalidad de Combarbalá", icon: Building2, color: "#7AC87A", bg: "#081428" },
  { nombre: "Asistencia turística", numero: "+56 53 2741200", extra: "SERNATUR Región de Coquimbo", icon: Star, color: "#C8A94A", bg: "#081428" },
];

function EmergenciasScreen({ navigate }: { navigate: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Emergencias" onBack={() => navigate("menu")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div
            className="p-3 rounded-xl flex items-center gap-3 mb-2"
            style={{ background: "rgba(200,60,60,0.12)", border: "1px solid rgba(200,60,60,0.3)" }}
          >
            <AlertTriangle size={20} className="text-[#E84A4A] flex-none" />
            <p className="text-[#E84A4A] text-sm font-semibold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              En caso de emergencia real, llama directamente al número correspondiente
            </p>
          </div>

          {emergencias.map((em, i) => {
            const EmIcon = em.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl flex items-center gap-4"
                style={{ background: em.bg, border: `2px solid ${em.color}40` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex-none flex items-center justify-center"
                  style={{ background: `${em.color}18`, border: `1px solid ${em.color}40` }}
                >
                  <EmIcon size={26} style={{ color: em.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {em.nombre}
                  </p>
                  <p className="text-[#7A9CC4] text-xs truncate" style={{ fontFamily: "Barlow, sans-serif" }}>
                    {em.extra}
                  </p>
                </div>
                <div
                  className="px-4 py-3 rounded-xl text-center"
                  style={{ background: `${em.color}20`, border: `1px solid ${em.color}50` }}
                >
                  <p
                    className="font-bold text-xl tracking-wider"
                    style={{ fontFamily: "Barlow Condensed, sans-serif", color: em.color }}
                  >
                    {em.numero}
                  </p>
                  <p className="text-[#7A9CC4] text-[9px] uppercase tracking-widest" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
                    LLAMAR
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-none px-4 pb-3">
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 12: Asistente IA ──────────────────────────────────────────────────
const preguntasSugeridas = [
  "¿Qué puedo visitar cerca de Combarbalá?",
  "¿Cómo llego al observatorio?",
  "Recomiéndame restaurantes en la zona",
  "¿Cuál es el mejor horario para observar estrellas?",
  "¿Qué es la piedra combarbalita?",
];

function AsistenteScreen({
  navigate,
  onResponder,
}: {
  navigate: (s: Screen) => void;
  onResponder: (q: string) => void;
}) {
  const [query, setQuery] = useState("");

  function handleConsulta(q: string) {
    if (!q.trim()) return;
    onResponder(q);
    navigate("respuesta-asistente");
  }

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Asistente IA" onBack={() => navigate("menu")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          <div className="flex flex-col items-center gap-3 py-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, #0F2554 0%, #040C1E 100%)",
                border: "2px solid rgba(74,228,200,0.5)",
                animation: "pulse-gold 2.5s ease-in-out infinite",
              }}
            >
              <Bot size={36} className="text-[#4AE8C8]" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                ¿En qué puedo ayudarte?
              </p>
              <p className="text-[#7A9CC4] text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>
                Escribe tu consulta o usa el micrófono
              </p>
            </div>
          </div>

          {/* Voice button */}
          <button
            className="w-full py-6 rounded-2xl flex flex-col items-center gap-2 transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #0A2040 0%, #0F2A54 100%)",
              border: "2px solid rgba(74,228,200,0.4)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(74,228,200,0.15)", border: "2px solid rgba(74,228,200,0.5)" }}
            >
              <Mic size={28} className="text-[#4AE8C8]" />
            </div>
            <p className="text-[#4AE8C8] font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              PRESIONAR PARA HABLAR
            </p>
          </button>

          {/* Text input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConsulta(query)}
              className="flex-1 px-4 py-4 rounded-xl text-white placeholder-[#3A5A80] text-base outline-none"
              style={{
                fontFamily: "Barlow, sans-serif",
                background: "#081428",
                border: "1px solid rgba(200,169,74,0.3)",
              }}
            />
            <button
              onClick={() => handleConsulta(query)}
              className="w-14 rounded-xl flex items-center justify-center flex-none transition-all active:scale-[0.95]"
              style={{ background: "#1A5DC8", border: "1px solid rgba(74,154,232,0.5)" }}
            >
              <Send size={20} className="text-white" />
            </button>
          </div>

          {/* Suggested questions */}
          <div>
            <SectionDivider label="Preguntas sugeridas" />
            <div className="space-y-2 mt-2">
              {preguntasSugeridas.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleConsulta(p)}
                  className="w-full text-left px-4 py-4 rounded-xl transition-all active:scale-[0.97]"
                  style={{
                    background: "#081428",
                    border: "1px solid rgba(74,228,200,0.2)",
                    fontFamily: "Barlow, sans-serif",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare size={14} className="text-[#4AE8C8] flex-none" />
                    <p className="text-[#C8DEFF] text-sm">{p}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-none px-4 pb-3">
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Volver al menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 13: Respuesta Asistente ──────────────────────────────────────────
const respuestasDemo: Record<string, { respuesta: string; sugerencias: string[] }> = {
  default: {
    respuesta:
      "Combarbalá ofrece una experiencia única en el norte chico de Chile. Te recomiendo visitar el Observatorio Cruz del Sur para una noche de observación astronómica, el Valle del Encanto con sus petroglifos precolombinos, y el Embalse La Paloma. La mejor época para visitar es entre marzo y noviembre, cuando el cielo es más despejado.",
    sugerencias: ["¿Cómo llego al observatorio?", "¿Dónde puedo comer?", "¿Hay tours disponibles?"],
  },
};

function getRespuesta(query: string) {
  if (query.toLowerCase().includes("observatorio") || query.toLowerCase().includes("llegar")) {
    return {
      respuesta:
        "El Observatorio Cruz del Sur se encuentra a 5 kilómetros del centro de Combarbalá. Puedes llegar en taxi desde la Plaza de Armas (unos 10 minutos, $3.000 aprox.) o a pie por un sendero de 45 minutos. Se recomienda reservar tu visita con anticipación para asegurar cupo en alguno de los tres turnos nocturnos disponibles.",
      sugerencias: ["¿Qué llevo a la visita?", "¿Cuánto cuesta la entrada?", "¿Hay guías disponibles?"],
    };
  }
  if (query.toLowerCase().includes("restaurant") || query.toLowerCase().includes("comer") || query.toLowerCase().includes("gastronomía")) {
    return {
      respuesta:
        "En Combarbalá encontrarás excelentes opciones gastronómicas. El Restaurant El Arriero es ideal para probar cabrito al horno y cocina tradicional chilena. La Quinta de Combarbalá ofrece carnes a las brasas y mariscos frescos. Para algo más liviano, el Café del Observatorio tiene sándwiches artesanales y abre hasta tarde para recibir a los visitantes del observatorio.",
      sugerencias: ["¿Tienen alojamiento cerca?", "¿Qué es el cabrito al horno?", "Volver al menú principal"],
    };
  }
  if (query.toLowerCase().includes("piedra") || query.toLowerCase().includes("combarbalita")) {
    return {
      respuesta:
        "La combarbalita es una piedra semipreciosa única en el mundo que solo se encuentra en los alrededores de Combarbalá. Es una roca metacristalina con colores rosados, morados y verdes, reconocida por la UNESCO como patrimonio cultural. Los artesanos locales la tallan en figuras, joyería y souvenirs. Puedes adquirirlas en los talleres del centro.",
      sugerencias: ["¿Dónde comprar artesanías?", "¿Cuánto cuestan?", "Cuéntame más de la cultura local"],
    };
  }
  if (query.toLowerCase().includes("estrellas") || query.toLowerCase().includes("observar") || query.toLowerCase().includes("horario")) {
    return {
      respuesta:
        "El mejor horario para observar el cielo nocturno en Combarbalá es entre las 22:00 y las 02:00 horas, cuando el cielo alcanza su máxima oscuridad. Las noches sin luna (luna nueva) son las ideales. El verano austral (diciembre-marzo) ofrece la Vía Láctea visible en todo su esplendor. La atmósfera seca del desierto garantiza visibilidad excepcional durante casi todo el año.",
      sugerencias: ["¿Qué puedo ver esa noche?", "¿Cómo reservo una visita?", "Constelaciones del sur"],
    };
  }
  return respuestasDemo.default;
}

function RespuestaAsistenteScreen({
  navigate,
  query,
}: {
  navigate: (s: Screen) => void;
  query: string;
}) {
  const { respuesta, sugerencias } = getRespuesta(query);

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Respuesta del asistente" onBack={() => navigate("asistente")} />
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Query echo */}
          <div
            className="flex items-start gap-3 p-4 rounded-2xl"
            style={{ background: "rgba(26,93,200,0.15)", border: "1px solid rgba(74,154,232,0.3)" }}
          >
            <Search size={16} className="text-[#4A9AE8] flex-none mt-0.5" />
            <p className="text-[#C8DEFF] text-sm italic" style={{ fontFamily: "Barlow, sans-serif" }}>
              "{query}"
            </p>
          </div>

          {/* AI response */}
          <div
            className="p-5 rounded-2xl"
            style={{ background: "#081428", border: "1px solid rgba(74,228,200,0.3)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(74,228,200,0.15)", border: "1px solid rgba(74,228,200,0.4)" }}
              >
                <Bot size={16} className="text-[#4AE8C8]" />
              </div>
              <p className="text-[#4AE8C8] font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                Brújula Digital IA
              </p>
            </div>
            <p
              className="text-[#EEF2FF] text-base leading-relaxed"
              style={{ fontFamily: "Barlow, sans-serif" }}
            >
              {respuesta}
            </p>
          </div>

          <SectionDivider label="¿Quieres saber más?" />
          <div className="space-y-2">
            {sugerencias.map((s, i) => (
              <button
                key={i}
                onClick={() => navigate("respuesta-asistente")}
                className="w-full text-left px-4 py-4 rounded-xl transition-all active:scale-[0.97] flex items-center gap-3"
                style={{
                  background: "#081428",
                  border: "1px solid rgba(74,228,200,0.2)",
                  fontFamily: "Barlow, sans-serif",
                }}
              >
                <MessageSquare size={14} className="text-[#4AE8C8] flex-none" />
                <p className="text-[#C8DEFF] text-sm">{s}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-none px-4 pb-3 grid grid-cols-2 gap-3">
          <BigButton onClick={() => navigate("asistente")} variant="primary" icon={<RotateCcw size={16} />}>
            Otra consulta
          </BigButton>
          <BigButton onClick={() => navigate("menu")} variant="ghost" icon={<ChevronLeft size={18} />}>
            Menú
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 14: Encuesta ──────────────────────────────────────────────────────
function EncuestaScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  const opciones = [
    { label: "Muy útil", emoji: "😄", value: 4, color: "#4AE8C8" },
    { label: "Útil", emoji: "🙂", value: 3, color: "#7AC87A" },
    { label: "Poco útil", emoji: "😐", value: 2, color: "#C8A94A" },
    { label: "No útil", emoji: "😞", value: 1, color: "#E84A4A" },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader title="Encuesta de satisfacción" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <div className="text-center">
            <Star size={48} className="text-[#C8A94A] mx-auto mb-4" />
            <h2
              className="text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              ¿Te resultó útil
              <br />
              la información?
            </h2>
            <p className="text-[#7A9CC4] mt-2 text-sm" style={{ fontFamily: "Barlow, sans-serif" }}>
              Tu opinión nos ayuda a mejorar el servicio
            </p>
          </div>

          <div className="w-full grid grid-cols-2 gap-4">
            {opciones.map((op, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="flex flex-col items-center gap-3 py-7 px-4 rounded-2xl transition-all duration-150 active:scale-[0.96]"
                style={{
                  background: selected === i ? `${op.color}20` : "#081428",
                  border: `2px solid ${selected === i ? op.color : "rgba(200,169,74,0.2)"}`,
                }}
              >
                <span className="text-5xl">{op.emoji}</span>
                <p
                  className="text-white font-bold text-lg"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: selected === i ? op.color : "white" }}
                >
                  {op.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-none px-6 pb-6">
          <BigButton
            onClick={() => navigate("cierre")}
            variant={selected !== null ? "gold" : "secondary"}
            icon={selected !== null ? <CheckCircle size={20} /> : undefined}
          >
            {selected !== null ? "Enviar y finalizar" : "Omitir y finalizar"}
          </BigButton>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Screen 15: Cierre ────────────────────────────────────────────────────────
function CierreScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          navigate("bienvenida");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [navigate]);

  return (
    <div className="flex flex-col h-full relative">
      <StarField />
      <div className="relative z-10 flex flex-col h-full">
        <TotemHeader />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center relative"
            style={{
              background: "radial-gradient(circle, #0F2554 0%, #040C1E 100%)",
              border: "2px solid rgba(200,169,74,0.6)",
              animation: "pulse-gold 2s ease-in-out infinite",
            }}
          >
            <Star size={52} className="text-[#C8A94A]" />
          </div>

          <div className="text-center space-y-4">
            <h1
              className="text-5xl font-bold"
              style={{
                fontFamily: "Rajdhani, sans-serif",
                background: "linear-gradient(90deg, #C8A94A, #F0D878, #C8A94A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ¡Gracias por usar
              <br />
              Brújula Digital!
            </h1>
            <p className="text-[#4A9AE8] text-xl" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Que disfrutes tu visita a Combarbalá
            </p>
            <p className="text-[#7A9CC4] text-base" style={{ fontFamily: "Barlow, sans-serif" }}>
              La sesión finalizará automáticamente
            </p>
          </div>

          {/* Countdown */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "#081428",
                border: "3px solid rgba(200,169,74,0.4)",
              }}
            >
              <span
                className="text-4xl font-bold text-[#C8A94A]"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                {countdown}
              </span>
            </div>
            <p className="text-[#5A7A9A] text-sm" style={{ fontFamily: "Barlow Condensed, sans-serif" }}>
              Volviendo a pantalla de inicio…
            </p>
          </div>

          <div
            className="h-px w-64"
            style={{ background: "linear-gradient(90deg, transparent, #C8A94A, transparent)" }}
          />
          <p
            className="text-[#3A5A80] text-xs text-center"
            style={{ fontFamily: "Barlow, sans-serif" }}
          >
            Observatorio Cruz del Sur · Combarbalá, IV Región de Coquimbo, Chile
            <br />
            contacto@observatoriocruzelsur.cl
          </p>
        </div>
        <TotemFooter />
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("bienvenida");
  const [selectedLugar, setSelectedLugar] = useState(0);
  const [aiQuery, setAiQuery] = useState("¿Qué puedo visitar cerca de Combarbalá?");

  function navigate(s: Screen) {
    setScreen(s);
  }

  function handleAiResponder(q: string) {
    setAiQuery(q);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "#010509" }}
    >
      {/* Physical totem ambient glow */}
      <div
        className="absolute"
        style={{
          width: "560px",
          height: "110%",
          background: "radial-gradient(ellipse, rgba(26,93,200,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Totem screen container */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "520px",
          height: "100vh",
          maxHeight: "100vh",
          background: "#040C1E",
          boxShadow: "0 0 60px rgba(200,169,74,0.08), 0 0 120px rgba(26,93,200,0.06), inset 0 0 40px rgba(4,12,30,0.8)",
          borderLeft: "1px solid rgba(200,169,74,0.15)",
          borderRight: "1px solid rgba(200,169,74,0.15)",
        }}
      >
        {/* Top chrome stripe */}
        <div
          className="flex-none h-1 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #C8A94A, transparent)" }}
        />

        {/* Screen content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {screen === "bienvenida" && <BienvenidaScreen onNext={() => navigate("idioma")} />}
          {screen === "idioma" && (
            <IdiomaScreen
              onSelect={() => navigate("cargando")}
            />
          )}
          {screen === "cargando" && <CargandoScreen onDone={() => navigate("menu")} />}
          {screen === "menu" && <MenuScreen navigate={navigate} />}
          {screen === "observatorio" && <ObservatorioScreen navigate={navigate} />}
          {screen === "lugares" && (
            <LugaresScreen navigate={navigate} onSelect={setSelectedLugar} />
          )}
          {screen === "detalle-lugar" && (
            <DetalleLugarScreen navigate={navigate} selectedIdx={selectedLugar} />
          )}
          {screen === "mapa" && <MapaScreen navigate={navigate} />}
          {screen === "gastronomia" && <GastronomiaScreen navigate={navigate} />}
          {screen === "transporte" && <TransporteScreen navigate={navigate} />}
          {screen === "emergencias" && <EmergenciasScreen navigate={navigate} />}
          {screen === "asistente" && (
            <AsistenteScreen navigate={navigate} onResponder={handleAiResponder} />
          )}
          {screen === "respuesta-asistente" && (
            <RespuestaAsistenteScreen navigate={navigate} query={aiQuery} />
          )}
          {screen === "encuesta" && <EncuestaScreen navigate={navigate} />}
          {screen === "cierre" && <CierreScreen navigate={navigate} />}
        </div>

        {/* Bottom chrome stripe */}
        <div
          className="flex-none h-1 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #C8A94A, transparent)" }}
        />
      </div>

      {/* Screen indicator dots - totem navigation hint */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {(["bienvenida", "idioma", "cargando", "menu", "observatorio", "lugares", "detalle-lugar", "mapa", "gastronomia", "transporte", "emergencias", "asistente", "respuesta-asistente", "encuesta", "cierre"] as Screen[]).map((s) => (
          <div
            key={s}
            className="w-1 h-1 rounded-full transition-all duration-300"
            style={{
              background: screen === s ? "#C8A94A" : "rgba(200,169,74,0.2)",
              transform: screen === s ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
