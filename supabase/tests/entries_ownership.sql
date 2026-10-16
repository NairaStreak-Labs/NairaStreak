-- Run against a disposable database with both migrations installed, as postgres.
-- No production users required. All fixtures are rolled back.
BEGIN;
INSERT INTO auth.users(id, email) VALUES
 ('10000000-0000-4000-8000-000000000001', 'owner@example.invalid'),
 ('10000000-0000-4000-8000-000000000002', 'second@example.invalid');
INSERT INTO public.goals(id,user_id,name,target_amount,target_date) VALUES
 ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','Owner goal',10000,'2030-12-31'),
 ('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002','Second goal',10000,'2030-12-31');
INSERT INTO public.savings_entries(id,goal_id,user_id,amount) VALUES
 ('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001',100),
 ('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002',200);
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
DO $$ DECLARE affected integer; BEGIN
 IF EXISTS (SELECT 1 FROM public.savings_entries WHERE id='30000000-0000-4000-8000-000000000001') THEN RAISE EXCEPTION 'Cross-user SELECT leaked'; END IF;
 UPDATE public.savings_entries SET amount=999 WHERE id='30000000-0000-4000-8000-000000000001';
 GET DIAGNOSTICS affected = ROW_COUNT;
 IF affected <> 0 THEN RAISE EXCEPTION 'Cross-user UPDATE succeeded'; END IF;
 DELETE FROM public.savings_entries WHERE id='30000000-0000-4000-8000-000000000001';
 GET DIAGNOSTICS affected = ROW_COUNT;
 IF affected <> 0 THEN RAISE EXCEPTION 'Cross-user DELETE succeeded'; END IF;
 BEGIN
  INSERT INTO public.savings_entries(goal_id,user_id,amount) VALUES ('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000002',100);
  RAISE EXCEPTION 'Cross-goal INSERT succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 BEGIN
  UPDATE public.savings_entries SET goal_id='20000000-0000-4000-8000-000000000001' WHERE id='30000000-0000-4000-8000-000000000002';
  RAISE EXCEPTION 'Cross-goal reassignment succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
 IF (SELECT amount FROM public.savings_entries WHERE id='30000000-0000-4000-8000-000000000002') <> 200 THEN RAISE EXCEPTION 'Own entry unexpectedly changed'; END IF;
END $$;
RESET ROLE;
ROLLBACK;
