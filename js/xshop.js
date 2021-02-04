$.fn.xshop = function(bId, rId, cId, sId, kId){

    this.b = $(this).find('select[lay-filter=brand]');

    this.r = $(this).find('select[lay-filter=region]');

    this.s = $(this).find('select[lay-filter=shop]');

    this.c = $(this).find('select[lay-filter=category]');

    this.k = $(this).find('select[lay-filter=keyword]');

    this.regionList = [];

    this.shopList = [];

    this.categoryList = [];

    this.keywordList = [];

    this.showB  = function() {

        this.b.html('');
        
        var brandList = JSON.parse(localStorage.getItem('brandList'));
        for (var i in brandList) {
            console.log(brandList);
            if(bId==brandList[i].bId){
                this.regionList = JSON.parse(localStorage.getItem('regionList'));
                this.categoryList = JSON.parse(localStorage.getItem('categoryList'));
                this.b.append("<option selected value='"+brandList[i].bId+"'>"+brandList[i].bName+"</option>")
            }else{
                this.b.append("<option value='"+brandList[i].bId+"'>"+brandList[i].bName+"</option>")
            }
        }
        
    }

    this.showR = function(regionList) {
        this.r.html('');
        for (var i in regionList) {

            if(rId==regionList[i].rId){

                this.shopList = regionList[i].shopList;
                this.r.append("<option selected value='"+regionList[i].rId+"'>"+regionList[i].rName+"</option>")
            }else{
                this.r.append("<option value='"+regionList[i].rId+"'>"+regionList[i].rName+"</option>")
            }
        }
    }

    this.showC = function(categoryList) {
        this.c.html('');
        
        for (var i in categoryList) {
            
            if(cId==categoryList[i].cId){
                this.keywordList = categoryList[i].keywordList;
                this.c.append("<option selected value='"+categoryList[i].cId+"'>"+categoryList[i].cName+"</option>")
            }else{
                this.c.append("<option value='"+categoryList[i].cId+"'>"+categoryList[i].cName+"</option>")
            }
        }
    }

    this.showS = function(shopList) {
        this.s.html('');
        
        for (var i in shopList) {
            
            if(sId==shopList[i].sId){
                this.s.append("<option selected value='"+shopList[i].sId+"'>"+shopList[i].sName+"</option>")
            }else{
                this.s.append("<option value='"+shopList[i].sId+"'>"+shopList[i].sName+"</option>")
            }
        }
    }

    this.showK = function(keywordList) {
        this.k.html('');
        
        for (var i in keywordList) {
            
            if(kId==keywordList[i].kId){
                this.k.append("<option selected value='"+keywordList[i].kId+"'>"+keywordList[i].kName+"</option>")
            }else{
                this.k.append("<option value='"+keywordList[i].kId+"'>"+keywordList[i].kName+"</option>")
            }
        }
    }


    this.showB();
    this.showR(this.regionList);
    this.showC(this.categoryList);
    this.showS(this.shopList);
    this.showK(this.keywordList);

    form.render('select');

    form.on('select(brand)', function(data){
        var bId = data.value;
        var px = $(data.elem).parents(".x-shop");
        $.when(getting1(bId), getting2(bId)).done(function(data1, data2) {
            console.log(data1);
            var regionList = [];
            var regions = data1[0].data;
            for (var i in regions) {
                var shops = regions[i].shop;
                var sList = [];
                for (var j in shops) {
                    var shop = {
                        sId: shops[j].shop_id,
                        sName: shops[j].shop_name
                    }
                    sList.push(shop);
                };
                var region = {
                    rId: regions[i].region_id,
                    rName: regions[i].region_name,
                    shopList: sList
                }
                regionList.push(region);
            };
            localStorage.setItem("regionList", JSON.stringify(regionList));

            var categoryList = [];
            var categories = data2[0].data;
            for (var i in categories) {
                var keywords = categories[i].keywords_info;
                var kList = [];
                for (var j in keywords) {
                    var keyword = {
                        kId: keywords[j].keywords_id,
                        kName: keywords[j].keywords_name
                    }
                    kList.push(keyword);
                };
                var category = {
                    cId: categories[i].category_id,
                    cName: categories[i].category_name,
                    keywordList: kList
                }
                categoryList.push(category);
            };
            localStorage.setItem("categoryList", JSON.stringify(categoryList));
            px.xshop(bId);
        });
    });

    form.on('select(region)', function(data){
        var rId = data.value;
        var bId = $(data.elem).parents(".x-shop").find('select[lay-filter=brand]').val();
        var cId = $(data.elem).parents(".x-shop").find('select[lay-filter=category]').val();
        var sId = $(data.elem).parents(".x-shop").find('select[lay-filter=shop]').val();
        var kId = $(data.elem).parents(".x-shop").find('select[lay-filter=keyword]').val();
        console.log(sId);
        console.log(kId);
        $(data.elem).parents(".x-shop").xshop(bId,rId,cId,sId,kId);
    });

    form.on('select(category)', function(data){
        var cId = data.value;
        var bId = $(data.elem).parents(".x-shop").find('select[lay-filter=brand]').val();
        var rId = $(data.elem).parents(".x-shop").find('select[lay-filter=region]').val();
        var sId = $(data.elem).parents(".x-shop").find('select[lay-filter=shop]').val();
        var kId = $(data.elem).parents(".x-shop").find('select[lay-filter=keyword]').val();
        console.log(sId);
        console.log(kId);
        $(data.elem).parents(".x-shop").xshop(bId,rId,cId,sId,kId);
    })

    return this;
};


var getting1 = function(bId) {
    return $.ajax({
        type: "GET",
        url: "http://129.211.173.61/api/v1.0/region/" + bId + "/shop_info",
        xhrFields: { 
            withCredentials: true 
        },
        headers: {
            "Access-Token": localStorage.getItem("accessToken"),
            "Content-Type":"application/json;charset=utf8"
        }
    });
};


var getting2 = function(bId) {
    return $.ajax({
        type: "GET",
        url: "http://129.211.173.61//api/v1.0/category/" + bId + "/keywords",
        xhrFields: { 
            withCredentials: true 
        },
        headers: {
            "Access-Token": localStorage.getItem("accessToken"),
            "Content-Type":"application/json;charset=utf8"
        }
    });
}


localStorage.setItem('regionList', JSON.stringify([]));
localStorage.setItem('categoryList', JSON.stringify([]));