<?php

namespace App\Http\Controllers\api;

use App\Models\Wishlist;

use App\Models\WishlistsDetail;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ApiWishlistController extends Controller
{
    // Thêm sản phẩm vào danh sách yêu thích
    public function addProductToWishlist(Request $request)
    {
        $userId = Auth::id();

        if(!$userId){
            return response()->json([
                'message'=>'Bạn chưa đăng nhập',
            ],404);
        }
        $productId = $request->product_id;
        if(!$productId){
            return response()->json([
                'message'=>'Sản phẩm không tồn tại',
            ],404);
        }
        $request-> validate([
            'product_id'=>'required',
        ]);

        // Kiểm tra nếu đã có wishlist cho user
        $wishlist = Wishlist::firstOrCreate(['user_id' => $userId]);

        // Kiểm tra nếu sản phẩm đã tồn tại trong wishlist_detail
        $wishlistDetail = WishlistsDetail::where('wishlist_id', $wishlist->id)
                                        ->where('product_id', $request->product_id)
                                        ->first();

        if (!$wishlistDetail) {
            WishlistsDetail::create([
                'wishlist_id' => $wishlist->id,
                'product_id' => $request->product_id
            ]);

            return response()->json(['message' => 'Sản phẩm đã được thêm vào danh sách yêu thích'], 201);
        }

        return response()->json(['error' => 'Sản phẩm đã tồn tại trong danh sách yêu thích'], 200);
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    public function removeProductFromWishlist($productId)
    {
        $userId = Auth::id();
        if(!$userId){
            return response()->json([
                'message'=>'Tài Khoản không tồn tại',
            ],404);
        }

        $wishlist = Wishlist::where('user_id', $userId)->first();

        if ($wishlist) {
            $wishlistDetail = WishlistsDetail::where('wishlist_id', $wishlist->id)
                                            ->where('product_id', $productId)
                                            ->first();

            if ($wishlistDetail) {
                $wishlistDetail->delete();
                return response()->json(['message' => 'Sản phẩm đã được xóa khỏi danh sách yêu thích'], 200);
            }
        }

        return response()->json(['message' => 'Sản phẩm không tồn tại trong danh sách yêu thích'], 404);
    }

    // Lấy danh sách yêu thích của user
    public function getWishlist(Request $request)
    {
        $request-> validate([
            'user_id'=>'required',
        ]);
        $wishlist = Wishlist::where('user_id', $request->user_id)->first();

        if ($wishlist) {
            $wishlistDetails = WishlistsDetail::where('wishlist_id', $wishlist->id)
                                               ->with('product')
                                               ->with('product.discount') // Load thông tin sản phẩm
                                               ->get();

            foreach ($wishlistDetails as $key => $wishlistDetail) {
                // Sử dụng sản phẩm liên kết với wishlistDetail
                $wishlistDetail->imageUrl = 'http://127.0.0.1:8000/storage/' . $wishlistDetail->product->image;
            }
            return response()->json($wishlistDetails, 200);
        }

        return response()->json(['message' => 'Không có sản phẩm yêu thích'], 200);
    }
}
