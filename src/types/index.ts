export interface RegisterData {
  account: {
    email: string;
    password: string;
    repeatPassword: string;
  };
  personal: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  salon: {
    name: string;
  };
}
