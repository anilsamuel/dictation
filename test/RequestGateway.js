const https = require('https');

exports.handler = (event, context, callback) => {
    console.log('event=>', JSON.stringify(event))
    var buffer = ''
    const req = https.request(event.url, event.options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            buffer += chunk
        });
        res.on('end', () => {
            callback(null, {
                statusCode: res.statusCode,
                headers: res.headers,
                body : buffer
            })
        });
        res.on('error', (error) => {
            callback(error, null)
        });
    });
    req.write(JSON.stringify(event.data))
    req.end();
};

