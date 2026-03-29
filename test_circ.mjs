const width = 5;
const buffer = {
    array: new Float32Array(10),
    capacity: 10,
    head: 0,
    length: 0
};

for (let i = 0; i < 7; i++) {
    buffer.array[buffer.head] = i;
    buffer.head = (buffer.head + 1) % buffer.capacity;
    buffer.length = Math.min(buffer.length + 1, width);
}

// read elements
const elements = [];
for (let i = 0; i < buffer.length; i++) {
    const idx = (buffer.head - buffer.length + i + buffer.capacity) % buffer.capacity;
    elements.push(buffer.array[idx]);
}
console.log(elements); // should be [2, 3, 4, 5, 6]
