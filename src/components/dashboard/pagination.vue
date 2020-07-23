<template>
    <div class="navpage">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': pagination.current_page <= 1 }">
                    <a class="page-link" href="#"
                    @click.prevent="getProduct(pagination.current_page - 1)">Previous</a>
                </li>
                <li class="page-item" 
                 v-for="page in pagination.total_pages" 
                 :key="page"
                 :class="{ 'active': page === pagination.current_page }">
                    <a class="page-link" href="#" @click.prevent="getProduct(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': pagination.current_page >= pagination.total_pages }">
                    <a class="page-link" href="#"
                    @click.prevent="getProduct(pagination.current_page + 1)">Next</a>
                    </li>
            </ul>
        </nav>
    </div>
</template>


<script>
export default {
    name: "navpage",
    data() {
        return {}
    },
    props: {
        // 由外到內傳遞資料：傳遞分頁資料到分頁元件
        pagination: {
            type: Object,
            default: {}
        }
    },
    methods: {
        getProduct(page) {
            this.$emit('getPages', page)
            // 由內到外傳遞資料：分頁元件的頁碼參數傳遞到外層
        }
    },
}
</script>
