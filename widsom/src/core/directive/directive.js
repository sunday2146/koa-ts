export default {
    install(Vue, options) {

        
        Vue.directive('test', {
            // bind: function() {},

            // 当绑定元素插入到 DOM 中。
            inserted: function(el, binding, vnode, oldVnode) {

                // 聚焦元素
                el.onclick=()=>{
                    // alert("我去");
                };
            },


        });




    }
}