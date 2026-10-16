// Install is offered only in Settings. This does not alter service-worker caching.
(function() {
  let promptEvent = null, installed = false;
  const card = document.getElementById('installCard');
  document.getElementById('tabPaneSettings').append(card);
  const button = document.getElementById('installBtn');
  const help = document.createElement('p');help.id = 'installHelp';card.append(help);
  function update() {
    const standalone = installed || matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    const iosSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|EdgiOS/.test(navigator.userAgent);
    card.style.display = !standalone && (promptEvent || iosSafari) ? 'block' : 'none';
    button.hidden = !promptEvent;
    help.textContent = iosSafari && !promptEvent ? 'To add NairaStreak to your Home Screen in Safari, tap Share, then Add to Home Screen.' : '';
  }
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault();promptEvent = event;update(); });
  button.onclick = async () => {
    if (!promptEvent) return;
    const event = promptEvent;promptEvent = null;
    await event.prompt();await event.userChoice;update();
  };
  window.addEventListener('appinstalled', () => { installed = true;promptEvent = null;update(); });
  matchMedia('(display-mode: standalone)').addEventListener('change', update);
  update();
})();
