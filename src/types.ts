export interface Payment {
  id: string;
  name: string;
  amount: string;
  dueDate: string;
  category: string;
  paid: boolean;
}