class ArrayStack {
  // 容器
  private data: any[] = [];

  // 压栈
  push(element: any): void {
    this.data.push(element);
  }

  // 弹栈
  pop(): any {
    return this.data.pop();
  }

  // 查看栈顶
  peek(): any {
    return this.data[this.data.length - 1];
  }

  // 是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 栈当前数据个数
  size(): number {
    return this.data.length;
  }
}

const stack1 = new ArrayStack();
stack1.push("aaa");
stack1.push("bbb");
stack1.push("ccc");
console.log(stack1.peek());
console.log(stack1.pop());
console.log(stack1.pop());
console.log(stack1.pop());
console.log(stack1.isEmpty());
console.log(stack1.size());

export default {};
