---
layout: /src/layouts/MarkdownPostLayout.astro
title: NMEA 信息获取
author: YaCo
image: 
    url: "https://image.yaco.email/NMEA.png"
    alt: "debug of nmea"
pubDate: 2024-04-24
tags: ["NMEA","GPS","Location"]
languages: ["cpp","java"]
---

**Android 设备获取地理信息位置**

### 步骤

1. 声明权限，动态申请权限
2. 重写回调接口 OnNmeaMessageListener
3. 注册监听
4. 请求更新
5. 移除监听

### 代码实现

```xml
/* AndroidManifest.xml */
// 1.声明权限
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

```java
/*MainActivity.java*/
// 2. 动态申请权限
if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
		ActivityCompat.requestPermissions(this, 
                                          new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
}
else{
    // 3. 注册监听重写的回调接口 
    LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
    try {
        // 重写回调接口
        locationManager.addNmeaListener(this.getMainExecutor(), new OnNmeaMessageListener{
             @Override
            public void onNmeaMessage(String s, long l) {
                Log.d("LOCATION",l + "return " + s);
            }
        } );
    } catch (IllegalArgumentException e) {
        Log.e("LOCATION", "something is null");
    } catch (SecurityException e) {
        Log.e("LOCATION", "ACCESS_FINE_LOCATION permission is not present");
    }
	// 4. 请求更新 事件触发
    LocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 0, new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                // 位置信息变化时的回调
                Log.d("LOCATION_PROVIDER", "LihuaLog" + location.toString());
            }

            @Override
            public void onProviderEnabled(String provider) {
                // 提供者被用户打开时的回调
                Log.d("LOCATION_PROVIDER", "LihuaLog Enabled" + provider);
            }

            @Override
            public void onProviderDisabled(String provider) {
                // 提供者被用户关闭时的回调
                Log.d("LOCATION_PROVIDER", "LihuaLog Disabled" + provider);
            }
	});
}
```

```java
// 5. 移除监听
LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
locationManager.removeNmeaListener(mLocationInfoManager);
/// 或许可以加上以下内容
locationManager.removeUpdates(XXX);
```

- 做完以上步骤，就可以收到标准格式的NMEA格式的GPS数据
