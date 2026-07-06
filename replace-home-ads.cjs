const fs = require('fs');

let file = 'client/src/pages/home.tsx';
let code = fs.readFileSync(file, 'utf8');

const oldStr = `        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500">Prueba a buscar con otras palabras o cambiar de ciudad.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full max-w-6xl">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className="bg-white border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors group cursor-pointer flex flex-col sm:flex-row rounded-xl w-full"
                onClick={() => setLocation(\`/item/\${item.id}\`)}
                data-testid={\`card-item-\${item.id}\`}
              >
                {/* Image Section - Large side image like Amazon list view */}
                <div className="relative w-full sm:w-1/3 md:w-1/4 xl:w-1/5 min-h-[200px] bg-gray-100 flex items-center justify-center p-4 shrink-0">
                  <img 
                    src={item.images[0]} 
                    alt={item.titleEs} 
                    className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Sponsored badge if applicable */}
                  {item.isPromoted && (
                    <div className="mb-2 flex items-center gap-1">
                      <span className="text-xs text-gray-500 font-medium">Patrocinado</span>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                  )}

                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-lg md:text-xl font-medium line-clamp-2 leading-tight text-[#007185] group-hover:text-[#c45500] group-hover:underline transition-colors">
                      {item.titleEs}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-0 flex-1">
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-[#ffa41c]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={\`h-4 w-4 \${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}\`} />
                        ))}
                      </div>
                      <span className="text-[#007185] group-hover:text-[#c45500] group-hover:underline text-sm ml-1">
                        {item.totalReviews}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm align-top">€</span>
                      <span className="text-3xl font-medium text-gray-900">{item.pricePerDay}</span>
                      <span className="text-sm text-gray-500">/día</span>
                    </div>
                    
                    {item.available && (
                      <div className="text-xs md:text-sm text-[#007600] font-bold mt-2">
                        Entrega Disponible
                      </div>
                    )}
                    
                    <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {item.description}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}`;

const newStr = `        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500">Prueba a buscar con otras palabras o cambiar de ciudad.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Main Listings */}
            <div className="flex-1 flex flex-col gap-6 max-w-5xl">
              {items.map((item, index) => (
                <div key={item.id}>
                  <Card 
                    className="bg-white border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors group cursor-pointer flex flex-col sm:flex-row rounded-xl w-full"
                    onClick={() => setLocation(\`/item/\${item.id}\`)}
                    data-testid={\`card-item-\${item.id}\`}
                  >
                    {/* Image Section - Large side image like Amazon list view */}
                    <div className="relative w-full sm:w-1/3 md:w-1/4 xl:w-1/5 min-h-[200px] bg-gray-100 flex items-center justify-center p-4 shrink-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.titleEs} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col">
                      {/* Sponsored badge if applicable */}
                      {item.isPromoted && (
                        <div className="mb-2 flex items-center gap-1">
                          <span className="text-xs text-gray-500 font-medium">Patrocinado</span>
                          <Info className="w-3 h-3 text-gray-400" />
                        </div>
                      )}

                      <CardHeader className="p-0 mb-2">
                        <CardTitle className="text-lg md:text-xl font-medium line-clamp-2 leading-tight text-[#007185] group-hover:text-[#c45500] group-hover:underline transition-colors">
                          {item.titleEs}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="p-0 flex-1">
                        <div className="flex items-center gap-1 mb-3">
                          <div className="flex text-[#ffa41c]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={\`h-4 w-4 \${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}\`} />
                            ))}
                          </div>
                          <span className="text-[#007185] group-hover:text-[#c45500] group-hover:underline text-sm ml-1">
                            {item.totalReviews}
                          </span>
                        </div>
                        
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className="text-sm align-top">€</span>
                          <span className="text-3xl font-medium text-gray-900">{item.pricePerDay}</span>
                          <span className="text-sm text-gray-500">/día</span>
                        </div>
                        
                        {item.available && (
                          <div className="text-xs md:text-sm text-[#007600] font-bold mt-2">
                            Entrega Disponible
                          </div>
                        )}
                        
                        <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                          {item.description}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                  
                  {/* Insert AdSense banner after every 3 items */}
                  {(index + 1) % 3 === 0 && index !== items.length - 1 && (
                    <div className="w-full flex justify-center mt-6">
                      <AdSensePlaceholder width="100%" height="120px" className="max-w-[800px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Right Sidebar Ads (AdSense) */}
            <div className="hidden lg:block w-[300px] shrink-0 space-y-6">
              <div className="sticky top-[150px]">
                <AdSensePlaceholder width="300px" height="250px" className="mb-6" />
                <AdSensePlaceholder width="300px" height="600px" />
              </div>
            </div>
          </div>
        )}`;

code = code.replace(oldStr, newStr);
fs.writeFileSync(file, code);
