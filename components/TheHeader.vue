<template>
    <TheCard padding="14px 20px 14px 27px">
        <div class="header">
            <div class="header__side">
                <UIIcon svg="/icons/mail.svg" />
                <UIIcon svg="/icons/calendar.svg" />
                <UIIcon svg="/icons/star.svg" />
            </div>
            <div class="header__side">
                <UIIcon svg="/icons/bell.svg" />
                <UIIcon svg="/icons/search.svg" />
                <div class="header__user">
                    <div>
                        <p class="header__name">John Doe</p>
                        <p class="header__status">Available</p>
                    </div>
                    <img src="/Oval.png" width="36" height="34" alt="ava">
                </div>
            </div>

        </div>
    </TheCard>
</template>
<script>
export default {
    name: "TheHeader"
}
</script>
<style lang="scss" scoped >
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__side {
        display: inline-flex;
        gap: 6px;
        justify-content: center;
        align-items: center;

        img {
            margin-right: 24px;
        }
    }

    &__user {
        display: inline-flex;
        align-items: center;
        font-size: 14px;
        line-height: 17px;
        gap: 10px;

    }

    &__status {
        font-weight: 300;
    }
}
</style>