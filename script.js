
window.onload = function()
{
    /* HAND SIPNNER */
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var select = document.getElementById('select');
    var step = 2 * Math.PI / 360;
    var radius = 120;

    let dragStart = false;
    let angle = 0;
    let speed = 5;

    ctx.strokeStyle = select.value;
    ctx.lineWidth = radius / 5.5;

    select.addEventListener('change', function() {
        ctx.strokeStyle = select.value;
    });

    canvas.addEventListener('mousedown', ({clientX, clientY}) => {
      dragStart = {clientX, clientY}
    })
    canvas.addEventListener('touchstart', ({originalEvent}) => {
      dragStart = {
        clientX: originalEvent.touches[0].pageX, 
        clientY: originalEvent.touches[0].pageY
      }
    })
    canvas.addEventListener('mousemove', ({clientX, clientY}) => dragStart && function(){
      updateSpeed(dragStart, {clientX, clientY})
      dragStart = {clientX, clientY}
    }())
    canvas.addEventListener('touchmove', ({originalEvent}) => dragStart && function(){
      updateSpeed(dragStart, {
        clientX: originalEvent.touches[0].pageX, 
        clientY: originalEvent.touches[0].pageY
      })
      dragStart = {
        clientX: originalEvent.touches[0].pageX, 
        clientY: originalEvent.touches[0].pageY
      }
    }())
    window.addEventListener('mouseup', () => {
      dragStart = false
    })
    window.addEventListener('touchend', () => {
      dragStart = false
    })

    function updateSpeed(startPos, endPos){
      speed = (Math.atan2(startPos.clientX - (canvas.offsetLeft + (canvas.width / 2)), startPos.clientY - (canvas.offsetTop + (canvas.height / 2))) - Math.atan2(endPos.clientX - (canvas.offsetLeft + (canvas.width / 2)), endPos.clientY - (canvas.offsetTop + (canvas.height / 2)))) * radius
    }

    function render(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      angle += step * speed
      speed = Math.max(speed - 0.08, Math.min(speed + 0.08, 0))
      
      for(let i = 0; i < 3; i++){
        const x = (canvas.width / 2) + (radius * Math.sin(angle + i * (120 * step)))
        const y = (canvas.height / 2) - (radius * Math.cos(angle + i * (120 * step)))
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.closePath()
        
        ctx.beginPath()
        ctx.arc(x, y, radius / 2.5, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
      }
      
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, radius / 2.5, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.fill()
      ctx.closePath()
      
      window.requestAnimationFrame(render)
    }
    render();
}