/**
 * Created by pengjiangyong on 17/3/13.
 */
angular.module("controller", [])
.controller("indexCtrl", function ($scope,$state) {

    $('.content').width($(window).width()-200)
    console.log($(window).width())
    $scope.widthTop = $(window).width();
    $scope.heightCon = $(window).height();
    $scope.contentTop = {
        'width': $scope.widthTop + 'px'
    }
    $scope.contentCenter = {
        'width': ($scope.widthTop - 300) + 'px',
        'height': ($scope.heightCon - 200) + 'px'
    }
    $scope.silderLeft = {
        'height': ($scope.heightCon - 200) + 'px'
    }
    $scope.contentBot = {
        'width': $scope.widthTop + 'px'
    }

})
.controller('sliderCtrl',
    function ($scope, $state, saveInfor, $http, $compile, contains) {

        $http.get("data/nav.json").success(function (data) {
            /*
             * "tabId": "index",  // 侧边蓝切换的id
             "shows": "in",      // 默认那个选项卡是展开的
             * */
            $scope.arr = data;
        });

        $scope.silderData = function (state) {
            $scope.arrId = [];
            $('.navs .tabs').each(function (index) {
                $scope.arrId.push($('.tabs').eq(index).attr('id'));
            });

            if (!contains.expand($scope.arrId, state.id)) {
                $('.tabs').removeClass('tabs_active');
                $('.navs').append($compile(
                    '<div  class="tabs  tabs_active" state = "' + state.state + '"id="'
                    + state.id + '" ng-click="navChange($event)">' + state.name
                    + '<span class="glyphicon glyphicon-remove " aria-hidden="true" ng-click="colseTab($event)"></span></div>')(
                    $scope))
                $state.go(state.state);
            }else{
                $('.tabs').removeClass('tabs_active');
                $('.tabs[id="' + state.id + '"]').addClass('tabs_active');
                $state.go(state.state);
            }

        };
        $scope.colseTab = function ($event) {
            if($event.target.parentElement.nextElementSibling){

                $state.go($('.tabs:last').attr('state'))
                $event.target.parentElement.remove();
            }else if(!$event.target.parentElement.nextElementSibling && $event.target.parentElement.previousElementSibling){

                $('.tabs[id="'+ $event.target.parentElement.previousElementSibling.attributes.id.value +'"]').addClass('tabs_active')
                $scope.url = $event.target.parentElement.previousElementSibling.attributes.state.value;
                $event.target.parentElement.remove();
                $state.go($scope.url)
            }
            $event.stopPropagation();
        }
        $scope.navChange = function ($event) {
            $('.tabs').removeClass('tabs_active');
            $('.tabs[id="'+ $event.target.attributes.id.value +'"]').addClass('tabs_active');
            $scope.id = $event.target.attributes.id.value;
            $scope.state = $event.target.attributes.state.value;
            $state.go($scope.state)
        }
    })
/*tabs卡切换控制器*/
.controller('tabsCtrl', function ($scope, $state, saveInfor) {
    $scope.navChange = function ($event) {
        $('.tabs').removeClass('tabs_active');
        $('.tabs[id="'+ $event.target.attributes.id.value +'"]').addClass('tabs_active');
        $scope.id = $event.target.attributes.id.value;
        $scope.state = $event.target.attributes.state.value;
        $state.go($scope.state)
    }
})
/*登录控制器*/
.controller("loginCtrl", function ($scope, $state, saveInfor) {
    $scope.login = function (name, password) {
        console.log(name)
        if (!name || !password) {
            alert("账户名或密码为空！！！");
            return;
        }
        saveInfor.save("loignInfor", {
            name: name,
            password: password
        });
        $state.go("box.dash");
    }
})
.controller('headerCtrl', function ($scope, $state, contains) {

$scope.isOff = true;
    $scope.silderColse = function () {
        if($scope.isOff){
            $('.slider_content').animate({"left":'-200px'});
            $('.content').animate({'left':'0px'});
            $('.content').animate({"width":$(window).width()+"px"});
            $scope.isOff = false;
        }else{
           /* $('.slider_content').animate({"left":'0px'});
            $('.content').animate({'left':'200px'});*/
            $('.content').animate({"width":($(window).width()-200)+"px"},function () {
                $('.slider_content').animate({"left":'0px'});
                $('.content').animate({'left':'200px'});
            });
            $scope.isOff = true;
        }


    }
    
    $scope.tabarr = [
        {id: '1', state: 'box.dash'},
        {id: '2', state: 'box.template2'},
        {id: '3', state: 'box.template3'},
        {id: '4', state: 'box.template4'},
    ];

    $scope.clickFun1 = function (state, name, id) {
        $scope.str = '<div  class="btn btn-default alltabs" aria-label="Left Align" data-reid="'
            + id + '">' +
            '<span class="tabstop" data-id="' + id + '" ng-model-options="'
            + state
            + '">' + name + '</span>' +
            '<span class="glyphicon glyphicon-remove tabs_remove" aria-hidden="true"></span>'
            +
            '</div>';
        var arr = [];
        $('.tabstop').each(function (index) {
            if (!contains.expand(arr, $('.tabstop').eq(index).data('id'))) {
                arr.push($('.tabstop').eq(index).data('id'));
            }
        });
        if (!contains.expand(arr, id)) {
            $('.tabs').append($scope.str);
        }
        for (let i = 0; i < $scope.tabarr.length; i++) {
            if ($scope.tabarr[i].id == id) {
                $state.go($scope.tabarr[i].state);
            }
        }
    };
    $('.tabs').on('click', '.tabstop', function () {   //tabs之间的切换
        $scope.id = $(this).data('id');
        for (let i = 0; i < $scope.tabarr.length; i++) {
            if ($scope.tabarr[i].id == $scope.id) {
                $state.go($scope.tabarr[i].state);
            }
        }
    })
    $('.tabs').on('click', '.tabs_remove', function () {
        $scope.id = $(this).parent().prev().data('reid');
        console.log($scope.id)
        for (let i = 0; i < $scope.tabarr.length; i++) {
            if ($scope.tabarr[i].id == $scope.id) {
                $state.go($scope.tabarr[i].state);
            }
        }
        if ($scope.id != undefined) {
            $(this).parents('.alltabs').remove();
        }

    })
})
.controller('footerCtrl', ['$scope', '$state', function ($scope, $state) {

}])
.controller("boxCtrl", function ($scope, $state, $compile) {
    $state.go('box.dash');



    $('.dropdown-toggle').dropdown()
    $scope.tabarr = [];
    $scope.clickFun1 = function (text, name, id) {
        console.log(text);
        $state.go(text);
        $scope.tabarr.push(text)

        var html = '<div class="navtab text-center bod1 bodcolor-99 fl" >' +
            ' <h2 class="fl tabstop" data="' + id + '">' + name + '</h2>' +
            ' <h2 class="fr">X</h2>' +
            '</div>'
        var $html = $compile(html)($scope);
        $(".navTab").append($html)
    };
    $('.tabstop').on('click', function () {
        $scope.id = $(this).attr('data');
        $scope.tabarr = [
            {id: '1', state: 'box.dash'},
            {id: '2', state: 'box.template2'},
            {id: '3', state: 'box.template3'},
            {id: '4', state: 'box.template4'},
        ]
        for (let i = 0; i < $scope.tabarr.length; i++) {
            if ($scope.tabarr[i].id == $scope.id) {
                $state.go($scope.tabarr[i].state);
            }
        }

    })
    /*$scope.clickFun3 = function () {
     $state.go("box.template3")
     };
     $scope.clickFun4 = function () {
     $state.go("box.template4")
     }*/
    $(".subNav").on("click", function () {
        $(this).toggleClass("currentDd").siblings(".subNav").removeClass(
            "currentDd")
        $(this).toggleClass("currentDt").siblings(".subNav").removeClass(
            "currentDt")
        $(this).next(".navContent").slideToggle(300).siblings(
            ".navContent").slideUp(500)
    });

})
.controller("dashCtrl", function ($scope, saveInfor, $state, $http) {
    /* $scope.loginInfor = saveInfor.get("loignInfor");


     $http({
     url: 'payData.json',
     method: 'POST'
     }).success(function (data, header, config, status) {
     console.log(data);
     $scope.data = data;
     }).error(function (data, header, config, status) {

     });
     $scope.money = 0;
     function getMoney(newValue) {
     var m = 0;
     for (var i = 0; i < newValue.length; i++) {
     var arr = newValue[i].content;
     if (newValue[i].isChioce) {
     for (var j = 0; j < arr.length; j++) {
     m += arr[j].price;
     arr[j].isChioce = true;
     }
     } else {

     for (var j = 0; j < arr.length; j++) {

     arr[j].isChioce = false;
     }
     }


     }
     return m;
     }

     $scope.$watch("data", function (newValue, oldValue) {

     if (newValue == oldValue) {
     return;
     }

     $scope.money = getMoney(newValue);


     }, true);
     $scope.pay = function () {
     if ($scope.money == 0) {
     alert("请选择付款项！");
     return
     }
     var arr = [];
     for (var i = 0; i < $scope.data.length; i++) {
     if ($scope.data[i].isChioce) {
     arr.push({
     name: $scope.data[i].name,
     content: $scope.data[i].content
     })
     }
     }
     saveInfor.save("payMoney", {
     "content": arr,
     money: $scope.money
     });
     $state.go("box.payMoney")
     };
     $scope.chioceAll = false;
     $scope.change = function (ischange) {
     var all = 0;
     if (!ischange) {
     for (var i = 0; i < $scope.data.length; i++) {
     $scope.data[i].isChioce = false;
     }
     } else {
     for (var i = 0; i < $scope.data.length; i++) {
     $scope.data[i].isChioce = true;
     }
     }


     //$scope.money = all;
     }*/
})
.controller("payMoneyCtrl", function ($scope, saveInfor) {
    var data = saveInfor.get('payMoney')
    $scope.payMoney = data.money;
    $scope.content = data.content;
    console.log($scope.content)
})
.controller('slideCtrl', function ($scope) {

})
.controller('template2Ctrl', function ($scope, $state, dataFactory, $http) {
    /* var prom = {
     channel: "",
     contractId: "",
     custerName: "",
     endTime: 1494172799000,
     maxAmount: "",
     minAmount: "",
     orderNo: "",
     pageSize: 20,
     startTime: 1477843200000,
     status: ""
     };
     var json = JSON.stringify(prom);
     dataFactory.getlist("/bill/queryBill","post",json).then(function (data) {
     console.log(data);
     $("#bill_list").jqGrid({
     data:data.data.content,
     datatype: "local",
     colModel: [
     { label: 'id', name: 'id',key: true ,hidden:true},
     { label: '渠道', name: 'channel',resize:true,
     drag :true,},
     { label: '渠道单据号', name: 'merchantNo',resize:true,
     drag :true,},
     { label: 'OMS订单号', name: 'paymentId',resize:true,
     drag :true,resizable:true},
     { label: '所属合同', name: 'contractId',resize:true,
     drag :true,resizable:true},
     { label: '公寓名称', name: 'storeName',resize:true,
     drag :true,resizable:true},
     { label: '订单日期', name: 'transactionTime',resize:true,
     drag :true,resizable:true},
     { label: '客户名称', name: 'payerName',resize:true,
     drag :true,resizable:true},
     { label: '实收金额', name: 'inComeAmount',resize:true,
     drag :true,resizable:true,sortable:true},
     { label: '对账状态', name: 'bStatus',resize:true,
     drag :true,resizable:true},
     { label: '失败原因', name: 'resultMsg',resize:true,
     drag :true,resizable:true}
     ],
     viewrecords: true,
     height: 385,
     rowNum: 10,
     rowList : [10,30,50],
     rownumbers: true,
     rownumWidth: 25,
     autowidth:true,
     resizable:true,
     multiselect: true,
     sortname:'inComeAmount',
     sortorder:'desc',
     pager: "#pages_bill",
     jsonReader : {
     root: "page.list",
     page: "page.currPage",
     total: "page.totalPage",
     records: "page.totalCount"
     },
     prmNames : {
     page:"page",
     rows:"limit",
     order: "order"
     },
     gridComplete:function(){
     //隐藏grid底部滚动条
     // $("#bill_list").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
     }
     });
     })*/
})

;