export interface RequestOption {
  auto?: boolean;
  plucker?: string[];
  successTip?: string;
  failedTip?: string;
  method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
}

export enum ResponseCode {
	success = 0,
	token_will_expire = 1,
	no_user_info = 100,
	token_has_expired = 106,
	user_not_exist = 101,
	password_error = 102,
	valid_token = 105,
  http_error = 500,
  no_schedule = 180
}

export type HttpState = 'pending' | 'success' | 'failed';