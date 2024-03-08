const fs = require('fs')

const TPLSmartDevice = require('tplink-lightbulb')
const hostname = '192.168.2.11'
const port = 8080
const statusFile = __dirname + '/../SSD1306-Display-SysInfo/msg.txt'
writeToFile = true
const light = new TPLSmartDevice(hostname)

console.log('--- TP-LINK LIGHTBULB HTTP ---\n\n')

//console.log(__dirname)

//light.info().then((info) => {
//    console.log(info)
//})

function fileWrite(file, content) {
    console.log(content)
    if (!writeToFile) return

    fs.writeFileSync(file, 'Light: ' + content, {
        encoding: 'utf8',
        flag: 'w',
    })
}

const express = require('express')
const app = express()

app.set('port', port)

app.get('/', (_, res) => {
    res.send('Nothing to see here.')
})

let content = ''

app.get('/light/on', (_, res) => {
    content = ''
    light
        .send({
            'smartlife.iot.smartbulb.lightingservice': {
                transition_light_state: {
                    on_off: 1,
                    transition_period: 1,
                },
            },
        })
        .then((status) => {
            //console.log(status)
            content = 'On'
            fileWrite(statusFile, content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Turning light on'
            fileWrite(statusFile, content)
            res.send(content)
        })
})

app.get('/light/off', (_, res) => {
    content = ''
    light
        .send({
            'smartlife.iot.smartbulb.lightingservice': {
                transition_light_state: {
                    on_off: 0,
                    transition_period: 1,
                },
            },
        })
        .then((status) => {
            //console.log(status)
            content = 'Off'
            fileWrite(statusFile, content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Turning light off'
            fileWrite(statusFile, content)
            res.send(content)
        })
})

app.get('/light/brightness/50', (_, res) => {
    content = ''
    light
        .send({
            'smartlife.iot.smartbulb.lightingservice': {
                transition_light_state: {
                    brightness: 50,
                    transition_period: 1,
                },
            },
        })
        .then((status) => {
            //console.log(status)
            content = 'Brightness 50%'
            fileWrite(statusFile, content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Brightness 50%'
            fileWrite(statusFile, content)
            res.send(content)
        })
})

app.get('/light/brightness/100', (_, res) => {
    content = ''
    light
        .send({
            'smartlife.iot.smartbulb.lightingservice': {
                transition_light_state: {
                    brightness: 100,
                    transition_period: 1,
                },
            },
        })
        .then((status) => {
            //console.log(status)
            content = 'Brightness 100%'
            fileWrite(statusFile, content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Brightness 100%'
            fileWrite(statusFile, content)
            res.send(content)
        })
})

app.listen(app.get('port'), function () {
    content = 'Server started'
    fileWrite(statusFile, content)
    console.log('Listening on port ' + app.get('port'))
})
