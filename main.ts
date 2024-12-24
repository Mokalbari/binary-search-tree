import { BalancedBinaryTree } from "./OOP/tree.ts"

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const bst = new BalancedBinaryTree(arr)

bst.prettyPrint(bst.getRoot()!)
console.log(bst.depthFirstTraversal("pre"))
console.log(bst.depthFirstTraversal("in"))
console.log(bst.depthFirstTraversal("post"))
