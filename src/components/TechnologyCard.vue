<template>

    <div class="technology-card">
        <img class="technology-img" :src="`./assets/cards/${technologyInfo.name}.png`" :alt="technologyInfo.displayName">
        <div class="title">
            <h2>{{ technologyInfo.displayName }}</h2>
        </div>
        <button class="close" @click="onClose()">×</button>
        <div v-if="technologyInfo.meanTemp || technologyInfo.minTemp || technologyInfo.maxTemp" class="temperature">
            <p v-if="technologyInfo.meanTemp" title="Surface temperature">mean: 
                <span class="value" :style="{ color: temperatureColor(technologyInfo.meanTemp) }"> 
                    <svg xmlns="http://www.w3.org/2000/svg" :stroke="temperatureColor(technologyInfo.meanTemp)" class="icon icon-tabler icon-tabler-temperature" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line x1="10" y1="9" x2="14" y2="9" /></svg>
                    {{ technologyInfo.meanTemp }} °C
                </span>
            </p>
            <p v-if="technologyInfo.minTemp" title="Surface temperature">min: 
                <span class="value" :style="{ color: temperatureColor(technologyInfo.minTemp)}">
                    <svg xmlns="http://www.w3.org/2000/svg" :stroke="temperatureColor(technologyInfo.minTemp)" class="icon icon-tabler icon-tabler-temperature" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line x1="10" y1="9" x2="14" y2="9" /></svg>
                    {{ technologyInfo.minTemp }} °C
                </span>
            </p>
            <p v-if="technologyInfo.maxTemp" title="Surface temperature">max: 
                <span class="value" :style="{ color: temperatureColor(technologyInfo.maxTemp)}">
                    <svg xmlns="http://www.w3.org/2000/svg" :stroke="temperatureColor(technologyInfo.maxTemp)" class="icon icon-tabler icon-tabler-temperature" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><line x1="10" y1="9" x2="14" y2="9" /></svg>
                    {{ technologyInfo.maxTemp }} °C
                </span>
            </p>
        </div>
        <div class="info">
            <h5>{{ technologyInfo.caption }}</h5>
            <p class="description">{{ technologyInfo.description }}</p>
            <ul>
                <li v-if="technologyInfo.containerManager">Container manager: 
                    <span class="value">
                        <a :href="getLink(technologyInfo.containerManager)">
                            {{ technologyInfo.containerManager }}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="10"
                                height="10"
                                viewBox="0 0 48 48"
                                fill="white"
                            >
                                <path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z">
                                </path>
                            </svg>
                        </a>
                    </span>
                </li>
                <li v-if="technologyInfo.sourceCode">Source code: 
                    <span class="value">
                        <a :href="technologyInfo.sourceCode">
                            <svg v-if="technologyInfo.sourceCode.includes('https://github.com')"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z">
                                </path>
                            </svg>
                            <svg v-else-if="technologyInfo.sourceCode.includes('https://gitlab.com')"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                            >
                                <path fill="#e53935" d="M24 43L16 20 32 20z"></path>
                                <path fill="#ff7043" d="M24 43L42 20 32 20z"></path>
                                <path fill="#e53935" d="M37 5L42 20 32 20z"></path>
                                <path fill="#ffa726" d="M24 43L42 20 45 28z"></path>
                                <path fill="#ff7043" d="M24 43L6 20 16 20z"></path>
                                <path fill="#e53935" d="M11 5L6 20 16 20z"></path>
                                <path fill="#ffa726" d="M24 43L6 20 3 28z"></path>
                            </svg>
                            <svg v-else
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="15"
                                height="15"
                                viewBox="0 0 48 48"
                                fill="white"
                            >
                                <path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z">
                                </path>
                            </svg>
                        </a>
                    </span>
                </li>


                <li v-if="technologyInfo.distanceFromSun && technologyInfo.distanceFromSun !== -1">Distance from Sun: <span class="value">{{ technologyInfo.distanceFromSun }} AU</span></li>
                <li v-if="technologyInfo.distance">Distance from {{ technologyInfo.orbitObject.charAt(0).toUpperCase() + technologyInfo.orbitObject.slice(1) }}: <span class="value">{{ technologyInfo.distance }} km</span></li>
                <li v-if="technologyInfo.year">1 year: <span class="value">{{ technologyInfo.year }}</span></li>
                <li v-if="technologyInfo.day">1 day: <span class="value">{{ technologyInfo.day }}</span></li>
                <li v-if="technologyInfo.moons != null">Moons: <span class="value">{{ technologyInfo.moons }}</span></li>
            </ul>
        </div>
    </div>

</template>

<script setup lang="ts">

    import { ref } from 'vue';

    const temperatureColors = ref({
        "-130": "#a8f1ff",
        "-90": "#1fb6d0",
        "-40": "#c4f987",
        10: "#c4f987",
        50: "#ffcc33",
        90: "#ee6600",
        150: "#990000",
    });
    const emits = defineEmits(["closeCard"]);

    const props = defineProps({
        technologyInfo: {
            type: Object,
            required: true,
        },
    });

    function temperatureColor(temp) {
        const keys = Object.keys(temperatureColors.value).map(t => parseInt(t));
        keys.sort((a, b) => (+a) - (+b));
        for (let key of keys) {
            if (key > temp) {
                return temperatureColors.value[key];
            }
        }
        return temperatureColors.value[keys[keys.length - 1]];
    }

    function onClose() {
        emits("closeCard");
    }

    function getLink(name) {
        switch(name) {
            case "Podman" : return "https://podman.io";
            case "Docker" : return "https://www.docker.com";
            default : return "about:blank";
        }
    }

</script>

<style scoped lang="scss">

    .technology-card {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        width: 360px;
        border-radius: var(--radius);
        box-shadow: -8px -9px 14px rgb(255 255 255 / 8%);
        overflow: hidden;
        font-size: 14px;

        .technology-img {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: -1;
            background-color: var(--secondary);
        }

        .info {
            margin-top: 300px;
            width: 100%;
            border-radius: var(--radius);
            background: linear-gradient(131.76deg, var(--primary) -34.78%, var(--dark) 93.37%);
            padding: 6px 12px;

            h5 {
                text-align: center;
                font-size: 18px;
                color: var(--tertiary);
                font-weight: 100;
            }

            ul {
                margin: 10px 0;
                text-align: left;
                list-style: none;
                padding-left: 0;

                li {
                    margin: 4px 0;
                    color: #d5d5d5;

                    .value {
                        font-weight: bold;
                        color: #fff;

                        a:link {
                            color: inherit;
                            text-decoration: none;
                        }

                        a:active {
                            color: inherit;
                            text-decoration: none;
                        }

                        a:visited {
                            color: inherit;
                            text-decoration: none;
                        }

                        a:hover {
                            color: inherit;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }

        .title{
            position: absolute;
            text-align: center;
            top: 2px;
            width: 100%;

            h2 {
                text-transform: uppercase;
                font-weight: 400;
                font-size: 20px;
            }
        }

        .temperature {
            position: absolute;
            top: 50px;
            right: 10px;
            font-weight: 600;
            text-shadow: -4px 1px 11px #000;
            font-size: 14px;
            font-weight: lighter;

            .value {
                font-weight: bold;
                text-shadow: 0 0 10px #fff;
            }

            .icon {
                vertical-align: middle;
            }
        }

        .close {
            position: absolute;
            top: 2px;
            right: 6px;
            background-color: transparent;
            border: 0;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
        }

        .description {
            margin: 6px 0;
        }
    }

    @media (max-width: 560px) {
        .technology-card {
            width: auto;
            height: auto;
            transform: none;
            top: 125px;
            left: 10px;
            right: 10px;
            bottom: 20px;
            z-index: 4;

            .info {
                top: 250px;
            }

            .close {
                font-size: 32px;
            }
        }
    }

    @media (max-height: 360px) {
        .technology-card {
            width: auto;
            height: auto;
            transform: none;
            top: 15px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            z-index: 4;

            .technology-img {
                height: 100%;
                width: auto;
            }

            .info {
                top: 0;
                right: 0;
                width: auto;
                height: 100%;
                left: 230px;
            }

            .title {
                max-width: 250px;
            }

            .temperature {
                left: 110px;
                right: auto;
            }

            .close {
                right: auto;
                left: 6px;
                font-size: 32px;
            }
        }
    }

</style>