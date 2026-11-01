
function maxPairSum(arr, k) {
    if (k < 2 || k > arr.length) {
        return [];
    }

    // Get unique sorted values
    let values = [...new Set(arr)].sort((a, b) => a - b);
    let m = values.length;

    // Map each value to its index
    let valueIndex = new Map();
    values.forEach((value, index) => {
        valueIndex.set(value, index);
    });

    // Segment tree stores the two largest values
    let tree = Array(4 * m).fill(null).map(
        () => [-Infinity, -Infinity]
    );

    function merge(a, b) {
        let top = [...a, ...b].sort((x, y) => y - x);
        return [top[0], top[1]];
    }

    function update(node, left, right, pos, count) {
        if (left === right) {
            if (count >= 2) {
                tree[node] = [values[pos], values[pos]];
            } else if (count === 1) {
                tree[node] = [values[pos], -Infinity];
            } else {
                tree[node] = [-Infinity, -Infinity];
            }
            return;
        }

        let mid = Math.floor((left + right) / 2);

        if (pos <= mid) {
            update(node * 2, left, mid, pos, count);
        } else {
            update(node * 2 + 1, mid + 1, right, pos, count);
        }

        tree[node] = merge(
            tree[node * 2],
            tree[node * 2 + 1]
        );
    }

    let counts = new Map();
    let result = [];

    function change(num, delta) {
        let pos = valueIndex.get(num);
        let count = (counts.get(num) || 0) + delta;

        counts.set(num, count);
        update(1, 0, m - 1, pos, count);
    }

    // Create the first window
    for (let i = 0; i < k; i++) {
        change(arr[i], 1);
    }

    result.push(tree[1][0] + tree[1][1]);

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        change(arr[i - k], -1);
        change(arr[i], 1);

        result.push(tree[1][0] + tree[1][1]);
    }

    return result;
}

// Example input
let arr = [1, 5, 2, 4, 6, 3];
let k = 3;

// Display result
console.log("Maximum Pair Sums:", maxPairSum(arr, k));
