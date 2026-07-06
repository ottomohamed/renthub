const fs = require('fs');

let file = 'client/src/pages/item-detail.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldStr = `      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto p-2 max-w-[1400px]">
          <div className="text-xs text-gray-500">
            <Link href="/"><a className="hover:underline hover:text-[#007185]">Inicio</a></Link> › 
            <span className="mx-1">Maquinaria Pesada</span> › 
            <span className="mx-1 capitalize">{item.category}</span> › 
            <span className="mx-1 text-gray-400">{item.titleEs}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 max-w-[1400px]">`;

const newStr = `      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto p-2 max-w-[1400px]">
          <div className="text-xs text-gray-500">
            <Link href="/"><a className="hover:underline hover:text-[#007185]">Inicio</a></Link> › 
            <span className="mx-1">Maquinaria Pesada</span> › 
            <span className="mx-1 capitalize">{item.category}</span> › 
            <span className="mx-1 text-gray-400">{item.titleEs}</span>
          </div>
        </div>
      </div>
      
      {/* Top Banner AdSense */}
      <div className="container mx-auto p-4 max-w-[1400px] flex justify-center">
        <AdSensePlaceholder width="100%" height="90px" className="max-w-[970px]" />
      </div>

      <div className="container mx-auto px-4 pb-6 md:px-6 max-w-[1400px]">`;

code = code.replace(oldStr, newStr);

const importStr = `import { AdSensePlaceholder } from "@/components/AdSensePlaceholder";`;
if (!code.includes(importStr)) {
  code = code.replace(`import { AmazonReviews } from "@/components/AmazonReviews";`, `import { AmazonReviews } from "@/components/AmazonReviews";\n${importStr}`);
}

// Add sidebar ad next to description
const descOld = `          <div>
            <h2 className="text-[#c45500] text-xl font-bold mb-4 font-sans">Descripción del equipo</h2>
            <div className="text-base text-gray-800 leading-relaxed whitespace-pre-line max-w-4xl">
              {item.description}
            </div>
          </div>`;

const descNew = `          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-[#c45500] text-xl font-bold mb-4 font-sans">Descripción del equipo</h2>
              <div className="text-base text-gray-800 leading-relaxed whitespace-pre-line max-w-4xl">
                {item.description}
              </div>
            </div>
            <div className="w-full lg:w-[300px] shrink-0 mt-8 lg:mt-0">
              <AdSensePlaceholder width="300px" height="250px" className="mx-auto" />
            </div>
          </div>`;

code = code.replace(descOld, descNew);

fs.writeFileSync(file, code);
