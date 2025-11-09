import type { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role: string;
  provider: string;
}