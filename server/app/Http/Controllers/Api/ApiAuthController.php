<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ForgotpasswordMail;
use App\Models\password_reset_token;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Tài khoản không tồn tại',
            ], 404);
        }

        // Kiểm tra người dùng và mật khẩu
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Thông tin đăng nhập không chính xác'],
            ]);
        }

        // Kiểm tra trạng thái tài khoản
        // if ($user->is_active == 0) {
        //     return response()->json([
        //         'message' => 'Tài khoản đã bị khóa'
        //     ], 403); // Sử dụng mã lỗi 403 cho Forbidden
        // }

        // Đăng nhập người dùng
        Auth::login($user);

        // Tạo token
        $token = $user->createToken('Access Token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
            'message' => 'Đăng nhập thành công',
        ]);
    }
    public function logout()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'Tài Khoản không tồn tại',
            ], 404);
        }

        // Delete all tokens associated with the user
        $user->tokens()->delete();

        return response()->json([
            'message' => 'Đăng xuất thành công',
            'user' => $user,
        ]);
    }


    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('Access Token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user,
            'message' => 'Đăng ký thành công',
        ]);

    }

    public function show(string $id)
    {
        $user = User::find($id);


        if ($user) {
            return response()->json($user, 200);
        }

        return response()->json(['error' => 'User not found'], 404);
    }
    public function update(Request $request, string $id)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|email|unique:users,email,' . $id . ',id',
        // ]);

        $user = User::findOrFail($id);
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            // 'password' => 'required',
            'address' => 'required',
            'phone' => 'required'
        ]);
        $param = $request->only(['name', 'email', 'password', 'address', 'phone']);

        if (isset($param['password'])) {
            $param['password'] = Hash::make($param['password']);
        }

        $updated = $user->update($param);

        if ($updated) {
            return response()->json([
                'user' => $user,
                'success' => "Cập nhật thành công",
            ], 200);
        } else {
            return response()->json(['message' => 'Cập nhật thất bại'], 404);
        }
    }

    public function forgot_password()
    {
        // ý tưởng là trả về 1 trang bên front
        return response()->json([
            'message' => 'Truy cập vào trang quên mật khẩu'
        ]);
    }
    public function check_forgot_password(Request $request)
    {
        $request->validate([
            'email' => 'required|exists:users',
        ]);
        $user = User::where('email', $request->email)->first();
        $token = Str::random(40);
        $tokenData = [
            'email' => $request->email,
            'token' => $token
        ];
        if (password_reset_token::create($tokenData)) {
            Mail::to($request->email)->send(new ForgotpasswordMail($user, $token));

            return response()->json([
                'message' => 'Đã kiểm tra thành công vui lòng kiểm tra email'
            ]);
        }
        return response()->json([
            'error' => 'Vui lòng kiểm tra lại email'
        ]);
    }
    public function reset_password($token)
    {

        // cái này có thể viết bên model
        $tokenData = password_reset_token::CheckToken($token);
        // thời gian tạo token
        $timestamp = $tokenData->created_at->timestamp;
        $timeout = strtotime('+5 minutes', $timestamp);
        $timescurrent = time(); // đây là thời gian hiện tại
        if ($timeout < $timescurrent) {
            $thoiGianHetHan = password_reset_token::where('token', $token)->delete();
            return response()->json(['message'=>'token đã hết hạn']);
        }

        // // cách 1 cách 2 sang model
        // $user = User::where('email', $tokenData->email)->firstOrFail();
        // $user = $tokenData->user;
        //
        return response()->json([
            'message' => 'Đã trả về trang'
        ]);

    }
    public function check_reset_password($token)
    {
        $tokenData = password_reset_token::CheckToken($token);
        $timestamp = $tokenData->created_at->timestamp;
        $timeout = strtotime('+5 minutes', $timestamp);
        $timescurrent = time(); // đây là thời gian hiện tại
        if ($timeout < $timescurrent) {
            $thoiGianHetHan = password_reset_token::where('token', $token)->delete();
            return response()->json(['message'=>'token đã hết hạn']);
        }
        if (!$tokenData) {
            return response()->json([
                'message' => 'không tìm thấy'
            ]);
        }
        $user = $tokenData->user;
        if (!$user) {
            return response()->json([
                'message' => 'không tìm thấy'
            ]);
        }
        $data = [
            'password' => bcrypt(request('password'))
        ];
        $check = $user->update($data);
        if ($check) {
            password_reset_token::where('token', $token)->delete();
            return response()->json([
                'message' => 'Đã cập nhật mật khẩu'
            ]);
        } else {
            return response()->json([
                'message' => 'Chưa cập nhật mật khẩu'
            ]);
        }
    }

}
