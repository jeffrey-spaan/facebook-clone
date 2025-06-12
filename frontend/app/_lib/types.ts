export interface PersonCreateDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Format: YYYY-MM-DD
  gender: 'M' | 'F' | 'O';
}

export interface AuthRegisterDto {
  person: PersonCreateDto;
  username: string;
  email: string;
  password: string;
}