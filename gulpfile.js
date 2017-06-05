var gulp = require('gulp'),
    webpack = require('webpack'),
    clean = require('gulp-clean');

/*
 * 任务：清除生编译生成的文件
 * */
gulp.task('clean', function () {
    var stream = gulp.src(['dev', 'dist'])
        .pipe(clean({
            force: true
        }));
    return stream;
});

/*
 * 任务：执行webpack打包
 * */
gulp.task('webpack', ['clean'], function (cb) {
    var config = require('./webpack.config');

    webpack(config, function (err, stats) {
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true
        }));
        cb();
    });
});

/*
 * 任务：执行webpack打包
 * */
gulp.task('webpack:watch', ['clean'], function (cb) {
    var flag = true,
        config = require('./webpack.config');

    config.plugins.pop();

    webpack(config).watch({
        aggregateTimeout: 300,
        poll: true
    }, function(err, stats) {
        console.log(stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true
        }));

        if (flag) {
            cb();
            flag = false;
        }
    });
});
