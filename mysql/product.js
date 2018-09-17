
const query=require('./index');

module.exports={
    //获取商品列表
    /**
     * values:startCounts,limit 起始数量 每页数量
     * sort 分类
     * recommend 是否推荐首页 0 否  1推荐
     * status 是否上下架 0 下架 1上架
     * onSale 是否可卖 0 不可卖 1 可卖
     */
    getShops:(values,sort,recommend,status,onSale)=>{
        let _sql=`select a.*,b.sort_name from ( select * from product where id > 0`;

        if(sort){
            _sql+=` and category_id='${sort}'`;
        }
        if(recommend!='' || recommend!==null){
            _sql+=` and recommend='${recommend}'`
        }
        if(status!='' || status!==null){
            _sql+=` and status='${status}'`
        }
        if(onSale!='' || onSale!==null){
            _sql+=` and stock>'0'`
        }
        
        _sql+=` order by -id  limit ?,? ) as a LEFT JOIN category as b on a.category_id=b.id`;
        return query(_sql,values);
    },
    //删除商品
    delSort:(id)=>{
        let _sql=`delete from product where id in (${id})`;
        return query(_sql)
    },
    //商品详情（by id)
    ShopDetail:(id)=>{
        let _sql=`select a.*,b.sort_name,count(c.product_id) as love_count from (select * from product where id='${id}') as a
                  LEFT JOIN category as b on a.category_id=b.id
                  LEFT JOIN product_love as c on a.id=c.product_id GROUP by a.id`;
        return query(_sql);
    },
    //添加商品 更新商品(id存在)
    addShop:(values,id)=>{
        if(id){
            let _sql=`update product set category_id=?,name=?,sub_title=?,banner_images=?,detail=?,price=?,stock=?,recommend=?,status=? , update_time=? where id='${id}'`;
        }else{
            let _sql="insert into product set category_id=?,name=?,sub_title=?,banner_images=?,detail=?,price=?,stock=?,recommend=?,status=? , create_time=?";
        }
        return query(_sql,values);
    },
    //商品数量
    shopsCount:(sort,recommend,status,onSale)=>{
        let _sql=`select count(*) as total from product where id > 0`;
        if(sort){
            _sql+=` and category_id='${sort}'`;
        }
        if(recommend!='' || recommend!==null){
            _sql+=` and recommend='${recommend}'`
        }
        if(status!='' || status!==null){
            _sql+=` and status='${status}'`
        }
        if(onSale!='' || onSale!==null){
            _sql+=` and stock>'0'`
        }
        return query(_sql);
    },
    //根据用户查询是否关注
    findCollect:(user,product)=>{
        let _sql=`select * from product_love where user_id=${user} and product_id=${product}`;
        return query(_sql);
    },
    //收藏商品
    collectShop:(values)=>{
        let _sql="insert into product_love set user_id=?,product_id=?,product_name=?,product_image?,product_price=?,create_time=?";
        return query(_sql);
    },
    //取消收藏
    cancleShop:(id)=>{
        let _sql=`delete from product_love where id=${id}`;
        return query(_sql);
    }
}

