import imgMomentoAdoracao from "@/assets/IMG_4144.webp";
import imgBandaLouvor from "@/assets/INCENDS-57.webp";
import imgMomentoOracao from "@/assets/img-9999.webp";
import imgComunidadeReunida from "@/assets/IMG_8249.webp";
import imgJuventudeIncendiada from "@/assets/INCENDS-73.webp";
import imgMomentoEspecial from "@/assets/IMG_8221.webp";
import imgUnidosEmCristo from "@/assets/IMG_3708.webp";

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type GalleryEvent = {
  slug: string;
  title: string;
  description: string;
  year: number;
  category: string;
  cover: string;
  photos: GalleryPhoto[];
};

type GalleryPhotoRaw = Omit<GalleryPhoto, "src"> & {
  src: string;
};

type GalleryEventRaw = Omit<GalleryEvent, "cover" | "photos"> & {
  cover: string;
  photos: GalleryPhotoRaw[];
};

type GalleryResponse = {
  events: GalleryEventRaw[];
};

const galleryAssetMap: Record<string, string> = {
  "momento-adoracao": imgMomentoAdoracao,
  "banda-louvor": imgBandaLouvor,
  "momento-oracao": imgMomentoOracao,
  "comunidade-reunida": imgComunidadeReunida,
  "juventude-incendiada": imgJuventudeIncendiada,
  "momento-especial": imgMomentoEspecial,
  "unidos-em-cristo": imgUnidosEmCristo,
};

let cache: GalleryEvent[] | null = null;

const resolveAsset = (key: string): string => galleryAssetMap[key] ?? key;

const normalizeEvents = (events: GalleryEventRaw[]): GalleryEvent[] =>
  events.map((event) => ({
    ...event,
    cover: resolveAsset(event.cover),
    photos: event.photos.map((photo) => ({
      ...photo,
      src: resolveAsset(photo.src),
    })),
  }));

export const getGalleryEvents = async (): Promise<GalleryEvent[]> => {
  if (cache) return cache;

  const response = await fetch("/data-events.json");
  if (!response.ok) {
    throw new Error("Não foi possível carregar os eventos da galeria.");
  }

  const data = (await response.json()) as GalleryResponse;
  cache = normalizeEvents(data.events);
  return cache;
};

export const getGalleryEventBySlug = async (
  slug: string,
): Promise<GalleryEvent | null> => {
  const events = await getGalleryEvents();
  return events.find((event) => event.slug === slug) ?? null;
};
