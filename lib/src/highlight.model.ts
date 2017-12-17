export interface HighlightOptions {
  theme?: string;
  path?: string;
  auto?: boolean;
}

export interface HighlightResult {
  language?: string;
  r?: number;
  second_best?: any;
  top?: any;
  value?: string;
}
