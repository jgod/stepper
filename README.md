# Stepper

A simple numeric stepper for the frontend with no dependencies.

## Installation

```sh
npm install stepper-input --save
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
  classes: {
    stepper: 'my-stepper-class', // default: 'stepepr'
    add: 'my-adder-class', // default: 'add'
    subtract: 'my-subtract-class', // default: 'subtract'
    field: 'my-field-class' // default: 'field'
  }
});
```