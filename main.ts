function generateUniqueNumbers(count: number, max: number) {
  const numbers = new Set()
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1)
  }
  return Array.from(numbers)
}

const uniqueNumbers = generateUniqueNumbers(100, 200)
console.log(uniqueNumbers)
