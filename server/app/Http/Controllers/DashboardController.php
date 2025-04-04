<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
   public function Dashboard(Request $request)
   {
      if ($request->year) {
         $year = $request->year;
      } else {
         $year = Carbon::now()->year;
      }
      $totalmoney = Order::query()->whereNot('order_status', 'huy_hang')->sum('total_amount');

      $checkHuyHang = Order::with('OrderDetail') // Tải sẵn quan hệ OrderDetail
         ->whereNot('order_status', 'huy_hang')
         ->get();

      $totalBoughtProduct = 0;

      foreach ($checkHuyHang as $checkH) {
         // Sau khi tải sẵn, bạn có thể truy cập OrderDetail như một bộ sưu tập
         $totalBoughtProduct += $checkH->OrderDetail->sum('quantity');
      }
      //  foreach ($checkHuyHang as $checkH){
      //    $totalBoughtProduct = $checkHuyHang->OrderDetail->sum('quantity');
      //  }
      $tongDonHangHuy = Order::query()->where('order_status','huy_hang')->count('total_amount');
      // dd($totalBoughtProduct);
      $totalProduct = ProductDetail::sum('quantity');
      // dd($totalBoughtProduct);
      // c1:
      $top10Category = SubCategory::select('sub_categories.name', 'sub_categories.id', DB::raw('SUM(Order_details.quantity) as total'))
         // từ bảng subcategory lấy name và id và thực hiện tổng sản phẩm gọi thành total
         ->join('products', 'sub_categories.id', '=', 'products.sub_category_id')
         // ở đây là nối các bảng
         ->join('product_details', 'products.id', '=', 'product_details.product_id')
         // ở đây là nối các bảng
         ->join('order_details', 'product_details.id', '=', 'order_details.product_detail_id')
         // ở đây là nối các bảng
         ->groupBy('sub_categories.name', 'sub_categories.id')
         // nhóm nó theo name và id
         ->orderBy('total', 'desc')
         // sắn xếp theo tổng nhiều nhất
         ->limit(10)
         // giời hạn là 10
         // ->toRawSql();
         // để hiện sql ra check
         ->get();
      // đây là nối 4 bảng vào với nhau để có thể lấy được top 10 danh mục sản phẩm bán được nhiều nhất

      $top5LastestComment = Comment::query()
         ->whereNull('parent_id')
         ->where('status', '1')
         ->orderBy('id', 'desc')
         ->limit(5)
         ->get();

      // cái này cũng giống với top 10 danh mục nên t làm theo cách 2
      $top10productbought = Product::with('ProductDetail.orderDetail')
         // gọi thế này thì trong mảng product sẽ có cả productDetal và order (nếu không nhầm)
         ->select('products.id', 'products.name', 'products.image', 'products.price', 'products.price_sale')
         // lấy những cái này
         ->get()
         // map là để nó trả ra từng phần từ (thằng này giống foreach)
         ->map(function ($product) {
            // flatmap sau khi trả ra thì từ cái mảng map đó sẽ thêm dữ liệu total (cái mảng map sẽ thêm những dữ liệu mà flatmap tạo ra)
            $total = $product->ProductDetail->flatMap(function ($productDetail) {
               // pluck là nó sẽ trả về 1 mảng tử order_detail xem có dữ liệu không (trả về 1 mảng gồm tất cả những trường đó)
               return $productDetail->orderDetail->pluck('quantity');
            })->sum();
            // tính tổng của sản phẩm trong chi tiết sản phẩm
            $stock = $product->ProductDetail->sum('quantity');
            // Trả về một mảng với thông tin sản phẩm và tổng số lượng
            return [
               'id' => $product->id,
               'name' => $product->name,
               'image' => $product->image,
               'price' => $product->price,
               'price_sale' => $product->price_sale,
               'total' => $total,
               'stock' => $stock,
            ];
         })
         ->sortByDesc('total')
         ->take(5); // Lấy 10 sản phẩm hàng đầu
// dd($top10productbought);
      $sanphamhethan = ProductDetail::query()->where('quantity', '<', '30')->get();


      $top5Users = Order::select('orders.user_id', 'users.name', 'users.phone', 'users.address', 'users.email')
         ->selectRaw('SUM(order_details.quantity) as total')
         ->selectRaw('COUNT(order_details.product_detail_id) as SoLanMua')
         ->join('order_details', 'orders.id', '=', 'order_details.order_id') // Kết hợp bảng order_details
         ->join('users', 'users.id', '=', 'orders.user_id') // Kết hợp bảng users
         ->groupBy('orders.user_id', 'users.name', 'users.phone', 'users.address', 'users.email') // Nhóm theo user_id và các trường của users
         ->orderBy('total', 'desc')
         ->take(5)
         ->get();

      // thống kê theo năm
      $currentYear = Carbon::now()->year;
      $data = OrderDetail::selectRaw('MONTH(created_at) as month, SUM(quantity) as total_sales')
         ->whereYear('created_at', $currentYear)
         ->groupBy('month')
         ->orderBy('month', 'asc')
         ->get();

      $monthlySales = array_fill(0, 12, 0);
      // array_fill là tạo ra 1 mảng gồm 12 phần tử vs giá trị bằng 0
      foreach ($data as $item) {
         $monthlySales[$item->month - 1] = $item->total_sales;
      }
      $percentages = [];
      // Thống kê biểu đồ tròn theo danh mục sản phẩm đã bán
// lấy dữ liệu từ cái trên xuống nhưng bỏ cái limit đi để không bị giowia hạn
      $PieChart = SubCategory::select('sub_categories.name', 'sub_categories.id', DB::raw('SUM(order_details.quantity) as total'))
         ->join('products', 'sub_categories.id', '=', 'products.sub_category_id')
         ->join('product_details', 'products.id', '=', 'product_details.product_id')
         ->join('order_details', 'product_details.id', '=', 'order_details.product_detail_id')
         ->groupBy('sub_categories.name', 'sub_categories.id')
         ->orderBy('total', 'desc')
         ->get();

      foreach ($PieChart as $PieCharts) {
         $percen = ($PieCharts->total / $totalBoughtProduct) * 100;
         $percentages[] = [
            'name' => $PieCharts->name,
            'total' => $PieCharts->total,
            'percent' => $percen
         ];
      }

      // Lưu mảng tổng sản phẩm vào biến cho JavaScript
      $totalSales = array_column($percentages, 'total'); // Lấy ra mảng tổng sản phẩm
      $sanphamhethan = ProductDetail::query()->where('quantity', '<', '30')->orderBy('quantity', 'asc')->limit('5')->get();
      // dd($percen);
      return view('dashboard', compact('totalmoney', 'totalBoughtProduct','tongDonHangHuy', 'totalProduct', 'top10Category', 'top5LastestComment', 'top10productbought', 'top5Users', 'monthlySales', 'percentages', 'totalSales', 'sanphamhethan'));
   }
}
