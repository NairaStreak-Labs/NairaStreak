-- ==============================================================================
-- NairaStreak Labs — Initial Database Schema & Row Level Security
-- Migration: 20261012_init_schema.sql
-- Description: Creates profiles, goals, and savings_entries with strict RLS
-- ==============================================================================

-- 1. PROFILES TABLE (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    email TEXT,
    preferences JSONB DEFAULT '{"darkMode": false, "remindersOn": false, "reminderTimes": ["09:00", "14:00", "20:00"]}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. GOALS TABLE (Arbitrary target amounts and deadlines)
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT '500K Challenge',
    target_amount NUMERIC(12, 2) NOT NULL CHECK (target_amount > 0), -- Precise monetary decimal
    currency TEXT NOT NULL DEFAULT 'NGN',
    target_date DATE NOT NULL,
    contribution_mode TEXT NOT NULL DEFAULT 'daily' CHECK (contribution_mode IN ('daily', 'weekly')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_goals_user_id ON public.goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_status ON public.goals(status);


-- 3. SAVINGS ENTRIES TABLE (Granular contributions ledger)
CREATE TABLE IF NOT EXISTS public.savings_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0), -- Precise monetary decimal
    saved_at DATE NOT NULL DEFAULT CURRENT_DATE,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_entries_goal_id ON public.savings_entries(goal_id);
CREATE INDEX IF NOT EXISTS idx_entries_user_saved_at ON public.savings_entries(user_id, saved_at);


-- 4. ROW LEVEL SECURITY (RLS) POLICIES — NON-NEGOTIABLE TENANT ISOLATION
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_entries ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE USING ((select auth.uid()) = id);

-- Goals Policies
DROP POLICY IF EXISTS "Users can view own goals" ON public.goals;
CREATE POLICY "Users can view own goals" 
    ON public.goals FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own goals" ON public.goals;
CREATE POLICY "Users can insert own goals" 
    ON public.goals FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own goals" ON public.goals;
CREATE POLICY "Users can update own goals" 
    ON public.goals FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own goals" ON public.goals;
CREATE POLICY "Users can delete own goals" 
    ON public.goals FOR DELETE USING ((select auth.uid()) = user_id);

-- Savings Entries Policies
DROP POLICY IF EXISTS "Users can view own entries" ON public.savings_entries;
CREATE POLICY "Users can view own entries" 
    ON public.savings_entries FOR SELECT USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own entries" ON public.savings_entries;
CREATE POLICY "Users can insert own entries" 
    ON public.savings_entries FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own entries" ON public.savings_entries;
CREATE POLICY "Users can update own entries" 
    ON public.savings_entries FOR UPDATE USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own entries" ON public.savings_entries;
CREATE POLICY "Users can delete own entries" 
    ON public.savings_entries FOR DELETE USING ((select auth.uid()) = user_id);
