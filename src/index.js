// const express = require('express');
// const { createProxyMiddleware, proxyEventsPlugin } = require('http-proxy-middleware');

// const app = express();

// const onProxyReq = function (proxyReq, req, res) {
//     // add new header to request
//     console.log(`sending request, ${proxyReq}`)
// };


// const options = {
//     // target: 'https://api.openai.com',
//     target: 'https://www.baidu.com',
//     changeOrigin: true,
//     plugins: [proxyEventsPlugin],
//     on: {
//         proxyReq: (proxyReq, req, res) => {
//             console.log(`sending request, ${proxyReq}`)
//         },
//         proxyRes: (proxyRes, req, res) => {
//             console.log(proxyRes)
//         },
//         error: (err, req, res) => {
//             console.log("error")
//         },
//     },
//     logger: console
// }

// app.use('/', createProxyMiddleware(options));
// app.listen(3000);

var http = require('http'),
    httpProxy = require('http-proxy');
//
// Create your proxy server and set the target in the options.
//
let proxy = httpProxy.createProxyServer({
    target: 'https://api.openai.com',
    changeOrigin: true,
}).listen(8000);

proxy.on('error', function (err, req, res) {
    console.log("error", err)
    // res.writeHead(500, {
    //     'Content-Type': 'text/plain'
    // });

    // res.end('Something went wrong. And we are reporting a custom error message.');
});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
});

// proxy.on('proxyRes', function (proxyRes, req, res) {
//     console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
// });

//
// Listen for the `open` event on `proxy`.
//
proxy.on('open', function (proxySocket) {
    // listen for messages coming FROM the target here
    proxySocket.on('data', hybiParseAndLogMessage);
});

//
// Listen for the `close` event on `proxy`.
//
proxy.on('close', function (res, socket, head) {
    // view disconnected websocket connections
    console.log('Client disconnected');
});
