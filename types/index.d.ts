export interface CardType {
  id?: string;
  term?: string;
  definition?: string;
  setId?: string;
  order?: number
}


export interface SetType {
  id?: string;
  title?: string;
  description?: string;
  created_at?: Date;
  creatorId?: String;
  card?: CardType[];
  user: UserType
}

export interface UserType {
  id?: string,
  created_at?: Date,
  email?: string
  name?: string
  set?: SetType[]
}