import helmet from 'helmet'

export const helmeter = helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self"],
        styleSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com', "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'https://fonts.gstatic.com'],
        iframeSrc: ["'none'"],
    }
})

