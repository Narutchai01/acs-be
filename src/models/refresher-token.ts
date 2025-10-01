export interface RefresherTokenModel {
  id: string;
  token: string;
  userId: number;
  expiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRefresherTokenModel {
  id: string;
  userId: number;
  token: string;
  expiry: Date;
}
