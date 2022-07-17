export interface ISupportCompleteProps {
  paymentData: {
    data: {
      amount: number;
      donation: {
        title: string;
        user: {
          name: string;
        };
      };
    };
  };
}
