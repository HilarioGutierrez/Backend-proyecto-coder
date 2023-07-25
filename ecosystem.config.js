module.exports = {
    apps : [{
        name: "proyectoCoderBack",
        script: "./src/index.js",
        error_file: "./logs/err.log",
        watch: false,
        instances: 2,
        ignore_watch: './dist/src/logs/*',
        instance_var: "INSTANCE_ID"
    }]
}