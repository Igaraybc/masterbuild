const routes = {
    '/': { 
        template: 'pages/home.html', 
        title: 'MasterBuild'
    },
    '/projects': {
        template: 'pages/projects.html',
        title: 'MasterBuild | Projetos'
    },
    '/single-post': {
        template: 'pages/singlePost.html',
        title: 'MasterBuild | Blog'
    },
    '/page-not-found': {
        template: 'pages/404.html',
        title: 'MasterBuild | Página não encontrada'
    }
}

window.addEventListener('hashchange', () => navigate())

document.addEventListener("DOMContentLoaded", () => {
    navigate()

    document.addEventListener('click', (e) => {
        if(e.target.parentElement.matches('[router]')){
            e.target.parentElement.click()
        }
        if(!e.target.matches('[router]')){
            return;
        }
        e.preventDefault()
        window.location.hash = e.target.getAttribute('router')
    })

})

function loadPage(route){
    var mainContent = document.getElementById("main");

    fetch(route.template).then(res => {
        if(!res.ok){
            throw new Error("Não foi possível carregar a página")
        }
        return res.text()
    })
    .then(data => {
        mainContent.innerHTML = data;
        document.title = route.title;
        window.scrollTo(0,0)

        const event = new CustomEvent('mainLoaded')
        document.dispatchEvent(event)
    })
    .catch(err => console.log(err))
}

function navigate() {
    let router = window.location.hash.replace("#", "") || "/";

    if(!routes[router]){
        router = '/page-not-found'
    }

    const route = routes[router]

    changeActiveClassTo(router)
    loadPage(route)
}

function changeActiveClassTo(router) {
    const navItemList = document.querySelectorAll('.nav-item a[router]')
    const pageActiveElement = document.getElementsByClassName("nav-item active")[0]

    if(pageActiveElement){
        pageActiveElement.classList.remove('active')
    }

    navItemList.forEach((navItem) => {
        const href = navItem.getAttribute('router')
        if(router == href){
            return navItem.parentElement.classList.add('active')
        }
    })
}