const projectId = 'tanand';

exports.api = {
    port: 8080,
};

exports.influx = {
    url: 'http://localhost:8086',
    bucket: projectId,
    org: '',
    token: '',
};

exports.mqtt = {
    host: 'localhost',
    topicPrefix: `${projectId}/`,
};

exports.postgres = {
    host: 'localhost',
    port: 5432,
    user: '',
    password: '',
    database: projectId,
};

exports.redis = {
    host: 'localhost',
    port: 6379,
    namespace: projectId,
};

exports.telegram = {
    endpoint: '',
};
