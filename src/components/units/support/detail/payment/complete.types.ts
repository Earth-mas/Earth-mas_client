export interface ISupportCompleteProps {
  completeData: {
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
