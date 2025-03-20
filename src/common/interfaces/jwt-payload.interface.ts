export interface JwtPayload {
  sub: string; // ID пользователя
  email: string;
  iat?: number; // Время выдачи токена
  exp?: number; // Время истечения токена
}
