export default function swDev(){
    let swUrl=`${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl)
    .then(response => {
        console.log("Service Worker Registered", response);
    })
    .catch(error => {
        console.error("Service Worker Registration Failed", error);
    });
}
