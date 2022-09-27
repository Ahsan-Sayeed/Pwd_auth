const app = require('./app');
const config = require('./config/config');
require('./config/db');

app.listen(config.PORT,()=>{
    console.log(`server connected to http://localhost:${config.PORT}`);
})