<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg"
    data-sidebar-image="none" data-preloader="disable">

<head>

    <meta charset="utf-8" />
    <title>Dashboard | Velzon - Admin & Dashboard Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
    <meta content="Themesbrand" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{ asset('assets/images/favicon.ico') }}">

    <!-- jsvectormap css -->
    <link href="{{ asset('assets/libs/jsvectormap/css/jsvectormap.min.css') }}" rel="stylesheet" type="text/css" />

    <!--Swiper slider css-->
    <link href="{{ asset('assets/libs/swiper/swiper-bundle.min.css') }}" rel="stylesheet" type="text/css" />

    <!-- Layout config Js -->
    <script src="{{ asset('assets/js/layout.js') }}"></script>
    <!-- Bootstrap Css -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="{{ asset('assets/css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="{{ asset('assets/css/app.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- custom Css-->
    <link href="{{ asset('assets/css/custom.min.css') }}" rel="stylesheet" type="text/css" />
    {{-- data table --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <script src="{{ asset('assets/js/layout.js') }}"></script>
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">


</head>

<body>

    <!-- Begin page -->
    <div id="layout-wrapper">




        <!-- removeNotificationModal -->
        <!-- ========== App Menu ========== -->

        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">

            <div class="page-content">
                <div class="auth-page-wrapper pt-5">
                    <!-- auth page bg -->
                    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
                        <div class="bg-overlay"></div>

                        <div class="shape">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                                <path
                                    d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z">
                                </path>
                            </svg>
                        </div>
                    </div>

                    <!-- auth page content -->
                    <div class="auth-page-content">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="text-center mt-sm-5 mb-4 text-white-50">
                                        <div>
                                            <a href="{{ url('/') }}" class="d-inline-block auth-logo">
                                                <img src="{{ asset('assets/images/logo-light.png') }}" alt=""
                                                    height="20">
                                            </a>
                                        </div>
                                        <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                    </div>
                                </div>
                            </div>
                            <!-- end row -->

                            <div class="row justify-content-center">
                                <div class="col-md-8 col-lg-6 col-xl-5">
                                    <div class="card mt-4">
                                        <div class="card-body p-4">
                                            <div class="text-center mt-2">
                                                <h5 class="text-primary">Chào mừng !</h5>
                                                <p class="text-muted">Đăng nhập để tiếp tục đến OrdernMan.</p>
                                            </div>
                                            <div class="p-2 mt-4">
                                                <form method="POST" action="{{ route('login') }}">
                                                    @csrf

                                                    <div class="mb-3">
                                                        <label for="email" class="form-label">Email <span
                                                                class="text-danger">*</span></label>
                                                        <input type="email" name="email" class="form-control"
                                                            id="email" placeholder="Nhập email" required>
                                                        @error('email')
                                                            <div class="text-danger">{{ $message }}</div>
                                                        @enderror
                                                    </div>

                                                    <div class="mb-3">
                                                        <label class="form-label" for="password-input">Mật khẩu <span
                                                                class="text-danger">*</span></label>
                                                        <div class="position-relative auth-pass-inputgroup mb-3">
                                                            <input type="password" name="password"
                                                                class="form-control pe-5 password-input"
                                                                placeholder="Mật khẩu" id="password-input" required>
                                                            <button
                                                                class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                type="button" id="password-addon"
                                                                onclick="togglePasswordVisibility()"><i
                                                                    class="ri-eye-fill align-middle"
                                                                    id="eye-icon"></i></button>
                                                        </div>
                                                        @error('password')
                                                            <div class="text-danger">{{ $message }}</div>
                                                        @enderror
                                                    </div>

                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            name="remember" id="auth-remember-check">
                                                        <label class="form-check-label" for="auth-remember-check">Nhớ
                                                            mật khẩu</label>
                                                    </div>

                                                    <div class="mt-4">
                                                        <button class="btn btn-success w-100" type="submit">Đăng
                                                            nhập</button>
                                                    </div>

                                                    <div class="mt-4 text-center">
                                                        <div class="signin-other-title">
                                                            <h5 class="fs-13 mb-4 title">Đăng nhập với</h5>
                                                        </div>
                                                        <div>
                                                            <button type="button"
                                                                class="btn btn-primary btn-icon waves-effect waves-light"><i
                                                                    class="ri-facebook-fill fs-16"></i></button>
                                                            <button type="button"
                                                                class="btn btn-danger btn-icon waves-effect waves-light"><i
                                                                    class="ri-google-fill fs-16"></i></button>
                                                            <button type="button"
                                                                class="btn btn-dark btn-icon waves-effect waves-light"><i
                                                                    class="ri-github-fill fs-16"></i></button>
                                                            <button type="button"
                                                                class="btn btn-info btn-icon waves-effect waves-light"><i
                                                                    class="ri-twitter-fill fs-16"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <!-- end card body -->
                                    </div>
                                    <!-- end card -->



                                </div>
                            </div>
                            <!-- end row -->
                        </div>
                        <!-- end container -->
                    </div>
                    <!-- end auth page content -->

                </div>
                <!-- container-fluid -->
            </div>
            <!-- End Page-content -->

            @include('Layout.footer')
        </div>
        <!-- end main content-->

    </div>
    <!-- END layout-wrapper -->



    <!--start back-to-top-->
    <button onclick="topFunction()" class="btn btn-danger btn-icon" id="back-to-top">
        <i class="ri-arrow-up-line"></i>
    </button>
    <!--end back-to-top-->

    <!--preloader-->
    <div id="preloader">
        <div id="status">
            <div class="spinner-border text-primary avatar-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>

    <div class="customizer-setting d-none d-md-block">
        <div class="btn-info rounded-pill shadow-lg btn btn-icon btn-lg p-2" data-bs-toggle="offcanvas"
            data-bs-target="#theme-settings-offcanvas" aria-controls="theme-settings-offcanvas">
            <i class='mdi mdi-spin mdi-cog-outline fs-22'></i>
        </div>
    </div>
    <script src="{{ asset('assets/libs/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/libs/simplebar/simplebar.min.js') }}"></script>
    <script src="{{ asset('assets/libs/node-waves/waves.min.js') }}"></script>
    <script src="{{ asset('assets/libs/feather-icons/feather.min.js') }}"></script>
    <script src="{{ asset('assets/js/pages/plugins/lord-icon-2.1.0.js') }}"></script>
    <script src="{{ asset('assets/js/plugins.js') }}"></script>

    <!-- apexcharts -->
    {{-- <script src="{{ asset('assets/libs/apexcharts/apexcharts.min.js') }}"></script>  --}}

    <!-- Vector map-->
    <script src="{{ asset('assets/libs/jsvectormap/js/jsvectormap.min.js') }}"></script>
    <script src="{{ asset('assets/libs/jsvectormap/maps/world-merc.js') }}"></script>

    <!--Swiper slider js-->
    <script src="{{ asset('assets/libs/swiper/swiper-bundle.min.js') }}"></script>

    <!-- Dashboard init -->
    <script src="{{ asset('assets/js/pages/dashboard-ecommerce.init.js') }}"></script>


    @yield('script-libs')
    <!-- App js -->
    <script src="{{ asset('assets/js/app.js') }}"></script>
</body>

</html>
