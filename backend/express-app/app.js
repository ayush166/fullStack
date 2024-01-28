const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const connectionURI='mongodb://localhost:27017/mydb'
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json())

mongoose.connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
