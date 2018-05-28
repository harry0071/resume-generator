var vueChangeskin = {
  template:`<div id="change-skin">
        <div class="skin-container">
        <span class="default" @click="$emit('changeskin','default')"></span>
        <span class="pink" @click="$emit('changeskin','pink')"></span>
        <span class="blue" @click="$emit('changeskin','blue')"></span>
        <span class="purple" @click="$emit('changeskin','gray')"></span>
        </div>
    </div>`,
};