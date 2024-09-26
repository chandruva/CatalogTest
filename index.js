const fs = require('fs');


function decodeValue(base, value) {
    return parseInt(value, base);
}


function lagrangeInterpolation(points, k) {
    let constant = 0;

    for (let i = 0; i < k; i++) {
        let [x_i, y_i] = points[i];

        let term = y_i;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [x_j, _] = points[j];
                term *= (-x_j) / (x_i - x_j);
            }
        }

        constant += term;
    }

    return constant;
}


function main() {
   
    const data = JSON.parse(fs.readFileSync('testcase.json', 'utf8'));

    
    const n = data.keys.n;
    const k = data.keys.k;

    
    let points = [];

    
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            const x = parseInt(i); 
            const base = parseInt(data[i].base);
            const value = data[i].value;
            const y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    const c = lagrangeInterpolation(points, k);
    console.log("The constant term 'c' is:", c);
}

main();