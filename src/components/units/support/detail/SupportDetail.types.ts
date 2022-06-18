export interface ISupportDetailUIProps {
  data: {
    url: string | undefined;
    title: string;
    wishamount: number;
    currentamount: number;
    user: {
      name: string;
    };
    description: string | Node;
  };
  percent: number;
  leftDay: number;
  deleteContent: any;
}
