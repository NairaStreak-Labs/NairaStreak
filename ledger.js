/* Cloud ledger is authoritative. Cache keys never overlap inherited savings500k data. */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NairaStreakLedger = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  function create(client, storage, userId, goal) {
    const key = `nairastreak:ledger:${userId}:${goal.id}`;
    let rows = [];
    function cache() { try { storage.setItem(key, JSON.stringify(rows)); } catch (_) {} }
    function map(row) {
      return { ...row, amount: Number(row.amount), date: row.saved_at,
        type: goal.contribution_mode || 'daily' };
    }
    function scoped() { return client.from('savings_entries'); }
    async function load() {
      // Supabase returns at most 1000 rows by default. Read every page.
      const result = [];
      for (let start = 0; ; start += 1000) {
        const { data, error } = await scoped().select('*').eq('user_id', userId)
          .eq('goal_id', goal.id).order('saved_at', { ascending: false })
          .order('id', { ascending: false }).range(start, start + 999);
        if (error) throw new Error('load');
        result.push(...data.map(map));
        if (data.length < 1000) break;
      }
      rows = result; cache(); return rows;
    }
    function cached() {
      try { rows = JSON.parse(storage.getItem(key)) || []; } catch (_) { rows = []; }
      return rows;
    }
    async function put(entry) {
      if (!Number.isFinite(entry.amount) || entry.amount <= 0 || entry.amount > 1000000000 || Math.round(entry.amount * 100) / 100 !== entry.amount) throw new Error('amount');
      const { data, error } = await scoped().upsert({ id: entry.id, user_id: userId,
        goal_id: goal.id, amount: entry.amount, saved_at: entry.date, note: entry.note || null
      }, { onConflict: 'id' }).select('*').single();
      if (error || !data) throw new Error('write');
      rows = [map(data), ...rows.filter(r => r.id !== data.id)]; cache(); return rows;
    }
    async function remove(id) {
      const { data, error } = await scoped().delete().eq('id', id).eq('user_id', userId)
        .eq('goal_id', goal.id).select('id');
      if (error || !data?.length) throw new Error('delete');
      rows = rows.filter(r => r.id !== id); cache(); return rows;
    }
    return { load, cached, put, remove, entries: () => rows };
  }
  return { create };
});
