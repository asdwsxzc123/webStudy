## map set

1. hashTable & hash Function & collisions
2. map vs set
3. hashmap,hashset, treemap,treeset

map 和 set 的经常用来查询和计数

## hash function

哈希碰撞,
lies 和 foes 的 ASSIC 码合一样  
使用拉链法,索引一致,通过链表的形式,一个一个 next

list,map,set

## hashmap & treemap,hashset & treeset

hash 查询快,tree 是有序的

## 习题

1. 242 有效的字母异位数,每个字母出现的次数相同,返回 true
   s='anagram',t='nagaram'
   输出 true
   s='rat',t='car'
   输出 false
   方法 1: sort 对两个字符串进行排序 ,然后是否全等  
    方法 2 : 使用 map,计算每个字母出现的次数,如果相等,返回 true

   ```js
   var s = 'anagram',
     t = 'nagara1';
   var isAnagram = function(s, t) {
     if (s.length !== t.length) return false;
     return isEqualObj(setMap(s), setMap(t));
   };
   function setMap(list) {
     let map = {};
     for (let i = 0; i < list.length; i++) {
       const item = list[i];
       if (!map[item]) {
         map[item] = 1;
       } else {
         map[item]++;
       }
     }
     return map;
   }
   function isEqualObj(a, b) {
     let aKeys = Object.keys(a);
     let bKeys = Object.keys(b);
     let flag = true;
     bKeys.some(key => {
       flag = a[key] === b[key];
       return a[key] !== b[key];
     });
     return flag;
   }
   console.log(isAnagram(s, t));
   ```

2. 两数之和,返回下标
   [2,3,7,14], 9
   输出 [0,2]
   方法 1: 暴力循环 O(n^2)
   方法 2: set,先枚举 O(n), 9-x O(n)

   ```js
   // set
   var nums = [2, 7, 11, 15],
     target = 9;
   var twoSum = function(nums, target) {
     let map = {};
     for (let i = 0; i < nums.length; i++) {
       map[nums[i]] = i;
     }
     for (let i = 0; i < nums.length; i++) {
       // 另一个数,如果在map中,
       let one = target - nums[i];
       if (map[one] !== undefined && i !== map[one]) {
         return [i, map[one]];
       }
     }
     return null;
   };

   // 优化
    var nums = [2, 7, 11, 15], target = 9
    var twoSum = function (nums, target) {
      if (nums.length <= 1) {
        return []
      }
      let map = {}
      for (let i = 0; i < nums.length; i++) {
        const one = nums[i];
        // 在map存在 target-one 就说明有值
        if (map[target - one] >= 0) {
          return [map[target - one], i]
        }
        map[one] = i
      }
      return []
    };
   ```

3. 15 三数之和
   [-1,0,1,2,-1,-4], 0

方法 1: 暴力循环, O(n^3)
方法 2: c=-(a+b), 放在 set 里面 O(N^2)
方法 3: 快排 O(NlogN),先选择 a,下标为 0,然后 b 下标为 1,c 下标为最后一个,求和,如果大于 0,移动 c 的下表左移,如果小于 0,移动 b 的下标右移, 遍历完,还是不等于=0,让 a 的下标移动到 1,重复之前的做法
```js
var nums = nums = [-1, 0, 1, 2, -1, -4]
  var threeSum = function (nums) {
    if (nums.length <= 2) {
      return []
    }
    // 排序,方便做优化
    nums.sort((a, b) => a - b)
    const res = []
    const hash = {}
    // 当前,左侧和右侧遍历
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) break;
      if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重
      let first = i + 1; // 左侧
      let last = nums.length - 1; // 右侧
      while (first < last) {
        let result = nums[first] + nums[last] + nums[i];
        // 如果当前 === 左侧和右侧和的负数,res.push(),当等于0时,first和last需要继续移动
        if (result === 0) {
          res.push([nums[i], nums[first], nums[last]]);
          // 如果first === first[++] 相等等就跳过,while操作做了first右移的操作
          while (nums[first] === nums[first + 1] && last > first) { first++ }  // 去重,移动指针,循环会过滤这几个index
          while (nums[last] === nums[last - 1] && last > first) { last-- } // 去重,移动指针,循环会过滤这几个index
          first++;
          last--;
          // 如果当前 <= 左侧和右侧和的负数 (需要将first右移)
        } else if (result < 0) {
          // 如果当前 > 左侧和右侧和的负数 (需要将last左移)
          first++;
        } else if (result > 0) {
          // 如果last === last[--] 相等等就跳过
          last--;
        }
      }
    }
    return res
  };
  console.log(threeSum(nums))
```
