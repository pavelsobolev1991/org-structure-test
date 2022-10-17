export type Node = {
  key: number | null;
  name: string;
  children?: Node[];
};

export type NodeArr = Node[];