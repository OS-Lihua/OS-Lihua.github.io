---
title: 二分查找
date: '2023/07/20 23:30:00'
tags:
  - 数组
  - 二分查找
categories: LeetCode
cover: 'https://image.yaco.email/BinarySearch.png'
abbrlink: 3907716225
---
**二分查找相关题目的关键就是区间的定义**

```cc
//本题使用的区间是 [l,r)
#include <vector>
#include <stdlib.h>

using namespace std;

int search(vector<int> &nums, int target)
{
    int l = 0;
    int r = nums.size();
    while (l < r)
    {
        int mid = l + ((r - l) >> 1);
        if (nums[mid] == target)
            return mid;
        if (nums[mid] < target)
        {
            l = mid + 1;
        }
        else
        {
            r = mid;
        }
    }
    return -1;
}
```