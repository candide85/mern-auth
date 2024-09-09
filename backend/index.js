import app from "./app.js";
import db_config from "./mongodb/db_config.js";




// NODE JS SERVER RUN ON PORT 5000 AND CONNECTED WITH MONGO_DB DATABASE

app.listen(db_config.PORT, async () => {
    await db_config.CONNECTION_TO_MONGO_DB
    console.log(`server is running on port ${db_config.PORT}`);
})
