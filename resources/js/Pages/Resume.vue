<script setup>
import Layout from '@/Shared/Layout.vue'; // Impor layout
import { Head } from '@inertiajs/vue3';
    import {
        ref
    } from 'vue';

    // State untuk mengontrol visibilitas menu dropdown mobile
    const open = ref(false);
</script>

<template>
    <div class="container px-20">
        <!-- Resume Section -->
        <section id="resume" class="resume section">

            <!-- Section Title -->
            <div class="container section-title" data-aos="fade-up">
                <h2 style="color: black;">Resume</h2>
                <p>Every mistake is not a failure, but a stepping stone to becoming the best version of ourselves. This
                    journey is about learning and growing.</p>
            </div><!-- End Section Title -->

            <div class="container">

                <div class="row">

                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                        <h3 style="color: black;" class="resume-title">Summary</h3>

                        <div class="resume-item pb-0">
                            <h4>MUHAMMAD FANDI NURCAHYA</h4>
                            <p class="mb-3"><em>A graduate of a D3 degree in Information Management with a strong
                                    interest
                                    in
                                    Web Development, Android Development, and Data Science.</em></p>
                            <ul style="list-style: disc; padding-left: 20px;">
                                <li>BandarkedungMulyo, Jombang</li>
                                <li>+62-85235538116</li>
                                <li>fandicahya56@gmail.com</li>
                            </ul>
                        </div>
                        <h3 style="color: black;" class="resume-title">Education</h3>

                        <div class="resume-item">
                            <h4>D3, INFORMATION MANAGEMENT</h4>
                            <h5 style="color: black;">2022 - 2025</h5>
                            <p><em>POLITEKNIK NEGERI MALANG, MALANG, INDONESIA</em></p>
                            <p>Achieved a final GPA of 3.82. The curriculum provided a strong foundation in full-stack
                                development, data science principles, and database management, with practical projects
                                involving modern web and mobile technologies.</p>
                        </div>

                        <!-- <div class="resume-item">
                        <h4>COMPUTER AND NETWORK ENGINEERING</h4>
                        <h5 style="color: black;">2017 - 2020</h5>
                        <p><em>SMK NEGERI 3 JOMBANG, JOMBANG, INDONESIA</em></p>
                        <p>Completed a comprehensive curriculum focused on computer systems, network administration, and
                            infrastructure. Gained foundational skills in object-oriented programming (Java), web
                            development (PHP, HTML, CSS), and database essentials.</p>
                    </div> -->
                    </div>

                    <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                        <h3 style="color: black;" class="resume-title">Professional Experience</h3>
                        <div class="resume-item">
                            <h4>MOBILE DEVELOPER (INTERN)</h4>
                            <h5 style="color: black;">February 2025 - Juny 2025</h5>
                            <p><em>LIFEMEDIA - YOGYAKARTA</em></p>
                            <ul style="list-style: disc; padding-left: 20px;">
                                <li>Developing mobile applications using Kotlin integrated with Laravel backend.</li>
                                <li>Performing WiFi network maintenance and monitoring IoT devices.</li>
                                <li>Collaborating in the development and troubleshooting of applications and network
                                    infrastructure.</li>
                            </ul>
                        </div><!-- Edn Resume Item -->

                        <div class="resume-item">
                            <h4>FULL-STACK DEVELOPER (INTERN)</h4>
                            <h5 style="color: black;">Juny 2024 - August 2024</h5>
                            <p><em>PT. CYBER OLYMPUS - YOGYAKARTA</em></p>
                            <ul style="list-style: disc; padding-left: 20px;">
                                <li>Developing and maintaining web-based applications using Laravel.
                                </li>
                                <li>Creating and managing REST APIs for data integration between systems. </li>
                                <li>Developing mobile applications with Flutter integrated with Laravel. </li>
                            </ul>
                        </div><!-- Edn Resume Item -->

                    </div>

                </div>

            </div>

        </section><!-- /Resume Section -->
    </div>
</template>

<style>
    #resume .resume-item p,
    #resume .resume-item li {
        line-height: 1.5;
    }
</style>
