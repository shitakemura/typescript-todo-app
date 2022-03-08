export const FILTER_VALUES = ["ALL", "COMPLETED", "NOT COMPLETED"] as const;
type FilterTupel = typeof FILTER_VALUES;
export type Filter = FilterTupel[number];
