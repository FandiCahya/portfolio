<script setup>
    import {
        Head,
        Link
    } from '@inertiajs/vue3';
    import {
        ref,
        onMounted // 1. Impor onMounted
    } from 'vue';

    // Impor Swiper (pastikan sudah diinstal)
    import Swiper from 'swiper';
    import 'swiper/css';
    import 'swiper/css/pagination';
    import PureCounter from '@srexi/purecounterjs';

    // State untuk mengontrol visibilitas menu dropdown mobile
    const open = ref(false);

    // 2. Buat ref untuk menampung elemen swiper dari template
    const swiperEl = ref(null);

    // 3. Pindahkan konfigurasi dari template ke sini
    const swiperConfig = {
        loop: true,
        speed: 600,
        autoplay: {
            delay: 5000,
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    };

    // 4. Inisialisasi Swiper saat komponen sudah di-mount
    onMounted(() => {
        if (swiperEl.value) {
            new Swiper(swiperEl.value, swiperConfig);
        }
        new PureCounter();
    });
</script>

<template>
    <div class="container px-20">
        <section id="about" class="about section">

            <div class="container section-title" data-aos="fade-up">
                <h2 style="color: black;">About</h2>
                <p>You are not a failure, you are just learning. Every mistake you make is a stepping stone to becoming
                    the
                    best version of yourself.</p>
            </div>
            <div class="container" data-aos="fade-up" data-aos-delay="100">

                <div class="row gy-4 justify-content-center">
                    <div class="col-lg-4">
                        <img src="assets/img/Profile-img.png" class="img-fluid" alt=""
                            style="max-width: 300px; height: auto; ">
                    </div>
                    <div class="col-lg-8 content">
                        <h2 style="color: black;">Full-Stack Developer &amp; Data Scientist.</h2>
                        <p class="fst-italic py-3">
                            As a full-stack developer and data scientist from Indonesia, I specialize in building
                            robust,
                            end-to-end web applications and leveraging data to uncover powerful insights and drive
                            intelligent solutions.
                        </p>
                        <div class="row">
                            <div class="col-lg-6">
                                <ul>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Birthday:</strong> <span>07 February
                                            2002</span></li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Website:</strong>
                                        <span>www.example.com</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Phone:</strong>
                                        <span>+6285183305689</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>City:</strong> <span>Jombang,
                                            Indonesia</span></li>
                                </ul>
                            </div>
                            <div class="col-lg-6">
                                <ul>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Age:</strong> <span>23</span></li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>D3</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Email:</strong>
                                        <span>fandicahya56@gmail.com</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Freelance:</strong>
                                        <span>Available</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <p class="py-3">
                            Proficient in various programming languages such as Java, PHP, and Python, with experience
                            in
                            developing applications using Laravel, Flutter, and
                            Kotlin. Possesses knowledge of data processing, analysis, and the
                            implementation of MySQL databases. Enthusiastic about continuously learning
                            new technologies and contributing to the development of effective and innovative digital
                            solutions.
                        </p>
                    </div>
                </div>

            </div>

        </section>
        <section id="skills" class="skills section">

            <div class="container section-title" data-aos="fade-up">
                <h2 style="color: black;">Skills</h2>
                <p>As a fresh graduate, I have developed a versatile skill set in full-stack development and data
                    science.
                </p>
            </div>
            <div class="container" data-aos="fade-up" data-aos-delay="100">

                <div class="row skills-content skills-animation">

                    <div class="col-lg-6">

                        <div class="progress">
                            <span class="skill" style="color: black;"><span>Laravel</span> <i
                                    class="val">90%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 90%;"></div>
                            </div>
                        </div>
                        <div class="progress">
                            <span class="skill" style="color: black;"><span>PHP</span> <i class="val">86%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="86" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 86%;"></div>
                            </div>
                        </div>

                        <div class="progress">
                            <span class="skill" style="color: black;"><span>JavaScript</span> <i
                                    class="val">75%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 75%;"></div>
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-6">

                        <div class="progress">
                            <span class="skill" style="color: black;"><span>Python</span> <i
                                    class="val">80%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 80%;"></div>
                            </div>
                        </div>

                        <div class="progress">
                            <span class="skill" style="color: black;"><span>Kotlin</span> <i
                                    class="val">85%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 85%;"></div>
                            </div>
                        </div>

                        <div class="progress">
                            <span class="skill" style="color: black;"><span>Flutter</span> <i
                                    class="val">83%</i></span>
                            <div class="progress-bar-wrap">
                                <div class="progress-bar" role="progressbar" aria-valuenow="83" aria-valuemin="0"
                                    aria-valuemax="100" style="width: 83%;"></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
        <section id="stats" class="stats section">

            <div class="container section-title" data-aos="fade-up">
                <h2 style="color: black;">Facts</h2>
                <p>I graduated with a GPA of 3.82, reflecting a strong academic foundation.
                    My theoretical knowledge is backed by practical experience from two professional internships
                    where I contributed to real-world web and mobile application
                    development. Furthermore, my expertise is validated by multiple industry
                    certifications, including two from BNSP in Data Science and Software Programming.</p>
            </div>
            <div class="container" data-aos="fade-up" data-aos-delay="100">

                <div class="row gy-4">
                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item text-center w-100 h-100">
                            <span data-purecounter-start="0" data-purecounter-end="2" data-purecounter-duration="1"
                                class="purecounter" style="color: black;"></span>
                            <p>Professional Internships</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item text-center w-100 h-100">
                            <span data-purecounter-start="0" data-purecounter-end="4" data-purecounter-duration="1"
                                class="purecounter" style="color: black;"></span>
                            <p>Industry Certifications</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item text-center w-100 h-100">
                            <span data-purecounter-start="0" data-purecounter-end="9" data-purecounter-duration="1"
                                class="purecounter" style="color: black;"></span>
                            <p>Core Skills</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="stats-item text-center w-100 h-100">
                            <span data-purecounter-start="0" data-purecounter-end="4" data-purecounter-duration="1"
                                class="purecounter" style="color: black;"></span>
                            <p>Programming Languages</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    </div>
</template>
