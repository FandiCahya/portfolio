<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project; // <-- JANGAN LUPA TAMBAHKAN INI

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data lama agar tidak duplikat
        Project::truncate(); 
        $description = <<<DESC
        Aplikasi Monitoring Pande Besi adalah solusi canggih yang dirancang untuk memantau berbagai parameter penting di industri pembuatan pisau.

        Aplikasi ini dibangun dengan menggunakan Flutter, sebuah framework yang memungkinkan pengembangan aplikasi lintas platform dengan antarmuka pengguna yang menarik dan responsif. Kami bekerja sama dengan mitra di Tulungagung untuk implementasi dan integrasi solusi ini.
        DESC;

        $description2 = <<<DESC
        Aplikasi Booking Gym berbasis mobile dengan Flutter yang terhubung ke Laravel REST API sebagai backend. Fitur utama meliputi registrasi user, booking jadwal gym, serta laporan admin.
        DESC;

        $description3 = <<<DESC
        SIMPLE adalah aplikasi berbasis web dan Mobile yang digunakan untuk proses pengajuan, pengembangan, pengujian, dan persetujuan perangkat lunak dalam sebuah organisasi. Aplikasi ini dirancang dengan Laravel dan dilengkapi dengan fitur manajemen pengguna, approval berjenjang, dan laporan yang bisa diunduh.
        DESC;

        $description4 = <<<DESC
        SI-RESPAN adalah aplikasi berbasis web yang dibangun dengan framework Django untuk membantu dalam penentuan responden survei harga pangan. Aplikasi ini mempermudah proses analisis dan visualisasi data komoditas dari berbagai pasar.
        DESC;

        $description5 = <<<DESC
        CCTV Monitoring System adalah aplikasi berbasis web yang dirancang untuk memantau dan mengelola sistem kamera CCTV di lingkungan sekolah. Aplikasi ini memungkinkan pengguna untuk melihat rekaman langsung, mengelola pengaturan kamera, dan menerima notifikasi jika terdeteksi aktivitas mencurigakan.
        DESC;

        // Proyek 1
        Project::create([
            'title' => 'Monitoring Pande Besi',
            'category' => 'App',
            'client' => 'UMKM Pande Besi Tulungagung',
            'project_date' => '2024-09-08',
            'project_url' => 'https://github.com/FandiCahya/monitoring_pande_besi',
            'description' => $description,
            'cover_image' => '/assets/img/masonry-portfolio/pande_besi.webp',
            'images' => [ // <-- Berikan array PHP biasa
                    '/assets/img/portfolio/mitra1.webp',
                    '/assets/img/portfolio/mitra2.webp'
                ]
        ]);

        // Proyek 2
        Project::create([
            'title' => 'Booking Gym App',
            'category' => 'App', 
            'client' => 'Cyber Olympus',
            'project_date' => '2024-08-22',
            'project_url' => 'https://github.com/FandiCahya/PKL',
            'description' => $description2,
            'cover_image' => '/assets/img/masonry-portfolio/GYM_Booking.webp',
            'images' => [ // <-- Berikan array PHP biasa
                    '/assets/img/portfolio/gym1.webp',
                    '/assets/img/portfolio/gym2.webp'
                ]
        ]);

        Project::create([
            'title' => 'SIMPLE',
            'category' => 'App', 
            'client' => 'Lifemedia',
            'project_date' => '2025-08-20',
            'project_url' => 'https://github.com/FandiCahya/TugasAkhir',
            'description' => $description3,
            'cover_image' => '/assets/img/masonry-portfolio/SIMPLE.webp',
            'images' => [ // <-- Berikan array PHP biasa
                    '/assets/img/portfolio/simple1.webp',
                    '/assets/img/portfolio/simple2.webp',
                    '/assets/img/portfolio/simple3.webp',
                    '/assets/img/portfolio/simple4.webp'
                ]
        ]);

        Project::create([
            'title' => 'SI-Respan',
            'category' => 'Web', 
            'client' => 'Polinema',
            'project_date' => '2025-10-22',
            'project_url' => 'https://github.com/FandiCahya/SI-RESPAN',
            'description' => $description4,
            'cover_image' => '/assets/img/masonry-portfolio/Sirespan.webp',
            'images' => [ // <-- Berikan array PHP biasa
                    '/assets/img/portfolio/sirespan1.webp',
                    '/assets/img/portfolio/sirespan2.webp',
                    '/assets/img/portfolio/sirespan3.webp'
                ]
        ]);

        Project::create([
            'title' => 'CCTV Monitoring System',
            'category' => 'Web', 
            'client' => 'Lifemedia',
            'project_date' => '2025-06-30',
            'project_url' => 'https://github.com/dian-wahyu/monitoringcctvsekolah',
            'description' => $description5,
            'cover_image' => '/assets/img/masonry-portfolio/cctvsek.webp',
            'images' => [ // <-- Berikan array PHP biasa
                    '/assets/img/portfolio/cctv1.webp',
                    '/assets/img/portfolio/cctv2.webp',
                    '/assets/img/portfolio/cctv3.webp'
                ]
        ]);

    }
}