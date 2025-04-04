<div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
                <img src="{{asset('assets/images/logo-sm.png')}}" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="{{asset('assets/images/logo-dark.png')}}" alt="" height="17">
            </span>
        </a>
        <!-- Light Logo-->
        <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
                <img src="{{asset('assets/images/logo-sm.png')}}" alt="" height="22">
            </span>
            <span class="logo-lg">
                <img src="{{asset('assets/images/logo-light.png')}}" alt="" height="17">
            </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">
                <li class="menu-title"><span data-key="t-menu">Menu</span></li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{route('dashboard')}}" >
                        <i class="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Dashboards</span>
                    </a>
                </li> 
                <li class="nav-item">
                    <a class="nav-link menu-link" href="#sidebarApps" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="sidebarApps">
                        <i class="ri-apps-2-line"></i> <span data-key="t-apps">List data</span>
                    </a>
                    <div class="collapse menu-dropdown" id="sidebarApps">
                        <ul class="nav nav-sm flex-column">
                            <li class="nav-item">
                                <a href="{{ route('admins.category.index') }}" class="nav-link"
                                    data-key="t-chat">category</a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.promotion.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">Promotion</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.banner.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">Banner</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.discounts.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">Discount</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.product_sizes.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">ProductSize</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.product_colors.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">ProductColor</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.product.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">Product</span></a>
                            </li>
                            <li class="nav-item">
                                <a href="{{ route('admins.subcategory.index') }}" class="nav-link"> <span
                                        data-key="t-file-manager">Subcate</span></a>
                            </li>

                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('admins.orders.index') }}">
                        <i class="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Đơn hàng</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('admins.user.index') }}">
                        <i class="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Người dùng</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link menu-link" href="{{ route('admins.comment.index') }}">
                        <i class="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Bình luận</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
</div>
