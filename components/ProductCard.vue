<template >
    <TheCard padding="0px" :height="'486px'">
        <div class="product-card">
            <div class="product-card__image">
                <img :src="data?.image" alt="no picture">
            </div>
            <div>

                <div class="product-card__info">
                    <div class="product-card__rate">
                        <p> {{ data.rating }}</p>
                        <img src="/icons/white-star.svg">
                    </div>
                    <div>${{ data.price }}</div>
                </div>
                <h4 class="product-card__title">{{ data.title }}</h4>
                <div class="product-card__desc">{{ data.desc }}</div>
                <div class="product-card__footer">
                    <TheButton type="secondary" borderRadius="0px 0px 0px 8px">
                        <template #icon>
                            <UIIcon svg="/icons/heart.svg" />
                        </template>
                        WISHLIST
                    </TheButton>
                    <TheButton borderRadius="0px 0px 8px 0px">
                        <template #icon>
                            <UIIcon svg="/icons/shopping-bag.svg" />
                        </template>
                        ADD TO CARD
                    </TheButton>
                </div>
            </div>
        </div>
    </TheCard>
</template>
<script>
import TheButton from './UI/TheButton.vue';

export default {
    name: "ProductCard",
    props: {
        data: {
            type: Object,
            default: () => ({}),
            required: true
        }
    },
    components: { TheButton }
}
</script>
<style lang="scss">
.product-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 31px 25px 0px 25px;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    position: relative;

    &__image {
        width: 100%;
        text-align: center;
        max-height: 50%;
        margin-bottom: 34px;

        img {
            max-height: 295px;
            object-fit: fill;
        }
    }

    &__desc {
        font-weight: 300;
    }

    &__rate {
        display: inline-flex;
        gap: 9px;
        background-color: var(--color-1);
        color: #FFF;
        padding: 6px 10px 7px;
        border-radius: 3px;

        img {}
    }

    &__info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        width: 100%;
    }

    &__title {
        margin-bottom: 3px;
    }

    &__desc {
        margin-bottom: 22px;
    }

    &__footer {
        margin-left: -25px;
        height: 45px;
        align-self: flex-end;
        width: calc(100% + 50px);
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: stretch;
        border-radius: 30px;
    }


}
</style>