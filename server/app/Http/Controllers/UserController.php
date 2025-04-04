<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::query()->get();
        return view('Admin.user.index', compact('user'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $role = Role::query()->get();
        return view('Admin.user.create', compact('role'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());


        if ($request->isMethod('POST')) {
            // dd($request->hinh_anh);
            $param = $request->except('_token');
            // dd($param);
            $user = User::query()->create($param);

            $roles = $request->input('roles'); // 'roles' chứa danh sách role_id
            foreach ($roles as $roleId) {
                $user->roles()->attach($roleId);
            }
            return redirect()->route('admins.user.index')->with('success', 'thêm danh mục thành công');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();
        return view('Admin.user.edit', compact('user', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'is_active' => $request->has('is_active') ? 1 : 0,
        ]);
        if ($request->has('password')) {
            $user->update([
                'password' => bcrypt($request->input('password')),
            ]);
        }
        $roles = $request->input('roles');
        $user->roles()->sync($roles);
        return redirect()->route('admins.user.index')->with('success', 'Cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
