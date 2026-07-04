const fs = require('fs');

const file = 'client/src/lib/mock-db.ts';
let code = fs.readFileSync(file, 'utf8');

// Add updateItemImages function
if (!code.includes('updateItemImages')) {
  code += `
export function updateItemImages(itemId: number, newImages: string[]) {
  const item = ITEMS.find(i => i.id === itemId);
  if (item) {
    item.images = [...newImages];
    return true;
  }
  return false;
}

export function getAllItems() {
  return [...ITEMS];
}
`;
  fs.writeFileSync(file, code);
}
