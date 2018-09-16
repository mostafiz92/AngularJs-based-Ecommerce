/// <reference path="../angular.min.js" />

angular.module("SportsStore")

    .constant("dataUrl", "https://parseapi.back4app.com/classes/Products/")
    .constant("orderUrl", "https://parseapi.back4app.com/classes/Orders/")
    .run(function ($http) {
        $http.defaults.headers.common["X-Parse-Application-Id"]
            = "nAbnnPr7IkQiLSfd7AAHOC3nNLM3wrv3OYWJw3kb";
        $http.defaults.headers.common["X-Parse-REST-API-Key"]
            = "zpR26VeA7sZfofI7MDHaV53RhPwSzKJ46IKcLN3B";
    })

    //.controller("sportsStoreCtrl", function ($scope) {
    //    $scope.data = {
    //        products: [
    //            { name: "Product #1", description: "A product", category: "Category #1", price: 100 },
    //            { name: "Product #2", description: "A product", category: "Category #1", price: 110 },
    //            { name: "Product #3", description: "A product", category: "Category #2", price: 210 },
    //            { name: "Product #4", description: "A product", category: "Category #3", price: 202 }
    //        ]
    //    };
    //});

    .controller("sportsStoreCtrl", function ($scope, $http,$location, dataUrl,orderUrl,cart) {
        $scope.data = {};
        $http.get(dataUrl)
            .then(function (data) {
                $scope.data.products = data;
            }, function (response) {
                $scope.data.error = response.error || response;
            })
        $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
            .then(function (data) {
                $scope.data.orderId = data;
                cart.getProducts().length == 0;
            }, function (error) {
                $scope.data.orderError = error;
            }).finally(function () {
                $location.path("/complete")
            })
        }
            //.error(function (response) {
            //    $scope.data.error = response.error || response;
            //    console.log('error');
        //})
    });