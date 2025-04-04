<div>
    <!-- I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison -->
</div>
@extends('Layout.master')
@section('title')
    thêm người dùng
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-header">
                    <h5 class="card-title mb-0">Input Type</h5>
                </div><!-- end card header -->

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <form action="{{ route('admins.user.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Name</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('name') is-invalid @enderror" name="name"
                                                value="{{ old('name') }}" placeholder="name ">
                                            @error('name')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">email</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('email') is-invalid @enderror" name="email"
                                                value="{{ old('email') }}" placeholder="email ">
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
                                                    <tr>
                                                        <td>
                                                            <select class="form-control" name="roles[]">
                                                                @foreach ($role as $roles)
                                                                    <option value="{{ $roles->id }}">{{ $roles->name }}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <button type="button"
                                                                class="btn btn-danger remove-field">Xóa</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                           
                                        </div>
                                        <div class="mb-3">
                                            <div>
                                                <label for="is_active">Is Active</label>
                                                <input type="hidden" name="is_active" value="0">
                                                <input type="checkbox" class="mt-3" id="is_active" name="is_active"
                                                    value="1">
                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">password</label>
                                            <input type="password" id="simpleinput"
                                                class="form-control  @error('password') is-invalid @enderror"
                                                name="password" value="{{ old('password') }}" placeholder="password">
                                            @error('password')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">phone</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('phone') is-invalid @enderror" name="phone"
                                                value="{{ old('phone') }}" placeholder="phone ">
                                            @error('phone')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">address</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('address') is-invalid @enderror" name="address"
                                                value="{{ old('address') }}" placeholder="address ">
                                            @error('address')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary justify-content-center">Gửi</button>
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
        document.getElementById('add-variant').addEventListener('click', function() {
    const tableBody = document.getElementById('role-table-body');
    
    // Tạo dòng mới cho phân quyền
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>
            <select class="form-control" name="roles[]">
                @foreach ($role as $roles)
                    <option value="{{ $roles->id }}">{{ $roles->name }}</option>
                @endforeach
            </select>
        </td>
        <td>
            <button type="button" class="btn btn-danger remove-field">Xóa</button>
        </td>
    `;

    // Thêm dòng mới vào bảng
    tableBody.appendChild(newRow);

    // Gán sự kiện xóa cho nút Xóa mới
    newRow.querySelector('.remove-field').addEventListener('click', function() {
        newRow.remove();
    });
});

// Gán sự kiện xóa cho nút Xóa ban đầu
document.querySelectorAll('.remove-field').forEach(function(button) {
    button.addEventListener('click', function() {
        button.closest('tr').remove();
    });
});
    </script>
@endsection
