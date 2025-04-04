<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductColorController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\ProductSizeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/showLogin', [AuthController::class, 'showLogin'])->name('showLogin');
// Route::get('/showLogin',function() {
//     dd(\Hash::make(123456));
// });

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/admin/orders/details/{id}', [OrderController::class, 'getOrderDetails'])->name('admins.orders.details');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth:sanctum', 'auth.admin'])->group(function () {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
Route::post('/dashboardYear',[DashboardController::class, 'dashboard'])->name('dashboardYear');
    Route::prefix('admins')->as('admins.')->group(function () {

        // Orders Routes
        Route::prefix('orders')->as('orders.')->group(function () {
            Route::get('/', [OrderController::class, 'index'])->name('index');
            Route::post('/search', [OrderController::class, 'index'])->name('search');
            Route::post('/search_OrderStatus', [OrderController::class, 'index'])->name('search_OrderStatus');
            Route::post('/search_OrderPayment', [OrderController::class, 'index'])->name('search_OrderPayment');
            Route::get('/create', [OrderController::class, 'create'])->name('create');
            Route::post('/store', [OrderController::class, 'store'])->name('store');
            // Route::get('/show/{id}', [OrderController::class, 'show'])->name('show');
            Route::get('/show/{id}', [OrderController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [OrderController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [OrderController::class, 'update'])->name('update');
            Route::put('/{id}/updatePayment', [OrderController::class, 'updatePayment'])->name('updatePayment');
            Route::delete('/{id}/destroy', [OrderController::class, 'destroy'])->name('destroy');
            Route::get('/{id}/getOrderDetail', [OrderController::class,'getOrderDetail']);

        });

        // Category Routes
        Route::prefix('category')->as('category.')->group(function () {
            Route::get('/', [CategoryController::class, 'index'])->name('index');
            Route::get('/create', [CategoryController::class, 'create'])->name('create');
            Route::post('/store', [CategoryController::class, 'store'])->name('store');
            Route::get('/{id}/edit', [CategoryController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [CategoryController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [CategoryController::class, 'destroy'])->name('destroy');
        });

        // SubCategory Routes
        Route::prefix('subcategory')->as('subcategory.')->group(function () {
            Route::get('/', [SubCategoryController::class, 'index'])->name('index');
            Route::get('/create', [SubCategoryController::class, 'create'])->name('create');
            Route::post('/store', [SubCategoryController::class, 'store'])->name('store');
            Route::get('/show/{id}', [SubCategoryController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [SubCategoryController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [SubCategoryController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [SubCategoryController::class, 'destroy'])->name('destroy');
        });

        // Banner Routes
        Route::prefix('banner')->as('banner.')->group(function () {
            Route::get('/', [BannerController::class, 'index'])->name('index');
            Route::get('/create', [BannerController::class, 'create'])->name('create');
            Route::post('/store', [BannerController::class, 'store'])->name('store');
            Route::get('/{id}/edit', [BannerController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [BannerController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [BannerController::class, 'destroy'])->name('destroy');
        });

        // Discounts Routes
        Route::prefix('discounts')->as('discounts.')->group(function () {
            Route::get('/', [DiscountController::class, 'index'])->name('index');
            Route::get('/create', [DiscountController::class, 'create'])->name('create');
            Route::post('/store', [DiscountController::class, 'store'])->name('store');
            Route::get('/show/{id}', [DiscountController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [DiscountController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [DiscountController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [DiscountController::class, 'destroy'])->name('destroy');
        });

        // Promotion Routes
        Route::prefix('promotion')->as('promotion.')->group(function () {
            Route::get('/', [PromotionController::class, 'index'])->name('index');
            Route::get('/create', [PromotionController::class, 'create'])->name('create');
            Route::post('/store', [PromotionController::class, 'store'])->name('store');
            Route::get('/show/{id}', [PromotionController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [PromotionController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [PromotionController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [PromotionController::class, 'destroy'])->name('destroy');
        });

        // Product Sizes Routes
        Route::prefix('product_sizes')->as('product_sizes.')->group(function () {
            Route::get('/', [ProductSizeController::class, 'index'])->name('index');
            Route::get('/create', [ProductSizeController::class, 'create'])->name('create');
            Route::post('/store', [ProductSizeController::class, 'store'])->name('store');
            Route::get('/show/{id}', [ProductSizeController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [ProductSizeController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [ProductSizeController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [ProductSizeController::class, 'destroy'])->name('destroy');
        });

        // Product Routes
        Route::prefix('product')->as('product.')->group(function () {
            Route::get('/', [ProductController::class, 'index'])->name('index');
            Route::get('/create', [ProductController::class, 'create'])->name('create');
            Route::post('/store', [ProductController::class, 'store'])->name('store');
            Route::get('/show/{id}', [ProductController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [ProductController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [ProductController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [ProductController::class, 'destroy'])->name('destroy');
        });

        // Product Colors Routes
        Route::prefix('product_colors')->as('product_colors.')->group(function () {
            Route::get('/', [ProductColorController::class, 'index'])->name('index');
            Route::get('/create', [ProductColorController::class, 'create'])->name('create');
            Route::post('/store', [ProductColorController::class, 'store'])->name('store');
            Route::get('/show/{id}', [ProductColorController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [ProductColorController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [ProductColorController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [ProductColorController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('user')->as('user.')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('/create', [UserController::class, 'create'])->name('create');
            Route::post('/store', [UserController::class, 'store'])->name('store');
            Route::get('/show/{id}', [UserController::class, 'show'])->name('show');
            Route::get('/{id}/edit', [UserController::class, 'edit'])->name('edit');
            Route::put('/{id}/update', [UserController::class, 'update'])->name('update');
            Route::delete('/{id}/destroy', [UserController::class, 'destroy'])->name('destroy');
        });
        Route::prefix('comment')->as('comment.')->group(function () {
            Route::get('comment', [CommentController::class, 'index'])->name('index');
            Route::post('/traloi/{id}',[CommentController::class,'traloi'])->name('traloi');
            Route::put('{id}/status', [CommentController::class, 'update'])->name('update');
        });
    });



});



