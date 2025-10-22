<script setup>
import { onMounted } from 'vue';
import Swiper from 'swiper';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/swiper-bundle.min.css';
import 'swiper/css/bundle';

// 1. Terima 'project' sebagai prop. Isinya adalah OBJEK LENGKAP
defineProps({
    project: Object 
});

onMounted(() => {
    // Kode Swiper Anda tetap sama
    new Swiper('.portfolio-details-slider', {
        loop: true,
        speed: 600,
        autoplay: { delay: 5000 },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });
});
</script>

<template>
    <main class="main">
            <section id="portfolio-details" class="portfolio-details section">
                
                <div class="container section-title" data-aos="fade-up">
                    <h2 style="color: black;">{{ project.title }}</h2>
                    <p>Detail untuk proyek {{ project.title }}</p>
                </div>
                
                <div class="container" data-aos="fade-up" data-aos-delay="100">
                    <div class="row gy-4">
                        <div class="col-lg-8">
                            <div class="portfolio-details-slider swiper init-swiper">
                                <div class="swiper-wrapper align-items-center">
                                    <div v-for="image in project.images" :key="image" class="swiper-slide">
                                        <img :src="image" alt="">
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                                <h3 style="color: black;">Project information</h3>
                                <ul>
                                    <li><strong>Category</strong>: {{ project.category }}</li>
                                    <li><strong>Client</strong>: {{ project.client }}</li>
                                    <li><strong>Project date</strong>: {{ new Date(project.project_date).toLocaleDateString('id-ID') }}</li>
                                    <li><strong>Project URL</strong>: 
                                        <a :href="project.project_url" target="_blank" rel="noopener noreferrer">{{ project.project_url }}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="portfolio-description" data-aos="fade-up" data-aos-delay="300">
                                <h2 style="color: black;">Deskripsi Proyek</h2>
                                <p v-html="project.description.replace(/\n/g, '<br>')"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </template>

    <style scoped>
/* Tambahkan CSS ini */
.portfolio-details-slider img {
    max-height: 450px; /* Sesuaikan nilai ini sesuai keinginan Anda */
    width: auto;      /* Pastikan lebar menyesuaikan */
    display: block;   /* Penting untuk centering vertikal/horizontal */
    margin: 0 auto;   /* Untuk centering horizontal */
    object-fit: contain; /* Memastikan gambar tidak terpotong, tapi menyesuaikan di dalam kotak */
}

/* Jika Anda ingin kontennya juga lebih rapi di tengah */
.portfolio-details-slider .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Penting untuk centering vertikal */
}
</style>