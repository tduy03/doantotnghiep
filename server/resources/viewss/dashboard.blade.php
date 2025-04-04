@extends('Layout.master')

@section('content')
    <div class="container-fluid">

        <div class="row">
            <div class="col">

                <div class="h-100">

                    <div class="row">
                        <div class="col-xl-3 col-md-10">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">

                                                Tổng tiền </p>


                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value"
                                                    data-target="{{ $totalmoney }}"></span>k
                                            </h4>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-success-subtle rounded fs-3">
                                                <i class="bx bx-dollar-circle text-success"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->

                        <div class="col-xl-3 col-md-10">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                                                Tổng đơn hàng đã bán</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value"
                                                    data-target="{{ $totalBoughtProduct }}">0</span>
                                            </h4>

                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-info-subtle rounded fs-3">
                                                <i class="bx bx-shopping-bag text-info"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->

                        <div class="col-xl-3 col-md-10">
                            <!-- card -->
                            <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                                                Tổng sản phẩm</p>
                                        </div>

                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span class="counter-value"
                                                    data-target="{{ $totalProduct }}">0</span>
                                            </h4>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-warning-subtle rounded fs-3">
                                                <i class="bx bx-user-circle text-warning"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->

                        <div class="col-xl-3 col-md-10">
                            <!-- card -->
                            {{-- <div class="card card-animate">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="flex-grow-1 overflow-hidden">
                                            <p class="text-uppercase fw-medium text-muted text-truncate mb-0">
                                                My Balance</p>
                                        </div>
                                        <div class="flex-shrink-0">
                                            <h5 class="text-muted fs-14 mb-0">
                                                +0.00 %
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 class="fs-22 fw-semibold ff-secondary mb-4">$<span class="counter-value"
                                                    data-target="165.89">0</span>k
                                            </h4>
                                            <a href="" class="text-decoration-underline">Withdraw
                                                money</a>
                                        </div>
                                        <div class="avatar-sm flex-shrink-0">
                                            <span class="avatar-title bg-primary-subtle rounded fs-3">
                                                <i class="bx bx-wallet text-primary"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div><!-- end card body -->
                            </div> --}}
                            <!-- end card -->
                        </div><!-- end col -->
                    </div> <!-- end row-->

                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header border-0 align-items-center d-flex">
                                    <div class="d-flex justify-content-between w-100">
                                        <!-- Form Chọn Năm -->
                                        <div class="form-left">
                                            <form action="{{ route('dashboardYear') }}" method="post">
                                                @csrf
                                                <div class="mb-3">
                                                    <label for="year" class="form-label">Chọn hoặc nhập năm</label>
                                                    <input type="number" name="year" id="year" class="form-control" placeholder="Nhập năm" min="2000" max="2100" value="{{ old('year') }}">
                                                </div>
                                                <button type="submit" class="btn btn-primary">Lọc</button>
                                            </form>
                                        </div>

                                        <!-- Form Chọn Ngày -->
                                        {{-- <div class="form-right">
                                            <form action="{{ route('dashboardYear') }}" method="post" class="p-3 bg-light rounded shadow-sm">
                                                @csrf
                                                <div class="mb-3">
                                                    <label for="date" class="form-label">Chọn hoặc nhập ngày</label>
                                                    <input type="date" name="date" id="date" class="form-control" value="{{ old('date') }}">

                                                </div>
                                                <button type="submit" class="btn btn-primary">Lọc</button>
                                            </form>
                                        </div> --}}
                                    </div>
                                </div><!-- end card header -->

                                <div class="card-body p-0 pb-2">
                                    <div class="card-body">
                                        <div id="store-visits-column"
                                            data-colors='["--vz-danger", "--vz-info", "--vz-success"]' class="apex-charts"
                                            dir="ltr"></div>
                                    </div>
                                </div><!-- end card body -->
                            </div><!-- end card -->
                        </div><!-- end col -->
                        <!-- <div class="col-xl-4">

                                <div class="card card-height-100">
                                    <div class="card-header align-items-center d-flex">
                                        <h4 class="card-title mb-0 flex-grow-1">Sales by Locations</h4>
                                        <div class="flex-shrink-0">
                                            <button type="button" class="btn btn-soft-primary btn-sm">
                                                Export Report
                                            </button>
                                        </div>
                                    </div>


                                    <div class="card-body">

                                        <div id="sales-by-locations"
                                            data-colors='["--vz-light", "--vz-success", "--vz-primary"]' style="height: 269px"
                                            dir="ltr">
                                        </div>

                                        <div class="px-2 py-2 mt-1">
                                            <p class="mb-1">Canada <span class="float-end">75%</span></p>
                                            <div class="progress mt-2" style="height: 6px;">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                                    style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="75">
                                                </div>
                                            </div>

                                            <p class="mt-3 mb-1">Greenland <span class="float-end">47%</span>
                                            </p>
                                            <div class="progress mt-2" style="height: 6px;">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                                    style="width: 47%" aria-valuenow="47" aria-valuemin="0" aria-valuemax="47">
                                                </div>
                                            </div>

                                            <p class="mt-3 mb-1">Russia <span class="float-end">82%</span>
                                            </p>
                                            <div class="progress mt-2" style="height: 6px;">
                                                <div class="progress-bar progress-bar-striped bg-primary" role="progressbar"
                                                    style="width: 82%" aria-valuenow="82" aria-valuemin="0"
                                                    aria-valuemax="82"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div> -->
                        <!-- end col -->
                    </div>

                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">Top 10 sản phẩm được mua nhiều nhất</h4>
                                </div>

                                <div class="card-body">
                                    <div class="table-responsive table-card">
                                        <table class="table table-hover table-centered align-middle table-nowrap mb-0">
                                            <tbody>
                                                @foreach ($top10productbought as $key => $top10productboughts)
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm bg-light rounded p-1 me-2">
                                                                    <img src="{{ Storage::url($top10productboughts['image']) }}"
                                                                        alt="" class="img-fluid d-block" />
                                                                </div>
                                                                <div>
                                                                    <h5 class="fs-14 my-1"><a
                                                                            href="{{ route('admins.product.edit', $top10productboughts['id']) }}"
                                                                            class="text-reset">{{ $top10productboughts['name'] }}</a>
                                                                    </h5>
                                                                    <span class="text-muted"></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h5 class="fs-14 my-1 fw-normal">
                                                                @if ($top10productboughts['price_sale'] == null)
                                                                    {{ number_format($top10productboughts['price'], 0, ',', '.') }}
                                                                    <span class="text-muted">Price</span>
                                                                @else
                                                                    {{ number_format($top10productboughts['price_sale'], 0, ',', '.') }}
                                                                    <span class="text-muted">Price sale</span>
                                                                @endif
                                                            </h5>
                                                        </td>
                                                        <td>
                                                            <h5 class="fs-14 my-1 fw-normal">
                                                                {{ $top10productboughts['total'] }}</h5>
                                                            <span class="text-muted">Orders</span>
                                                        </td>
                                                        <td>
                                                            <h5 class="fs-14 my-1 fw-normal">
                                                                {{ $top10productboughts['stock'] }}</h5>
                                                            <span class="text-muted">Stock</span>
                                                        </td>
                                                    </tr>
                                                @endforeach

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="card card-height-100">
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">Sản phẩm sắp hết hàng</h4>
                                    <div class="flex-shrink-0">
                                    </div>
                                </div><!-- end card header -->

                                <div class="card-body">
                                    <div class="table-responsive table-card">
                                        <table class="table table-centered table-hover align-middle table-nowrap mb-0">
                                            <tbody>
                                                @foreach ($sanphamhethan as $key => $sanphamhethans)
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="avatar-sm bg-light rounded p-1 me-2">
                                                                    <img src="{{ Storage::url($sanphamhethans->product->image) }}"
                                                                        alt="" class="img-fluid d-block" />
                                                                </div>
                                                                <div>
                                                                    <h5 class="fs-14 my-1"><a
                                                                            href="{{ route('admins.product.edit', $sanphamhethans->product->id) }}"
                                                                            class="text-reset">{{ $sanphamhethans->product->name }}</a>
                                                                    </h5>
                                                                    <span class="text-muted"> Màu:
                                                                        {{ $sanphamhethans->productColor->name }} , Size:
                                                                        {{ $sanphamhethans->productSize->name }}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h5 class="fs-14 my-1 fw-normal">
                                                                @if ($top10productboughts['price_sale'] == null)
                                                                    {{ number_format($sanphamhethans->product->price, 0, ',', '.') }}
                                                                    <span class="text-muted">Price</span>
                                                                @else
                                                                    {{ number_format($sanphamhethans->product->price_sale, 0, ',', '.') }}
                                                                    <span class="text-muted">Price sale</span>
                                                                @endif
                                                            </h5>
                                                        </td>
                                                        <td>
                                                            <h5 class="fs-14 my-1 fw-normal">
                                                                {{ $sanphamhethans->quantity }}</h5>
                                                            <span class="text-muted">Số lượng</span>
                                                        </td>
                                                    </tr>
                                                @endforeach


                                            </tbody>
                                        </table><!-- end table -->
                                    </div>
                                </div> <!-- .card-body-->
                            </div> <!-- .card-->
                        </div> <!-- .col-->
                    </div> <!-- end row-->

                    <div class="row">
                        <div class="col-xl-4">
                            <div class="card card-height-100">
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">Thống kê theo danh mục</h4>

                                </div><!-- end card header -->

                                <div class="card-body">
                                    <div id="store-visits-source"
                                        data-colors='["--vz-primary", "--vz-success", "--vz-warning"]' class="apex-charts"
                                        dir="ltr"></div>
                                </div>
                            </div> <!-- .card-->
                        </div> <!-- .col-->

                        <div class="col-xl-8">
                            <div class="card">
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1">Khách hàng tiền năng</h4>
                                </div><!-- end card header -->

                                <div class="card-body">
                                    <div class="table-responsive table-card">
                                        <table
                                            class="table table-borderless table-centered align-middle table-nowrap mb-0">
                                            <thead class="text-muted table-light">
                                                <tr>
                                                    <th scope="col">Tên </th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col">Số điện thoại</th>
                                                    <th scope="col">email</th>
                                                    <th scope="col">Tổng số lượng mua</th>
                                                    <th scope="col">Số lần mua</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @foreach ($top5Users as $top5Userss)
                                                    <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <div class="flex-shrink-0 me-2">
                                                                    <img src="assets/images/users/avatar-1.jpg"
                                                                        alt="" class="avatar-xs rounded-circle" />
                                                                </div>
                                                                <div class="flex-grow-1">{{ $top5Userss->name }}</div>
                                                            </div>
                                                        </td>
                                                        <td>{{ $top5Userss->address }}</td>
                                                        <td>
                                                            <span class="text-success">{{ $top5Userss->phone }}</span>
                                                        </td>

                                                        <td>{{ $top5Userss->email }}</td>
                                                        <td>
                                                            <span
                                                                class="badge bg-success-subtle text-success">{{ $top5Userss->total }}
                                                                : sản phẩm</span>
                                                        </td>
                                                        <td>
                                                            <span
                                                                class="badge bg-success-subtle text-success">{{ $top5Userss->SoLanMua }}
                                                                : mua hàng</span>
                                                        </td>
                                                    </tr><!-- end tr -->
                                                @endforeach
                                            </tbody><!-- end tbody -->
                                        </table><!-- end table -->
                                    </div>
                                </div>
                            </div> <!-- .card-->
                        </div> <!-- .col-->
                    </div> <!-- end row-->

                </div> <!-- end .h-100-->

            </div> <!-- end col -->

            <div class="col-auto layout-rightside-col">
                <div class="overlay"></div>
                <div class="layout-rightside">
                    <div class="card h-100 rounded-0">
                        <div class="card-body p-0">


                            <div class="p-3 mt-2">
                                <h6 class="text-muted mb-3 text-uppercase fw-semibold">Top 10 danh mục sản phẩm bán được
                                    nhiều nhất
                                </h6>

                                <ol class="ps-3 text-muted">
                                    @foreach ($top10Category as $top10Categorys)
                                        <li class="py-1">
                                            <a href="#" class="text-muted">{{ $top10Categorys->name }}<span
                                                    class="float-end">số lượng đã bán được:
                                                    {{ $top10Categorys->total }}</span></a>
                                        </li>
                                    @endforeach

                                </ol>
                            </div>
                            <div class="p-3">
                                <h6 class="text-muted mb-3 text-uppercase fw-semibold">Các bình luận gần đây
                                </h6>
                                <!-- Swiper -->
                                <div class="swiper vertical-swiper" style="height: 250px;">
                                    <div class="swiper-wrapper">
                                        @foreach ($top5LastestComment as $top5LastestComments)
                                            <div class="swiper-slide">
                                                <div class="card border border-dashed shadow-none">
                                                    <div class="card-body">
                                                        <div class="d-flex">
                                                            <div class="flex-shrink-0 avatar-sm">
                                                                <div class="avatar-title bg-light rounded">
                                                                    <img src="assets/images/companies/img-1.png"
                                                                        alt="" height="30">
                                                                </div>
                                                            </div>
                                                            <div class="flex-grow-1 ms-3">
                                                                <div>
                                                                    <p
                                                                        class="text-muted mb-1 fst-italic text-truncate-two-lines">
                                                                        {{ $top5LastestComments->comment }}</p>
                                                                    <div class="fs-11 align-middle text-warning">
                                                                        @for ($i = 0; $i < 5; $i++)
                                                                            <i class="ri-star-fill"
                                                                                style="color: {{ $i < $top5LastestComments->rating ? 'gold' : 'gray' }};"></i>
                                                                        @endfor

                                                                    </div>
                                                                </div>
                                                                <div class="text-end mb-0 text-muted">
                                                                    - by <cite
                                                                        title="Source Title">{{ $top5LastestComments->user->name }}</cite>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> <!-- end card-->
                </div> <!-- end .rightbar-->

            </div> <!-- end col -->
        </div>

    </div>
@endsection
@section('script-libs')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    {{-- <!--datatable js-->
{{-- <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
<script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script> --}}

    <script src="{{ asset('assets/js/pages/datatables.init.js') }}"></script>
    <script>
        $(document).ready(function() {
            // Dữ liệu mẫu cho biểu đồ tròn
            const labels = @json(array_column($percentages, 'name')); // Lấy tên từ mảng phần trăm
            const series = @json($totalSales); // Lấy tổng sản phẩm

            // Khởi tạo biểu đồ donut
            const donutOptions = {
                chart: {
                    type: 'donut',
                    height: 350
                },
                colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019'], // Màu cố định
                series: series,
                labels: labels,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };

            // Tạo biểu đồ
            const donutChart = new ApexCharts(document.querySelector("#store-visits-source"), donutOptions);
            donutChart.render();

            // Dữ liệu cho biểu đồ cột
            // Dữ liệu mẫu cho biểu đồ cột với 12 phần
            const columnLabels = [
                'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
            ];

            const columnOptions = {
                chart: {
                    type: 'bar',
                    height: 350,
                },
                colors: ['#FF4560', '#008FFB', '#00E396', '#775DD0', '#FEB019',
                    '#FFB547', '#B1B1B1', '#FF67A3', '#6A80FF',
                    '#A45E00', '#FFA07A', '#77D7A1'
                ],
                series: [{
                    name: 'Doanh Số',
                    data: @json($monthlySales)
                }],
                xaxis: {
                    categories: columnLabels,
                },
                yaxis: {
                    title: {
                        text: 'Doanh Số',
                    },
                },
                tooltip: {
                    y: {
                        formatter: (val) => val + ' sản phẩm'
                    }
                },
            };

            const columnChart = new ApexCharts(document.querySelector("#store-visits-column"), columnOptions);
            columnChart.render();
        });
    </script>
@endsection
<!-- End Page-content -->
