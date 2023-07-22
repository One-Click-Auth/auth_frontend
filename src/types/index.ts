export type ApiResponse = {
  is_ok: boolean;
  status: number;
  msg: string;
  detail?: string;
};

export type UserResponse = {
  is_pool: boolean;
  fa2: boolean;
  status: number;
  msg: string;
  detail?: string;
}