const fs = require('fs')

const TPLSmartDevice = require('tplink-lightbulb')
const hostname = '192.168.2.11'
const port = 8080
const statusFile = __dirname + '/../SSD1306-Display-SysInfo/msg.txt'
const displayOffFile = __dirname + '/../SSD1306-Display-SysInfo/displayoff'
writeToFile = true
const light = new TPLSmartDevice(hostname)

console.log('--- TP-LINK LIGHTBULB HTTP ---\n\n')

function fileStatusWrite(content) {
    console.log(content)
    if (!writeToFile) return

    fs.writeFileSync(statusFile, 'Light: ' + content, {
        encoding: 'utf8',
        flag: 'w',
    })
}

function fileDisplayOff(displayOff) {
    let fileDisplayOffExists = fs.existsSync(displayOffFile)
    if (displayOff) {
        if (!fileDisplayOffExists) {
            fs.writeFileSync(displayOffFile, '', {
                encoding: 'utf8',
                flag: 'w',
            })
        }
    } else {
        if (fileDisplayOffExists) {
            fs.unlinkSync(displayOffFile)
        }
    }
}

const express = require('express')
const app = express()

app.set('port', port)

app.get('/', (_, res) => {
    res.send('Nothing to see here.')
})

let content = ''

// Light toggle states

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
            fileStatusWrite(content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Turning light on'
            fileStatusWrite(content)
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
            fileStatusWrite(content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Turning light off'
            fileStatusWrite(content)
            res.send(content)
        })
})

// Light brightness level

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
            fileStatusWrite(content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Brightness 50%'
            fileStatusWrite(content)
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
            fileStatusWrite(content)
            res.send(content)
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Brightness 100%'
            fileStatusWrite(content)
            res.send(content)
        })
})

// Light details

app.get('/light/details', (_, res) => {
    content = ''
    light
        .info()
        .then((info) => {
            console.log(info)
            content = 'Details'
            fileStatusWrite(content)
            res.json(info).send()
        })
        .catch((err) => {
            console.error(err)
            content = 'Error: Details'
            fileStatusWrite(content)
            res.send(content)
        })
})

// Display controls

app.get('/display/on', (_, res) => {
    content = 'Display: on'
    fileDisplayOff(false)
    res.send(content)
})

app.get('/display/off', (_, res) => {
    content = 'Display: off'
    fileDisplayOff(true)
    res.send(content)
})

app.listen(app.get('port'), function () {
    content = 'Server started'
    fileStatusWrite(content)
    console.log('Listening on port ' + app.get('port'))
})
