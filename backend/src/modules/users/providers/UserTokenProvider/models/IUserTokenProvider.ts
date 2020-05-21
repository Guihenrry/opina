export default interface IJwtTokenProvider {
  generateToken(user_id: string): string;
  getUserIdByToken(token: string): string | undefined;
}
