export type JoinRequest = {
  id: number;
  courseId: number;
  user: {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
  };
  status: number;
  statusDescription: string;
  updatedAt: string;
};
