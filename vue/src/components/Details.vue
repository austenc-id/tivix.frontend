<script>
export default {
    props: {
        show: Boolean,
        movie: Object
    }
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="$emit('close')"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg></button>
                        </slot>
                    </div>
                    <div class="modal-header">
                        <slot name="header">

                            <h4>{{ movie.card.title }}</h4>
                            <h5>{{ movie.card.year }}</h5>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <img :src="movie.card.poster" :alt="movie.card.title + '-poster'" v-if="movie.card.poster != 'N/A'">
                        </slot>
                    </div>

                </div>
            </div>
        </div>
    </Transition>
</template>
