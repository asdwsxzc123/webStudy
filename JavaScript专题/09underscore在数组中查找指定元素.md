### findIndex
ES6中的,会返回数组中满足提供的函数的第一个元素的索引,否则返回-1.

```js
function isBigEnough(element) {
  return element >= 15;
}
[12, 5, 8, 130, 44].findIndex(isBigEnough) // 3
```
findIndex会找出第一个大于15的元素的下班,最后会返回3

### 实现findIndex
通过遍历一遍,返回符合要求的值的下标
```js
function findIndex(array,predicate,context) {
  for (let i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
    return -1;
  }
}
```