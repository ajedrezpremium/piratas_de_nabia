export default function Flota() {
  const equipo = [
    { nombre: "Susi", rol: "Gerente" },
    { nombre: "Patri", rol: "Dpto. Ventas" },
    { nombre: "Belén", rol: "Dpto. Ventas" },
    { nombre: "Andrea", rol: "Dpto. Reservas" },
    { nombre: "Liah", rol: "Atención al cliente" },
    { nombre: "Laura", rol: "Dpto. Comunicación" },
  ];

  return (
    <section className="bg-navy-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            ¿Por qué viajar con{" "}
            <span className="text-gold-400">Piratas de Nabia</span>?
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { titulo: "Barcos modernos", desc: "La flota más moderna de las Rías Baixas. Comodidad y seguridad a bordo." },
            { titulo: "Desde 1998", desc: "Más de 25 años transportando viajeros. El mejor barco a Islas Cíes." },
            { titulo: "Especialistas", desc: "Expertos en el Parque Nacional das Illas Atlánticas de Galicia." },
            { titulo: "Calidad turística", desc: "Comprometidos con la satisfacción de nuestros clientes." },
          ].map((item) => (
            <div
              key={item.titulo}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-gold-500/30 hover:bg-white/[0.06]"
            >
              <div className="mb-3 h-10 w-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 text-lg">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-white">
            Un gran equipo a tu disposición
          </h3>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {equipo.map((p) => (
              <div key={p.nombre} className="text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-ocean-500 text-xl font-bold text-white">
                  {p.nombre[0]}
                </div>
                <p className="text-sm font-semibold text-white">{p.nombre}</p>
                <p className="text-xs text-white/50">{p.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
