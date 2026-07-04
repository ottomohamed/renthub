const fs = require('fs');
let file = 'client/src/lib/mock-db.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('function reloadFromStorage()')) {
  const insertCode = `
export function reloadFromStorage() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('renthub_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        ITEMS = parsed.map((item: any) => ({
          ...item,
          lastBumpTime: new Date(item.lastBumpTime),
          trialEndsOn: item.trialEndsOn ? new Date(item.trialEndsOn) : null
        }));
      }
    } catch (e) {}
  }
}
`;
  
  code = code.replace("export function saveToStorage() {", insertCode + "\nexport function saveToStorage() {");
  
  // Update getItemById and searchItems to reload first
  code = code.replace("export function getItemById(itemId: number | string) {", "export function getItemById(itemId: number | string) {\n  reloadFromStorage();");
  code = code.replace("export function searchItems(query: string = \"\", city: string = \"\") {", "export function searchItems(query: string = \"\", city: string = \"\") {\n  reloadFromStorage();");
  
  fs.writeFileSync(file, code);
}
