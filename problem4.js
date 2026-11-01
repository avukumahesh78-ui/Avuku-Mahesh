
function matchCustomers(customers, experts) {
    let n = customers.length;
    let m = experts.length;

    let assigned = new Array(m).fill(-1);

    function canMatch(customer, visited) {
        for (let i = 0; i < m; i++) {

            if (
                experts[i].includes(customers[customer]) &&
                !visited[i]
            ) {
                visited[i] = true;

                if (
                    assigned[i] === -1 ||
                    canMatch(assigned[i], visited)
                ) {
                    assigned[i] = customer;
                    return true;
                }
            }
        }

        return false;
    }

    let matched = 0;

    for (let i = 0; i < n; i++) {
        let visited = new Array(m).fill(false);

        if (canMatch(i, visited)) {
            matched++;
        }
    }

    console.log("Total Matched Customers:", matched);

    console.log("Customer - Expert Matches:");

    for (let i = 0; i < m; i++) {
        if (assigned[i] !== -1) {
            console.log(
                customers[assigned[i]] + " - Expert " + (i + 1)
            );
        }
    }
}

// Example
let customers = ["JavaScript", "Python", "SQL", "JavaScript"];

let experts = [
    ["JavaScript", "SQL"],
    ["Python"],
    ["JavaScript"],
    ["SQL"]
];

matchCustomers(customers, experts);
