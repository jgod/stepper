'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getNum(str) {
  return parseInt(str, 10);
};

function onClick(amount, buttons, field) {
  if (amount === 0) return;
  if (!field.validity.valid || field.value === '') field.value = 0;

  if (amount < 0 && getNum(field.value) <= getNum(field.min)) return;else if (amount > 0 && getNum(field.value) >= getNum(field.max)) return;

  field.value = getNum(field.value) + amount;
  checkValidity(buttons, field);
};

function checkValidity(buttons, field) {
  // Disable increments that surpass thresholds.
  if (field.validity.valid) {
    buttons.neg.disabled = getNum(field.value) <= getNum(field.min);
    buttons.pos.disabled = getNum(field.value) >= getNum(field.max);
  } else {
    field.value = 0;
  }
};

exports.default = {
  bindAll: function bindAll(opts) {
    opts = opts || {};
    var steppers = document.getElementsByClassName(opts.stepper || 'stepper');

    for (var i = 0; i < steppers.length; i++) {
      var pos = steppers[i].getElementsByClassName(opts.add || 'add')[0];
      var neg = steppers[i].getElementsByClassName(opts.subtract || 'subtract')[0];
      var field = steppers[i].getElementsByClassName(opts.field || 'field')[0];

      // Bind field
      field.addEventListener('change', checkValidity.bind(this, { neg: neg, pos: pos }, field));

      // Bind buttons
      neg.addEventListener('click', onClick.bind(this, -1, { neg: neg, pos: pos }, field));
      pos.addEventListener('click', onClick.bind(this, 1, { neg: neg, pos: pos }, field));
    }
  }
};
//# sourceMappingURL=stepper.js.map
