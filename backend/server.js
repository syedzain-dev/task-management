import app from './app.js'
import db  from './config/db.js';
const PORT = process.env.PORT || 3000;


// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    });

 
    