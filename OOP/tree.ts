import { AbstractTree } from "./abstract-tree.ts"
import { Node } from "./node.ts"

interface BinaryTreeInterface {
  prettyPrint: (node: Node, prefix: string, isLeft: boolean) => void
  insert: (value: number, currentRoot: Node) => Node | null
  delete: (value: number) => void
  find: (value: number) => Node | null
  levelOrderTraversal: (method: "recursion" | "iteration") => number[]
  depthFirstTraversal: (order: "pre" | "in" | "post") => number[]
  height: (value: number) => number
  depth: (value: number) => number
  isBalanced: () => boolean
  reBalance: () => Node | null
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

  public insert(value: number, currentRoot = this.root) {
    if (!value) return this.root
    if (!currentRoot) return new Node(value)

    if (value < currentRoot.data) {
      currentRoot.left = this.insert(value, currentRoot.left)
    } else if (value > currentRoot.data) {
      currentRoot.right = this.insert(value, currentRoot.right)
    }

    return currentRoot
  }

  #findSucessor(node: Node): number {
    let minValue = node.data
    while (node.left) {
      minValue = node.left.data
      node = node.left
    }
    return minValue
  }
  #deleteNode(root: Node | null, value: number): Node | null {
    // Base case: empty tree or value not found
    if (!root) return null

    // Recursively search for the node to delete
    if (value < root.data) {
      root.left = this.#deleteNode(root.left, value)
      return root
    }
    if (value > root.data) {
      root.right = this.#deleteNode(root.right, value)
      return root
    }

    // Node found, handle the three cases
    // Case 1: Node has no children (leaf node)
    if (!root.left && !root.right) {
      return null
    }

    // Case 2: Node has only one child
    if (!root.left) return root.right
    if (!root.right) return root.left

    // Case 3: Node has two children
    // Find the smallest value in the right subtree (successor)
    root.data = this.#findSucessor(root.right)
    // Delete the successor
    root.right = this.#deleteNode(root.right, root.data)

    return root
  }

  public delete(value: number): void {
    this.root = this.#deleteNode(this.root, value)
  }

  public find(value: number) {
    if (!this.root) return null

    let temp: Node | null = this.root

    while (temp) {
      if (temp.data === value) {
        return temp
      } else if (value < temp.data) {
        temp = temp.left
      } else if (value > temp.data) {
        temp = temp.right
      }
    }

    return null
  }

  #levelOrderTraversalRecursivly(queue: Node[], output: number[]): number[] {
    if (!this.root) return output
    queue.push(this.root)

    function traverseLevel() {
      if (queue.length === 0) return // base case

      const levelSize = queue.length
      for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift()!
        output.push(currentNode.data)

        if (currentNode.left) {
          queue.push(currentNode.left)
        }
        if (currentNode.right) {
          queue.push(currentNode.right)
        }
      }

      traverseLevel()
    }

    traverseLevel()
    return output
  }

  #levelOrderTraversalIterative(queue: Node[], output: number[]): number[] {
    if (!this.root) return output

    queue.push(this.root)

    while (queue.length) {
      const currentNode = queue.shift()!
      output.push(currentNode.data)

      if (currentNode.left) {
        queue.push(currentNode.left)
      }

      if (currentNode.right) {
        queue.push(currentNode.right)
      }
    }

    return output
  }

  public levelOrderTraversal(method: "recursion" | "iteration") {
    const queue: Node[] = []
    const output: number[] = []

    return method === "iteration"
      ? this.#levelOrderTraversalIterative(queue, output)
      : this.#levelOrderTraversalRecursivly(queue, output)
  }

  #traverse(
    order: "pre" | "in" | "post",
    root: Node | null,
    output: number[] = []
  ): number[] {
    if (!root) return output

    switch (order) {
      case "pre":
        output.push(root.data)
        this.#traverse(order, root.left, output)
        this.#traverse(order, root.right, output)
        break

      case "in":
        this.#traverse(order, root.left, output)
        output.push(root.data)
        this.#traverse(order, root.right, output)
        break

      case "post":
        this.#traverse(order, root.left, output)
        this.#traverse(order, root.right, output)
        output.push(root.data)
        break
    }

    return output
  }

  public depthFirstTraversal(order: "pre" | "in" | "post") {
    if (!this.root) return []
    const output: number[] = []
    return this.#traverse(order, this.root!, output)
  }

  public depth(value: number) {
    if (!this.root) return -1

    let temp: Node | null = this.root
    let internalClock = 0

    while (temp) {
      if (value === temp.data) return internalClock

      temp = value < temp.data ? temp.left : temp.right
      internalClock++
    }

    return -1
  }

  #calculateHeight(node: Node | null): number {
    if (!node) return -1

    const leftHeight = this.#calculateHeight(node.left)
    const rightHeight = this.#calculateHeight(node.right)

    return Math.max(leftHeight, rightHeight) + 1
  }

  public height(value: number): number {
    const node = this.find(value)
    if (!node) return -1

    return this.#calculateHeight(node)
  }

  public isBalanced() {
    if (!this.root) return false
    const leftSubtree = this.#calculateHeight(this.root.left)
    const rightSubtree = this.#calculateHeight(this.root.right)

    return (
      leftSubtree === rightSubtree ||
      leftSubtree + 1 === rightSubtree ||
      rightSubtree + 1 === leftSubtree
    )
  }

  public reBalance() {
    if (this.isBalanced()) return null

    const inOrderArray = this.depthFirstTraversal("in")
    this.buildTree(inOrderArray)
    return this.root
  }
}
