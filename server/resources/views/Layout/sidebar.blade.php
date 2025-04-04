<div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <a href="{{ route('dashboard') }}" class="logo logo-light d-flex align-items-center text-decoration-none mt-3">
            <!-- Logo -->
            <span class="logo-sm">
                <img src="{{ asset('assets/images/logo.png') }}" alt="Logo" height="50">
            </span>
            <span class="logo-lg">
                <img src="{{ asset('assets/images/logo.png') }}" alt="Logo" height="50">
            </span>
            <!-- Text beside the logo -->
            <h2 class="ms-1 mb-0 text-white fw-bold fs-4">Odern Men</h2>
        </a>

        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu"></div>
            <ul class="navbar-nav" id="navbar-nav">
                <li class="menu-title fs-4"><span data-key="t-menu">Menu</span></li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('dashboard') }}">
                        <i class="ri-bar-chart-line"></i> <span data-key="t-dashboards">Thống kê</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#sidebarContent" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="sidebarContent">
                        <i class="ri-file-list-line"></i> <span data-key="t-apps">Quản lí nội dung</span>
                    </a>
                    <div class="collapse menu-dropdown" id="sidebarContent">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{ route('admins.promotion.index') }}" class="nav-link">
                                    <i class="ri-price-tag-3-line"></i> <span data-key="t-file-manager">Khuyến mãi</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.banner.index') }}" class="nav-link">
                                    <i class="ri-image-line"></i> <span data-key="t-file-manager">Banner</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.discounts.index') }}" class="nav-link">
                                    <i class="ri-percent-line"></i> <span data-key="t-file-manager">Giảm giá</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link menu-link" href="#sidebarProduct" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="sidebarProduct">
                        <i class="ri-shopping-bag-line"></i> <span data-key="t-apps">Quản lí sản phẩm</span>
                    </a>
                    <div class="collapse menu-dropdown" id="sidebarProduct">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{ route('admins.category.index') }}" class="nav-link">
                                    <i class="ri-list-check"></i> <span data-key="t-chat">Danh mục cha</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.subcategory.index') }}" class="nav-link">
                                    <i class="ri-list-unordered"></i> <span data-key="t-file-manager">Danh mục con</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.product_sizes.index') }}" class="nav-link">
                                    <i class="ri-ruler-line"></i> <span data-key="t-file-manager">Kích thước</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.product_colors.index') }}" class="nav-link">
                                    <i class="ri-palette-line"></i> <span data-key="t-file-manager">Màu sắc</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.product.index') }}" class="nav-link">
                                    <i class="ri-store-2-line"></i> <span data-key="t-file-manager">Sản phẩm</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('admins.orders.index') }}">
                        <i class="ri-shopping-cart-line"></i> <span data-key="t-dashboards">Quản lí đơn hàng</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('admins.user.index') }}">
                        <i class="ri-user-line"></i> <span data-key="t-dashboards">Quản lí người dùng</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('admins.comment.index') }}">
                        <i class="ri-chat-3-line"></i> <span data-key="t-dashboards">Quản lí bình luận</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
</div>
