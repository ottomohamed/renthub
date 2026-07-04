const fs = require('fs');
let file = 'client/src/lib/mock-db.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('views: number')) {
  // Add stats fields to Item interface
  code = code.replace(
    "isActive: boolean;",
    "isActive: boolean;\n  views: number;\n  clicks: number;\n  inquiries: number;"
  );
  
  // Add random stats to existing ITEMS
  code = code.replace(
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 2), isActive: true, trialEndsOn: null",
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 2), isActive: true, trialEndsOn: null, views: 1250, clicks: 340, inquiries: 12"
  );
  code = code.replace(
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 5), isActive: true, trialEndsOn: null",
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 5), isActive: true, trialEndsOn: null, views: 890, clicks: 156, inquiries: 5"
  );
  code = code.replace(
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 12), isActive: true, trialEndsOn: null",
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 12), isActive: true, trialEndsOn: null, views: 450, clicks: 89, inquiries: 2"
  );
  code = code.replace(
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 24), isActive: true, trialEndsOn: null",
    "lastBumpTime: new Date(Date.now() - 1000 * 60 * 60 * 24), isActive: true, trialEndsOn: null, views: 2300, clicks: 410, inquiries: 28"
  );
  
  // Update reload function to persist stats
  code = code.replace(
    "trialEndsOn: item.trialEndsOn ? new Date(item.trialEndsOn) : null",
    "trialEndsOn: item.trialEndsOn ? new Date(item.trialEndsOn) : null,\n          views: item.views || Math.floor(Math.random() * 2000),\n          clicks: item.clicks || Math.floor(Math.random() * 500),\n          inquiries: item.inquiries || Math.floor(Math.random() * 50)"
  );
  
  fs.writeFileSync(file, code);
}
