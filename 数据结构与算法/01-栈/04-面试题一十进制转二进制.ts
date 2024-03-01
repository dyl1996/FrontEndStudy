import ArrayStack from "./02-实现栈结构Stack(重构)";

function decimalToBinary(decimal: number): string {
  const stack = new ArrayStack<number>();
  while (decimal > 0) {
    stack.push(decimal % 2);
    decimal = Math.floor(decimal / 2);
  }
  let binary = "";
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }
  return binary;
}

console.log(decimalToBinary(2));
console.log(decimalToBinary(100));

export default {};
