(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NairaStreakLegacy = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  function isSeededDemo(entries) {
    return Array.isArray(entries) && entries.length === 25 &&
      entries.every(e => Number.isFinite(Number(e.amount)) && Number(e.amount) > 0) &&
      entries.reduce((sum,e) => sum + Math.round(Number(e.amount)*100),0) === 3425000;
  }
  return { isSeededDemo };
});
