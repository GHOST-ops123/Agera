const { spawn } = require('child_process');
const path = require('path');

// Start the server
const server = spawn('node', ['index.js'], {
    stdio: 'inherit',
    shell: true
});

// Handle server process events
server.on('error', (err) => {
    console.error('Failed to start server:', err);
});

process.on('SIGINT', () => {
    console.log('Stopping server...');
    server.kill('SIGINT');
    process.exit();
}); 