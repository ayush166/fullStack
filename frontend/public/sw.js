const  cacheData="v1"
this.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/static/js/bundle.js',
                "/",
                "/index.html",
                "/manifest.json",
                "/favicon.ico",
                "/logo192.png"
            ])
        })
    )
})

this.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then(result=>{
            if(result) return result || fetch(event.request);
        })
    )
})