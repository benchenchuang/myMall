
const query=require('./index');

module.exports={
    //获取banner列表
    getBanners:(values)=>{
        let _sql='select * from banner order by show_index  limit ?,? ';
        return query(_sql,values)
    },
    //获取上线banner列表
    getBannerOn:()=>{
        let _sql='select * from banner where status=1';
        return query(_sql);
    },
    //添加banner
    addBanner:(values)=>{
        let _sql=`insert into banner set show_index=?,image=?,link=?,title=?,status=?,create_time=?`;
        return query(_sql,values);
    },
    //更新banner
    updateBanner:(values,id)=>{
        let _sql=`update banner set show_index=?,image=?,link=?,title=?,status=?,update_time=? where id=${id}`;
        return query(_sql,values);
    },
    //更新banner状态
    updateBannerStatus:(values,id)=>{
        let _sql=`update banner set status=?,update_time=? where id=${id}`;
        return query(_sql,values);
    },
    //删除banner
    delBanner:(id)=>{
        let _sql=`delete from banner where id in (${id})`;
        return query(_sql)
    },
    //查找banner（by id)
    findBannerById:(id)=>{
        let _sql=`select * from banner where id='${id}'`;
        return query(_sql);
    },
    //获取banner数量
    getBannerCounts:()=>{
        let _sql=`select count(*) as total from banner`;
        return query(_sql);
    }
}

