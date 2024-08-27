<script setup>

</script>

<template>
    <header>
        <a href="#contact"><img src="../../assets/logo.avif"></a>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            
        </ul>
        <a href="#contact"><img src="../../assets/profile.png"></a>
    </header>
</template>

<style scoped>
header {
    background-color: rgb(235, 235, 235);
    display: flex;
    justify-content: space-around;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100px;
}
header ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
header ul li {
    margin-right: 1rem;
}
header ul li a {
    color: black;
    text-decoration: none;
}
header a {
    width: 100%;
    height: 100%;
}
header a img {
    width: 100%;
    height: 100%;
}
</style>