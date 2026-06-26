const destinos = [
  {
    nombre: "Islas Cíes",
    desc: "Parque Nacional das Illas Atlánticas. Playas de arena blanca y aguas cristalinas.",
    precio: "Desde 24€",
    slug: "islas-cies",
    color: "from-teal-500 to-ocean-600",
  },
  {
    nombre: "Isla de Ons",
    desc: "Naturaleza virgen, rutas de senderismo y la mejor gastronomía marina.",
    precio: "Desde 16€",
    slug: "isla-de-ons",
    color: "from-emerald-500 to-teal-600",
  },
  {
    nombre: "Isla de San Simón",
    desc: "Historia, cultura y leyendas en plena Ría de Vigo.",
    precio: "20€",
    slug: "isla-de-san-simon",
    color: "from-cyan-500 to-blue-600",
  },
  {
    nombre: "Ruta del Mejillón",
    desc: "Recorrido gastronómico degustando mejillones y vino de la tierra.",
    precio: "22€",
    slug: "ruta-del-mejillon",
    color: "from-amber-500 to-orange-600",
  },
  {
    nombre: "Ruta del Pulpo",
    desc: "Para amantes del pulpo gallego. Una experiencia única en el mar.",
    precio: "28€",
    slug: "ruta-del-pulpo",
    color: "from-rose-500 to-pink-600",
  },
  {
    nombre: "Sálvora y Ons",
    desc: "Dos islas en un solo día. Ruta guiada con gastronomía incluida.",
    precio: "Desde 25€",
    slug: "salvora-y-ons",
    color: "from-violet-500 to-purple-600",
  },
];

export default function Destinos() {
  return (
    <section id="destinos" className="bg-ocean-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Nuestras <span className="text-ocean-500">rutas</span>
          </h2>
          <p className="mt-4 text-lg text-navy-600/70">
            Descubre todos los destinos que te ofrecemos en las Rías Baixas
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinos.map((d) => (
            <div
              key={d.slug}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`h-40 bg-gradient-to-br ${d.color} p-6`}>
                <h3 className="text-2xl font-bold text-white">{d.nombre}</h3>
                <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {d.precio}
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-navy-700/70">{d.desc}</p>
                <a
                  href={"https://www.piratasdenabia.com/" + d.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ocean-600 transition-colors hover:text-ocean-500"
                >
                  Más información →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.piratasdenabia.com/horarios-y-tarifas/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Ver todos los horarios y tarifas
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
