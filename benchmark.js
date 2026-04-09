const { performance } = require('perf_hooks');

const width = 1000;
const iterations = 100000;

function benchArray() {
    const data = [];
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        data.push(i % 100);
        if (data.length > width) {
            data.shift();
        }

        // Simulate reading
        let sum = 0;
        const len = data.length;
        for (let j = 0; j < len; j++) {
            sum += data[j];
        }
    }
    const end = performance.now();
    return end - start;
}

function benchCircularBuffer() {
    const data = new Float32Array(width);
    let head = 0;
    let length = 0;

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        data[head] = i % 100;
        head = (head + 1) % width;
        if (length < width) length++;

        // Simulate reading
        let sum = 0;
        for (let j = 0; j < length; j++) {
            // let idx = (head - length + j + width) % width;
            sum += data[j]; // simplified read
        }
    }
    const end = performance.now();
    return end - start;
}

console.log("Array shift():", benchArray().toFixed(2), "ms");
console.log("Circular Buffer:", benchCircularBuffer().toFixed(2), "ms");
