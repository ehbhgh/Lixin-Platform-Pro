var tagData = [
    {"id": 12,"name": "芒果四季春","status": 0}
    ,{"id": 13,"name": "抹茶奶盖","status": 0}
    ,{"id": 14,"name": "烧仙草","status": 0}
    ,{"id": 15,"name": "原味奶茶","status": 0}
    ,{"id": 16,"name": "红泪沙","status": 0}
    ,{"id": 17,"name": "西瓜奶茶","status": 0}
    ,{"id": 18,"name": "毒药","status": 0}
    ];
    layui.config({
        base: './'
    }).extend({
        selectN: './layui_extends/selectN',
        selectM: './layui_extends/selectM',
    }).use(['layer', 'form', 'jquery', 'selectN', 'selectM'], function() {
        $ = layui.jquery;
        var form = layui.form,
            selectN = layui.selectN,
            selectM = layui.selectM;
        //多选标签-所有配置
        var tagIns = createSelectM("#tag_ids",tagData,"tag2",[12,17]);
        form.on('submit(demo)', function(data) {
            console.log('tagIns 当前选中的值名：', tagIns.selected);
            console.log('tagIns 当前选中的值：', tagIns.values);
            console.log('tagIns 当前选中的名：', tagIns.names);
            console.log('');
            var formData = data.field;
            console.log('表单对象：', formData);
        })
        //通过js动态选择
        $('.set1').click(function() {
            tagIns.set([6, 18]);
        });
        //通过js动态选择
        $('.set2').click(function() {
            tagIns.set([12, 13, 14, 15]);
        });
/**
* 创建多选下拉框
* @param domId
* @param data
* @param inputName
* @param selected
* @param isRequired
* @returns {*}
*/
function createSelectM(domId, data, inputName, selected=[],isRequired=true) {
var options = {
    //元素容器【必填】
    elem: domId
    //候选数据【必填】
    , data: data
    //默认选中的值
    , selected: selected
    //最多选中个数，默认5
    , max: data.length
    //input的name 不设置与选择器相同(去#.)
    , name: inputName
    //值的分隔符
    , delimiter: ','
    //候选项数据的键名
    , field: {idName: 'id', titleName: 'name'}
};
if(isRequired==true){
    // options = Object.assign({verify: 'required'}, options);
    options.verify='required';
}
return selectM(options);
}

});