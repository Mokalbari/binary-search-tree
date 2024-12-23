import { AbstractTree } from "./abstract-tree.ts"
import { Node } from "./node.ts"

interface BinaryTreeInterface {
  prettyPrint: (node: Node, prefix: string, isLeft: boolean) => void
  insertValue: (value: number) => Node | null
}

export class BalancedBinaryTree
  extends AbstractTree
  implements BinaryTreeInterface
{
  constructor(data: number[]) {
    super(data)
    this.buildTree()
  }

  override buildTree(
    array = this.preparedArray,
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
    const node = new Node(array[mid])

    node.left = this.buildTree(array, start, mid - 1)
    node.right = this.buildTree(array, mid + 1, end)
    this.root = node

    return this.root
  }

  public prettyPrint(node: Node, prefix = "", isLeft = true) {
    if (!node) return

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
  }

  public insertValue(value: number, currentRoot = this.root) {
    if (!value) return this.root
    if (!currentRoot) return new Node(value)

    if (value < currentRoot.data) {
      currentRoot.left = this.insertValue(value, currentRoot.left)
    } else if (value > currentRoot.data) {
      currentRoot.right = this.insertValue(value, currentRoot.right)
    }

    return currentRoot
  }
}
