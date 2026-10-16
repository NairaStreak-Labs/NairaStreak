(function() {
  const sidebar = document.getElementById('dashSidebar');
  const button = document.createElement('button');button.type = 'button';button.id = 'sidebarToggle';
  button.className = 'icon-btn';button.setAttribute('aria-controls','dashSidebar');
  button.innerHTML = '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18m4-13 4 4-4 4"/></svg>';
  sidebar.querySelector('.sidebar-top').prepend(button);
  sidebar.querySelectorAll('.nav-item').forEach(item => { item.setAttribute('aria-label',item.textContent.trim()); item.title = item.textContent.trim(); });
  let collapsed = false;
  try { collapsed = localStorage.getItem('nairastreak:sidebar') === 'collapsed'; } catch (_) {}
  function update() {
    document.body.classList.toggle('sidebar-collapsed',collapsed);
    button.setAttribute('aria-expanded',String(!collapsed));
    button.setAttribute('aria-label',collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  }
  button.onclick = () => { collapsed = !collapsed;try { localStorage.setItem('nairastreak:sidebar',collapsed?'collapsed':'expanded'); } catch (_) {} update(); };
  update();
})();
