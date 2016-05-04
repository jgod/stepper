# Stepper

A simple numeric stepper with no dependencies, written in pure js.

## Installation

```sh
npm install --save-dev stepper-input
```

## Usage

```javascript
import stepper from 'stepper-input';
stepper.bindAll();
```

Add this "component"

```html
<form class='stepper'>
  <button class='subtract' type='button'>-</button>
  <input class='field' type='number' min='0' max='10' />
  <button class='add' type='button'>+</button>
</form>
```

Then you should style these classes and elements: `stepper`, `add`, `subtract`, `field`.

### Options

```javascript
import stepper from 'stepper-input';
stepper.bindAll({
  stepper: 'my-stepper-class',
  add: 'my-adder-class',
  subtract: 'my-subtract-class',
  field: 'my-field-class'
});
```

**stepper**: class for identifying steppers

**add**: class for identifying stepper adders

**subtract**: class for identifying stepper subtractors

**field**: class for identifying stepper fields