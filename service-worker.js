// 缓存版本号
const CACHE_VERSION = 'v1.0';
const CACHE_NAME = `mayday-interactive-${CACHE_VERSION}`;

// 需要缓存的资源列表
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/images/阿信卜卜.png',
  '/images/box-closed.svg',
  '/images/box-open.svg',
  '/images/welcome-image.svg'
];

// 安装Service Worker并缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // 立即激活新版本
  );
});

// 激活Service Worker并清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // 立即控制所有客户端
  );
});

// 拦截请求并提供缓存资源
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果找到缓存，直接返回缓存的资源
        if (response) {
          return response;
        }

        // 否则尝试从网络获取
        return fetch(event.request)
          .then(response => {
            // 检查响应是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应，一份用于缓存，一份返回给用户
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          // 网络请求失败时的备用策略
          .catch(() => {
            // 对于HTML请求，返回首页
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// 后台同步功能，用于处理离线时的数据同步
self.addEventListener('sync', event => {
  if (event.tag === 'share-data') {
    event.waitUntil(syncShareData());
  }
});

// 同步分享数据的函数
async function syncShareData() {
  // 在这里实现离线时的分享数据同步逻辑
  // 目前仅作为示例，实际应用中需要根据需求实现
  console.log('同步分享数据');
}