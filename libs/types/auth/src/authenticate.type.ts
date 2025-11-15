export interface SignUpOptions {
  email: string;
  password: string;
  name: string;
}

export interface SignInOptions {
  email: string;
  password: string;
}

export interface MagicLinkSignInOptions {
  email: string;
  name: string;
}