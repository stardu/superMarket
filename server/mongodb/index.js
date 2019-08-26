/* const mongoose = require('mongoose');

mongoose.connect('mongodb://39.106.93.134:27017/testOfExpress');
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open', () => {
    console.log('连接成功！')
})

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var felyne = new Kitten({ name: 'Felyne' });
console.log(felyne.name);

felyne.save(function(err, fluffy) {
    if (err) return console.error(err);
}) */
import mongoose from 'mongoose'

let connect = mongoose.connect('mongodb://39.106.93.134:27017/testOfExpress');
export default connect;