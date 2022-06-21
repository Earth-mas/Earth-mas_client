export interface ISupportDetailUIProps {
  data: {
    url: string;
    title: string;
    wishamount: number;
    currentamount: number;
    user: {
      name: string;
      url: string;
      id: string;
    };
    description: string | Node;
  };
  percent: number;
  leftDay: number;
  deleteContent: any;
}
