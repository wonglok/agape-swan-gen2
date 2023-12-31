import cors from 'cors'
import express from 'express'
// import { static as staticFiles } from "express";
import * as Http from 'http'
import * as socket from 'socket.io'
import * as chokidar from 'chokidar'
import proxy from 'express-http-proxy'

let app = express()
let http = Http.Server(app)
let io = new socket.Server(http, {
  cors: {
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
  },
})

const COMPONENT_PORT = 8521 //  process.env.PORT ||

app.use(cors({}))

// app.use('/api/*', proxy(`http://localhost:3001`, {
//   proxyReqPathResolver: (req) =>{
//     var parts = req.url.split('?');
//     var queryString = parts[1];
//     var updatedPath = parts[0] + '/api';
//     return updatedPath + (queryString ? '?' + queryString : '');
//   }
// }))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.json({ welcome: 'dear' })
})

app.get('/heartbeat', (req, res) => {
  res.json({ heartbeat: 'ok' })
})

// app.use("/", staticFiles("public"));
// app.use("/", staticFiles("dist"));

let sockets = []
io.on('connection', (socket) => {
  sockets.push(socket)

  console.log('a user connected', socket.id)

  socket.on('request', () => {
    sendReload()
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id)
    sockets = sockets.filter((s) => s.id !== socket.id)
  })

  // socket.on("readSwanCloud", async (data, res) => {
  //   await autosave(async ({ db }) => {
  //     console.log(db.data);
  //   });
  // });

  sendReload()
})

// autosave(async ({ db }) => {
//   console.log("booting up db");
//   console.log(db.data);
// });

http.listen(COMPONENT_PORT, () => {
  console.log(`[COMPONENT_PORT] server running at http://localhost:${COMPONENT_PORT}/`)
})

let tt = 0
let sendReload = async () => {
  clearTimeout(tt)
  tt = setTimeout(() => {
    sockets.forEach((socket) => {
      socket.emit('reload', {})
    })
  }, 50)
}

let needsRefresh = false
setInterval(() => {
  if (needsRefresh) {
    needsRefresh = false
    sendReload()
  }
}, 0)

function reloader(watch) {
  watch
    .on('add', function (path) {
      // console.log("File", path, "has been added");
      needsRefresh = true
    })
    .on('change', function (path) {
      // console.log("File", path, "has been changed");
      needsRefresh = true
    })
    .on('unlink', function (path) {
      // console.log("File", path, "has been removed");
      needsRefresh = true
    })
    .on('error', function (error) {
      // console.error("Error happened", error);
      needsRefresh = true
    })
}

var watcherSRC = chokidar.watch('./src-swan', {
  ignored: /^\./,
  persistent: true,
})

reloader(watcherSRC)

var watcherDist = chokidar.watch('./public/swan-build', {
  ignored: /^\./,
  persistent: true,
})

reloader(watcherDist)
