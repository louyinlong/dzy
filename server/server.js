"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var DLS = [
    { id: '01', userName: 'admin', password: '123456' },
    { id: '02', userName: 'abc', password: '456789' },
];
var USERS = [
    { id: '01', userName: '张三', password: '123456' },
    { id: '02', userName: '李四', password: '456789' },
];

var cpusers = [
    { cpid: '01', cpName: '西瓜', cpprice: '￥30/个' },
    { cpid: '02', cpName: '菠萝', cpprice: '￥25/个' },
];

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//用户
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//产品
app.get('/cpusers', function (req, resp) {
    resp.send(cpusers);
    resp.end();
});

app.get('/cpusers/:cpid', function (req, resp) {
    console.log(req.params);
    const cpid = req.params.cpid;
    for (let cp of cpusers) {
        if (cp.cpid === cpid) {
            resp.send([cp]);
            break;
        }
    }
    resp.end();
});

//添加用户
app.post('/user', function (req, resp) {
    //json
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});
//添加产品
app.post('/cpuser', function (req, resp) {
    //json
    cpusers.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//登录
app.post('/dls', function (req, resp) {
    let founded = false;
    for (let dl of DLS) {
        if (dl.userName === req.body.userName) {
            if (dl.password === req.body.password) {
                founded = true;
                break;
            } break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});
//修改用户
app.put('/user', function (req, resp) {
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});
//修改产品
app.put('/cpuser', function (req, resp) {
    //json
    let founded = false;
    for (let cp of cpusers) {
        if (cp.cpid === req.body.cpid) {
            cp.cpName = req.body.cpName;
            cp.cpprice = req.body.cpprice;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//删除用户
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//删除产品
app.delete('/cpuser/:cpid', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let cp of cpusers) {
        if (cp.cpid === req.params.cpid) {
            cpusers.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    } else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

app.listen(8080, function () {
    console.log('服务器在8080端口启动!');
});
