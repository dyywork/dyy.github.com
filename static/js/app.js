angular.module("myproject", ["controller", "server", "ui.router", 'ngRoute'])
.directive("showName", function () {
  return {
    restrict: 'AE',
    scope: false,
    template: function (tElement, tAttrs) {
      tAttrs.data
      return '';
    },
    replace: true
  }
})

.directive("tabs", function () {
  return {
    restrict: "AE",
    scope: {
      data:'=data'
    },
    template: function (element, attrs) {
      return '<div class="tabs">{{data.name}}<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div>'
    }
  }
})

.config(function ($stateProvider, $urlRouterProvider, $routeProvider) {
  /* $routeProvider
   .when('/',{
   templateUrl:"html/login.html",
   controller:"loginCtrl"
   })
   .when('/box/dash',{
   templateUrl: "html/dash.html",
   controller:"dashCtrl"
   });*/

  $urlRouterProvider.otherwise("/login");
  $stateProvider
  .state("login", {
    url: "/login",
    views: {
      "index": {
        templateUrl: "html/login.html",
        controller: "loginCtrl"
      }
    }
  })

  .state("box", {
    url: "/box",
    views: {
      "index": {
        templateUrl: "html/box.html",
        controller: "boxCtrl"
      }, 'box-header': {
        templateUrl: 'html/header/header.html',
        controller: 'headerCtrl'
      }, 'box-footer': {
        templateUrl: 'html/header/footer.html',
        controller: 'footerCtrl'
      }, 'box-slide': {
        templateUrl: "html/slide.html",
        controller: "slideCtrl"
      },"box-tabs":{
        templateUrl: "html/tabs.html",
        controller: "tabsCtrl"
      }
    }
  })
  .state("box.dash", {
    url: '/dash',
    views: {
      "box-dash": {
        templateUrl: "html/dash.html",
        controller: "dashCtrl"
      }
    }
  })
  .state("box.payMoney", {
    url: "/dash/payMoney",
    views: {
      "box-dash": {
        templateUrl: "html/payMoney.html",
        controller: "payMoneyCtrl"
      }
    }
  })
  .state("box.template2", {
    url: "/dash/template2",
    views: {
      "box-dash": {
        templateUrl: "html/box/template2.html",
        controller: 'template2Ctrl'
      }
    }
  })
  .state("box.template3", {
    url: "/dash/template3",
    views: {
      "box-dash": {
        templateUrl: "html/box/template3.html"
      }
    }
  })
  .state("box.template4", {
    url: "/dash/template4",
    views: {
      "box-dash": {
        templateUrl: "html/box/template4.html"
      }
    }
  })
  //;
});