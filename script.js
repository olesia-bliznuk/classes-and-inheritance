// class Builder ES5
function Builder(value) {
    this.value = value;
}

Builder.prototype.plus = function (...args) {
    this.value += [...args].reduce((acc, elem) => acc + elem);
    return this;
};

Builder.prototype.minus = function (...args) {
    if (typeof this.value === 'number') {
        [...args].map(elem => this.value -= elem);
    } else {
        [...args].map(elem => this.value = this.value.slice(0, this.value.length - elem));
    }
    return this;
};

Builder.prototype.divide = function (divisor) {
    if (typeof this.value === 'number') {
        this.value = Math.floor(this.value / divisor);
    }
    else {
        this.value = this.value.slice(0, Math.floor(this.value.length / divisor));
    }
    return this;
};

Builder.prototype.multiply = function (numRep) {
    if (typeof this.value === 'number') {
        this.value = this.value * numRep;
    }
    else {
        this.value = this.value.repeat(numRep);
    }
    return this;
};

Builder.prototype.get = function () {
    return this.value;
};

// ES6 class IntBuilder
class IntBuilder extends Builder {
    constructor(value = 0) {
        super(value);
    }
    mod(divisor) {
        this.value = this.value % divisor;
        return this;
    }
    static random(from, to) {
        return Math.floor(Math.random() * (to - from) + from);
    }
};

//ES5 class StringBuilder
function StringBuilder(value = '') {
    Builder.call(this, value);
}

StringBuilder.prototype = Object.create(Builder.prototype);

StringBuilder.prototype.remove = function (str) {
    this.value = this.value.replaceAll(str, '');
    return this;
};

StringBuilder.prototype.sub = function (from, to) {
    this.value = this.value.substr(from, to);
    return this;
};

// IntBuilder
console.log('IntBuilder');
console.log(`Random 10-100: ${IntBuilder.random(10, 100)}`);
let intBuilder = new IntBuilder(10);
console.log(intBuilder
    .plus(2, 3, 2)
    .minus(1, 2)
    .multiply(2)
    .divide(4)
    .mod(3)
    .get());

//StringBuilder
console.log('StringBuilder');
let strBuilder = new StringBuilder('Hello');
console.log(strBuilder
    .plus(' all', '!')
    .minus(4)
    .multiply(3)
    .divide(4)
    .remove('l')
    .sub(1, 1)
    .get());
