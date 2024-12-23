import { AbstractTree } from "./abstract-tree.ts"
import { Node } from "./node.ts"

export class BalancedBinaryTree extends AbstractTree {
  constructor(data: number[]) {
    super(data)
  }

  override buildTree(
    array: number[],
    start = 0,
    end = array.length - 1
  ): Node | null {
    /*
    init start = 0, end = arr.length -1, mid = start + end / 2
    create new node with data set at mid
    recursively do following steps:
      calculate mid of left subarray and set new node data at mid
      calculate mid of right subarray and set new node data at mid
      end when the start is > end
    */
    if (start > end) return null
    const mid = Math.floor((start + end) / 2)
    const node = new Node(mid)

    node.left = this.buildTree(array, start, mid - 1)
    node.right = this.buildTree(array, mid + 1, end)
    return this.root ?? null
  }
}
