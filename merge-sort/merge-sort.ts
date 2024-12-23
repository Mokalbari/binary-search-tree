export function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  let i = 0,
    j = 0

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  return result.concat(left.slice(i), right.slice(j))
}

export function mergeSort(array: number[]): number[] {
  if (array.length === 1) return array

  const middle = Math.floor(array.length / 2)
  const left = mergeSort(array.slice(0, middle))
  const right = mergeSort(array.slice(middle))

  return merge(left, right)
}
