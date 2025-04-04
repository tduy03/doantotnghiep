<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Promotion;
use App\Models\UserPromotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PromotionController extends Controller
{
    public function applyPromotion(Request $request)
    {
        $code = $request->input('code');
        if (!$code) {
            return response()->json([
                'error' => 'Không tìm thấy mã khuyến mãi',
            ], 200);
        }
        $totalPrice = $request->input('totalPayment');
        // $totalPrice = 200;

        // Tìm mã khuyến mãi
        $promotion = Promotion::where('code', $code)
            ->where('status', 'active')
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->first();
        if (!$promotion) {
            return response()->json(['error' => 'Mã khuyến mãi không hợp lệ hoặc đã hết hạn'], 200);
        }
        $user_id = Auth::id();
        $promotion_id = $promotion->id;


        $checkPromotion=UserPromotion::query()
        ->where('user_id', $user_id)
        ->where('promotion_id', $promotion->id)
        ->exists();
        if (!$checkPromotion) {
            return response()->json(['error' => 'Bạn chưa lưu mã khuyến mại này'], 200);
        }
        $checkUser = Order::query()
            ->where('user_id', $user_id)
            ->where('promotion_id', $promotion->id)
            ->exists();
        // response()->json(['message' =>$checkUser]);
        // return response()->json([
        //     'user_id' => $user_id,
        //     'promotion_id' => $promotion_id,
        //     'checkUser' => $checkUser,
        // ]);
        if ($checkUser) {
            return response()->json(['error' => 'Bạn đã sử dụng mã khuyến mãi này rồi'], 200);
        }


        if ($promotion->usage_limit !== null && $promotion->usage_limit <= 0) {
            return response()->json(['error' => 'Mã khuyến mãi đã hết lượt sử dụng'], 200);
        }

        // Kiểm tra số tiền tối thiểu để áp dụng mã
        if ($promotion->minimum_spend > $totalPrice) {
            return response()->json(['error' => 'Bạn cần mua thêm sản phẩm để áp dụng mã khuyến mãi này'], 400);
        }

        // Tính toán giá trị giảm giá
        if ($promotion->discount_type == 'percentage') {
            $discountAmount = $totalPrice * ($promotion->discount / 100);
        } else {
            $discountAmount = $promotion->discount;
        }

        // Áp dụng mã khuyến mãi
        $newTotal = $totalPrice - $discountAmount;

        // Giảm số lượng sử dụng (nếu có giới hạn)

//         if ($promotion->usage_limit !== null) {
//             $promotion->decrement('usage_limit');
//         }

        // if ($promotion->usage_limit !== null) {
        //     $promotion->decrement('usage_limit');
        // }


        return response()->json([
            'promotion_id' => $promotion->id,
            'message' => 'Mã khuyến mãi đã được áp dụng',
            'total_price_after_discount' => $newTotal,
            'discount_amount' => $discountAmount
        ]);
    }


    public function addUserPromotion(Request $request)
    {
        $request->validate([
            'promotion_id' => 'required',
        ]);
        $user_id = Auth::id();
        if (!$user_id) {
            return response()->json(['message' => 'bạn chưa đăng nhập']);
        }
        $promotion_id = $request->promotion_id;
        $UesPromotion1lan = UserPromotion::query()
        ->where('user_id', $user_id)
        ->where('promotion_id', $promotion_id)
        ->exists();
        if($UesPromotion1lan){
            return response()->json(['error' => 'Bạn đã nhận mã này rồi!']);
        }
        $addPromotion = UserPromotion::create([
            'user_id' => $user_id,
            'promotion_id' => $promotion_id,
            'so_luong'=>1
        ]);
        if ($addPromotion) {
            return response()->json(['message' => 'Nhận thành công!']);
        } else {
            return response()->json(['message' => 'Nhận không thành công!']);
        }
    }
    public function getPromotion()
    {

    $user_id = Auth::id();
    if (!$user_id) {
        return response()->json(['message' => 'Bạn chưa đăng nhập']);
    }
    $userPromotions = UserPromotion::where('user_id', $user_id)->get();
    $promotions = [];
    foreach ($userPromotions as $userPromotion) {
        $promotions[] = $userPromotion->promotion;
    }
    return response()->json([
        'message' => 'Hiển thị thành công',
        'promotions' => $promotions
    ], 200);
    }
}
