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

export interface IAquaplant extends ICreature {
  id: number;
  images: ICreatureImage[];
}

export interface ISpecies {
  id: number;
  name: string;
  thumbnail: ICreatureImage[];
  minPH: number;
  maxPH: number;
  minTemperature: number;
  maxTemperature: number;
  description: string;
  standardLength?: number;
}

export interface ISpeciesList {
  species: string;
  data: ISpecies[];
}