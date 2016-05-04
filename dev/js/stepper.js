export default {
  getNum: function(str) {
    return parseInt(str, 10);
  },

  cb: function(neg, pos, field) {
    // Disable increments that surpass thresholds.
    if (field.validity.valid) {
      if (this.getNum(field.value) <= this.getNum(field.min)) {
        neg.disabled = true;
        return;
      } else if (this.getNum(field.value) >= this.getNum(field.max)) {
        pos.disabled = true;
        return;
      }
    } else {
      field.value = 0;
    }

    pos.disabled = false;
    neg.disabled = false;
  },

  bindButton: function(el, amount, otherEl, field) {
    el.addEventListener('click', (function() {
      if (amount === 0) return;
      if (!field.validity.valid || field.value === '') field.value = 0;

      if (amount < 0 && this.getNum(field.value) <= this.getNum(field.min)) return;
      else if (amount > 0 && this.getNum(field.value) >= this.getNum(field.max)) return;

      field.value = this.getNum(field.value) + amount;
      this.cb((amount < 0) ? el : otherEl, (amount < 0) ? otherEl : el, field);
    }).bind(this));
  },

  bindAll: function(opts) {
    opts = opts || {};
    var steppers = document.getElementsByClassName(opts.stepper || 'stepper');
    for (var i = 0; i < steppers.length; i++) {
      var pos = steppers[i].getElementsByClassName(opts.add || 'add')[0];
      var neg = steppers[i].getElementsByClassName(opts.subtract || 'subtract')[0];
      var field = steppers[i].getElementsByClassName(opts.field || 'field')[0];

      field.addEventListener('change', (function() {
        this.cb(neg, pos, field);
      }).bind(this));
      this.bindButton(pos, 1, neg, field);
      this.bindButton(neg, -1, pos, field);
    }
  }
};