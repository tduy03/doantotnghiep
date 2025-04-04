<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin(){
      return view('login');
    }
    public function login(Request $request){
        // dd($request->all());
        $user = $request->only('email', 'password');
        // dd(Auth::attempt($user));
        if (Auth::attempt($user)) {
            $check_khoa = Auth::user();
            // dd($check_khoa);
            if ($check_khoa->is_active == 0) {
                Auth::logout();
                return redirect()->back()->with('error', 'tài khoản đã bị khóa');
            }
            //  dd(redirect()->intended(route('dashboard')));

            return redirect()->intended(route('dashboard'));
        }

        return redirect()->back()->with('Email', 'sai địa chỉ email');
    }
    public function logout(){
        Auth::logout();
        return redirect('/');
    }

}
