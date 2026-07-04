const fs = require('fs');
const file = 'client/src/lib/mock-db.ts';
let code = fs.readFileSync(file, 'utf8');

// replace "export const ITEMS: Item[] = [" with "export let ITEMS: Item[] = ["
code = code.replace("export const ITEMS: Item[] = [", "export let ITEMS: Item[] = [");

// Add localstorage hydration
const initStorageCode = `
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('renthub_items');
    if (saved) {
      const parsed = JSON.parse(saved);
      // restore dates
      ITEMS = parsed.map((item: any) => ({
        ...item,
        lastBumpTime: new Date(item.lastBumpTime),
        trialEndsOn: item.trialEndsOn ? new Date(item.trialEndsOn) : null
      }));
    }
  } catch (e) {}
}

export function saveToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('renthub_items', JSON.stringify(ITEMS));
    } catch (e) {}
  }
}
`;

if (!code.includes('renthub_items')) {
  // insert before "export function runScheduledBumps()"
  code = code.replace("export function runScheduledBumps() {", initStorageCode + "\nexport function runScheduledBumps() {");
  
  // update updateItemImages
  code = code.replace(
    "item.images = [...newImages];\n    return true;",
    "item.images = [...newImages];\n    saveToStorage();\n    return true;"
  );
  
  fs.writeFileSync(file, code);
}
