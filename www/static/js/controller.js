/**
 * Created by dyy on 17/3/13.
 */
angular.module("controller", [])
    .controller("indexCtrl", function ($scope, $state) {

        /*侧边栏的高度*/

        $scope.slideHe = $(window).height() - $('navbar').height() - 140;

        $('.content').width($(window).width() - 200);
        $scope.widthTop = $(window).width();
        $scope.heightCon = $(window).height();
        $scope.contentTop = {
            'width': $scope.widthTop + 'px'
        };
        $scope.contentCenter = {
            'width': ($scope.widthTop - 300) + 'px',
            'height': ($scope.heightCon - 200) + 'px'
        };
        $scope.silderLeft = {
            'height': ($scope.heightCon - 200) + 'px'
        };
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
            $('.collapse').collapse({
                parent: 'true'
            })
            $scope.silderData = function (state) {
                $scope.arrId = [];
                $('.navs .tabs').each(function (index) {
                    $scope.arrId.push($('.tabs').eq(index).attr('id'));
                });

                if (!contains.expand($scope.arrId, state.id)) {
                    $('.tabs').removeClass('tabs_active');
                    $('.navs').append($compile(
                        '<div  class="tabs  tabs_active" state = "' + state.state
                        + '"id="'
                        + state.id + '" ng-click="navChange($event)">' + state.name
                        + '<span class="glyphicon glyphicon-remove " aria-hidden="true" ng-click="colseTab($event)"></span></div>')(
                        $scope));
                    $state.go(state.state);
                } else {
                    $('.tabs').removeClass('tabs_active');
                    $('.tabs[id="' + state.id + '"]').addClass('tabs_active');
                    $state.go(state.state);
                }

            };
            $scope.colseTab = function ($event) {
                if ($event.target.parentElement.nextElementSibling) {
                    if ($.isArray('tabs_active', $event.target.parentElement.classList) > -1) {
                        $('.tabs:last').addClass('tabs_active');
                        $state.go($('.tabs:last').attr('state'));
                    }

                    $event.target.parentElement.remove();
                } else if (!$event.target.parentElement.nextElementSibling
                    && $event.target.parentElement.previousElementSibling) {
                    $('.tabs[id="'
                        + $event.target.parentElement.previousElementSibling.attributes.id.value
                        + '"]').addClass('tabs_active');
                    $scope.url = $event.target.parentElement.previousElementSibling.attributes.state.value;
                    $event.target.parentElement.remove();
                    $state.go($scope.url)
                }
                $event.stopPropagation();
            }
            $scope.navChange = function ($event) {
                $('.tabs').removeClass('tabs_active');
                $('.tabs[id="' + $event.target.attributes.id.value + '"]').addClass(
                    'tabs_active');
                $scope.id = $event.target.attributes.id.value;
                $scope.state = $event.target.attributes.state.value;
                $state.go($scope.state)
            }
        })
    /*tabs卡切换控制器*/
    .controller('tabsCtrl', function ($scope, $state, saveInfor) {
        $('body').css('background', "#fff");
        $scope.navChange = function ($event) {
            $('.tabs').removeClass('tabs_active');
            $('.tabs[id="' + $event.target.attributes.id.value + '"]').addClass(
                'tabs_active');
            $scope.id = $event.target.attributes.id.value;
            $scope.state = $event.target.attributes.state.value;
            $state.go($scope.state)
        }
    })
    /*登录控制器*/
    .controller("loginCtrl", function ($scope, $state, saveInfor, dataFactory) {
        $('#myCollapsible').collapse({
            parent: true
        })
        $('body').css('background', " rgba(56,157,170,.82)");
        $scope.login = function (name, password) {
            var json = {
                username: name,
                password: password
            }
            if (!name || !password) {
                alert("账户名或密码为空！！！");
                return;
            } else {
                dataFactory.getlist('/api/user/login', 'GET', json).then(function (data) {
                    console.log(data);
                    if (data.success) {
                        saveInfor.save("loignInfor", {
                            name: data.info.username
                        });
                        $state.go("box.dash");
                    } else {
                        $('.bs-example-model-sm').modal('show')
                        $scope.msg = data.message;
                    }
                })
            }
        }
    })
    .controller('headerCtrl', function ($scope, $state, contains) {
        $(window).resize(function () {          //当浏览器大小变化时
            if ($('.slider_content').offset().left === 0) {
                $('.content').width($(window).width() - 200 + 'px')
            } else {
                $('.content').width($(window).width() + 'px')
            }
            //浏览器时下窗口可视区域高度
            //浏览器时下窗口文档body的总高度 包括border padding margin
        });
        $scope.isOff = true;
        $scope.silderColse = function () {
            if ($scope.isOff) {
                $('.slider_content').animate({"left": '-200px'});
                $('.content').animate({'left': '0px', "width": $(window).width() + "px"}, function () {
                    $scope.isOff = false;
                });
                $('.ui-jqgrid').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
                $('.ui-jqgrid-view').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
                $('.ui-jqgrid-hdiv').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
                $('.ui-jqgrid-hdiv table').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
                $('.ui-jqgrid-bdiv').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
                $('.ui-jqgrid-bdiv table').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
                $('.ui-jqgrid-pager').animate({'width': ($('.ui-jqgrid').width() + 200) + 'px'})
            } else {
                $('.content').animate({"width": ($(window).width() - 200) + "px", 'left': '200px'});
                $('.slider_content').animate({"left": '0px'}, function () {
                    $scope.isOff = true;
                });
                $('.ui-jqgrid').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
                $('.ui-jqgrid-view').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
                $('.ui-jqgrid-hdiv').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
                $('.ui-jqgrid-hdiv table').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
                $('.ui-jqgrid-bdiv').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
                $('.ui-jqgrid-bdiv table').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
                $('.ui-jqgrid-pager').animate({'width': ($('.ui-jqgrid').width() - 200) + 'px'})
            }
        }
    })
    .controller('footerCtrl', ['$scope', '$state', function ($scope, $state) {

    }])
    .controller("boxCtrl", function ($scope, $state, $compile) {
        $state.go('box.dash');
        $('.dropdown-toggle').dropdown();
    })
    .controller("dashCtrl", function ($scope, saveInfor, $state, $http, datesSelect, dataFactory) {
        $scope.nowDate = new Date().getTime() - 86400000;
        datesSelect.get("#channelstart", "#channelend")
        $scope.search = function () {


            $scope.channel = {
                channel: "",
                contractId: "",
                custerName: "",
                maxAmount: "",
                minAmount: "",
                orderNo: "",
                pageSize: 20,
                status: ""
            };
            $scope.channel.startTime = 1477843200000; //$('#channelstart').val();
            $scope.channel.endTime = 1494172799000;// $('#channelend').val();
            console.log($scope.channel)
            var json = JSON.stringify($scope.channel);
            dataFactory.getlist("/bill/queryBill", "post", json).then(function (data) {
                console.log(data);
                $("#bill_list").jqGrid({
                    data: data.data.content,
                    datatype: "local",
                    colModel: [
                        {label: 'id', name: 'id', key: true, hidden: true},
                        {
                            label: '渠道', name: 'channel', resize: true,
                            drag: true,
                        },
                        {
                            label: '渠道单据号', name: 'merchantNo', resize: true,
                            drag: true,
                        },
                        {
                            label: 'OMS订单号', name: 'paymentId', resize: true,
                            drag: true, resizable: true
                        },
                        {
                            label: '所属合同', name: 'contractId', resize: true,
                            drag: true, resizable: true
                        },
                        {
                            label: '公寓名称', name: 'storeName', resize: true,
                            drag: true, resizable: true
                        },
                        {
                            label: '订单日期', name: 'transactionTime', resize: true,
                            drag: true, resizable: true
                        },
                        {
                            label: '客户名称', name: 'payerName', resize: true,
                            drag: true, resizable: true
                        },
                        {
                            label: '实收金额', name: 'inComeAmount', resize: true,
                            drag: true, resizable: true, sortable: true
                        },
                        {
                            label: '对账状态', name: 'bStatus', resize: true,
                            drag: true, resizable: true
                        },
                        {
                            label: '失败原因', name: 'resultMsg', resize: true,
                            drag: true, resizable: true
                        }
                    ],
                    viewrecords: true,
                    height: 385,
                    rowNum: 10,
                    rowList: [10, 30, 50],
                    rownumbers: true,
                    rownumWidth: 25,
                    autowidth: true,
                    resizable: true,
                    multiselect: true,
                    sortname: 'inComeAmount',
                    sortorder: 'desc',
                    pager: "#pages_bill",
                    jsonReader: {
                        root: "page.list",
                        page: "page.currPage",
                        total: "page.totalPage",
                        records: "page.totalCount"
                    },
                    prmNames: {
                        page: "page",
                        rows: "limit",
                        order: "order"
                    },
                    gridComplete: function () {
                        //隐藏grid底部滚动条
                        // $("#bill_list").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
                    }
                });
            })
        }


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
    .controller('template3Ctrl', function ($scope, $state, dataFactory) {
        dataFactory.getlist('/api/people/all', "POST", {}).then(function (data) {
            $("#people_list").jqGrid({
                data: data.data,
                datatype: "local",
                colModel: [
                    {label: 'id', name: '_id', key: true, hidden: true},
                    {
                        label: '名字', name: 'name', resize: true,
                        drag: true,
                    },
                    {
                        label: '性别', name: 'sex', resize: true,
                        drag: true,
                    },
                    {
                        label: '年龄', name: 'age', resize: true,
                        drag: true, resizable: true
                    },
                    {
                        label: '学历', name: 'edu', resize: true,
                        drag: true, resizable: true
                    },
                    {
                        label: '操作',
                        formatter: function (cellvalue, options, rowObject) {
                            var detail = "<div class='btn'>删除</div>";
                            return detail;
                        },
                    }
                ],
                viewrecords: true,
                height: 385,
                rowNum: 10,
                rowList: [10, 30, 50],
                rownumbers: true,
                rownumWidth: 25,
                autowidth: true,
                resizable: true,
                multiselect: true,
                sortname: 'inComeAmount',
                sortorder: 'desc',

                pager: "#pages_people",
                jsonReader: {
                    root: "page.list",
                    page: "page.currPage",
                    total: "page.totalPage",
                    records: "page.totalCount"
                },
                prmNames: {
                    page: "page",
                    rows: "limit",
                    order: "order"
                },
                gridComplete: function () {
                    //隐藏grid底部滚动条
                    $("#bill_list").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                }
            });
            jQuery(".btn").click(function () {
                var ids = jQuery("#people_list").jqGrid('getGridParam', 'selrow');
                console.log(ids)
                jQuery('#people_list').jqGrid('delGridRow',ids,{url:'/api/people/peopleDelete'})
               /* var json = {
                    id: ids[0]
                }*/
               /* if (ids && ids != ""){
                    dataFactory.getlist('/api/people/peopleDelete', "POST", json).then(function (data) {
                        console.log(data)
                        if (data.success) {
                            $scope.meg = data.message;
                            jQuery('#people_list').jqGrid('delGridRow',json.id,{url:'/api/people/peopleDelete'})
                        }
                    })
                }else{
                    console.log('请选择需要删除的')
                }*/
            });
        })
    })

    .controller('template4Ctrl', function ($scope, $state, dataFactory, objectJson) {
        $scope.save = function () {
            $scope.json = objectJson.get('#add');
            dataFactory.getlist('/api/people/peopleAll', "POST", $scope.json).then(function (data) {
                console.log(data);
            })
        }

    })

;