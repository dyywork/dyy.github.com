/**
 * Created by pengjiangyong on 17/3/13.
 */
angular.module("server",[])
    .factory("saveInfor",function () {

        var json = {};
        return{
            save:function (key,value) {
                json[key] = value;
                window.localStorage.setItem("myProject",JSON.stringify(json));
            },
            get:function (key) {
                json={}?JSON.parse(window.localStorage.getItem("myProject")):json;
                return json[key];
            }
        }
    })
    .factory("contains",function () {
        return {
            expand:function (arr, obj) {
                var i = arr.length;
                while (i--) {
                    if (arr[i] == obj) {
                        return true;
                    }
                }
                return false;
            }
        }
        
    })
    .factory('dataFactory', function ($http, $q){
        var factory = {};
        factory.getlist = function(endpoint, method, params) {
            var defer = $q.defer();
            if (method == 'GET') {
                $http({
                    url: ""+endpoint,
                    method: "GET",
                    headers: {'Content-Type': 'application/json'},
                    params: params,
                }).success(function (data) {
                    defer.resolve(data);
                }).
                error(function (data, status,  config) {
                    // defer.resolve(data);
                    defer.reject(data);
                });
            } else {
                $http({
                    url:""+endpoint,
                    method: method,
                    headers:  {'Content-Type': 'application/json'},
                    data: params,
                }).success(function (data) {
                    defer.resolve(data);
                }).
                error(function (data, status, config) {
                    // defer.resolve(data);
                    defer.reject(data);
                });
            }
            return defer.promise;
        };
        return factory;
    })
    .factory('objectJson',function () {
        return{
            get:function (id) {
                var fields = $(id).serializeArray();
                var o={};
                jQuery.each(fields, function(i, fields){
                    if(o[this.name]){
                    /*/!*
                        表单中可能有多个相同标签，比如有多个label，
                         那么你在json对象o中插入第一个label后，还要继续插入，
                         那么这时候o[label]在o中就已经存在，所以你要把o[label]做嵌套数组处理
                        *!/*/
                        //如果o[label]不是嵌套在数组中
                        if(!o[this.name].push){
                            o[this.name]=[o[this.name]];     // 将o[label]初始为嵌套数组，如o={a,[a,b,c]}
                        }
                        o[this.name].push(this.value || ''); // 将值插入o[label]
                    }else{
                        o[this.name]=this.value || '';       // 第一次在o中插入o[label]
                    }
                });
                return o;
            }
        }
    })
;