module.exports = {
    baseHref: 'http://localhost:3000/',
    port: 3000,
    dbConfig: {
        host: '192.168.252.199',
        user: 'user_park',
        password: 'support',
        database: 'tir'
    },
    jwt: {
        secret: 'Rock-n-Roll',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '10080m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '3m'
            }
        }
    }, corsOptions: {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200,
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders: ['Content-Type', 'application/json', 'Accept', 'multipart/form-data', 'Authorization']
    }
};
