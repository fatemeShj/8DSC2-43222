export type BankValidation = {
  banks: BankInfo[];
  correlation_id: string;
  info: {
    en: {
      message: string;
    };
    fa: {
      message: string;
    };
  };
  result_code: number;
};

type BankInfo = {
  bankCode: string;
  bankDisplayOrder: number;
  bankIcon: string;
  bankId: number;
  bankName: {
    en: string;
    fa: string;
  };
  bankRetryCount: number;
  classPath: number;
  createdDate: number;
  createdUser: number;
  location: string;
  revenueShareFlag: number;
  selected: boolean;
  status: number;
  url: string;
};

type BankError = {
  correlation_id: string;
  info: {
    en: {
      message: string;
    };
    fa: {
      message: string;
    };
  };
  result_code: number;
};

export type BankResponse = BankValidation | BankError;
