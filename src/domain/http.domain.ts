export interface RequestOption {
  auto?: boolean;
  plucker?: string[];
  successTip?: string;
  method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
}

export type HttpState = 'pending' | 'success' | 'failed';