export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,22,40,0.4),rgba(10,22,40,0.85)),radial-gradient(ellipse_at_center,rgba(15,31,58,0.3)_0%,transparent_70%)]" />
      <div className="absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(240,180,41,0.15)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          Descuento activo: usa el código <span className="font-semibold text-gold-400">PIRATAS26</span>
        </div>

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
          Vive las{" "}
          <span className="bg-gradient-to-r from-teal-400 to-ocean-400 bg-clip-text text-transparent">
            Rías Baixas
          </span>{" "}
          <br />
          <span className="text-gold-400">¡desde el mar!</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          Ruta del Mejillón, Islas Cíes, Isla de Ons, San Simón, Sálvora...
          Descubre el paraíso de las Rías Baixas con la flota más moderna de Galicia.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.piratasdenabia.com/comprar-billetes/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold-500 px-8 py-3.5 text-base font-bold text-navy-900 shadow-lg shadow-gold-500/25 transition-all hover:bg-gold-400 hover:shadow-gold-400/40"
          >
            Comprar billetes
          </a>
          <a
            href="https://www.piratasdenabia.com/horarios-y-tarifas/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Horarios y tarifas
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {[
            { label: "Mejores precios", icon: "💰" },
            { label: "Mejor atención", icon: "⭐" },
            { label: "Barcos modernos", icon: "🚢" },
            { label: "Guías propios", icon: "🧑‍✈️" },
            { label: "Catering propio", icon: "🍽️" },
            { label: "Actividades outdoor", icon: "🏞️" },
            { label: "Medio ambiente", icon: "🌿" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.03] px-2 py-3 text-center"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium text-white/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean-50 to-transparent" />
    </section>
  );
}
