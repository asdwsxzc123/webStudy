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
   ```

3. 三数之和
   [-1,0,1,2,-1,-4], 0

方法 1: 暴力循环, O(n^3)
方法 2: c=-(a+b), 放在 set 里面 O(N^2)
方法 3: 快排 O(NlogN),先选择 a,下标为 0,然后 b 下标为 1,c 下标为最后一个,求和,如果大于 0,移动 c 的下表左移,如果小于 0,移动 b 的下标右移, 遍历完,还是不等于=0,让 a 的下标移动到 1,重复之前的做法
