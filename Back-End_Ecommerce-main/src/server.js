import app from "./app.js"
import logger from "#src/shared/utils/logger.js"
const port = process.env.PORT || 5000


app.listen(port, () => {
    logger.info(`App running on port ${port}`)
})