-- Additive hardening. Run only after reviewing existing data; no automatic repairs.
BEGIN;
DROP POLICY IF EXISTS "Users can insert own entries" ON public.savings_entries;
CREATE POLICY "Users can insert own entries" ON public.savings_entries
FOR INSERT TO authenticated WITH CHECK (
  user_id = (SELECT auth.uid()) AND EXISTS (
    SELECT 1 FROM public.goals g
    WHERE g.id = goal_id AND g.user_id = (SELECT auth.uid())
  )
);
DROP POLICY IF EXISTS "Users can update own entries" ON public.savings_entries;
CREATE POLICY "Users can update own entries" ON public.savings_entries
FOR UPDATE TO authenticated
USING (user_id = (SELECT auth.uid()))
WITH CHECK (
  user_id = (SELECT auth.uid()) AND EXISTS (
    SELECT 1 FROM public.goals g
    WHERE g.id = goal_id AND g.user_id = (SELECT auth.uid())
  )
);
-- amount > 0 and valid goal status are already constrained in the initial schema.
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'public.goals'::regclass AND conname = 'goals_currency_ngn_check') THEN
    ALTER TABLE public.goals ADD CONSTRAINT goals_currency_ngn_check CHECK (currency IN ('NGN'));
  END IF;
END $$;
-- Existing idx_entries_user_saved_at covers user_id; idx_entries_goal_id covers goal_id.
CREATE INDEX IF NOT EXISTS idx_entries_saved_at ON public.savings_entries(saved_at);
COMMIT;
