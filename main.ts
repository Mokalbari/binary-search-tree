import { BalancedBinaryTree } from "./OOP/tree.ts"

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const bst = new BalancedBinaryTree(arr)

bst.prettyPrint(bst.getRoot()!)
bst.insert(10)
bst.insert(11)
bst.reBalance()
bst.prettyPrint(bst.getRoot()!)
