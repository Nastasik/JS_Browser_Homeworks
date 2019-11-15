function eyes() {
    class Eye {
      constructor(from) {
        this.eye = document.getElementsByClassName('cat_position_for_'+ from +'_eye')[0];
        this.orb = this.eye.getElementsByClassName('cat_eye_' + from)[0];
        this.minX = 0;
        this.minY = 0;
      }
  
      get maxX() {
        return this.eye.offsetWidth - this.orb.offsetWidth;
      }
  
      get maxY() {
        return this.eye.offsetHeight - this.orb.offsetHeight;
      }
  
      get bounds() {
        const { left, top } = this.eye.getBoundingClientRect();
        return { left: left, top: top };
      }
      
      get mean() {      
        return { x: (this.eye.offsetWidth + this.orb.offsetWidth) / 8, 
                 y: (this.eye.offsetHeight + this.orb.offsetHeight) / 8 };
      }
  
      lookAt(X, Y) {
        X = Math.min(X - this.bounds.left - this.mean.x , this.maxX);
        Y = Math.min(Y - this.bounds.top - this.mean.y, this.maxY);
        X = Math.max(X, this.minX);
        Y = Math.max(Y, this.minY);
        this.orb.style.left = X + 'px';
        this.orb.style.top = Y + 'px';
      }  
    }
  
    function animation(item) {
      let isWaiting = false;
      return function (...args) {
        if (!isWaiting) {
          item.apply(this, args);
          isWaiting = true;
          requestAnimationFrame(() => isWaiting = false);
        }
      }
    }  
  
    const move = animation((...coords) => ['left', 'right'].map(from => new Eye(from)).forEach(eye => eye.lookAt(...coords)));
    
    document.addEventListener('mousemove', event => move(event.pageX, event.pageY));
  }
  
  document.addEventListener('DOMContentLoaded', eyes);