export interface JwtPayload {
  sub: string; // ID пользователя
  username: string;
  role: string;
  iat?: number; // Время выдачи токена
  exp?: number; // Время истечения токена
}
