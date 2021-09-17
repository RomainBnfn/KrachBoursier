export default interface DrinkSerieData {
  name: String; // Nom de la boisson
  series: {
    name: Date; // Date
    value: number; // Prix
  }[];
}
