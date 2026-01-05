interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface ForgotPasswordPayload {
  name: string;
}

interface VerifyTokenPayload {
  token: string;
}
interface ResetPasswordPayload {
  token: string;
  password: string;
}

 interface AccessTokenPayload {
  exp: number;
  iat?: number;
  sub?: string;
}