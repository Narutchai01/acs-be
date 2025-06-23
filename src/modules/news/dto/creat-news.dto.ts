export interface CreateNewsDto {
  title: string;
  detail: string;
  startDate: Date;
  categoryId: number;
  dueDate: Date | null;
}
