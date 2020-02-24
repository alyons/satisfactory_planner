module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx}"
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    }
};
