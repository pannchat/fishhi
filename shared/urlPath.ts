export default class UrlPath {
  static get calcFishTank() {
    return '/caclFishTank';
  }

  static speciesDetail(species: string, id: string) {
    return `/info/${species}/${id}`
  }
}