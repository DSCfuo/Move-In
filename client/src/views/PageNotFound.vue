<template>
    <div class="not-found">
        <v-container>
            <v-card class="py-3" height="400px">
                <v-card-text class="text-xs-center">
                    <h1 class="heading-1 mt-4">404 Page Not Found</h1>
                    <p class="subheading mt-3">Uh oh it lokks like we dont have the page to are trying to visit,
                        but we do have some cool apartments. Check them out <router-link to="/">here</router-link>
                    </p>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<style scoped>
.not-found{
    width: 100%;
}
</style>
