const PREFIX = '/static/images';

export default class ImagePath {
  static get back() {
    return `${PREFIX}/back.svg`;
  }

  static get search2(){
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
    return `${PREFIX}/aquarium2.svg`
  }
}