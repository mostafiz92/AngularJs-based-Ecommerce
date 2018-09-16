﻿/// <reference path="../angular.min.js" />
angular.module("SportsStore")
    .constant("productListActiveClass", "btnActive")
    .constant("productListPageCount", 3)
    .controller("productListCtrl", function ($scope, $filter,
        productListActiveClass, productListPageCount, cart) {
        var selectedCategory = null;

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }

        $scope.selectPage = function (newPage) {
            $scope.selectedPage = newPage;
        }

        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        }

        $scope.getCategoryClass = function (category) {
            return selectedCategory == category ? productListActiveClass : "";
        }

        $scope.getPageClass = function (page) {
            return $scope.selectedPage == page ? productListActiveClass : "";
        }

        $scope.addProductToCart = function (product) {
            cart.addProduct(product.objectId, product.name, product.price);
        }

    })