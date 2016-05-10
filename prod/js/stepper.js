'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getNum(str) {
  return parseInt(str, 10);
};

function onClick(amount, stepper) {
  if (amount === 0) return;
  if (!stepper.field.validity.valid || stepper.field.value === '') stepper.field.value = 0;

  if (amount < 0 && getNum(stepper.field.value) <= getNum(stepper.field.min) || amount > 0 && getNum(stepper.field.value) >= getNum(stepper.field.max)) return;

  stepper.field.value = getNum(stepper.field.value) + amount;
  checkValidity(stepper);
};

function checkValidity(stepper) {
  var VALUE = getNum(stepper.field.value);
  stepper.buttons.neg.disabled = VALUE <= getNum(stepper.field.min);
  stepper.buttons.pos.disabled = VALUE >= getNum(stepper.field.max);
};

exports.default = {
  bindStepper: function bindStepper(stepper, opts) {
    // Bind field
    stepper.field.addEventListener('input', checkValidity.bind(this, stepper));
    // Bind buttons
    stepper.buttons.neg.addEventListener('click', onClick.bind(this, -(getNum(stepper.field.step) || 1), stepper));
    stepper.buttons.pos.addEventListener('click', onClick.bind(this, getNum(stepper.field.step) || 1, stepper));
  },

  bindAll: function bindAll(opts) {
    opts = opts || {};
    opts.classes = opts.classes || {};
    var $steppers = document.getElementsByClassName(opts.stepper || 'stepper');

    for (var i = 0; i < $steppers.length; i++) {
      var stepper = {
        buttons: {
          pos: $steppers[i].getElementsByClassName(opts.classes.add || 'add')[0],
          neg: $steppers[i].getElementsByClassName(opts.classes.subtract || 'subtract')[0]
        },
        field: $steppers[i].getElementsByClassName(opts.classes.field || 'field')[0]
      };

      if (stepper.field.disabled) return; // Don't bind on disabled fields.
      this.bindStepper(stepper, opts);

      // Don't forget to Enable/Disable buttons based on the inital value
      checkValidity(stepper);
    }
  }
};
//# sourceMappingURL=stepper.js.map
