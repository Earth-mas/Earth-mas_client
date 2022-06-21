export interface ISupportDetailUIProps {
  data: {
    url: string;
    title: string;
    wishamount: number;
    currentamount: number;
    user: {
      name: string;
      url: string;
    };
    description: string | Node;
  };
  percent: number;
  leftDay: number;
  deleteContent: any;
}
