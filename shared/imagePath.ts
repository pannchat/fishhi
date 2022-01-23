const PREFIX = '/static/images';

export default class ImagePath {
  static get back() {
    return `${PREFIX}/back.svg`;
  }

  static get Search() {
    return `${PREFIX}/search.png`;
  }

  static get search2() {
    return `${PREFIX}/search2.svg`;
  }

  static get aquarium() {
    return `${PREFIX}/aquarium.svg`;
  }

  static get aquaPlant() {
    return `${PREFIX}/aquaPlant.svg`;
  }

  static get fish() {
    return `${PREFIX}/fish.svg`;
  }

  static get aquarium2() {
    return `${PREFIX}/aquarium2.svg`;
  }

  static get thumb() {
    return `${PREFIX}/thumb.jpeg`;
  }

  static get thumb2() {
    return `${PREFIX}/thumb2.jpeg`;
  }

  static get fishes() {
    return `${PREFIX}/fishes.png`;
  }

  static get home() {
    return `${PREFIX}/home.png`;
  }

  static get shrimp() {
    return `${PREFIX}/shrimp.jpeg`;
  }

  static get fishIcon() {
    return `${PREFIX}/fish_icon.png`;
  }

  static get warning() {
    return `${PREFIX}/warning.png`;
  }

  static arrow(direction: 'right' | 'left' | 'up' | 'down') {
    return `${PREFIX}/arrow_${direction}.png`;
  }
}
