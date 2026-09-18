import modelsDataRaw from "./models_data.json";

export interface ModelImageItem {
  id: string;
  modelId: string;
  modelName: string;
  filename: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: "portrait" | "landscape" | "square";
  category: "RUNWAY" | "EDITORIAL" | "PORTRAIT";
  tag: string;
  displayOrder: number;
}

export interface ModelGroupItem {
  id: string;
  name: string;
  number: string;
  coverImage: string;
  thumbImage: string;
  imageCount: number;
  images: ModelImageItem[];
}

export interface GalleryDataset {
  totalImages: number;
  totalModels: number;
  duplicatesCount: number;
  models: ModelGroupItem[];
  allImages: ModelImageItem[];
}

export const MODELS_DATA: GalleryDataset = modelsDataRaw as GalleryDataset;

export const getAllModels = (): ModelGroupItem[] => MODELS_DATA.models;

export const getAllImages = (): ModelImageItem[] => MODELS_DATA.allImages;

export const getModelById = (id: string): ModelGroupItem | undefined =>
  MODELS_DATA.models.find((m) => m.id === id);

export const getImagesByCategory = (category: string): ModelImageItem[] => {
  if (category === "ALL") return MODELS_DATA.allImages;
  return MODELS_DATA.allImages.filter((img) => img.category === category);
};
