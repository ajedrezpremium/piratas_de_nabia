create table if not exists public.crm_tasks (
  id uuid default gen_random_uuid() primary key,
  cliente text not null,
  proyecto text default '',
  responsable text default '',
  estado text default 'Contactado',
  proxima_accion text default '',
  fecha text default '',
  valor text default '',
  notes text default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.crm_tasks enable row level security;

create policy "Enable all for anon" on public.crm_tasks
  for all using (true) with check (true);
