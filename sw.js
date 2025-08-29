const CACHE_NAME = 'university-timetable-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/hooks/useUniversityWeek.ts',
  '/components/Header.tsx',
  '/components/DaySelector.tsx',
  '/components/ScheduleView.tsx',
  '/components/ClassCard.tsx',
  '/components/Controls.tsx',
  '/components/PairedClassCard.tsx',
  '/components/ClassDetails.tsx'
];

// Установка Service Worker и кэширование статических ассетов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов и отдача из кэша, если возможно
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если ресурс есть в кэше, отдаем его
        if (response) {
          return response;
        }
        // Иначе, делаем запрос к сети
        return fetch(event.request);
      }
    )
  );
});