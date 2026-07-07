import { useState } from "react";
import { useLocation, Link } from "wouter";
import { CATEGORIES, MAJOR_CITIES } from "@/lib/spain-data";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react";

export default function AddItem() {
  const [, setLocation] = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerCity, setOwnerCity] = useState("");

  const [titleEs, setTitleEs] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const isValid =
    ownerName.trim() &&
    ownerEmail.trim() &&
    ownerPhone.trim() &&
    ownerCity.trim() &&
    titleEs.trim() &&
    description.trim() &&
    category &&
    pricePerDay &&
    Number(pricePerDay) > 0 &&
    city.trim() &&
    imageUrl.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await apiRequest("POST", "/api/items", {
        owner: {
          name: ownerName.trim(),
          email: ownerEmail.trim(),
          phoneNumber: ownerPhone.trim(),
          city: ownerCity.trim(),
        },
        item: {
          titleEs: titleEs.trim(),
          description: description.trim(),
          features: [],
          category,
          pricePerDay: Number(pricePerDay),
          currency: "",
          city: city.trim(),
          country: "España",
          images: [imageUrl.trim()],
          specifications: {},
        },
      });

      setSuccess(true);
      setTimeout(() => setLocation("/"), 2000);
    } catch (err: any) {
      setError(err.message || "Ha ocurrido un error al publicar el anuncio.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-gray-200">
          <CardContent className="p-8">
            <CheckCircle2 className="w-16 h-16 text-[#16A34A] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Anuncio publicado!</h2>
            <p className="text-gray-500">Redirigiendo a la página principal...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <header className="bg-[#1B2A41] text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto flex items-center gap-4 max-w-3xl">
          <Link href="/seller-dashboard">
            <a className="flex items-center gap-2 text-white hover:text-[#FF6B35] transition-colors" data-testid="link-back">
              <ArrowLeft className="w-5 h-5" />
            </a>
          </Link>
          <span className="text-xl font-bold flex items-center gap-1">
            <span className="bg-[#E85A2A] text-black px-2 py-1 rounded font-black tracking-tighter">RH</span>
            Publicar Anuncio
          </span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Tus datos de contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerName">Nombre o empresa</Label>
                <Input id="ownerName" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Ej: Maquinaria García" data-testid="input-owner-name" />
              </div>
              <div>
                <Label htmlFor="ownerEmail">Correo electrónico</Label>
                <Input id="ownerEmail" type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" data-testid="input-owner-email" />
              </div>
              <div>
                <Label htmlFor="ownerPhone">Teléfono</Label>
                <Input id="ownerPhone" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="+34 6XX XXX XXX" data-testid="input-owner-phone" />
              </div>
              <div>
                <Label htmlFor="ownerCity">Tu ciudad</Label>
                <Input id="ownerCity" value={ownerCity} onChange={(e) => setOwnerCity(e.target.value)} placeholder="Madrid" data-testid="input-owner-city" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Detalles del artículo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="titleEs">Título del anuncio</Label>
              <Input id="titleEs" value={titleEs} onChange={(e) => setTitleEs(e.target.value)} placeholder="Ej: Excavadora de Orugas Caterpillar 320" data-testid="input-title" />
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe el estado, condiciones de entrega, fianza requerida..." data-testid="input-description" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">Ciudad del artículo</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger id="city" data-testid="select-city">
                    <SelectValue placeholder="Selecciona una ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {MAJOR_CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="pricePerDay">Precio por día ()</Label>
                <Input id="pricePerDay" type="number" min="1" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="150" data-testid="input-price" />
              </div>

              <div>
                <Label htmlFor="imageUrl">URL de una imagen</Label>
                <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." data-testid="input-image" />
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full bg-[#FF6B35] hover:bg-[#FF6B35] text-black font-bold h-12 rounded-md border-b-4 border-[#A83F1A] transition-all duration-100 active:translate-y-1 active:border-b-0 disabled:opacity-50 disabled:active:translate-y-0"
          data-testid="button-submit"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Publicando...
            </>
          ) : (
            "Publicar Anuncio"
          )}
        </Button>
      </form>
    </div>
  );
}