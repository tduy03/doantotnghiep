<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $comment = Comment::with(['user', 'product', 'replies'])->whereNull('parent_id')->get();

// dd($comments);
        return view('Admin.Comment.index', compact('comment'));
    }

    public function update($id)
    {
        // Find the comment by ID
        $comment = Comment::findOrFail($id);

        // Update the status
        $comment->status = request()->input('status');
        $comment->save();

        // Redirect back to the comment list with a success message
        return redirect()->route('admins.comment.index')->with('success', 'Thay đổi trạng thái thành công');
    }
    public function traloi(Request $request, string $id)
    {
        // dd($request->all());
        $comment = Comment::findOrFail($id);
        $comment_id=$comment->id;
        $product_id =$comment->product_id;
        $existingReply = Comment::where('parent_id', $comment_id)->first();
        if($existingReply){
            return redirect()->back()->with('error','Bạn đã bình luận sản phẩm này rồi');
        }
        // dd($product_id);
        $comment_traloi=$request->comment;
        if(Auth::id()){
            $user_id=Auth::id();
            $themComment=Comment::create([
                'comment'=>$comment_traloi,
                'user_id'=>$user_id,
                'product_id'=>$product_id,
                'status'=>1,
                'parent_id'=> $comment_id,
            ]);
            if($themComment){
                return redirect()->back()->with('success','thêm bình luận thành công');
            }else{
                return redirect()->back()->with('error','thêm bình luận không thành công');
            }

        }else{
            return redirect()->back()->with('error','bạn chưa đăng nhập');
        }

    }

}
