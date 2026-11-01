
function shortestSubarray(arr, k) {
    let n = arr.length;
    let prefix = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }

    let deque = [];
    let head = 0;
    let minLength = Infinity;

    for (let i = 0; i <= n; i++) {

        while (
            head < deque.length &&
            prefix[i] - prefix[deque[head]] >= k
        ) {
            minLength = Math.min(
                minLength,
                i - deque[head]
            );
            head++;
        }

        while (
            head < deque.length &&
            prefix[i] <= prefix[deque[deque.length - 1]]
        ) {
            deque.pop();
        }

        deque.push(i);
    }

    return minLength === Infinity ? -1 : minLength;
}

// Example
let arr = [2, -1, 2, 3, -2, 4];
let k = 5;

console.log("Shortest Subarray Length:",
    shortestSubarray(arr, k));
