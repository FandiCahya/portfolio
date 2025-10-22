<script setup>
import { ref, onMounted } from 'vue';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import GLightbox from 'glightbox'; 
import 'glightbox/dist/css/glightbox.min.css'; 
import { Link } from '@inertiajs/vue3';
// import MainLayout from '@/Layouts/MainLayout.vue'; // <-- Sesuaikan jika Anda pakai layout

// 1. Terima 'projects' sebagai prop dari Laravel
defineProps({
    projects: Array
});

const iso = ref(null);

onMounted(() => {
    // Inisialisasi GLightbox
    const lightbox = GLightbox({
        selector: '.glightbox'
    });

    // Kode Isotope
    const container = document.querySelector('.isotope-container');
    if (!container) return;

    // Gunakan imagesLoaded untuk memastikan semua gambar dimuat sebelum Isotope jalan
    imagesLoaded(container, () => {
        iso.value = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: 'masonry'
        });

        // Filter
        const filtersElem = document.querySelector('.isotope-filters');
        if (filtersElem) {
            filtersElem.addEventListener('click', (event) => {
                if (!event.target.matches('li')) {
                    return;
                }
                const filterValue = event.target.getAttribute('data-filter');
                iso.value.arrange({ filter: filterValue });

                filtersElem.querySelector('.filter-active').classList.remove('filter-active');
                event.target.classList.add('filter-active');
            });
        }
    });
});
</script>

<template>
    <div class="container px-20">
            <section id="portfolio" class="portfolio section">
                <div class="container section-title" data-aos="fade-up">
                    <h2 style="color: black;">Portfolio</h2>
                    <p>The best version of yourself is not created in your comfort zone. It is forged in the storm of challenges.</p>
                </div><div class="container">
                    <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                        
                        <ul class="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
                            <li data-filter="*" class="filter-active">All</li>
                            <li data-filter=".filter-app">App</li>
                            <li data-filter=".filter-web">Web</li> </ul><div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">

                            <div v-for="project in projects" :key="project.id" 
                                 :class="`col-lg-4 col-md-6 portfolio-item isotope-item filter-${project.category.toLowerCase()}`">
                                
                                <img :src="project.cover_image" class="img-fluid" alt="">
                                <div class="portfolio-info">
                                    <h4 style="color: black;">{{ project.title }}</h4>
                                    <p>{{ project.category }}</p>
                                    
                                    <a :href="project.cover_image" :title="project.title"
                                       :data-gallery="`portfolio-gallery-${project.id}`" class="glightbox preview-link"><i
                                        class="bi bi-zoom-in"></i></a>
                                    
                                    <Link :href="route('portfolio.details', { id: project.id })" 
                                          title="More Details" class="details-link">
                                        <i class="bi bi-link-45deg"></i>
                                    </Link>
                                </div>
                            </div></div></div>
                </div>
            </section>
        </div>
    </template>