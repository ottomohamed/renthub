const fs = require('fs');

let file = 'client/src/pages/item-detail.tsx';
let code = fs.readFileSync(file, 'utf8');

// Use the local storage to get up-to-date images
code = code.replace("import { getItemById, getUserById, type Item, type User } from \"@/lib/mock-db\";", "import { getItemById, getUserById, reloadFromStorage, type Item, type User } from \"@/lib/mock-db\";");

code = code.replace("const foundItem = getItemById(params.id);", "reloadFromStorage();\n      const foundItem = getItemById(params.id);");

fs.writeFileSync(file, code);

// Home page as well
let homeFile = 'client/src/pages/home.tsx';
let homeCode = fs.readFileSync(homeFile, 'utf8');
homeCode = homeCode.replace("import { searchItems, type Item } from \"@/lib/mock-db\";", "import { searchItems, reloadFromStorage, type Item } from \"@/lib/mock-db\";");
homeCode = homeCode.replace("const results = searchItems(query, city);", "reloadFromStorage();\n    const results = searchItems(query, city);");
fs.writeFileSync(homeFile, homeCode);

