<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Home'); // File: resources/js/Pages/Home.vue
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About'); // File: resources/js/Pages/About.vue
})->name('about');

Route::get('/resume', function () {
    return Inertia::render('Resume'); // File: resources/js/Pages/Resume.vue
})->name('resume');

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio'); // File: resources/js/Pages/Portfolio.vue
})->name('portfolio');

