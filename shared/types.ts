export type WithProperty<K extends string, V = {}> = {
  [P in K]: V
}