export class Node {
  public data: number
  public left: Node | null
  public right: Node | null

  constructor(data: number) {
    this.data = data
    this.left = null
    this.right = null
  }
}
