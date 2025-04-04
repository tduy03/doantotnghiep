<div>
    <!-- No surplus words or unnecessary actions. - Marcus Aurelius -->
</div>
@extends('Layout.master')
@section('title')
     eidt người dùng
@endsection
@section('content')
<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title mb-0">Edit User</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <form action="{{ route('admins.user.update', $user->id) }}" method="POST" enctype="multipart/form-data">
                            @csrf
                            @method('PUT')
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Name</label>
                                        <input type="text" id="name" name="name"
                                            class="form-control @error('name') is-invalid @enderror"
                                            value="{{ old('name', $user->name) }}" placeholder="Name">
                                        @error('name')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="text" id="email" name="email"
                                            class="form-control @error('email') is-invalid @enderror"
                                            value="{{ old('email', $user->email) }}" placeholder="Email">
                                        @error('email')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>

                                    <div class="mb-3">
                                        <label for="roleSelect" class="form-label">Phân quyền</label>
                                        <i class="mdi mdi-plus text-muted fs-18 rounded-2 border p-1 ms-3"
                                           style="cursor: pointer" id="add-variant"></i>
                                        <table class="table align-middle table-nowrap mb-0">
                                            <tbody id="role-table-body">
                                                @foreach($user->roles as $userRole)
                                                    <tr>
                                                        <td>
                                                            <select class="form-control" name="roles[]">
                                                                @foreach ($roles as $role)
                                                                    <option value="{{ $role->id }}"
                                                                        {{ $userRole->id == $role->id ? 'selected' : '' }}>
                                                                        {{ $role->name }}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button type="button"
                                                                class="btn btn-danger remove-field">Xóa</button>
                                                        </td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="is_active">Is Active</label>
                                        {{-- <input type="hidden" name="is_active" value="0"> --}}
                                        <input type="checkbox" class="mt-3" id="is_active" name="is_active"
                                            value="1" {{ $user->is_active ? 'checked' : '' }}>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" id="password" name="password" value="{{ $user->password }}"
                                            class="form-control @error('password') is-invalid @enderror"
                                            placeholder="Leave blank if unchanged">
                                        @error('password')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="phone" class="form-label">Phone</label>
                                        <input type="text" id="phone" name="phone"
                                            class="form-control @error('phone') is-invalid @enderror"
                                            value="{{ old('phone', $user->phone) }}" placeholder="Phone">
                                            @error('phone')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <div class="mb-3">
                                        <label for="address" class="form-label">Address</label>
                                        <input type="text" id="address" name="address"
                                            class="form-control @error('address') is-invalid @enderror"
                                            value="{{ old('address', $user->address) }}" placeholder="Address">
                                        @error('address')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary justify-content-center">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('script-libs')
<script>

    const addVariantButton = document.getElementById('add-variant');
    const roleTableBody = document.getElementById('role-table-body');


    addVariantButton.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>
                <select class="form-control" name="roles[]">
                    @foreach ($roles as $role)
                        <option value="{{ $role->id }}">{{ $role->name }}</option>
                    @endforeach
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-danger remove-field">Xóa</button>
            </td>
        `;
        roleTableBody.appendChild(newRow);
    });

    roleTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-field')) {
            const row = event.target.closest('tr');
            row.remove();
        }
    });
</script>
@endsection
