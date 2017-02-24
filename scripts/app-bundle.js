define('app',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App() {
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Isomorfismos';
            config.map([
                { route: '', redirect: 'searchword' },
                { route: 'searchword', name: 'searchword', moduleId: 'searchword', nav: true, title: 'Busrcar palabra' },
                { route: 'api/v1/isolema/wordLike', moduleId: 'testCall' }
            ]);
            config.mapUnknownRoutes('not-found');
        };
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('searchword',["require", "exports", "aurelia-fetch-client", "aurelia-framework"], function (require, exports, aurelia_fetch_client_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SearchWord = (function () {
        function SearchWord(httpClient) {
            this.word = '123';
            this.words = [];
            this.httpClient = httpClient;
            this.httpClient.configure(function (config) {
                config.withBaseUrl('/api/v1/isolema/wordLike/')
                    .withDefaults({
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                    .withInterceptor({
                    request: function (request) {
                        console.log("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        console.log("Received " + response.status + " " + response.url);
                        return response;
                    }
                });
            });
        }
        SearchWord.prototype.wordChanged = function (newValue, oldValue) {
            var _this = this;
            if (newValue.length > 3) {
                this.httpClient.fetch("" + newValue)
                    .then(function (response) { return response.json(); })
                    .then(function (json) {
                    _this.words = json.words;
                    console.log(json);
                });
            }
            console.log("wordChanged(" + newValue + ", " + oldValue + ")");
        };
        return SearchWord;
    }());
    __decorate([
        aurelia_framework_1.bindable,
        __metadata("design:type", String)
    ], SearchWord.prototype, "word", void 0);
    SearchWord = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], SearchWord);
    exports.SearchWord = SearchWord;
});

define('testCall',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestCall = (function () {
        function TestCall() {
        }
        return TestCall;
    }());
    exports.TestCall = TestCall;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

define('model/configuration',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});

define('text!app.css', ['module'], function(module) { module.exports = ".page-host {\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  top: 50px;\r\n  bottom: 0;\r\n  overflow-x: hidden;\r\n  overflow-y: auto;\r\n}\r\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"app.css\"></require>\n\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\n              data-target=\"#skeleton-navigation-navbar-collapse\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">\n        <i class=\"fa fa-home\"></i>\n        <span>${router.title}</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\"\n         id=\"skeleton-navigation-navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li repeat.for=\"row of router.navigation\"\n            class=\"${row.isActive ? 'active' : ''}\">\n          <a data-toggle=\"collapse\"\n             data-target=\"#skeleton-navigation-navbar-collapse.in\"\n             href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n        </li>\n      </ul>\n    </div>\n  </nav>\n\n  <div class=\"page-host\">\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!searchword.html', ['module'], function(module) { module.exports = "<template>\r\n  <h1>Buscar palabra</h1>\r\n  <div>\r\n    (>3) caracteres:\r\n    <input value.bind=\"word\">\r\n  </div>\r\n  <div>\r\n    <ul>\r\n      <li repeat.for=\"item of words\">${item.word}</li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map