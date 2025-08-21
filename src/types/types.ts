export type TCoin = {
  image: string;
  symbol: string;
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export type TButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export type TCoinState = {
  coins: TCoin[];
  page: number;
  perPage: number;
  loading: boolean;
  hasMore: boolean;
  fetchCoins: () => Promise<void>;
};

export type TUserState = {
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
};

export type TAllCoinsState = {
  coins: TCoin[];
  loading: boolean;
  error: string | null;
  fetchAllCoins: () => Promise<void>;
};

export type TOption = {
  label: string;
  value: string;
};

export type TSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: TOption[];
  className?: string;
};

export type TInputFieldProps = {
  label: string;
  type?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  width?: string;
};

export type TSortOrder = "asc" | "desc";

export type TSortKey = "name" | "price";

export type TPageType = "home" | "trade";

export type TTradeState = {
  selectedCoin: string;
  isCryptoFirst: boolean;
  inputValue: string;
  outputValue: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};
