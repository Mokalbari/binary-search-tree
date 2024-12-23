export type Nullable<T> = T | null

export class Node<T> {
  public data: number
  public left: Nullable<Node<T>>
  public right: Nullable<Node<T>>

  constructor(data: number) {
    this.data = data
    this.left = null
    this.right = null
  }
}
