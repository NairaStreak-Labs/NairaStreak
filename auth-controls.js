function resetPasswordVisibility() {
  document.querySelectorAll('[data-password-toggle]').forEach(button => {
    const input = document.getElementById(button.dataset.passwordToggle);
    input.type = 'password'; button.setAttribute('aria-pressed','false');
    button.setAttribute('aria-label','Show password');
  });
}
for (const id of ['signinPassword','signupPassword','recoveryPassword']) {
  const input = document.getElementById(id);
  if (!input) continue;
  const wrap = document.createElement('div'); wrap.className = 'password-control';
  input.before(wrap);wrap.append(input);
  const button = document.createElement('button');button.type = 'button';
  button.dataset.passwordToggle = id;button.setAttribute('aria-controls',id);
  button.setAttribute('aria-label','Show password');button.setAttribute('aria-pressed','false');
  button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
  button.onclick = () => {
    const visible = input.type === 'password';input.type = visible ? 'text' : 'password';
    button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',visible ? 'Hide password' : 'Show password');
  };
  wrap.append(button);
}
