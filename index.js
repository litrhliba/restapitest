const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize ('add', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});
let userData=[{name:'vadim',email:'bro@samoa.com'}]
let data = {};
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
    },
    {
        // Other model options go here
    },
);

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
const express = require('express')
const app = express()
const port = 3000


app.get('/usercreate', async (req, res) => {
    res.send('Hello World!')
    sequelize.sync().then(() => {
        console.log('Book table created successfully!');

        User.create({
            name:"sania",
            email:"sania.email@gmail.com"
        }).then(res => {
            console.log(res)
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
})});
app.get('/userfind' , async (req, res) => {

    sequelize.sync().then(() => {

        User.findOne({
            where:{
                id:1
            }
        }).then(res => {
            data = res;
            console.log(res)

        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
    res.send(data)

})
app.get('/show' , async (req, res) => {
    res.send(data)


})

app.get('/userdelete' , async (req, res) => {

    sequelize.sync().then(() => {

        User.destroy({
            where:{
                id:2
            }
        }).then(res => {

            console.log(res)

        }).catch((error) => {
            console.error('Failed to retrieve data : ', error);
        });

    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

})
app.post('/users', async (req, res) => {
    res.send('Hello World!')
    const users = await User.findAll();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
app.get('/bulkdata' , async (req, res) => {
    sequelize.sync({ force: true }).then(() => {
        User.bulk(userData,{validate:true}).then(()=>{

        }).catch((err) => { console.log(err); });
    })

    res.send('Hello World!')
})
app.use(express.json());
