$.fn.sshop = function(bId, rId, sId){

    this.b = $(this).find('select[lay-filter=brand]');

    this.r = $(this).find('select[lay-filter=region]');

    this.s = $(this).find('select[lay-filter=shop]');

    this.regionList = [];

    this.shopList = [];

    this.showB  = function() {

        this.b.html('');
        
        var brandList = JSON.parse(localStorage.getItem('brandList'));
        for (var i in brandList) {
            if(bId==brandList[i].bId){
                this.regionList = JSON.parse(localStorage.getItem('regionList'));
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
        this.s.html('');
        for (var i in shopList) {

            if(sId==shopList[i].sId){
                this.s.append("<option selected value='"+shopList[i].sId+"'>"+shopList[i].sName+"</option>")
            }else{
                this.s.append("<option value='"+shopList[i].sId+"'>"+shopList[i].sName+"</option>")
            }
        }
    }

    this.showB();
    this.showR(this.regionList);
    this.showS(this.shopList);
    form.render('select');

    form.on('select(brand)', function(data){
        var bId = data.value;
        var px = $(data.elem).parents(".x-shop");
        $.when(getting1(bId)).done(function(data1) {
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
            localStorage.setItem("regionList", JSON.stringify(regionList));
            px.sshop(bId);
        });
    });

    form.on('select(region)', function(data){
        var rId = data.value;
        var bId = $(data.elem).parents(".x-shop").find('select[lay-filter=brand]').val();
        $(data.elem).parents(".x-shop").sshop(bId,rId);
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

localStorage.setItem('regionList', JSON.stringify([]));