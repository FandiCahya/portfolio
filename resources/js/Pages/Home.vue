<script setup>
    import {
        Head,
        Link
    } from '@inertiajs/vue3';
    import {
        ref
    } from 'vue';

    // State untuk mengontrol visibilitas menu dropdown mobile
    const open = ref(false);
</script>

<template>
    <!-- Hero Section -->
    <section id="hero" class="hero section">

        <img src="assets/img/bghome.png" alt="" data-aos="fade-in">

        <div class="container text-center" data-aos="zoom-out" data-aos-delay="100">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <h2>Fandi Cahya</h2>
                    <p>I'm a Full-Stack Developer and Data Scientist from Jombang, Indonesia.</p>
                    <a href="/about" class="btn-get-started">About Me</a>
                </div>
            </div>
        </div>

    </section><!-- /Hero Section -->
</template>
