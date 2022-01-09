export default class UrlPath {
  static get calcFishTank() {
    return '/caclFishTank';
  }

  static get Search() {
    return '/search';
  }

  static get FishInfo() {
    return '/info/fish';
  }

  static speciesDetail(species: string, id: string) {
    return `/info/${species}/${id}`;
  }
}
