module.exports = {
    ci: {
        collect: {
            staticDistDir: './',
            numberOfRuns: 3,
        },
        asserts: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'categories:accessibility': ['error', { minScore: 0.9 }],
            'categories:best-practices': ['error', { minScore: 0.9 }],
            'categories:seo': ['error', { minScore: 0.9 }]
        },
        upload: {
            target: 'temporary-public-storage'
        }
    }
}