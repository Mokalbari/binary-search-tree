import { BalancedBinaryTree } from "./OOP/tree.ts"

const arr = [1, 8, 6, 4, 9, 4]
const bst = new BalancedBinaryTree(arr)

bst.prettyPrint(bst.getRoot()!)
console.log(bst.levelOrderTraversal("recursion"))
console.log(bst.levelOrderTraversal("iteration"))
