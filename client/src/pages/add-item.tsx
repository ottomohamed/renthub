import { useState, useRef, useEffect } from "react";
import { useLocation, useParams, Link } from "wouter";
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
import { CheckCircle2, Loader2, ArrowLeft, Camera, ImagePlus, X } from "lucide-react";

const MIN_IMAGES = 2;
const MAX_IMAGES = 6;

export default function AddItem() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id?: string }>();
  const isEdit = Boolean(params.id);
  const itemId = params.id ? parseInt(params.id, 10) : null;

  const [loadingItem, setLoadingItem] = useState(isEdit);
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
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEdit || !itemId) return;
    (async () => {
      try {
        const res = await apiRequest("GET", `/api/items/${itemId}`);
        const data = await res.json();
        setTitleEs(data.titleEs || "");
        setDescription(data.description || "");
        setCategory(data.category || "");
        setPricePerDay(String(data.pricePerDay ?? ""));
        setCity(data.city || "");
        setImages(Array.isArray(data.images) ? data.images.slice(0, MAX_IMAGES) : []);
      } catch (err: any) {
        setError(err.message || "No se pudo cargar el anuncio.");
      } finally {
        setLoadingItem(false);
      }
    })();
  }, [isEdit, itemId]);

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (images.length >= MAX_IMAGES) {
      setUploadError(`Máximo ${MAX_IMAGES} fotos por anuncio.`);
      e.target.value = "";
      return;
    }

    if (file.size > 4.4 * 1024 * 1024) {
      setUploadError("La imagen es demasiado grande (máx. 4 MB). Prueba con una foto de menor resolución.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Error al subir la imagen.");
      }

      const blob = await res.json();
      setImages((prev) => [...prev, blob.url]);
    } catch (err: any) {
      setUploadError(err.message || "Error al subir la imagen. Inténtalo de nuevo.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  const itemFieldsValid = Boolean(
    titleEs.trim() &&
      description.trim() &&
      category &&
      pricePerDay &&
      Number(pricePerDay) > 0 &&
      city.trim() &&
      images.length >= MIN_IMAGES &&
      images.length <= MAX_IMAGES,
  );
  const ownerFieldsValid = Boolean(
    ownerName.trim() && ownerEmail.trim() && ownerPhone.trim() && ownerCity.trim(),
  );
  const isValid = isEdit ? itemFieldsValid : itemFieldsValid && ownerFieldsValid;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      if (isEdit && itemId) {
        await apiRequest("PATCH", `/api/items/${itemId}`, {
          titleEs: titleEs.trim(),
          description: description.trim(),
          category,
          pricePerDay: Number(pricePerDay),
          city: city.trim(),
          images,
        });
        setSuccess(true);
        setTimeout(() => setLocation("/seller-dashboard"), 1500);
      } else {
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
            images,
            specifications: {},
          },
        });
        setSuccess(true);
        setTimeout(() => setLocation("/"), 2000);
      }
    } catch (err: any) {
      setError(err.message || "Ha ocurrido un error al guardar el anuncio.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center border-gray-200">
          <CardContent className="p-8">
            <CheckCircle2 className="w-16 h-16 text-[#16A34A] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isEdit ? "Cambios guardados!" : "Anuncio publicado!"}
            </h2>
            <p className="text-gray-500">Redirigiendo...</p>
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
            {isEdit ? "Editar Anuncio" : "Publicar Anuncio"}
          </span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        {!isEdit && (
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
        )}

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
                <Input
                  id="city"
                  list="city-suggestions"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Escribe cualquier ciudad de España"
                  data-testid="input-item-city"
                />
                <datalist id="city-suggestions">
                  {MAJOR_CITIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div>
                <Label htmlFor="pricePerDay">Precio por día ()</Label>
                <Input id="pricePerDay" type="number" min="1" value={pricePerDay} onChange={(e) => setPricePerDay(e.target.value)} placeholder="150" data-testid="input-price" />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between">
                  <Label>Fotos del artículo ({images.length}/{MAX_IMAGES})</Label>
                  <span className="text-xs text-gray-500">Mínimo {MIN_IMAGES} fotos</span>
                </div>

                <div className="flex flex-wrap gap-3 mt-1">
                  {images.map((url, index) => (
                    <div key={url + index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img src={url} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black/80"
                        data-testid={`button-remove-image-${index}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {images.length < MAX_IMAGES && (
                    <>
                      <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelected}
                        data-testid="input-file-gallery"
                      />
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleFileSelected}
                        data-testid="input-file-camera"
                      />

                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        disabled={uploading}
                        className="w-24 h-24 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors disabled:opacity-50"
                        data-testid="button-upload-gallery"
                      >
                        <ImagePlus className="w-5 h-5" />
                        <span className="text-[10px] font-medium text-center px-1">Galería</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        disabled={uploading}
                        className="w-24 h-24 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors disabled:opacity-50"
                        data-testid="button-upload-camera"
                      >
                        <Camera className="w-5 h-5" />
                        <span className="text-[10px] font-medium text-center px-1">Cámara</span>
                      </button>
                    </>
                  )}
                </div>

                {uploading && (
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" /> Subiendo imagen...
                  </p>
                )}
                {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
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
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Guardando...
            </>
          ) : isEdit ? (
            "Guardar Cambios"
          ) : (
            "Publicar Anuncio"
          )}
        </Button>
      </form>
    </div>
  );
}