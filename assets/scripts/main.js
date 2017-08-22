/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  function indexPage () {
    const body = document.getElementsByTagName('body')[0];
    const videoLinks = Array.from(document.querySelectorAll('.js-video-link')]);

    function playVideo(e) {
      e.preventDefault();
      const link = this;
      const videoSrc = link.dataset;

      const video = document.createElement('video');
      video.setAttribute('autoplay', true);
      video.setAttribute('loop', true);
      video.classList.add('video');

      createSourceEls(videoSrc).forEach(src => {
        video.appendChild(src);
      });

      const otherVideos = document.querySelectorAll('video');
      body.appendChild(video);
      setTimeout(() => { video.classList.add('-active') }, 50);
      setTimeout(() => { otherVideos.forEach(remove) }, 500);

      videoLinks.forEach(link => link.classList.remove('-active'));
      link.classList.add('-active');
    }

    function createSourceEls(data) {
      return Array.from(Object.keys(data)).map(type => {
        const source = document.createElement('source');
        source.setAttribute('type', 'video/' + type);
        source.setAttribute('src', data[type]);
        return source;
      });
    }

    function remove(el) {
      el.outerHTML = '';
    }
    
    videoLinks.forEach(video => video.addEventListener('click', playVideo));
  } 

  function galleryPage () {
    const body = document.getElementsByTagName('body')[0];
    const galleryLinks = Array.from(document.querySelectorAll('.js-gallery-link')]);

    function showImage(e) {
      e.preventDefault();
      const link = this;
      const imgSrc = link.dataset.src;

      const img = document.createElement('img');
      img.setAttribute('src', imgSrc);
      img.classList.add('background');
      img.classList.add('js-background');

      const otherImgs = document.querySelectorAll('.js-background');
      body.appendChild(img);
      setTimeout(() => { img.classList.add('-active') }, 50);
      setTimeout(() => { otherImgs.forEach(remove) }, 500);

      galleryLinks.forEach(link => link.classList.remove('-active'));
      link.classList.add('-active');
    }

    function remove(el) {
      el.outerHTML = '';
    }
    
    galleryLinks.forEach(link => link.addEventListener('click', showImage));
  }

  indexPage();
  galleryPage();

})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICpcbiAqICBXZWIgU3RhcnRlciBLaXRcbiAqICBDb3B5cmlnaHQgMjAxNSBHb29nbGUgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICBodHRwczovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiAgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlXG4gKlxuICovXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIENoZWNrIHRvIG1ha2Ugc3VyZSBzZXJ2aWNlIHdvcmtlcnMgYXJlIHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBicm93c2VyLFxuICAvLyBhbmQgdGhhdCB0aGUgY3VycmVudCBwYWdlIGlzIGFjY2Vzc2VkIGZyb20gYSBzZWN1cmUgb3JpZ2luLiBVc2luZyBhXG4gIC8vIHNlcnZpY2Ugd29ya2VyIGZyb20gYW4gaW5zZWN1cmUgb3JpZ2luIHdpbGwgdHJpZ2dlciBKUyBjb25zb2xlIGVycm9ycy4gU2VlXG4gIC8vIGh0dHA6Ly93d3cuY2hyb21pdW0ub3JnL0hvbWUvY2hyb21pdW0tc2VjdXJpdHkvcHJlZmVyLXNlY3VyZS1vcmlnaW5zLWZvci1wb3dlcmZ1bC1uZXctZmVhdHVyZXNcbiAgdmFyIGlzTG9jYWxob3N0ID0gQm9vbGVhbih3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnIHx8XG4gICAgICAvLyBbOjoxXSBpcyB0aGUgSVB2NiBsb2NhbGhvc3QgYWRkcmVzcy5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ1s6OjFdJyB8fFxuICAgICAgLy8gMTI3LjAuMC4xLzggaXMgY29uc2lkZXJlZCBsb2NhbGhvc3QgZm9yIElQdjQuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUubWF0Y2goXG4gICAgICAgIC9eMTI3KD86XFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KSl7M30kL1xuICAgICAgKVxuICAgICk7XG5cbiAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IgJiZcbiAgICAgICh3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonIHx8IGlzTG9jYWxob3N0KSkge1xuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzZXJ2aWNlLXdvcmtlci5qcycpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAvLyB1cGRhdGVmb3VuZCBpcyBmaXJlZCBpZiBzZXJ2aWNlLXdvcmtlci5qcyBjaGFuZ2VzLlxuICAgICAgcmVnaXN0cmF0aW9uLm9udXBkYXRlZm91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gdXBkYXRlZm91bmQgaXMgYWxzbyBmaXJlZCB0aGUgdmVyeSBmaXJzdCB0aW1lIHRoZSBTVyBpcyBpbnN0YWxsZWQsXG4gICAgICAgIC8vIGFuZCB0aGVyZSdzIG5vIG5lZWQgdG8gcHJvbXB0IGZvciBhIHJlbG9hZCBhdCB0aGF0IHBvaW50LlxuICAgICAgICAvLyBTbyBjaGVjayBoZXJlIHRvIHNlZSBpZiB0aGUgcGFnZSBpcyBhbHJlYWR5IGNvbnRyb2xsZWQsXG4gICAgICAgIC8vIGkuZS4gd2hldGhlciB0aGVyZSdzIGFuIGV4aXN0aW5nIHNlcnZpY2Ugd29ya2VyLlxuICAgICAgICBpZiAobmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlcikge1xuICAgICAgICAgIC8vIFRoZSB1cGRhdGVmb3VuZCBldmVudCBpbXBsaWVzIHRoYXQgcmVnaXN0cmF0aW9uLmluc3RhbGxpbmcgaXMgc2V0OlxuICAgICAgICAgIC8vIGh0dHBzOi8vc2xpZ2h0bHlvZmYuZ2l0aHViLmlvL1NlcnZpY2VXb3JrZXIvc3BlYy9zZXJ2aWNlX3dvcmtlci9pbmRleC5odG1sI3NlcnZpY2Utd29ya2VyLWNvbnRhaW5lci11cGRhdGVmb3VuZC1ldmVudFxuICAgICAgICAgIHZhciBpbnN0YWxsaW5nV29ya2VyID0gcmVnaXN0cmF0aW9uLmluc3RhbGxpbmc7XG5cbiAgICAgICAgICBpbnN0YWxsaW5nV29ya2VyLm9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaW5zdGFsbGluZ1dvcmtlci5zdGF0ZSkge1xuICAgICAgICAgICAgICBjYXNlICdpbnN0YWxsZWQnOlxuICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSBvbGQgY29udGVudCB3aWxsIGhhdmUgYmVlbiBwdXJnZWQgYW5kIHRoZVxuICAgICAgICAgICAgICAgIC8vIGZyZXNoIGNvbnRlbnQgd2lsbCBoYXZlIGJlZW4gYWRkZWQgdG8gdGhlIGNhY2hlLlxuICAgICAgICAgICAgICAgIC8vIEl0J3MgdGhlIHBlcmZlY3QgdGltZSB0byBkaXNwbGF5IGEgXCJOZXcgY29udGVudCBpc1xuICAgICAgICAgICAgICAgIC8vIGF2YWlsYWJsZTsgcGxlYXNlIHJlZnJlc2guXCIgbWVzc2FnZSBpbiB0aGUgcGFnZSdzIGludGVyZmFjZS5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICBjYXNlICdyZWR1bmRhbnQnOlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIGluc3RhbGxpbmcgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZXJ2aWNlIHdvcmtlciBiZWNhbWUgcmVkdW5kYW50LicpO1xuXG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gSWdub3JlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkdXJpbmcgc2VydmljZSB3b3JrZXIgcmVnaXN0cmF0aW9uOicsIGUpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5kZXhQYWdlICgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBjb25zdCB2aWRlb0xpbmtzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdmlkZW8tbGluaycpXSk7XG5cbiAgICBmdW5jdGlvbiBwbGF5VmlkZW8oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgbGluayA9IHRoaXM7XG4gICAgICBjb25zdCB2aWRlb1NyYyA9IGxpbmsuZGF0YXNldDtcblxuICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCdhdXRvcGxheScsIHRydWUpO1xuICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCdsb29wJywgdHJ1ZSk7XG4gICAgICB2aWRlby5jbGFzc0xpc3QuYWRkKCd2aWRlbycpO1xuXG4gICAgICBjcmVhdGVTb3VyY2VFbHModmlkZW9TcmMpLmZvckVhY2goc3JjID0+IHtcbiAgICAgICAgdmlkZW8uYXBwZW5kQ2hpbGQoc3JjKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvdGhlclZpZGVvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJyk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB2aWRlby5jbGFzc0xpc3QuYWRkKCctYWN0aXZlJykgfSwgNTApO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG90aGVyVmlkZW9zLmZvckVhY2gocmVtb3ZlKSB9LCA1MDApO1xuXG4gICAgICB2aWRlb0xpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmNsYXNzTGlzdC5yZW1vdmUoJy1hY3RpdmUnKSk7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTb3VyY2VFbHMoZGF0YSkge1xuICAgICAgcmV0dXJuIEFycmF5LmZyb20oT2JqZWN0LmtleXMoZGF0YSkpLm1hcCh0eXBlID0+IHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndmlkZW8vJyArIHR5cGUpO1xuICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBkYXRhW3R5cGVdKTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZShlbCkge1xuICAgICAgZWwub3V0ZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIFxuICAgIHZpZGVvTGlua3MuZm9yRWFjaCh2aWRlbyA9PiB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlWaWRlbykpO1xuICB9IFxuXG4gIGZ1bmN0aW9uIGdhbGxlcnlQYWdlICgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICBjb25zdCBnYWxsZXJ5TGlua3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1nYWxsZXJ5LWxpbmsnKV0pO1xuXG4gICAgZnVuY3Rpb24gc2hvd0ltYWdlKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IGxpbmsgPSB0aGlzO1xuICAgICAgY29uc3QgaW1nU3JjID0gbGluay5kYXRhc2V0LnNyYztcblxuICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICBpbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBpbWdTcmMpO1xuICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQnKTtcbiAgICAgIGltZy5jbGFzc0xpc3QuYWRkKCdqcy1iYWNrZ3JvdW5kJyk7XG5cbiAgICAgIGNvbnN0IG90aGVySW1ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1iYWNrZ3JvdW5kJyk7XG4gICAgICBib2R5LmFwcGVuZENoaWxkKGltZyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgaW1nLmNsYXNzTGlzdC5hZGQoJy1hY3RpdmUnKSB9LCA1MCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgb3RoZXJJbWdzLmZvckVhY2gocmVtb3ZlKSB9LCA1MDApO1xuXG4gICAgICBnYWxsZXJ5TGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuY2xhc3NMaXN0LnJlbW92ZSgnLWFjdGl2ZScpKTtcbiAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZShlbCkge1xuICAgICAgZWwub3V0ZXJIVE1MID0gJyc7XG4gICAgfVxuICAgIFxuICAgIGdhbGxlcnlMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dJbWFnZSkpO1xuICB9XG5cbiAgaW5kZXhQYWdlKCk7XG4gIGdhbGxlcnlQYWdlKCk7XG5cbn0pKCk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
