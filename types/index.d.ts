export interface CardType {
  id?: string;
  term?: string;
  definition?: string;
  setId?: string;
}

export interface SetType {
  id?: string;
  title?: string;
  description?: string;
  created_at?: Date;
  creatorId?: String;
  card?: CardType[];
}
