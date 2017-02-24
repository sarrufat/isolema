import * as gulp from 'gulp';
import * as browserSync from 'browser-sync';
import * as historyApiFallback from 'connect-history-api-fallback/lib';
import * as project from '../aurelia.json';
import build from './build';
import {CLIOptions} from 'aurelia-cli';

var proxy = require('proxy-middleware');
var url = require('url');

function onChange(path) {
  console.log(`File Changed: ${path}`);
}

function reload(done) {
  browserSync.reload();
  done();
}

var proxyOptionsAccessControl = function(req,res, next){
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
  };

  var proxyOptionsApiRoute = url.parse('http://localhost:' + 3000 +  '/api') ;
 proxyOptionsApiRoute.route = '/api';

let serve = gulp.series(
  build,
  done => {
    browserSync({
      online: false,
      open: false,
      port: 9000,
      logLevel: 'silent',
      server: {
        baseDir: ['.'],
        middleware: [historyApiFallback(), proxyOptionsAccessControl, proxy(proxyOptionsApiRoute)]
      }
    }, function (err, bs) {
      let urls = bs.options.get('urls').toJS();
      console.log(`Application Available At: ${urls.local}`);
      console.log(`BrowserSync Available At: ${urls.ui}`);
      done();
    });
  }
);

let refresh = gulp.series(
  build,
  reload
);

let watch = function() {
  gulp.watch(project.transpiler.source, refresh).on('change', onChange);
  gulp.watch(project.markupProcessor.source, refresh).on('change', onChange);
  gulp.watch(project.cssProcessor.source, refresh).on('change', onChange);
}

let run;

if (CLIOptions.hasFlag('watch')) {
  run = gulp.series(
    serve,
    watch
  );
} else {
  run = serve;
}

export default run;
