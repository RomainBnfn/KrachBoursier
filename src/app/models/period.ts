import DrinkData from './drink-data';

export default interface Period {
  drinks: DrinkData[];
  isKrash: boolean;
  date: Date;
}
