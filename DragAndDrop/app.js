
let arrCircle=$('.circle').toArray()

$('button').click(function(){
    let div=document.createElement('div')
    div.classList.add('circle')
    div.style.backgroundColor=randomColor()
    div.style.top=`calc(${Math.random()*60}% + 80px)`
    div.style.left=`calc(${Math.random()*80}% + 80px)`
    $('#make').after(div)
    $('.circle').attr('draggable','true')
    arrCircle=$('.circle').toArray()
    handCircleMove(arrCircle)
})

$('body').on("dragover", (e)=>{
    e.preventDefault()
})

function handCircleMove(arr) {
    $.each(arr, function(i, circle) {
        circle.addEventListener('dragstart',()=>{
            circle.style.opacity=0.8
        })
        circle.addEventListener('dragend',(e)=>{
            circle.style.opacity=1
            circle.style.top=`calc(${e.clientY}px - 40px)`
            circle.style.left=`calc(${e.clientX}px - 40px)`
            let stateY=e.clientY+20>=$('.trush').offset().top && e.clientY+20<=$('.trush').offset().top+60 
            let stateX=e.clientX+20>=$('.trush').offset().left && e.clientX+20<=$('.trush').offset().left+60  
            if(stateY && stateX) {
                circle.remove()
            }
        })
    })  

}
function randomColor() {
    let r=Math.floor(Math.random()*256)
    let g=Math.floor(Math.random()*256)
    let b=Math.floor(Math.random()*256)
    return `rgb(${r},${g},${b})`
}