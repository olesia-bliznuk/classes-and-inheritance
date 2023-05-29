// class Builder ES6
class Builder {
    constructor(value) {
        this.value = value;
    }

    plus(...n) {
        [...n].forEach(i => this.value += i);
        return this.value;
    }

    minus(...n) {
        if (typeof this.value == 'number') {
            [...n].forEach(i => this.value -= i);
        } else {
            [...n].forEach(i => this.value = this.value.slice(0, this.value.length - i));
        }
        return this.value;
    }

    divide(n) {
        if (typeof this.value == 'number') {
            this.value = Math.floor(this.value / n);
        }
        else {
            this.value = this.value.slice(0, Math.floor(this.value.length / n));
        }
        return this.value;
    }

    multiply(n) {
        if (typeof this.value == 'number') {
            this.value = this.value * n;
        }
        else {
            this.value = this.value.repeat(n);
        }
        return this.value;
    }

    get() {
        return this.value;
    }
}; 

//ES6 class IntBuilder
class IntBuilder extends Builder {
    constructor(value = 0) {
        super(value);
    }

    mod(n) {
        this.value = this.value % n;
        return this.value;
    }

    static random(from, to) {
        return Math.floor(Math.random() * (to - from) + from);
    }
};

//ES5 class StringBuilder
function StringBuilder(value = '') {
    this.value = value;
};

StringBuilder.prototype = Object.create(Builder.prototype);

StringBuilder.prototype.remove = function (n) {
    this.value = this.value.replaceAll(n, '');
    return this.value;
};

StringBuilder.prototype.sub = function (from, n) {
    this.value = this.value.substr(from, n);
    return this.value;
};


// IntBuilder
console.log('IntBuilder');
console.log(`Random 10-100: ${IntBuilder.random(10, 100)}`);
let intBuilder = new IntBuilder(10);   // 10;
console.log(`Plus 2 3 2: ${intBuilder.plus(2, 3, 2)}`);  // 17;
console.log(`Minus 1 2: ${intBuilder.minus(1, 2)}`);   // 14;
console.log(`Multiply 2 : ${intBuilder.multiply(2)}`);   // 28;
console.log(`Divide 4: ${intBuilder.divide(4)}`);   // 7;
console.log(`Mod 3: ${intBuilder.mod(3)}`);   // 1;
console.log(`Get: ${intBuilder.get()}`);   // -> 1;

//StringBuilder
console.log('StringBuilder');
let strBuilder = new StringBuilder('Hello');   // 'Hello';
console.log(`Plus ' all', '!': ${strBuilder.plus(' all', '!')}`);   // 'Hello all!'
console.log(`Minus 4: ${strBuilder.minus(4)}`);   // 'Hello '
console.log(`Multiply 3: ${strBuilder.multiply(3)}`);   // 'Hello Hello Hello '
console.log(`Divide 4: ${strBuilder.divide(4)}`);   // 'Hell';
console.log(`Remove 'l': ${strBuilder.remove('l')}`);   // 'He';
console.log(`Sub 1,1: ${strBuilder.sub(1, 1)}`);   // -> 'e';
console.log(`Get: ${strBuilder.get()}`);   // -> 'e';
