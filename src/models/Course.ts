export type Course = {
  id: number;
  name: string;
  description: string;
  creator: {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
};
