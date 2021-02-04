$.fn.xbrand = function(bId, cId){

    this.b = $(this).find('select[lay-filter=kbrand]');

    this.c = $(this).find('select[lay-filter=kcategory]');

    this.categoryList = [];

    this.showB  = function() {

        this.b.html('');
        var brandList = JSON.parse(localStorage.getItem('kbrandList'));
        for (var i in brandList) {

            if(bId==brandList[i].bId){
                this.categoryList = JSON.parse(localStorage.getItem('kcategoryList'));
                this.b.append("<option selected value='"+brandList[i].bId+"'>"+brandList[i].bName+"</option>")
            }else{
                this.b.append("<option value='"+brandList[i].bId+"'>"+brandList[i].bName+"</option>")
            }
        }
        
    }


    this.showC = function(categoryList) {
        this.c.html('');
        for (var i in categoryList) {

            if(cId==categoryList[i].cId){
                this.c.append("<option selected value='"+categoryList[i].cId+"'>"+categoryList[i].cName+"</option>")
            }else{
                this.c.append("<option value='"+categoryList[i].cId+"'>"+categoryList[i].cName+"</option>");
            }
        }
    }


    this.showB();
    this.showC(this.categoryList);

    form.render('select');

    form.on('select(kbrand)', function(data){
        var bId = data.value;
        var categoryList = [];
        var px = $(data.elem).parents(".x-brand");
        $.ajax({
            type: "GET",
            url: "http://129.211.173.61/api/v1.0/brand_categories/" + bId + "/info",
            xhrFields: { 
                withCredentials: true 
            },
            headers: {
                "Access-Token": localStorage.getItem("accessToken"),
                "Content-Type":"application/json;charset=utf8"
            },
            success: function(data){
                cates = data.data[0].cate
                for (var i in cates) {
                    var category = {};
                    category.cId = cates[i].id;
                    category.cName = cates[i].name;
                    categoryList.push(category);
                }
                localStorage.setItem('kcategoryList', JSON.stringify(categoryList));
                px.xbrand(bId);
            }
        });
    });

    return this;
};

localStorage.setItem("kcategoryList", []);