const mqtt = require('mqtt')
# HOST AND PORT
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`
const client1 = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})
const client2 = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
})
const topic1 = '/sensors/temerature'
const topic2 = '/sensors/humidity'

client1.on('connect', () => {
  console.log('Client1 connected')
  client1.subscribe([topic1], () => {
    console.log(`Subscribed client 1 to topic '${topic1}'`)
  })
  client1.publish(topic1, ' 21°C ', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})


  client2.on('connect', () => {
  console.log('Client2 connected')
  client2.subscribe([topic2], () => {
    console.log(`Subscribed client 2 to topic '${topic2}'`)
  })
  client2.publish(topic2, '86%', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error)
    }
  })
})

client1.on('message', (topic1, payload) => {
  console.log('Received Message:', topic1, payload.toString())
})
client2.on('message', (topic2, payload) => {
  console.log('Received Message:', topic2, payload.toString())
})
