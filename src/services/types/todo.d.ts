export type Todo = {
  id: string;
  title: string;
  createdAt: Date;
  doneAt?: Date | null;
};
