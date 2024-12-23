import { mergeSort } from "../merge-sort/merge-sort.ts"
import { Node } from "./node.ts"

interface AbstractTreeInterface {
  getRoot: () => Node | null
  buildTree: (array: number[]) => Node | null
}

export abstract class AbstractTree implements AbstractTreeInterface {
  protected root: Node

  constructor(data: Node) {
    this.root = data
  }

  protected sortArray(array: number[]) {
    return mergeSort(array)
  }

  protected isSorted(array: number[], i = 0): boolean {
    if (array.length - 1 === i) return true

    if (array[i] > array[i + 1]) return false

    return this.isSorted(array, i + 1)
  }

  protected removeDuplicate(array: number[]) {
    return [...new Set(array)]
  }

  protected prepareArray(array: number[]) {
    const sortedArray = this.isSorted(array) ? array : this.sortArray(array)
    return this.removeDuplicate(sortedArray)
  }

  getRoot() {
    if (!this.root) return null

    return this.root
  }

  abstract buildTree(array: number[]): Node | null
}
