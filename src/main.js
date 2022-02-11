const electron = require('electron');
const path = require("path");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// electron.crashReporter.start();

const url = "http://127.0.0.1:5000"

var subpy = null

function createWindow() {
    subpy = require('child_process').spawn('python', ['./hello.py']);

    

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // preload: path.join(__dirname, 'native/preload.js')
        }
    })

    win.loadURL("http://127.0.0.1:5000").catch(err => console.log("ERROR"))
}

app.on("ready", createWindow)
    .whenReady()
    .catch(e => console.error(e))

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if(subpy != null){
            subpy.kill('SIGINT')
        }
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

