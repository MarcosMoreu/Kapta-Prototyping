// export {version};
"use strict";

// Set a name for the current cache. Note that when version is changed, the pwa only updates autmotically after reloading!
//Note that for automatic update, at one change need to be made in the app.js file (or in other files...)
var version = 'v22.5.1';
//console.log(version)

// Default files to always cache
var offlineFundamentals = [
  "/index.html",
  "/styles/app.css",
  "/scripts/modal.js",
  "/scripts/app.js",
  "/pages/tutorial.html",
  "/scripts/tutorialPage.js",
  "/styles/tutorialPage.css",
  "/images/icons/icon-72x72.png",

];

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function(event) {
  //console.log('WORKER: install event in progress.');
  /* Using event.waitUntil(p) blocks the installation process on the provided
     promise. If the promise is rejected, the service worker won't be installed.
  */
  self.skipWaiting(); // to skip waiting activation when changes have been made

  event.waitUntil(
    /* The caches built-in is a promise-based API that helps you cache responses,
       as well as finding and deleting them.
    */
    caches
      /* You can open a cache by name, and this method returns a promise. We use
         a versioned cache name here so that we can remove old cache entries in
         one fell swoop later, when phasing out an older service worker.
      */
      .open(version + 'fundamentals')
      .then(function(cache) {
        /* After the cache is opened, we can fill it with the offline fundamentals.
           The method below will add all resources in `offlineFundamentals` to the
           cache, after making requests for them.
        */
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        //console.log('WORKER: install completed');
      })
  );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
var isOnlineSW = navigator.online
self.addEventListener("fetch", function(event) {

  //console.log('WORKER: fetch event in progress.');

  /* We should only cache GET requests, and deal with the rest of method in the
     client-side, by handling failed POST,PUT,PATCH,etc. requests.
  */
  if (event.request.method !== 'GET') {
    /* If we don't block the event as shown below, then the request will go to
       the network as usual.
    */
    //console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
    return;
  }
  // my. to prevent error of 206 partial response
  if (event.request.headers.has('range')) {
  return;
}
  /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
     Fulfillment result will be used as the response, and rejection will end in a
     HTTP response indicating failure.
  */
//////////////approach 1 to solve the issue of url query
  //////////// if the request has query parameters, `hasQuery` will be set to `true`
  //////// var hasQuery = event.request.url.indexOf('?') != -1;


  //////////////approach 2 to solve the issue of url query

  //find urls that only have numbers as parameters
  //yours will obviously differ, my queries to ignore were just repo revisions
  // var shaved = event.request.url.match(/^([^?]*)[?]\d+$/);
  // //extract the url without the query
  // shaved = shaved && shaved[1];
  // console.log(shaved)



///////////// approach 3  >> after testing other people's approach, I've created this one which actually works, because approach 2 didn't work, and approach 1 caused
/////////... error with when post CARTO. This way, I ensure that only the URLgeojson request takes ignoreSearch as TRUE, the rest are false.
  var ignore = false
  if(isOnlineSW == false){
    if(event.request.url.includes('#') && event.request.url.includes('/?') && event.request.url.includes('z')){
      ignore = true
    }
  }

  //else{
  //  ignore = false
//  }

  event.respondWith(
    caches
      /* This method returns a promise that resolves to a cache entry matching
         the request. Once the promise is settled, we can then provide a response
         to the fetch request.
      */
      // .match(event.request)

//////////////approach 1 to solve the issue of url query
      // .match(event.request,{
      //   //with this, the app open also when urlgeojson and & offline, because it ignores the url query, yet still loads into the map because app.js
      //   //the issue is when using VPN, that offline is not always detected? need to look at it
      //   // ignoreSearch: false
      //
      //   // ignore query section of the URL based on our variable
      //   ignoreSearch: hasQuery,
      //
      // })
/////////////approach 2 to solve the issue of url query
///....caches.match(shaved || event.request)  >>>>>  https://stackoverflow.com/questions/41758252/service-worker-slow-response-times

      .match(event.request,{
        ignoreSearch:ignore,   ///////////////////////// approach 3 (see above)
      })
      .then(function(cached) {
        /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.

           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
        var networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
        //console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
          /* We copy the response before replying to the network request.
             This is the response that will be stored on the ServiceWorker cache.
          */
          var cacheCopy = response.clone();

          //console.log('WORKER: fetch response from network.', event.request.url);

          caches
            // We open a cache to store the response for this request.
            .open(version)
            .then(function add(cache) {
              /* We store the response for this request. It'll later become
                 available to caches.match(event.request) calls, when looking
                 for cached responses.
              */
              // console.log('put cache successful',cache)
              // this condition is to patch the issue with tiles for html2canva. Without this, the HTML2canvas plugin return errors with the tiles.
              //this also might solve the issue that some users are experiencing with geometries cleared when too many tiles cached???
              if(event.request.url[8] == 'm'){// this is a simple way of recognising google url tiles https://mt0....
                cache.put(response,cacheCopy)
              }else{
                cache.put(event.request,cacheCopy);
              }
              // console.log(event.request)
              // console.log(event.request.url)

              self.addEventListener('error', function(e) {
                // console.log('error put cach catched');
              });
            // }catch(e){
              // console.log('error catched in sw')
            // }
            })
         // .then(function() {
            //   //console.log('WORKER: fetch response stored in cache.', event.request.url);
            // });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
        function unableToResolve () {
          // window.location.href.split('?')[0]
          /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider.
             - Generate a Response programmaticaly, as shown below, and return that.
          */

          //console.log('WORKER: fetch request failed in both cache and network.');

          /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
          // var url = 'https://amappingprototype.xyz'
          // var changeURL = function(){
          //   window.open(url)
          // }
          // return new Response(changeURL)
          //



          // var url = 'https://amappingprototype.xyz'
          // var changeURL = function(){
          //   window.open(url)
          // }
          // return new Request('index.html')



          return new Response('<h1>You are OFFLINE. FULL offline use under development</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", function(event) {


  /* Just like with the install event, event.waitUntil blocks activate on a promise.
     Activation will fail unless the promise is fulfilled.
  */

  //console.log('WORKER: activate event in progress.');

  event.waitUntil(
    caches
      /* This method returns a promise which will resolve to an array of available
         cache keys.
      */
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        //console.log('WORKER: activate completed.');
      })
  );


});
