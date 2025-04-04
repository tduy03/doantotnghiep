<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    // Phương thức tạo bình luận
    public function store(Request $request, $id)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'comment' => 'required|string|max:255',
            'rating' => 'required|integer|between:1,5',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $productId = $id;

        // Lấy danh sách các sản phẩm chi tiết của sản phẩm này
        $productDetails = ProductDetail::where('product_id', $productId)->pluck('id')->toArray();

        // Lấy thông tin người dùng hiện tại
        $user = Auth::user();
        $userId = $user->id;

        // Kiểm tra vai trò của người dùng
        $role = $user->hasRole('Admin'); // Trả về true nếu người dùng là Admin

        // Kiểm tra nếu người dùng không tồn tại
        if (!$userId) {
            return response()->json([
                'message' => 'Tài Khoản không tồn tại',
            ], 404);
        }

        // Nếu người dùng là Admin, bỏ qua kiểm tra đã mua sản phẩm
        if (!$role) {
            // Kiểm tra xem người dùng đã mua sản phẩm chưa
            $hasPurchased = OrderDetail::whereIn('product_detail_id', $productDetails)
                ->whereHas('Order', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->exists();

            // Nếu người dùng chưa mua sản phẩm, không cho phép bình luận
            if (!$hasPurchased) {
                return response()->json(['error' => 'Bạn cần mua sản phẩm này trước khi bình luận.'], 200);
            }
        }

        // Kiểm tra nếu người dùng đã bình luận sản phẩm này rồi
        $comment1lan = Comment::query()
            ->where('user_id', $userId)
            ->where('product_id', $productId)
            ->exists();

        if ($comment1lan) {
            return response()->json(['error' => 'Bạn đã bình luận sản phẩm này rồi vui lòng không bình luận lại'], 200);
        }

        // Tạo bình luận mới
        $comment = Comment::create([
            'comment' => $validatedData['comment'],
            'rating' => $validatedData['rating'] ?? 0,
            'user_id' => $userId,
            'product_id' => $productId,
            'parent_id' => $validatedData['parent_id'] ?? null,
            'status' => 1, // Trạng thái bình luận, có thể thay đổi tùy theo yêu cầu
        ]);

        return response()->json([
            'message' => 'Bình luận đã được thêm thành công.',
            'comment' => $comment,
        ], 201);
    }

    public function delete($id){
        $comments = Comment::findOrFail($id);
        $comments->parent()->delete();
       $delete= $comments->delete();
       if($delete){
        return response()->json(['message'=>'xóa thành công']);
       }else{
        return response()->json(['message'=>'xóa không thành công']);
       }

    }

    // Lấy tất cả bình luận kèm replies
    public function index($productId)
    {
        $comments = Comment::where('product_id', $productId)
            ->whereNull('parent_id') // Chỉ lấy bình luận gốc
            ->with('replies') // Lấy các bình luận con (replies)
            ->get();

        return response()->json($comments, 200);
    }
}
