const projectId = 'tanand';

exports.api = {
    port: 1883,
};

exports.influx = {
    url: 'http://localhost:8086',
    bucket: 'Dashboard',
    org: 'Tanand',
    token: 'k1vagpHD5PNM1-mmjv4p0hW7F5CQ7C-CVaTcvxVAPNTQgcMNe-IXyWQnxN0cKrR8Ja7TV48Y61vZHdBm3eDD9w==',
};

exports.mqtt = {
    host: 'localhost',
    // topicPrefix: `${projectId}/`,
};


