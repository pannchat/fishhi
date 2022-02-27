export interface ICreature {
  name: string;
  min_temperature: number;
  max_temperature: number;
  min_pH: number;
  max_pH: number;
  description: string;
}

interface ICreatureImage {
  image_url: string;
}

export interface ISuppliesItem {
  id: number;
  product_name: string;
  thumbnail?: string;
}

export interface IAquaplant extends ICreature {
  id: number;
  images: ICreatureImage[];
}

export interface ISpecies {
  id: number;
  thumbnail: string;
  name?: string;
  product_name?: string;
  minPH?: number;
  maxPH?: number;
  minTemperature?: number;
  maxTemperature?: number;
  description?: string;
  standardLength?: number;
}

export interface ISpeciesList {
  species: string;
  data: ISpecies[];
}

export interface IContentsParams {
  offset?: number;
  limit?: number;
}

export interface IImage {
  image_url: string;
}

export interface ISupplyRetriveData {
  id: number;
  category: string;
  product_name: string;
  manufacturer: string;
  manual_text: string;
  base_medicine: string;
  standard_amount: number;
  input_amount: number;
  input_unit: string;
  disease: string;
  source: string;
  source_url: string;
  images?: IImage[];
  spec?: any;
  pump_amount?: any;
}
