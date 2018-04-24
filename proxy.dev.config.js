module.exports = [
    {
        url: ['/api'],
        config: {
            target: 'http://10.66.30.66:8001/', // target host
            changeOrigin: true, // needed for virtual hosted sites
            pathRewrite: {
                '^/api': '' // remove base path
            },
            router: {},
            onError: function(err, req, res) {
                if (err) {
                    console.error(err.stack);
                }
            },
            onProxyRes: function(proxyRes, req, res) {},
            onProxyReq: function(proxyReq, req, res) {}
        }
    },
    {
        url: ['/imgApi'],
        config: {
            target: 'http://filein-dev4.gznb.com/', // target host
            changeOrigin: true, // needed for virtual hosted sites
            pathRewrite: {
                '^/imgApi': '' // remove base path
            },
            router: {},
            onError: function(err, req, res) {
                if (err) {
                    console.error(err.stack);
                }
            },
            onProxyRes: function(proxyRes, req, res) {},
            onProxyReq: function(proxyReq, req, res) {}
        }
    },
];
