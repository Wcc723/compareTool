module.exports = {
  /*
   * 排除需要編譯的檔案，其餘移至 public
   */
  others: [
    '**/*.coffee',
    '**/*.ejs',
    '**/*.scss',
    '**/*.sass',
    '**/*.css'
  ],

  /*
   * 檔案輸出、輸入路徑
   */
  paths: {
    // 來源
    'source': './source/',
    'sass': './source/stylesheets/',
    'img': './source/images/',
    'js': './source/js/',
    'coffee': './source/coffee/',
    // 輸出
    'sass_output': 'css/',
    'js_output': 'javascripts/',
    'public': './public/',
    // Bower
    'bower': './bower_components/'
  },

  lib: {
    js: [
      'angular/angular.min.js',
      'angular-csv-service/angular-csv-service.min.js',
      'ng-file-upload/ng-file-upload-all.min.js',
      'angular-sanitize/angular-sanitize.min.js',
      'ng-csv/build/ng-csv.min.js'
    ],
    jsVendor: './source/jsVendor/**/*.js'
  },

  /*
   * CSS, PostCSS, Sass 設定
   * 目前 PostCSS 僅有加入 autoprefixer
   */
  postcss: {
    'enabled': true, // 啟用 PostCSS
    'output_name': 'all.css', //輸出之 CSS 名稱
    'output_folder': 'stylesheets', //最後輸出之 CSS 資料夾
    'autoprefixer': {browsers: ['last 1 version']}
  },
  sass: {
    'output_style': 'compressed', // sass 輸出模式，可選 'nested', 'expanded', 'compact', 'compressed'
    'includePaths': ['./bower_components/bootstrap/scss/']
  }
}
