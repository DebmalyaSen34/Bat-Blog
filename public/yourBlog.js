const blogDiv = document.querySelectorAll('.post-container');
console.log(blogDiv);

const heightBlog = blogDiv[0].offsetHeight;
console.log(heightBlog);

const heightVH = (heightBlog/window.innerHeight)*100;
console.log(heightVH);

if(heightVH < 100){
    blogDiv[0].style.height = "90vh";
}else{
    blogDiv[0].style.height = "auto";
}