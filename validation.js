/* Accessible errors shared by simulator, calculator and settings. */
function fieldError(id, message) {
  const field = document.getElementById(id);
  if (!field) return;
  const errorId = id + 'Error';
  let error = document.getElementById(errorId);
  if (!error) { error = document.createElement('p'); error.id = errorId; error.className = 'field-error'; error.setAttribute('role','alert'); field.after(error); }
  error.textContent = message || '';
  field.setAttribute('aria-invalid', String(Boolean(message)));
  field.setAttribute('aria-describedby', errorId);
}
function validatePlanFields(amountId,dateId) {
  const result = NairaStreakCalc.validateGoalInput({ name:'Savings goal',targetAmount:document.getElementById(amountId).value,targetDate:document.getElementById(dateId).value });
  fieldError(amountId,result.errors.targetAmount);fieldError(dateId,result.errors.targetDate);
  return result.isValid;
}
