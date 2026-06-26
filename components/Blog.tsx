const posts = [
  {
    titulo: "¿Cómo ir a la Isla de Ons? Descubre el destino perfecto en las Rías Baixas",
    fecha: "05 junio 2026",
    url: "https://www.piratasdenabia.com/como-ir-isla-de-ons-destino-perfecto/",
  },
  {
    titulo: "Rumbo al eclipse 2026: Navega con Piratas de Nabia hacia una experiencia astronómica única en Ons",
    fecha: "13 mayo 2026",
    url: "https://www.piratasdenabia.com/experiencia-astronomica-eclipse-onls/",
  },
  {
    titulo: "Celebra el Día de la Madre 2026 con Piratas de Nabia: ¡viaje gratis para las mamás!",
    fecha: "09 abril 2026",
    url: "https://www.piratasdenabia.com/dia-madre-viaje-gratis/",
  },
];

export default function Blog() {
  return (
    <section className="bg-ocean-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            Nuestro <span className="text-ocean-500">blog</span>
          </h2>
          <p className="mt-4 text-lg text-navy-600/70">
            Novedades, sorteos y promociones
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.titulo}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/20 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-ocean-500">
                {post.fecha}
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug text-navy-900 transition-colors group-hover:text-ocean-600">
                {post.titulo}
              </h3>
              <p className="mt-4 text-sm font-medium text-ocean-600">
                Leer más →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
