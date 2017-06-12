/**
 * Created by pengjiangyong on 17/3/13.
 */
angular.module("server", [])
.factory("saveInfor", function () {

    var json = {};
    return {
        save: function (key, value) {
            json[key] = value;
            window.localStorage.setItem("myProject", JSON.stringify(json));
        },
        get: function (key) {
            json = {} ? JSON.parse(window.localStorage.getItem("myProject"))
                : json;
            return json[key];
        }
    }
})

.factory("contains", function () {
    return {
        expand: function (arr, obj) {
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
.factory("Server", function () {
    return {
        get: function () {
            return "";//10.0.8.135  10.0.74.54  ehrapptest.easthope.cn 10.0.8.130
        }
    }
})
.factory('dataFactory', function ($http, $q) {
    var factory = {};
    factory.getlist = function (endpoint, method, params) {
        var defer = $q.defer();
        if (method == 'GET') {
            $http({
                url: "" + endpoint,
                method: "GET",
                headers: {'Content-Type': 'application/json'},
                params: params,
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status, config) {
                // defer.resolve(data);
                defer.reject(data);
            });
        } else {
            $http({
                url: "" + endpoint,
                method: method,
                headers: {'Content-Type': 'application/json'},
                data: params,
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status, config) {
                // defer.resolve(data);
                defer.reject(data);
            });
        }
        return defer.promise;
    };
    return factory;
})
.factory('objectJson', function () {
    return {
        get: function (id) {
            var fields = $(id).serializeArray();
            var o = {};
            jQuery.each(fields, function (i, fields) {
                if (o[this.name]) {
                    /*/!*
                     表单中可能有多个相同标签，比如有多个label，
                     那么你在json对象o中插入第一个label后，还要继续插入，
                     那么这时候o[label]在o中就已经存在，所以你要把o[label]做嵌套数组处理
                     *!/*/
                    //如果o[label]不是嵌套在数组中
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];     // 将o[label]初始为嵌套数组，如o={a,[a,b,c]}
                    }
                    o[this.name].push(this.value || ''); // 将值插入o[label]
                } else {
                    o[this.name] = this.value || '';       // 第一次在o中插入o[label]
                }
            });
            return o;
        }
    }
})
.factory('datesSelect', function () {
    return {
        get: function (comtimestart, comtimeend) {

            var comstart = {
                elem: comtimestart,
                format: 'YYYY-MM-DD hh:mm:ss',
                min: "2000-01-01 00:00:00", //设定最小日期为当前日期
                max: '2099-06-16 23:59:59', //最大日期
                istime: true,
                istoday: false,
                choose: function (datas) {
                    comend.min = datas; //开始日选好后，重置结束日的最小日期
                    comend.start = datas //将结束日的初始值设定为开始日
                }
            };
            var comend = {
                elem: comtimeend,
                format: 'YYYY-MM-DD hh:mm:ss',
                min: "2000-01-01 00:00:00",
                max: '2099-06-16 23:59:59',
                istime: true,
                istoday: false,
                choose: function (datas) {
                    comstart.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };

            laydate(comstart);
            laydate(comend);
        }
    }
})
;