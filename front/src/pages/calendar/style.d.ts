export interface MarkedDate {
  selected: boolean;
  selectedColor: string;
  selectedTextColor: string;
  marked: boolean;
  dots: {key: string; color: string; selectedDotColor?: string}[];
}

export interface ItemProps {
  name: string;
  height: number;
  day: string;
  id?: number;
  complete?: boolean;
  color?: string;
  startAt?: string;
  endAt?: string;
  board?: string;
  content?: string;
  period?: string;
  alerts?: string[];
}

export interface ItemsData {
  [key: string]: ItemProps[];
}

export interface DayData {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}
