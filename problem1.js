
function mostFrequentElement(arr) {
    let frequency = new Map();

    for (let num of arr) {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    }

    let maxCount = 0;
    let result = null;

    for (let [num, count] of frequency) {
        if (count > maxCount) {
            maxCount = count;
            result = num;
        }
    }

    return result;
}

// Example
let arr = [1, 2, 3, 2, 4, 2, 5, 3];

console.log("Most Frequent Element:",
    mostFrequentElement(arr));
