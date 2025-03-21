const errorMessages: { [key: string]: string } = {
  InvalidPhoneNumberFormat: "Podaj poprawny numer telefonu",
  InvalidEmailOrPassword: "Niepoprawny email lub hasło",
  ClientAlreadyExist: "Klient juz istnieje",
  NotConfirmedEmail:
    "Email nie został potwierdzony. Sprawdź swoją skrzynkę email",
  EmailAlreadyConfirmed: "Email juz zostal potwierdzony",
  ConfirmTokenDontExist: "Token potwierdzenia nie istnieje",
  TokenExpired: "Token wygasł",
  UserDontExist: "Uzytkownik nie istnieje",
  UserAlreadyExists: "Uzytkownik juz istnieje",
  SalonNameAlreadyExists: "Salon o takiej nazwie juz istnieje",
  ClientNotFound: "Klient nie znaleziony",
  Unauthorized: "Brak dostępu",
};

export function getErrorMessage(errorCode: string): string {
  return errorMessages[errorCode] ?? "Ooops coś poszło nie tak";
}
