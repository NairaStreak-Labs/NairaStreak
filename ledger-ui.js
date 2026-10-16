// Integrated with the existing vanilla shell; no remote data is written to legacy keys.
let ledger = null;
let ledgerIdentity = '';
let ledgerBusy = false;
let ledgerGeneration = 0;
function resetLedger() {
  ledgerGeneration++; ledger = null; ledgerIdentity = ''; ledgerBusy = false;
  document.getElementById('fullHistoryList').replaceChildren();
  document.getElementById('recentActivityList')?.replaceChildren();
}
function syncMessage(message) { document.getElementById('ledgerSync').textContent = message; }
async function rehydrateLedger() {
  if (!currentUser || !activeGoal) return;
  const identity = `${currentUser.id}:${activeGoal.id}`;
  if (identity !== ledgerIdentity) {
    ledger = NairaStreakLedger.create(supabaseClient, localStorage, currentUser.id, activeGoal);
    ledgerIdentity = identity; ledger.cached();
  }
  const instance = ledger, generation = ++ledgerGeneration;
  syncMessage('Loading savings…');
  try {
    await instance.load();
    if (generation !== ledgerGeneration || instance !== ledger || !currentUser) return;
    syncMessage('Synced with your account.');
  } catch (_) {
    if (generation !== ledgerGeneration || instance !== ledger || !currentUser) return;
    syncMessage('Could not refresh. Showing offline cache; it may be out of date. Use Retry sync.');
  }
  renderActiveGoalView();
}
function renderLedgerActions() {
  const list = document.getElementById('fullHistoryList');
  list.querySelectorAll('.ledger-actions').forEach(el => el.remove());
  [...list.querySelectorAll('.activity-item')].forEach((item, index) => {
    const entry = ledger?.entries()[index];
    if (!entry) return;
    const actions = document.createElement('div'); actions.className = 'ledger-actions';
    for (const action of ['Edit', 'Delete']) {
      const button = document.createElement('button'); button.type = 'button';
      button.className = 'btn-secondary'; button.textContent = action;
      button.setAttribute('aria-label', `${action} saving of ${formatNaira(entry.amount)} on ${entry.date}`);
      button.onclick = async () => {
        if (action === 'Edit') {
          const form = document.getElementById('ledgerForm');
          form.elements.entryId.value = entry.id; form.elements.amount.value = entry.amount;
          form.elements.savedAt.value = entry.date; form.elements.note.value = entry.note || '';
          form.querySelector('button[type="submit"]').textContent = 'Update entry';
          form.elements.amount.focus();
        } else if (confirm('Delete this savings entry? Your totals and streak will be recalculated.')) {
          if (ledgerBusy) return;
          ledgerBusy = true; const instance = ledger;
          syncMessage('Deleting…');
          try { await instance.remove(entry.id); if (instance === ledger) { renderActiveGoalView(); syncMessage('Deleted from your account.'); } }
          catch (_) { syncMessage('Deletion failed. Your entry is unchanged. Try Delete again.'); }
          finally { ledgerBusy = false; }
        }
      };
      actions.append(button);
    }
    item.append(actions);
  });
}
async function submitLedgerEntry(entry) {
  if (ledgerBusy || !ledger || !currentUser || !activeGoal) return;
  ledgerBusy = true; const instance = ledger;
  const button = document.querySelector('#ledgerForm button[type="submit"]'); button.disabled = true;
  syncMessage('Saving to your account…');
  try {
    await instance.put(entry);
    if (instance !== ledger || !currentUser) return;
    syncMessage('Saved to your account.'); renderActiveGoalView();
    document.getElementById('ledgerForm').reset();
    document.getElementById('entryDate').value = todayStr(); button.textContent = 'Log savings';
  } catch (_) {
    // Inputs and stable UUID remain intact for a safe retry, including ambiguous responses.
    if (instance === ledger) syncMessage('Not synced. Saving failed; your input is still here. Use Log savings to retry.');
  } finally { ledgerBusy = false; button.disabled = false; }
}
function initLedgerUI() {
  const panel = document.createElement('section'); panel.className = 'dash-card ledger-panel';
  panel.innerHTML = `<h2>Log savings</h2><p id="ledgerSync" role="status" aria-live="polite">No goal loaded.</p>
    <button type="button" id="retryLedger" class="btn-secondary">Retry sync</button>
    <form id="ledgerForm" novalidate>
      <input type="hidden" name="entryId">
      <label for="entryAmount">Amount saved (₦)</label><input id="entryAmount" name="amount" type="number" min="0.01" max="1000000000" step="0.01" required>
      <label for="entryDate">Date saved</label><input id="entryDate" name="savedAt" type="date" required>
      <label for="entryNote">Note (optional)</label><input id="entryNote" name="note" maxlength="500">
      <p id="entryError" role="alert"></p><button type="submit" class="btn-primary">Log savings</button>
      <button type="button" id="cancelEntry" class="btn-secondary">Clear editor</button>
    </form>`;
  document.getElementById('tabPaneHistory').prepend(panel);
  document.getElementById('entryDate').value = todayStr();
  document.getElementById('cancelEntry').onclick = () => {
    document.getElementById('ledgerForm').reset(); document.getElementById('entryDate').value = todayStr();
    panel.querySelector('button[type="submit"]').textContent = 'Log savings';
  };
  document.getElementById('retryLedger').onclick = rehydrateLedger;
  document.getElementById('ledgerForm').onsubmit = event => {
    event.preventDefault(); const fields = event.target.elements;
    const amount = Number(fields.amount.value), date = fields.savedAt.value;
    const valid = Number.isFinite(amount) && amount > 0 && amount <= 1000000000 && Math.round(amount * 100) / 100 === amount && /^\d{4}-\d{2}-\d{2}$/.test(date) && date <= todayStr();
    document.getElementById('entryError').textContent = valid ? '' : 'Enter a positive amount with at most two decimal places and a valid date no later than today.';
    fields.amount.setAttribute('aria-invalid', String(!valid)); fields.amount.setAttribute('aria-describedby','entryError');
    if (!valid) return;
    if (!fields.entryId.value) fields.entryId.value = crypto.randomUUID();
    submitLedgerEntry({ id: fields.entryId.value, amount, date, note: fields.note.value });
  };
}
