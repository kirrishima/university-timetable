const CACHE_NAME = 'university-timetable-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/hooks/useUniversityWeek.ts',
  '/hooks/useSchedule.ts',
  '/hooks/useIsMobile.ts',
  '/contexts/ThemeContext.tsx',
  '/data/schedules.ts',
  '/themes.ts',
  '/screens/SetupScreen.tsx',
  '/screens/ScheduleScreen.tsx',
  '/components/Header.tsx',
  '/components/DaySelector.tsx',
  '/components/ScheduleView.tsx',
  '/components/ClassCard.tsx',
  '/components/Controls.tsx',
  '/components/PairedClassCard.tsx',
  '/components/ClassDetails.tsx',
  '/components/ThemeSwitcher.tsx',
  '/components/icons/ScheduleIcons.tsx',
  '/components/ui/Button.tsx',
  '/components/ui/Select.tsx',
  '/manifest.json',
  'https://cdn-icons-png.flaticon.com/512/32/32223.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});