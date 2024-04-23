import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/Book.vue";
import Nxb from "@/views/Nxb.vue";
import LoginStaff from "@/views/LoginStaff.vue";
import Login from "@/views/Login.vue";
import SignUp from "@/views/SignUp.vue";
import Book_Screen from "@/views/Book_Screen.vue";
import Borrow from "@/views/Borrow.vue";



const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/signup",
        name: "signUp",
        component: SignUp,
    },
    {
        path: "/books",
        name: "bookScreen",
        component: Book_Screen,
    },
    {
        path: "/borrow",
        name: "borrow",
        component: Borrow,
    },
    {
        path: "/admin",
        name: "signIn",
        component: LoginStaff,
    },
    {
        path: "/admin/books",
        name: "book",
        component: Book,
    },
    {
        path: "/admin/nxb",
        name: "nxb",
        component: Nxb,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/admin/books/add",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),

    },
    {
        path: "/admin/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true,

    },
    {
        path: "/nxbs/add",
        name: "nxb.add",
        component: () => import("@/views/NxbAdd.vue"),

    },
    {
        path: "/nxbs/:id",
        name: "nxb.edit",
        component: () => import("@/views/NxbEdit.vue"),
        props: true,

    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;