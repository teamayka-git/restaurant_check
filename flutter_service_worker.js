'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "4b428f596bf3efa9998f28669fb73f10",
"assets/assets/gif/api_error.gif": "5c6709f612dcdbddf8af4b543e5e47ed",
"assets/assets/gif/empty.gif": "d3072d2e7afde9fa311116d378b6741f",
"assets/assets/gif/image_error.gif": "e70f6c6d53ae3d7491dcaf36e2ec6dc5",
"assets/assets/gif/lottie_api_pagination.gif": "95a7d84ac17b2a40a345a29ce21f2ce1",
"assets/assets/gif/place_holder.gif": "675928d1cb58f617f9565e7b3f3fe725",
"assets/assets/gif/work_in_progress.gif": "478556782f3d0e24db1ea6b22a0fb58f",
"assets/assets/images/order_create_right_drawer_icons/card_icon.png": "0425955eb331bcc22476b80f5964be7b",
"assets/assets/images/order_create_right_drawer_icons/cash_icon.png": "22285fef694134b55d3833fba58824cd",
"assets/assets/images/order_create_right_drawer_icons/ewallet_icon.png": "24909712ce173af8d386e78063988117",
"assets/assets/images/order_create_right_drawer_icons/split_icon.png": "6e8cab9dfb288ceb19f98b0a649cf6f1",
"assets/assets/images/restaurant_app_splash_logo.png": "ba250a191ae1a8d11f8b55841f5512eb",
"assets/assets/login/icons/login.svg": "a7711b1f104c98c8ae18420653074837",
"assets/assets/login/images/login_bottom.png": "b473d9b1b30607e274348f114273a094",
"assets/assets/login/images/main_bottom.png": "322c8b4cda43fe21e0d78a1f30f387ce",
"assets/assets/login/images/main_top.png": "cd3220e276bb9dee0a1c7d18126aad72",
"assets/assets/login/images/signup_top.png": "6eaad7a7b0febd05500366722015bd6d",
"assets/assets/lottie_files/api/lottie_api_error.json": "160fe31d8c80daae9456382bca122730",
"assets/assets/lottie_files/api/lottie_api_pagination.json": "88f6406863cf9fdcd30cbab7ee5b9b7b",
"assets/assets/lottie_files/api/lottie_empty_list.json": "6dc0f75b0f2539e6d358e931842f8cd5",
"assets/assets/lottie_files/lottie_work_in_progress.json": "a69247d57dd9db2431d3cc245c000d47",
"assets/assets/lottie_files/network_cached_imageview/lottie_image_error.json": "280918384a721682fe7f75541c0cb2a8",
"assets/assets/lottie_files/network_cached_imageview/lottie_image_place_holder.json": "ee21ea2544f638200d03e7179ca3bc2a",
"assets/FontManifest.json": "ac3f70900a17dc2eb8830a3e27c653c3",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "11dfe6d8d4ad1578e5ad4f1fd9df312b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/syncfusion_flutter_datagrid/assets/font/FilterIcon.ttf": "c17d858d09fb1c596ef0adbf08872086",
"assets/packages/syncfusion_flutter_datagrid/assets/font/UnsortIcon.ttf": "6d8ab59254a120b76bf53f167e809470",
"assets/shaders/ink_sparkle.frag": "0ce95dd22fefb390cc1fc964fd3267b0",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.ico": "c66f2932147af2165047ccafcb5a6232",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "75aa8653f36722bdbfd074324021ac18",
"/": "75aa8653f36722bdbfd074324021ac18",
"main.dart.js": "34076571abb3c43acd24a5093b02e061",
"manifest.json": "a78de1799112974c4c0bfe791c828f40",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "b09eb726cf4837c52b1f4974a755e720",
"version.json": "d35f720f87e09b338d3b0c15b420ca6e",
"web.zip": "72dcdaebd2491eecfa6a3e1ffc6b8dea"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
