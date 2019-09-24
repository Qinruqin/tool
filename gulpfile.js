// const { src, dest ,task ,series ,watch ,run } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');  //es6转为es5
const uglify = require('gulp-uglify'); //压缩js
const minifyCSS = require('gulp-minify-css'); //压缩css
const changed = require('gulp-changed'); //检查改变
const clean = require('gulp-clean'); //清空文件夹
function uglifyJs() {
	var jsSrc = 'src/**/*.js';
	var jsDst = 'dist/js';
    return gulp.src(jsSrc)
	    .pipe(babel())
		.pipe(changed(jsDst))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/'));
}
function minifyCss(){
	var cssSrc = 'src/**/*.css';
	var cssDst = 'dist/css';
	return gulp.src(cssSrc)
		.pipe(changed(cssDst))
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('dist/'));
}
gulp.task('uglifyJs',function(){
	var jsSrc = 'src/**/*.js';
	var jsDst = 'dist/js';
    return gulp.src(jsSrc)
	    .pipe(babel())
		.pipe(changed(jsDst))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist/'));
})
gulp.task('css',function(){
	var cssSrc = 'src/**/*.css';
	var cssDst = 'dist/css';
	return gulp.src(cssSrc)
		.pipe(changed(cssDst))
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('dist/'));
})

gulp.task('default',function(){
	gulp.watch('src/**/*.js', gulp.series('uglifyJs'));
	gulp.watch('src/**/*.css',gulp.series('css'));
})
// exports.default = build