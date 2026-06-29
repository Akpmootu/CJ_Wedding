-- Supabase migration for #CJTheWedding RSVP
-- Run this in Supabase SQL Editor or via: supabase db push

create table if not exists public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  attending boolean not null,
  guest_count integer not null default 0 check (guest_count >= 0),
  message text default '',
  created_at timestamptz not null default now()
);

create index if not exists rsvp_responses_created_at_idx
  on public.rsvp_responses (created_at desc);

alter table public.rsvp_responses enable row level security;

-- Allow anonymous guests to submit RSVP
create policy "Anyone can submit RSVP"
  on public.rsvp_responses
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated admins can read responses (adjust as needed)
create policy "Authenticated users can read RSVP"
  on public.rsvp_responses
  for select
  to authenticated
  using (true);
