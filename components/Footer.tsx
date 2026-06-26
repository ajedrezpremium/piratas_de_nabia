export default function Footer() {
  return (
    <footer className="bg-navy-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⛵</span>
              <span className="text-xl font-bold">
                Piratas de <span className="text-gold-400">Nabia</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Naviera Illa de Ons S.L.
              <br />
              Transporte marítimo de viajeros desde 1998.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contacto
            </h4>
            <div className="space-y-2 text-sm text-white/60">
              <p>Estación Marítima de Vigo</p>
              <p>Cánovas del Castillo s/n, 36202 Vigo</p>
              <a href="tel:+34986320048" className="block font-semibold text-white transition-colors hover:text-gold-400">
                (+34) 986 320 048
              </a>
              <a href="mailto:info@piratasdenabia.com" className="block transition-colors hover:text-gold-400">
                info@piratasdenabia.com
              </a>
              <p className="text-xs text-white/40">Horario: Todos los días 08:30-22:00</p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Enlaces
            </h4>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <a href="https://www.piratasdenabia.com/empresa/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">Sobre nosotros</a>
              <a href="https://www.piratasdenabia.com/puntos-de-venta/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">Puntos de venta</a>
              <a href="https://www.piratasdenabia.com/preguntas-frecuentes/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">FAQs</a>
              <a href="https://www.piratasdenabia.com/blog/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-400">Blog</a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Síguenos
            </h4>
            <div className="flex gap-3">
              {[
                { name: "Facebook", url: "https://www.facebook.com/PiratasDeNabia/" },
                { name: "Instagram", url: "https://www.instagram.com/piratasdenabia/" },
                { name: "Twitter/X", url: "https://twitter.com/piratasdenabia" },
                { name: "TikTok", url: "https://www.tiktok.com/@piratasdenabia" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/50 transition-colors hover:border-gold-500 hover:text-gold-400"
                  title={s.name}
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Naviera Illa de Ons S.L. • Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
}
