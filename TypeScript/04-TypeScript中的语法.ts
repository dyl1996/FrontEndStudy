/**
 * 联合类型
 */
let foo: number | string = "abc";
// 类型缩小
if (typeof foo === "string") {
  console.log(foo.length);
}

/**
 * 类型别名
 */
type PointType = { x: number; y: number; z?: number };
function printCoordinate(point: PointType) {
  console.log(point.x, point.y, point.z);
}

export default {};
