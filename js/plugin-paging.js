function paging(e, parameter) {
    this.element = e
    // e.html('<button>xxxxxxxxxxsadasd</button>')
    // e.on('click', 'button',function() {
    //     a.fn(5)        
    // })
    this.parameter = {
        total: Math.ceil(parameter.total/parameter.pageSize) < 1 ? 1 : Math.ceil(parameter.total/parameter.pageSize),
        aFewPages: parameter.aFewPages,
        fn: parameter.callback
    }
    this.createHtml()
    this.bindEvent()
}
//重写一个原型
paging.prototype = {
    constructor: paging,
    createHtml: function() {
        var total = this.parameter.total
        var aFewPages = this.parameter.aFewPages
        var ellipsisHTML = `<span class="page-item" 
                            style=" position: relative;display: block;
                                    padding: .5rem .75rem;
                                    margin-left: -1px;
                                    line-height: 1.25;
                                    color: #007bff;
                                    background-color: #fff;
                                    border: 1px solid #dee2e6;
                                    border-top:none;
                                    border-bottom:none">...</span>`
        var data = '<div class="pagination" style="-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;">'
            data += aFewPages > 1? `<span class="page-item"><a class="page-link" href="#">上一页</a></span>` : ''
            data += total <= 9 || aFewPages < 6? '' : '<span class="page-item"><a class="page-link" href="#">1</a></span>' + ellipsisHTML

        if (total <= 9 || aFewPages < 6) {
            if(total <= 9) {
                for (let i = 1; i < total + 1; i++) {
                    data += `<span class="page-item `+ (aFewPages == i? 'active' : '') +`"><a class="page-link" href="#">` + i + `</a></span>`
                }
            } else {
                for (let j = 1; j < 8; j++) {
                    data += `<span class="page-item `+ (aFewPages == j? 'active' : '') +`"><a class="page-link" href="#">` + j + `</a></span>`
                }
                data += ellipsisHTML
            }
        } else if(total - aFewPages < 5) {
            for (let i = total - 6; i < total + 1; i++) {
                data += `<span class="page-item `+ (aFewPages == i? 'active' : '') +`"><a class="page-link" href="#">` + i + `</a></span>`
            }
        } else {
            for (let i = aFewPages - 3; i < aFewPages + 4; i++) {
                data += `<span class="page-item `+ (aFewPages == i? 'active' : '') +`"><a class="page-link" href="#">` + i + `</a></span>`
            }
            data += total - aFewPages - 3 > 1? ellipsisHTML : ''
            data += `<span class="page-item `+ (aFewPages == total? 'active' : '') +`"><a class="page-link" href="#">` + total + `</a></span>`
        }
            data += aFewPages < total? `<span class="page-item"><a class="page-link" href="#">下一页</a></span>` : ''
            data += '</div>'

        this.element.html(data)
    },
    bindEvent: function() {
        var that = this
            that.element.off('click', 'a')
            that.element.on('click', 'a', function() {
                if (this.innerText == '上一页') {
                    that.parameter.fn(Number(that.parameter.aFewPages - 1))
                } else if ( this.innerText == '下一页') {
                    that.parameter.fn(Number(that.parameter.aFewPages + 1))
                } else {
                    that.parameter.fn(Number(this.innerText))
                }
            })
    }
}

$.fn.extend({
    //需要传递的参数有，总的有多少页
    myPaging: function(parameter) {
        return new paging($(this), parameter)
	}
});