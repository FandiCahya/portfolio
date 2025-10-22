<script setup>
import { Link, usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import { Head } from '@inertiajs/vue3'; // Import Head jika perlu

// 1. REPLIKA LOGIKA main.js DI SINI (UNTUK MOBILE NAV)
// State untuk melacak status menu mobile
const isMobileNavOpen = ref(false);

// Fungsi untuk toggle menu
const toggleMobileNav = () => {
    isMobileNavOpen.value = !isMobileNavOpen.value;
    // Ini juga akan mentoggle class di body jika diperlukan oleh template Anda
    document.body.classList.toggle('mobile-nav-active', isMobileNavOpen.value);
};

// 2. LOGIKA UNTUK ACTIVE LINK
// Dapatkan URL halaman saat ini
const page = usePage();

// 3. Re-inisialisasi script luar saat komponen dimuat
// Ini PENTING untuk script seperti AOS, Swiper, Glightbox
onMounted(() => {
    // Inisialisasi AOS (contoh)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Anda bisa tambahkan inisialisasi GLightbox, Swiper, dll di sini
    // yang mungkin ada di file 'main.js' Anda.
});

</script>

<template>
    <Head>
        <title>{{ page.props.title || 'Fandi Portofolio' }}</title>
        </Head>

    <header id="header" class="header d-flex align-items-center light-background sticky-top">
        <div class="container-fluid position-relative d-flex align-items-center justify-content-between">

            <Link href="/" class="logo d-flex align-items-center me-auto me-xl-0">
                <h1 class="sitename">Fandi</h1>
            </Link>

            <nav id="navmenu" class="navmenu" :class="{ 'mobile-nav-active': isMobileNavOpen }">
                <ul>
                    <li><Link href="/" :class="{ 'active': page.url === '/' }">Home</Link></li>
                    <li><Link href="/about" :class="{ 'active': page.url.startsWith('/about') }">About</Link></li>
                    <li><Link href="/resume" :class="{ 'active': page.url.startsWith('/resume') }">Resume</Link></li>
                    <li><Link href="/portfolio" :class="{ 'active': page.url.startsWith('/portfolio') }">Portfolio</Link></li>
                </ul>
                
                <i 
                    class="mobile-nav-toggle d-xl-none bi"
                    :class="{ 'bi-list': !isMobileNavOpen, 'bi-x': isMobileNavOpen }"
                    @click="toggleMobileNav"
                ></i>
            </nav>

            <div class="header-social-links">
                <a href="https://x.com/fandicahya56" class="twitter"><i class="bi bi-twitter-x"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100008366223744&locale=id_ID" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/cay56f?igsh=OXY2MjBoZnZvdGw4" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/in/muhammad-fandi-nurcahya-1061041b7/" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>

        </div>
    </header>

    <main class="main">
        <slot />
    </main>

    <footer id="footer" class="footer light-background">
        <div class="container">
            <div class="copyright text-center ">
                <p>© <span>{{ new Date().getFullYear() }}</span> <strong class="px-1 sitename">Fandi</strong> All Rights Reserved
                </p>
            </div>
            <div class="social-links d-flex justify-content-center">
                <a href="#"><i class="bi bi-twitter-x"></i></a>
                <a href="#"><i class="bi bi-facebook"></i></a>
                <a href="#"><i class="bi bi-instagram"></i></a>
                <a href="#"><i class="bi bi-linkedin"></i></a>
            </div>
        </div>
    </footer>

    <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center">
        <i class="bi bi-arrow-up-short"></i>
    </a>
</template>

<style>
/* Anda mungkin perlu menyalin beberapa styling CSS 
  dari main.css untuk .mobile-nav-active 
  jika 'main.js' Anda tidak dimuat dengan benar.
*/
.navmenu.mobile-nav-active {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    padding-top: 60px;
    z-index: 9996;
}

.navmenu.mobile-nav-active ul {
    display: block;
    position: absolute;
    top: 55px;
    right: 15px;
    bottom: 15px;
    left: 15px;
    padding: 10px 0;
    border-radius: 10px;
    background-color: #fff;
    overflow-y: auto;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.navmenu.mobile-nav-active a,
.navmenu.mobile-nav-active a:focus {
    padding: 10px 20px;
    font-size: 15px;
    color: #333;
}
</style>