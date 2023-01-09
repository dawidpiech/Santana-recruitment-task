//npm i -D --save gulp gulp-cli gulp-sass node sass gulp-autoprefixer gulp-cssnano gulp-concat gulp-uglify gulp-rename gulp-imagemin@7.1.0 gulp-changed gulp-clean browser-sync gulp-sourcemaps imagemin-pngquant imagemin-mozjpeg@9.0.0 imagemin-gifsicle imagemin-svgo@9.0.0

const { src, dest, parallel, series, watch } = require("gulp");

// Load plugins

const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const changed = require("gulp-changed");
const browsersync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminSvgo = require("imagemin-svgo");

const path = {
  src: "./src/",
  dist: "./dist/",
};

const basePath = {
  src: {
    main: path.src,
    css: path.src + "styles/",
    js: path.src + "scripts/",
    img: path.src + "images/",
  },
  dist: {
    main: path.dist,
    css: path.dist + "styles/",
    js: path.dist + "scripts/",
    img: path.dist + "images/",
  },
};

// Clean dist

function clear() {
  return src(basePath.dist.main + "*", {
    read: false,
  }).pipe(clean());
}

// JS function

function js() {
  const source = basePath.src.js + "*.js";

  return src(source)
    .pipe(changed(source))
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(dest(basePath.dist.js))
    .pipe(browsersync.stream());
}

// CSS function

function css() {
  const source = basePath.src.css + "main.scss";

  return src(source)
    .pipe(changed(source))
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(cssnano())
    .pipe(dest(basePath.dist.css))
    .pipe(browsersync.stream());
}

// Optimize images
let imageminPlugins = [
  imageminGifsicle({ interlaced: true }),
  imageminMozjpeg({ quality: 0 }),
  imageminPngquant(),
  imageminSvgo([{ removeViewBox: false }, { minifyStyles: false }]),
];

function img() {
  return src(basePath.src.img + "*")
    .pipe(imagemin(imageminPlugins))
    .pipe(dest(basePath.dist.img));
}

// Copy HTML file
function html() {
  return src(basePath.src.main + "**/*.html")
    .pipe(dest(basePath.dist.main))
    .pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
  watch(basePath.src.css + "*", css);
  watch(basePath.src.js + "*", js);
  watch(basePath.src.img + "*", img);
  watch(basePath.src.main + "*", html);
}

// BrowserSync

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img, html));
