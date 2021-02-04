$.fn.rshop = function(formSelects, bId, rId, sId){

    this.b = $(this).find('select[lay-filter=rbrand]');

    this.r = $(this).find('select[lay-filter=rregion]');

    this.s = $(this).find('select[lay-filter=rshop]');

    this.regionList = [];

    this.shopList = [];

    console.log(formSelects);

    this.showB  = function() {

        this.b.html('');
        
        var brandList = JSON.parse(localStorage.getItem('rbrandList'));
        for (var i in brandList) {
            if(bId==brandList[i].bId){
                this.regionList = JSON.parse(localStorage.getItem('rregionList'));
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

    this.showS = function(shopList) {
        var data = [];
        for (var i in shopList) {
            var d = {name: shopList[i].sName, value: shopList[i].sId};
            data.push(d);
        };

        formSelects.data('rshop', 'local', {
            arr: data
        });  
    }

    this.showB();
    this.showR(this.regionList);
    form.render('select');
    this.showS(this.shopList);

    form.on('select(rbrand)', function(data){
        var bId = data.value;
        var px = $(data.elem).parents(".x-shop");
        $.when(getting1(bId)).done(function(data1) {
            console.log(data1);
            var regionList = [];
            var regions = data1.data;
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
            localStorage.setItem("rregionList", JSON.stringify(regionList));
            px.rshop(formSelects, bId);
        });
    });

    form.on('select(rregion)', function(data){
        var rId = data.value;
        var bId = $(data.elem).parents(".x-shop").find('select[lay-filter=rbrand]').val();
        // var sId = $(data.elem).parents(".x-shop").find('select[lay-filter=rshop]').val();
        // console.log(sId);
        $(data.elem).parents(".x-shop").rshop(formSelects, bId,rId);
    });

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

localStorage.setItem('rregionList', JSON.stringify([]));