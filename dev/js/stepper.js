function getNum(str) {return parseInt(str, 10);};

function onClick(amount, buttons, field) {
  if (amount === 0) return;
  if (!field.validity.valid || field.value === '') field.value = 0;

  if (amount < 0 && getNum(field.value) <= getNum(field.min)) return;
  else if (amount > 0 && getNum(field.value) >= getNum(field.max)) return;

  field.value = getNum(field.value) + amount;
  checkValidity(buttons, field);
};

function checkValidity(buttons, field) {
  // Disable increments that surpass thresholds.
  if (field.validity.valid) {
    buttons.neg.disabled = (getNum(field.value) <= getNum(field.min));
    buttons.pos.disabled = (getNum(field.value) >= getNum(field.max));
  } else {
    field.value = 0;
  }
};

export default {
  bindAll: function(opts) {
    opts = opts || {};
    const steppers = document.getElementsByClassName(opts.stepper || 'stepper');

    for (var i = 0; i < steppers.length; i++) {
      const pos = steppers[i].getElementsByClassName(opts.add || 'add')[0];
      const neg = steppers[i].getElementsByClassName(opts.subtract || 'subtract')[0];
      const field = steppers[i].getElementsByClassName(opts.field || 'field')[0];

      // Bind field
      field.addEventListener('change', checkValidity.bind(this, {neg, pos}, field));

      // Bind buttons
      neg.addEventListener('click', onClick.bind(this, -1, {neg, pos}, field));
      pos.addEventListener('click', onClick.bind(this, 1, {neg, pos}, field));
    }
  }
};