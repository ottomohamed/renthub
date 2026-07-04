const fs = require('fs');

let file = 'client/src/lib/mock-db.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('reloadFromStorage')) {
  console.log("Not in mock-db.ts");
} else {
  console.log("It's in mock-db.ts");
}
