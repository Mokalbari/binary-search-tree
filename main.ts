import { BalancedBinaryTree } from "./OOP/tree.ts"

const arr = [1, 6, 4, 5, 9, 8, 3, 3, 7]

const bst = new BalancedBinaryTree(arr)
console.log(bst.buildTree())
const root = bst.getRoot()
if (root) bst.prettyPrint(root)

bst.insertValue(33)
bst.prettyPrint(root!)

bst.insertValue(3)
bst.prettyPrint(root!)
