const projectId = 'tanand';

exports.api = {
    port: 9999,
};

exports.influx = {
    url: 'http://localhost:8086',
    bucket: 'dashboard',
    org: 'tanand',
    token: 'XppVLG0VkSxsA24rL_r7Lm72o3PPV3qDCZHXQ7dBNcYMgbjYjO8xHPeoeSfq5gXlhV6qLPngN-vBTnPd6N51wQ==',
};

exports.mqtt = {
    host: 'localhost',
    // topicPrefix: `${projectId}/`,
};


