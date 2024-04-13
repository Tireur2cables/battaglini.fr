<template>

    <div class="options">
        <div class="form-group">
            <label>Technologies</label>
            <div class="input-select">
                <div v-for="technology in TECHNOLOGIES" class="select-item">
                    <input name="techno" :id="technology.name" type="radio" :value="technology.name" v-model="techno" @change="onTechnoChange">
                    <label :for="technology.name">{{ technology.name[0].toLocaleUpperCase() + technology.name.slice(1).toLocaleLowerCase() }}</label>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    
    import { ref, onMounted } from 'vue';
    import { TECHNOLOGIES } from '@/constants';

    const props = defineProps({
        selectedTechnology: {
            type: Object,
            required: true,
        },
    });

    const techno = ref<string>("");
    const emits = defineEmits(["technoChanged"]);
    
    function onTechnoChange(e) {
        techno.value = e.target.value;
        emits('technoChanged', techno.value);
    }

    onMounted(() => {
        techno.value = (Object.keys(props.selectedTechnology).length == 0) ? "" : props.selectedTechnology.name;
        emits('technoChanged', techno.value);
    });

</script>

<style scoped lang="scss">

    .options {
        position: absolute;
        right: 10px;
        top: 100px;

        .form-group {
            margin: 15px 5px;
            text-align: center;
            > label {
                font-size: 18px;
            }
        }

        .input-select {
            background-color: var(--primary);
            border-radius: var(--radius);
            margin-top: 10px;
            max-width: 100%;
            margin-left: auto;
            overflow: hidden;

            .select-item {
                display: flex;
                justify-content: stretch;
                align-items: stretch;
                text-align: center;

                input {
                    appearance: none;

                    &:checked + label {
                        background-color: var(--tertiary);
                    }
                }

                label {
                    padding: 10px 16px;
                    cursor: pointer;
                    flex-grow: 1;
                }
            }
        }

        .input-check {
            appearance: none;
            margin-top: 8px;
            width: 1em;
            height: 1em;
            background-color: var(--text);
            outline: 2px solid #fff;
            border-radius: 50%;
            cursor: pointer;
            margin-right: 10px;

            &:checked {
                background-color: var(--tertiary)
            }

            & + label{
                cursor: pointer;
            }
        }
    }

    @media (max-height: 360px) {
        .options {
            top: 50px;
        }
    }

</style>