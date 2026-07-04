const fs = require('fs');

// We need admin.tsx to reload the items from the database when it renders, 
// because we changed it from `const [items, setItems] = useState([...ITEMS])`
// But ITEMS might have changed if we are moving back and forth.

let file = 'client/src/pages/admin.tsx';
let code = fs.readFileSync(file, 'utf8');

// Also update it to use getAllItems instead of just ITEMS because ITEMS is a reference that gets modified.
code = code.replace("import { USERS, ITEMS, updateItemImages } from \"@/lib/mock-db\";", "import { USERS, ITEMS, updateItemImages, getAllItems } from \"@/lib/mock-db\";");

code = code.replace("const [items, setItems] = useState([...ITEMS]);", `const [items, setItems] = useState([]);
  
  // Load items on mount
  useEffect(() => {
    setItems(getAllItems());
  }, []);`);

code = code.replace("import { useState } from \"react\";", "import { useState, useEffect } from \"react\";");

fs.writeFileSync(file, code);
