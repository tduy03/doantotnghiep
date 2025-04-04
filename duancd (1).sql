-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 04, 2025 at 11:59 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duancd`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` bigint UNSIGNED NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `image`, `title`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'uploads/banners/GOztEdu7IfAgKA0VH9fpaPj2DyFebJVXrDjwQtrW.jpg', 'Hot', 1, '2025-03-17 18:14:05', '2025-03-17 18:14:05'),
(2, 'uploads/banners/2nYWkHbgZ1WTIj2CbFjTFset1CADMOSNlc1hW8O8.jpg', 'Winter', 1, '2025-03-17 18:14:29', '2025-03-17 18:14:29'),
(3, 'uploads/banners/fKxRDKAbQepuxAi8a3stwpOS9RnqKxeVsoekciae.jpg', 'Power', 1, '2025-03-17 18:15:09', '2025-03-17 18:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(23, 3, '2025-04-04 09:38:18', '2025-04-04 09:38:18'),
(25, 6, '2025-04-04 09:47:40', '2025-04-04 09:47:40'),
(26, 5, '2025-04-04 10:13:49', '2025-04-04 10:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

CREATE TABLE `cart_details` (
  `id` bigint UNSIGNED NOT NULL,
  `cart_id` bigint UNSIGNED NOT NULL,
  `product_detail_id` bigint UNSIGNED NOT NULL,
  `quantity` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `price` double(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_details`
--

INSERT INTO `cart_details` (`id`, `cart_id`, `product_detail_id`, `quantity`, `created_at`, `updated_at`, `price`) VALUES
(33, 25, 320, 2, '2025-04-04 09:47:40', '2025-04-04 11:27:49', 48000.00),
(36, 26, 320, 2, '2025-04-04 10:13:49', '2025-04-04 10:14:23', 48000.00),
(39, 23, 267, 1, '2025-04-04 11:34:13', '2025-04-04 11:34:13', 32000.00),
(40, 23, 320, 1, '2025-04-04 11:36:06', '2025-04-04 11:36:06', 48000.00);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ĐỒ NAM', 'dolores-voluptatum-nisi-minima-eaque-sapiente-omnis', NULL, '2025-03-15 06:12:57', NULL),
(2, 'ĐỒ NỮ', 'laudantium-aut-et-eligendi-autem-consequatur-ut', NULL, '2025-03-15 06:13:09', NULL),
(3, 'ĐỒ THỂ THAO', 'ad-incidunt-omnis-quo-porro-saepe', NULL, '2025-03-15 06:13:28', NULL),
(11, 'LOCALBRAND', 'at-et-omnis-et-quia-recusandae-similique', NULL, '2025-03-19 05:29:10', NULL),
(61, 'Dinh Tuan Duy', 'Dinh Tuan Duy-11-Dinh Tuan Duy', '2025-03-19 05:28:30', '2025-03-19 05:28:52', '2025-03-19 05:28:52'),
(62, 'CARE & SHARE', 'CARE & SHARE-11-CARE & SHARE', '2025-03-19 05:29:53', '2025-03-19 05:29:53', NULL),
(63, 'ĐỒ DA', 'ĐỒ DA-62-ĐỒ DA', '2025-03-19 05:30:27', '2025-03-19 05:30:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint UNSIGNED NOT NULL,
  `rating` tinyint NOT NULL DEFAULT '1',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `parent_id` bigint UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `rating`, `comment`, `user_id`, `product_id`, `status`, `created_at`, `updated_at`, `parent_id`) VALUES
(2, 4, 'rấc đẹp', 3, 10, 1, '2025-03-17 18:23:55', '2025-03-17 18:23:55', NULL),
(3, 5, 'Sản phẩm đẹp', 3, 12, 1, '2025-03-19 09:53:19', '2025-03-19 09:53:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint UNSIGNED NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `expires_at` datetime DEFAULT NULL,
  `sub_category_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`id`, `discount_percent`, `created_at`, `updated_at`, `is_active`, `expires_at`, `sub_category_id`) VALUES
(2, '4.00', NULL, '2025-03-17 18:26:53', 1, '2025-08-10 01:26:00', 13),
(4, '33.00', NULL, NULL, 1, NULL, 14),
(5, '10.00', NULL, NULL, 1, NULL, 11),
(6, '84.00', NULL, NULL, 1, NULL, 12);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint UNSIGNED NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `image`, `product_image_id`, `created_at`, `updated_at`) VALUES
(11, 'uploads/products/id_10/mzCfdtpCubXEBjAxWWaKQH6u8ChRzThBhBvm9ID8.jpg', 10, '2025-03-17 17:44:07', '2025-03-17 17:44:07'),
(12, 'uploads/products/id_10/RnzoOC8EQqUNdoZ43gZvGmWLtSS2gcZVQd2aJThf.jpg', 10, '2025-03-17 17:44:07', '2025-03-17 17:44:07'),
(14, 'uploads/products/id_12/wxnxH6mx0Bk6srVnZ0irGCOk64A3PpSeuItpd4oh.jpg', 12, '2025-03-17 17:54:25', '2025-03-17 17:54:25'),
(15, 'uploads/products/id_13/XrXibNVL33oPgG1tv4m5K0y2Uplg99zpDLpScZfE.jpg', 13, '2025-03-17 17:57:12', '2025-03-17 17:57:12'),
(16, 'uploads/products/id_13/uDh4nxIXzkZi4i4CvnK2NTlc1Ib0Url3TxjGsUYJ.jpg', 13, '2025-03-17 17:57:12', '2025-03-17 17:57:12'),
(17, 'uploads/products/id_14/ccPbJwwxyj2Jv8JF4ODYV4PfXBsVEyZhLHtwuaCT.jpg', 14, '2025-03-17 17:59:44', '2025-03-17 17:59:44'),
(18, 'uploads/products/id_14/SG5JxCNNRRBki7jmuyXsjGFVbVL8xUsRbvCghc92.jpg', 14, '2025-03-17 17:59:44', '2025-03-17 17:59:44'),
(19, 'uploads/products/id_15/TqrlL2uw25J6H5QxrD03HJk9WmiJn3M4jNBofkqG.jpg', 15, '2025-03-17 18:01:17', '2025-03-17 18:28:30'),
(20, 'uploads/products/id_15/G7HkOwxPLnlwTVVAkf3hFlY0X44PowrAefUFj79a.webp', 15, '2025-03-17 18:28:30', '2025-03-17 18:28:30');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_09_07_061538_create_categories_table', 1),
(6, '2024_09_07_062505_create_sub_categories_table', 1),
(7, '2024_09_08_102523_create_discounts_table', 1),
(8, '2024_09_08_102753_create_products_table', 1),
(9, '2024_09_08_103020_create_images_table', 1),
(10, '2024_09_08_103618_create_product_colors_table', 1),
(11, '2024_09_08_103637_create_product_sizes_table', 1),
(12, '2024_09_08_103732_create_product_details_table', 1),
(13, '2024_09_08_103902_create_banners_table', 1),
(14, '2024_09_08_105458_create_shippings_table', 1),
(15, '2024_09_08_105638_create_comments_table', 1),
(16, '2024_09_08_110516_create_promotions_table', 1),
(17, '2024_09_08_110900_create_carts_table', 1),
(18, '2024_09_08_111011_create_cart_details_table', 1),
(19, '2024_09_08_111112_create_roles_table', 1),
(20, '2024_09_08_111135_create_user_roles_table', 1),
(21, '2024_09_08_112951_change_users_table', 1),
(22, '2024_09_13_033635_change_cart_details', 1),
(23, '2024_09_17_141411_change_discounts_table', 1),
(24, '2024_09_19_150837_create_orders_table', 1),
(25, '2024_09_19_151028_create_order_details_table', 1),
(26, '2024_09_29_045946_change_products_table', 1),
(27, '2024_09_29_054121_change_discounts_table', 1),
(28, '2024_09_29_123421_change_discounts_table', 1),
(29, '2024_10_03_220823_change_comments_table', 1),
(30, '2024_10_05_141214_create_jobs_table', 1),
(31, '2024_10_05_164414_add_updated_at_to_password_reset_tokens_table', 1),
(32, '2024_10_07_232639_create_wishlists_table', 1),
(33, '2024_10_07_233526_create_wishlists_details_table', 1),
(34, '2024_10_10_100504_change_orders_table', 1),
(35, '2024_10_25_122926_create_product_views_table', 1),
(36, '2024_10_29_190158_change_users_table', 1),
(37, '2024_10_29_190220_create_momos_table', 1),
(38, '2024_10_31_190555_add_momo_id_to_orders_table', 1),
(39, '2024_11_04_205301_create_vnpayys_table', 1),
(40, '2024_11_09_063519_add_vnpayy_id_to_order_table', 1),
(41, '2024_11_23_212559_create_user_promotions_table', 1),
(42, '2024_12_18_031511_change_categories_table', 1),
(43, '2024_12_18_031523_change_sub_categories_table', 1),
(44, '2024_12_18_031528_change_products_table', 1),
(45, '2024_12_18_031739_change_orders_table', 1),
(46, '2024_12_18_031744_change_user_promotions_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `momos`
--

CREATE TABLE `momos` (
  `id` bigint UNSIGNED NOT NULL,
  `partnerCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `orderInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resultCode` int NOT NULL,
  `massage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `responseTime` timestamp NULL DEFAULT NULL,
  `extraData` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `code_order` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `commodity_money` double(8,2) DEFAULT NULL,
  `total_amount` double(8,2) NOT NULL,
  `shipping_id` bigint UNSIGNED DEFAULT NULL,
  `promotion_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `order_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cho_xac_nha',
  `order_payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'chua_thanh_toan',
  `momo_id` bigint UNSIGNED DEFAULT NULL,
  `vnpayy_id` bigint UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `code_order`, `user_id`, `username`, `phone`, `address`, `email`, `note`, `commodity_money`, `total_amount`, `shipping_id`, `promotion_id`, `created_at`, `updated_at`, `order_status`, `order_payment`, `momo_id`, `vnpayy_id`, `deleted_at`) VALUES
(1, 'ORD_1_1737358529', 1, 'quốc', '0383701271', 'Nghệ An', 'nguyenngocquoc4646@gmail.com', '3442', 2668.75, 14668.75, 1, NULL, '2025-01-20 00:35:29', '2025-01-20 00:42:37', 'huy_hang', 'chua_thanh_toan', NULL, NULL, NULL),
(4, 'ORD_1_1737358618', 1, 'quốc', '0383701271', 'Nghệ An', 'nguyenngocquoc4646@gmail.com', '3442', 14264.00, 26264.00, 1, NULL, '2025-01-20 00:36:58', '2025-01-20 00:50:15', 'huy_hang', 'chua_thanh_toan', NULL, NULL, NULL),
(5, 'ORD_1_1737358766', 1, 'quốc', '0383701271', 'Nghệ An', 'nguyenngocquoc4646@gmail.com', '3442', 809.00, 12809.00, 1, NULL, '2025-01-20 00:39:26', '2025-01-20 00:50:54', 'da_nhan_hang', 'chua_thanh_toan', NULL, NULL, NULL),
(6, 'ORD_1_1737359391', 1, 'quốc', '0383701271', 'Nghệ An', 'nguyenngocquoc4646@gmail.com', '3442', 18272.00, 30272.00, 1, NULL, '2025-01-20 00:49:51', '2025-01-20 00:51:07', 'da_xac_nha', 'da_thanh_toan', NULL, NULL, NULL),
(7, 'ORD_1_1739177264', 1, 'quốc', '0383701271', 'Nghệ An', 'nguyenngocquoc4646@gmail.com', '3442', 9136.00, 21136.00, 1, NULL, '2025-02-10 01:47:44', '2025-02-10 01:49:42', 'da_nhan_hang', 'chua_thanh_toan', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_detail_id` bigint UNSIGNED NOT NULL,
  `price` double(8,2) NOT NULL,
  `quantity` double NOT NULL,
  `total_amount` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`, `updated_at`) VALUES
('dinhtuanduy1@gmail.com', 'S9AAn9tsQM7O4Kdfunp64bMrQwLwW30USbQaUWfB', '2025-03-18 16:56:40', '2025-03-18 16:56:40');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'Access Token', '15190cc3e3c63223c8cf83c67e3d6a7b968cea6deebf662c83675ccee0ed4bfe', '[\"*\"]', NULL, NULL, '2025-01-19 17:09:55', '2025-01-19 17:09:55'),
(2, 'App\\Models\\User', 1, 'Access Token', 'd7c5b83de5b1dc5eceb0e93c9eea0403d39036b575e742f80485f41c8fbdf233', '[\"*\"]', '2025-02-10 08:51:57', NULL, '2025-01-19 17:10:04', '2025-02-10 08:51:57'),
(25, 'App\\Models\\User', 6, 'Access Token', 'aef67ff6877d82154675ad047bf9faf7143e172c379a83675d4dd80f25ca7821', '[\"*\"]', '2025-04-04 11:28:28', NULL, '2025-04-04 11:27:26', '2025-04-04 11:28:28'),
(27, 'App\\Models\\User', 3, 'Access Token', '250b87fd930f6ed99118287236506c24a675c7106589fe1761a7638c4c97c300', '[\"*\"]', '2025-04-04 11:36:24', NULL, '2025-04-04 11:33:54', '2025-04-04 11:36:24');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double(8,2) NOT NULL,
  `discount_id` bigint UNSIGNED DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `view` int DEFAULT NULL,
  `is_sale` tinyint(1) NOT NULL DEFAULT '1',
  `is_hot` tinyint(1) NOT NULL DEFAULT '1',
  `is_show_home` tinyint(1) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `product_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_category_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `price_sale` double DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount_id`, `image`, `description`, `content`, `view`, `is_sale`, `is_hot`, `is_show_home`, `is_active`, `product_code`, `sub_category_id`, `created_at`, `updated_at`, `price_sale`, `deleted_at`) VALUES
(10, 'Levent\'s Black 2021', 200000.00, 5, 'uploads/products/rZXyrPC2Aoga0LzUnzLr2aXJJI7nhga3pC99bvRE.jpg', 'Pierre Wintheiser II', '<p>Nemo nam velit dolore molestiae repellat tenetur. Expedita sit a repellendus iste. Amet illo sint dolorem odio pariatur qui optio. Debitis in mollitia eveniet dolore optio ut. Rerum ipsa saepe culpa. Eum nisi mollitia est fuga est magni. Nulla quis quia eos rem aut eveniet. Eveniet dignissimos vero non dolorem autem minus qui odio. Ad debitis aut et. Rerum deleniti consequatur sed non nemo. Et rerum deleniti voluptas architecto occaecati laboriosam. Expedita ea dolorem sint. Magnam eos est labore dolorem voluptas delectus itaque. Voluptas magni est aperiam officia repudiandae dignissimos reiciendis ut. Omnis omnis voluptatem aspernatur eveniet nisi velit. Qui perspiciatis odio numquam maiores aut doloribus et est. Sed qui labore voluptas exercitationem inventore temporibus vel. Excepturi ipsam id minus reiciendis sunt maiores qui temporibus. Dolor explicabo eos libero dolor officiis modi ipsam. Neque autem laboriosam laborum sit. Aut officia commodi sequi est distinctio. Ducimus natus natus quisquam sit praesentium. Odit deserunt sunt natus corrupti quia. Autem sit necessitatibus est consequuntur praesentium eveniet. Iure vitae aut quos. Saepe et quos asperiores officiis. Eos accusantium aut ipsa quod. Amet provident enim repellat rerum illo. Eum est molestiae quae. Aliquam suscipit culpa aut molestiae. Vel dolorum ut officiis earum fuga. Odio blanditiis quas illum aspernatur omnis. Quo nostrum laboriosam at qui. Et tempora expedita similique magni. Ut minima et non tempora. Eos deserunt eligendi et quibusdam ab quam dolorem. Deserunt temporibus nostrum aut ipsa. Fugiat quae qui aliquam reprehenderit dolore corrupti incidunt. Et eum corporis ullam totam. Ipsum occaecati aut omnis molestiae ad ipsum consequatur. Non cum omnis saepe quo id enim velit veniam. Nobis est accusamus sed eos ut. Labore id debitis assumenda ex et cum in.</p>', 173, 1, 1, 1, 1, 'repellendus-expedita-aspernatur-amet-eaque-consequuntur-minima-nam-in-quasi-1', 11, '2025-01-19 17:23:33', '2025-04-04 11:34:12', 32000, NULL),
(12, 'BAD F1 JERSEY', 200000.00, 5, 'uploads/products/EAkXFzazd1Uismwdgdk3zlEZqaoMyYbl27sfFF17.jpg', 'đẹp', '<p><strong>Thiết kế:</strong>&nbsp;form oversize hiện đại, m&agrave;u sắc phối h&agrave;i h&ograve;a, ph&ugrave; hợp cho mọi outfit từ casual đến sporty.</p>\r\n\r\n<p><strong>Chất liệu:&nbsp;</strong>Vải m&egrave; cao cấp, tho&aacute;ng kh&iacute;, gi&uacute;p bạn lu&ocirc;n thoải m&aacute;i khi mặc.</p>\r\n\r\n<p><strong>Kỹ thuật:</strong>&nbsp;In lụa sắc n&eacute;t kết hợp với patch th&ecirc;u v&agrave; &eacute;p cao th&agrave;nh, tạo hiệu ứng nổi bật v&agrave; bền bỉ theo thời gian.</p>', 32, 1, 1, 1, 1, 'bad-f1-jersey-60-k27', 11, '2025-03-17 17:54:25', '2025-04-04 09:05:28', 32000, NULL),
(13, 'Croptop Black 2025', 400000.00, 6, 'uploads/products/0JjE4ixuHteCFmmIfTGgWG4fguBRgBhq0dEWwmqt.jpg', 'đẹp', '<p>hihihihihihihihih</p>', 35, 1, 1, 1, 1, 'croptop-black-2025-60-tKV', 12, '2025-03-17 17:57:12', '2025-04-04 10:28:57', 64000, NULL),
(14, 'Áo Cộc Tay Blue 11', 120000.00, 5, 'uploads/products/uDxL4kv4kXErMPIT0ejcctFFC4GWSHTzRoQl7FKT.jpg', 'Blue Beautìull', NULL, 10, 1, 1, 1, 1, 'ao-coc-tay-blue-11-60-7is', 11, '2025-03-17 17:59:44', '2025-04-04 11:34:02', 19200, NULL),
(15, 'Đồ Gym Power 03', 300000.00, 2, 'uploads/products/ASACeKQ7k3j5JWNcFllbe7rRXEsPOA6EjC6DyPhl.jpg', 'SUPERTRAMP WINDBREAKER', '<p>ffffffffffffffffff</p>', 74, 1, 1, 1, 1, 'do-gym-power-03-60-BRY', 13, '2025-03-17 18:01:17', '2025-04-04 11:36:04', 48000, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`id`, `name`, `color_code`, `created_at`, `updated_at`) VALUES
(1, 'Đen', '#000000', '2025-01-19 17:23:33', '2025-03-18 17:00:49'),
(2, 'Xanh', '#0000FF', '2025-01-19 17:23:33', '2025-03-18 17:00:56'),
(3, 'Trắng', '#FFFFFF', '2025-01-19 17:23:33', '2025-03-18 17:01:03'),
(4, 'Đỏ', '#FF0000', '2025-01-19 17:23:33', '2025-03-18 17:01:10'),
(5, 'Vàng', '#FFFF00', '2025-01-19 17:23:33', '2025-03-18 17:01:17');

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `id` bigint UNSIGNED NOT NULL,
  `size_id` bigint UNSIGNED NOT NULL,
  `color_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`id`, `size_id`, `color_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(267, 1, 1, 10, 80, '2025-03-17 17:44:32', '2025-04-04 09:06:54'),
(268, 1, 2, 10, 4, '2025-03-17 17:44:32', '2025-03-17 18:51:33'),
(269, 1, 3, 10, 62, '2025-03-17 17:44:32', '2025-03-17 17:44:32'),
(270, 1, 4, 10, 33, '2025-03-17 17:44:32', '2025-03-17 17:44:32'),
(298, 1, 1, 12, 10, '2025-03-17 17:55:33', '2025-03-19 08:25:16'),
(299, 2, 1, 12, 15, '2025-03-17 17:55:33', '2025-03-17 17:55:33'),
(300, 3, 1, 12, 20, '2025-03-17 17:55:33', '2025-03-17 17:55:33'),
(301, 4, 1, 12, 23, '2025-03-17 17:55:33', '2025-03-17 17:55:33'),
(302, 1, 2, 12, 13, '2025-03-17 17:55:33', '2025-03-17 17:55:33'),
(303, 1, 1, 13, 9, '2025-03-17 17:57:12', '2025-04-04 09:37:55'),
(304, 1, 2, 13, 15, '2025-03-17 17:57:12', '2025-03-17 17:57:12'),
(305, 1, 2, 14, 12, '2025-03-17 17:59:44', '2025-03-17 17:59:44'),
(320, 1, 1, 15, 11, '2025-03-19 05:51:41', '2025-04-04 09:47:09'),
(321, 4, 1, 15, 20, '2025-03-19 05:51:41', '2025-03-19 05:51:41');

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'S', '2025-01-19 17:23:33', '2025-03-15 07:42:37'),
(2, 'M', '2025-01-19 17:23:33', '2025-03-15 07:42:43'),
(3, 'L', '2025-01-19 17:23:33', '2025-03-15 07:42:48'),
(4, 'XL', '2025-01-19 17:23:33', '2025-03-15 07:42:55'),
(5, 'XXL', '2025-01-19 17:23:33', '2025-03-15 07:43:01');

-- --------------------------------------------------------

--
-- Table structure for table `product_views`
--

CREATE TABLE `product_views` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` double(8,2) NOT NULL,
  `discount_type` enum('percentage','fixed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimum_spend` double(8,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promotions`
--

INSERT INTO `promotions` (`id`, `code`, `discount`, `discount_type`, `minimum_spend`, `start_date`, `end_date`, `usage_limit`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CD1103', 32.00, 'percentage', 20000.00, '2025-03-19', '2025-06-20', 10, 'active', '2025-03-18 17:05:41', '2025-04-04 09:37:55'),
(2, 'Dyu1103', 15.00, 'percentage', 50000.00, '2025-03-19', '2025-05-23', 12, 'active', '2025-03-19 09:25:04', '2025-03-19 09:25:19');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shippings`
--

CREATE TABLE `shippings` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cost` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shippings`
--

INSERT INTO `shippings` (`id`, `name`, `description`, `cost`, `created_at`, `updated_at`) VALUES
(1, 'miễn phí vận chuyển', 'Quốc đẹp trai', 12000.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `image`, `status`, `category_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(11, 'Áo Nam', 'uploads/subcategory/iOFZDkkzwJ875G1HKTOM8pzUdXQiUajahsxePn5M.jpg', 'active', 1, NULL, '2025-03-15 07:51:45', NULL),
(12, 'Áo Croptop', 'uploads/subcategory/IxPc3KlhtIiuWhNTISN3wiuFYimP8mIVf3EZXXDw.jpg', 'active', 2, NULL, '2025-03-15 07:46:02', NULL),
(13, 'Đồ Gym', 'uploads/subcategory/8SRcqA86BvW2YxxCsvzxqlrHWVJ1txdcRfqqTiX6.jpg', 'active', 3, NULL, '2025-03-15 07:50:53', NULL),
(14, 'Local brand', 'uploads/subcategory/bJ0NPSaLtvgUlM6hBhcadT62IWAHLNNFxyQKktz2.jpg', 'active', 11, NULL, '2025-03-15 07:53:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `phone`, `address`, `is_active`) VALUES
(1, 'quốc', 'nguyenngocquoc4646@gmail.com', NULL, '$2y$10$9jljaA62IBcuuQ4eaBr9BOAZ/GzP.gBTSNPSkBmt5JdKOZTy5XIPa', NULL, '2025-01-19 17:09:55', '2025-01-19 17:09:55', NULL, NULL, '1'),
(2, 'Pansy Kiehn', 'kshlerin.willow@example.com', NULL, '$2y$10$EC9WN1Nc1bnwYDaygpLslOd8qBNFHujQRMMGVfJIk69EMHXL8W9sS', NULL, '2025-01-19 17:23:33', '2025-01-19 17:23:33', '(772) 626-3575', '33452 Anne Orchard\nEmardmouth, MI 47787', '1'),
(3, 'Đinh Tuấn Duy', 'dinhtuanduy1@gmail.com', NULL, '$2y$10$FVjakxhpML5lAIwbmaekRenvqDywyC7gVaLfx7BHfU5db/GTnqaB2', NULL, '2025-03-15 07:39:20', '2025-03-17 18:52:21', '0392861103', 'Ngõ 8 Lê Quang Đạo', '1'),
(5, 'Đinh Tuấn Duy', 'admin@gmail.com', NULL, '$2y$10$hJQ0NWUnbwt3/P/PVfZlguBZbPPjS1riTvVVJtvkRr8weviqBsPUe', NULL, '2025-03-19 10:09:55', '2025-03-19 04:37:32', '0392861103', 'Ngõ 8 Lê Quang Đạo', '1'),
(6, 'Oliver Keng', 'dinhtuanduy01@gmail.com', NULL, '$2y$10$HA.2UQL7Besv2NeaB1XTzenGgGIhksw8tCokKnNMH7MySZIA0McqG', NULL, '2025-04-04 09:41:39', '2025-04-04 09:41:39', NULL, NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_promotions`
--

CREATE TABLE `user_promotions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `promotion_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `so_luong` double(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_promotions`
--

INSERT INTO `user_promotions` (`id`, `user_id`, `promotion_id`, `created_at`, `updated_at`, `so_luong`) VALUES
(1, 3, 1, '2025-03-19 07:48:42', '2025-04-04 09:37:55', -1.00);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(3, 1, 1, NULL, NULL),
(4, 5, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vnpayys`
--

CREATE TABLE `vnpayys` (
  `id` bigint UNSIGNED NOT NULL,
  `vnp_Amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_BankCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_BankTranNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_CardType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_OrderInfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_PayDate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_ResponseCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_TmnCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_TransactionStatus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_TxnRef` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vnp_SecureHash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vnpayys`
--

INSERT INTO `vnpayys` (`id`, `vnp_Amount`, `vnp_BankCode`, `vnp_BankTranNo`, `vnp_CardType`, `vnp_OrderInfo`, `vnp_PayDate`, `vnp_ResponseCode`, `vnp_TmnCode`, `vnp_TransactionStatus`, `vnp_TxnRef`, `vnp_SecureHash`, `created_at`, `updated_at`) VALUES
(1, '1280900', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250120143934', NULL, NULL, NULL, '9348', '15f5d87167e7d76f244becd9501ea3d9cfd46969529b1b3c99700ece57e636b36fff5515ad6adf156c6af8ff39aed3c4af7cc0d7fdcb378b6cba7514f6cc16e3', '2025-01-20 00:39:34', '2025-01-20 00:39:34'),
(2, '3027200', 'NCB', 'VNP14798905', 'ATM', 'thanh toán hóa đơn', '20250120144908', '00', 'LG8QMIJN', '00', '698', 'ce8498067d311a99465c062bf38f72da39606288871b032e5751af05491450fea31c8596b747f69c859f00095b22240254236094587ee4582253b5b7f3cdad9f', '2025-01-20 00:49:21', '2025-01-20 00:49:48'),
(24, '3600000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404171045', NULL, NULL, NULL, '2904', '4cc7201b08ec172770aeb85eb3ac03955152b9092bf969273fbf5d8453a497909e2d8b7de92cf0840b1b84f98bedf759447f555a712bf950b35d01668c2fe94c', '2025-04-04 10:10:45', '2025-04-04 10:10:45'),
(25, '2448000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404171505', NULL, NULL, NULL, '1618', 'dee628af5c5d254ca446cb442913173a1c0567f339d979efc0813d9231692385d624c8954a5ebc614f0dff2f3dff7873335cb39124d47aa36b30a64998c1a338', '2025-04-04 10:15:05', '2025-04-04 10:15:05'),
(26, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404172949', NULL, NULL, NULL, '3437', 'd5b6e657636af03737a3b81624997896a30d9669ad65b586070a743ee89f1f6a830db43a070a8aed64aaa6cfa07cb0fc1d5716242bfe2052e105fd4012de5a0a', '2025-04-04 10:29:49', '2025-04-04 10:29:49'),
(27, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404173053', NULL, NULL, NULL, '102', '123f7efa8cb828a8cf8427e3965c2f3631e901ef013000414344085410079ce349af67ccced2817656d907052d0890f7190d75965b7ffe7ff6bf72890e6dd233', '2025-04-04 10:30:53', '2025-04-04 10:30:53'),
(28, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404174515', NULL, NULL, NULL, '8128', '8ed9696d103b97d41dcf9cf56cfa7bc451f97f1e549a6c6af1fff0e0e7fb9046315dd2ea5c80338a6cb9f8305fc73ad2afea9d7799fad3a0a42f5387e4168db2', '2025-04-04 10:45:15', '2025-04-04 10:45:15'),
(29, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404175530', NULL, NULL, NULL, '2632', '62f8a9187c374e0a86e534501ccb889b664ba0b0a3fa5b937e29ced8d7f13fc509d5fc2b8fcd040fd8fdc39c52fb05dcc433513477a31df5cf175ca1ce08b4cc', '2025-04-04 10:55:30', '2025-04-04 10:55:30'),
(30, '3152000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404175727', NULL, NULL, NULL, '6381', '89b64d9301000fdd95bd990bcf209eadd714fc3cf0cd262a3d753c7a1cfa50f77b1905e2a37ab676312f5b6e5e3bb332ca974cd688cbebfa96e4dfb5ef5b4d5a', '2025-04-04 10:57:27', '2025-04-04 10:57:27'),
(31, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404175846', NULL, NULL, NULL, '1121', 'de90f88a9b0da32b341f37173ec6ab9b16f84b5f65e37df00ae4a734bf488c67aa0f9dfccdf6f07c9af1307f2a79ca9d0b15e288f6c09e827ed1e04602489245', '2025-04-04 10:58:46', '2025-04-04 10:58:46'),
(32, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404175847', NULL, NULL, NULL, '4554', '1dfd7b0658c994ed89b71a6777bdad3098a74f0b6b5eb16b89fa7fd48bf5d5a94b1c43938e487c5976c10b4b397ed3edf583f2071c0e23d09a99fee1700952f8', '2025-04-04 10:58:47', '2025-04-04 10:58:47'),
(33, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404181533', NULL, NULL, NULL, '2826', 'b12bdb807cad132f6d7ef727eaa4254737b7f7fa089cdfe05241dac1da52883424cfbef73b0e9f7a4474c4acce91c80aa37b322680e12d1345489ff5cd8877e6', '2025-04-04 11:15:33', '2025-04-04 11:15:33'),
(34, '5200000', 'NCB', NULL, NULL, 'thanh toán hóa đơn', '20250404182018', NULL, NULL, NULL, '2776', 'a3629152263b1e34f2913ae6a57bf3741c5beb614f8e3a4301ecdab103f268db4ff9df05a5d326a76647af9e6b5449e0d138f2cecf951c158e32090e0db9a2ad', '2025-04-04 11:20:18', '2025-04-04 11:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-01-20 07:52:57', '2025-01-20 07:52:57'),
(2, 3, '2025-03-18 16:40:39', '2025-03-18 16:40:39');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists_details`
--

CREATE TABLE `wishlists_details` (
  `id` bigint UNSIGNED NOT NULL,
  `wishlist_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists_details`
--

INSERT INTO `wishlists_details` (`id`, `wishlist_id`, `product_id`, `created_at`, `updated_at`) VALUES
(2, 2, 13, '2025-03-18 16:40:39', '2025-03-18 16:40:39'),
(3, 2, 10, '2025-03-18 16:40:44', '2025-03-18 16:40:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banners_user_id_foreign` (`user_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_details_cart_id_foreign` (`cart_id`),
  ADD KEY `cart_details_product_detail_id_foreign` (`product_detail_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_product_id_foreign` (`product_id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discounts_sub_category_id_foreign` (`sub_category_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_product_image_id_foreign` (`product_image_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `momos`
--
ALTER TABLE `momos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_shipping_id_foreign` (`shipping_id`),
  ADD KEY `orders_promotion_id_foreign` (`promotion_id`),
  ADD KEY `orders_momo_id_foreign` (`momo_id`),
  ADD KEY `orders_vnpayy_id_foreign` (`vnpayy_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`),
  ADD KEY `order_details_product_detail_id_foreign` (`product_detail_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_product_code_unique` (`product_code`),
  ADD KEY `products_discount_id_foreign` (`discount_id`),
  ADD KEY `products_sub_category_id_foreign` (`sub_category_id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_details_size_id_foreign` (`size_id`),
  ADD KEY `product_details_color_id_foreign` (`color_id`),
  ADD KEY `product_details_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_views`
--
ALTER TABLE `product_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_views_user_id_product_id_unique` (`user_id`,`product_id`),
  ADD KEY `product_views_product_id_foreign` (`product_id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_promotions`
--
ALTER TABLE `user_promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_roles_user_id_foreign` (`user_id`),
  ADD KEY `user_roles_role_id_foreign` (`role_id`);

--
-- Indexes for table `vnpayys`
--
ALTER TABLE `vnpayys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishlists_user_id_foreign` (`user_id`);

--
-- Indexes for table `wishlists_details`
--
ALTER TABLE `wishlists_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlists_details_wishlist_id_product_id_unique` (`wishlist_id`,`product_id`),
  ADD KEY `wishlists_details_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `cart_details`
--
ALTER TABLE `cart_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `momos`
--
ALTER TABLE `momos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;

--
-- AUTO_INCREMENT for table `product_sizes`
--
ALTER TABLE `product_sizes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_views`
--
ALTER TABLE `product_views`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_promotions`
--
ALTER TABLE `user_promotions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vnpayys`
--
ALTER TABLE `vnpayys`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `wishlists_details`
--
ALTER TABLE `wishlists_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banners`
--
ALTER TABLE `banners`
  ADD CONSTRAINT `banners_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_details`
--
ALTER TABLE `cart_details`
  ADD CONSTRAINT `cart_details_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_details_product_detail_id_foreign` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `discounts_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_product_image_id_foreign` FOREIGN KEY (`product_image_id`) REFERENCES `products` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_momo_id_foreign` FOREIGN KEY (`momo_id`) REFERENCES `momos` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_promotion_id_foreign` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_shipping_id_foreign` FOREIGN KEY (`shipping_id`) REFERENCES `shippings` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_vnpayy_id_foreign` FOREIGN KEY (`vnpayy_id`) REFERENCES `vnpayys` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_product_detail_id_foreign` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_discount_id_foreign` FOREIGN KEY (`discount_id`) REFERENCES `discounts` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `product_colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_details_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `product_sizes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_views`
--
ALTER TABLE `product_views`
  ADD CONSTRAINT `product_views_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_views_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlists_details`
--
ALTER TABLE `wishlists_details`
  ADD CONSTRAINT `wishlists_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlists_details_wishlist_id_foreign` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
