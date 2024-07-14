module.exports = {
    openapi: process.env.SWAGGER_VERSION,
    info: {
        title: "API Documentation",
        version: process.env.SWAGGER_DOC_VERSION,
        description: "Complete api information",
        contact: {
            name: "",
            url: "",
            email: ""
        }
    },
    servers: [
        {
            url: process.env.SWAGGER_BASE_API ? process.env.SWAGGER_BASE_API : "/",
            description: "Server 1"
        },
        {
            url: `http://localhost:${process.env.PORT}`,
            description: "Server 2"
        }
    ],
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    definitions: {
        "responseObject": {
            success: true,
            responseCode: "100",
            message: "success"
        },

        "responseArray": {
            success: true,
            responseCode: "100",
            message: "success"
        },

        "get-subscriber": {
            cellno: "3105499567"
        },

        "dbss-sub-callback-request": {
            cellno: "923105499567"
        },

        "dbss-unsub-callback-request": {
            cellno: "923105499567"
        },

        "subscribe-request": {
            cellno: "923105499567",
            subMode: "Web",
            serviceId: "1"
        },

        "unsubscribe-request": {
            cellno: "923105499567",
            unsubMode: "Web"
        },

        "dbss-subscribe-request": {
            cellno: "923105499567",
            subMode: "Web"
        },

        "dbss-unsubscribe-request": {
            cellno: "923105499567",
            unsubMode: "Web"
        },

        "update-subscriber": {
            cellno: "923105499567",
            nextChargeDt: "2024-06-03 18:57:10",
            lastChargeDt: "2024-06-03 18:57:10",
            chargeAttemptDt: "2024-06-03 18:57:10",
            graceDt: "2024-06-03 18:57:10",
            serviceId: "1"
        }

    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            },
            basicAuth: {
                type: "http",
                scheme: "basic",
                bearerFormat: "basicAuth"
            }
        }
    },
    security: [
        {
            bearerAuth: [],
            basicAuth: []
        }
    ]
};
