const fs = require('fs');
let file = 'client/src/lib/mock-db.ts';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('whatsappClicks')) {
  code = code.replace(
    "inquiries: number;",
    "inquiries: number;\n  whatsappClicks: number;\n  phoneClicks: number;"
  );
  
  code = code.replace(
    "inquiries: item.inquiries || Math.floor(Math.random() * 50)",
    "inquiries: item.inquiries || Math.floor(Math.random() * 50),\n          whatsappClicks: item.whatsappClicks || Math.floor(Math.random() * 30),\n          phoneClicks: item.phoneClicks || Math.floor(Math.random() * 20)"
  );
  
  // Add FREE plan
  code = code.replace(
    "export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {",
    "export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {\n  'FREE': { name: 'Gratis', price: 0, bumpFrequencyHours: 0, maxListings: 3 },"
  );
  
  fs.writeFileSync(file, code);
}
