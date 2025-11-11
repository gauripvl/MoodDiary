-- Create journal_entries table
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  mood text not null,
  sentiment integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on user_id for faster queries
create index if not exists journal_entries_user_id_idx on public.journal_entries(user_id);

-- Create index on created_at for sorting
create index if not exists journal_entries_created_at_idx on public.journal_entries(created_at desc);

-- Enable Row Level Security
alter table public.journal_entries enable row level security;

-- Create policy: Users can only see their own entries
create policy "Users can view their own journal entries"
  on public.journal_entries
  for select
  using (auth.uid() = user_id);

-- Create policy: Users can create their own entries
create policy "Users can create their own journal entries"
  on public.journal_entries
  for insert
  with check (auth.uid() = user_id);

-- Create policy: Users can update their own entries
create policy "Users can update their own journal entries"
  on public.journal_entries
  for update
  using (auth.uid() = user_id);

-- Create policy: Users can delete their own entries
create policy "Users can delete their own journal entries"
  on public.journal_entries
  for delete
  using (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger on_journal_entry_updated
  before update on public.journal_entries
  for each row
  execute procedure public.handle_updated_at();

