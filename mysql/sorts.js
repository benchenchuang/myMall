
const query=require('./index');

module.exports={
    //获取类别列表
    getSorts:(values)=>{
        let _sql='select * from category order by sort_index  limit ?,? ';
        return query(_sql,values)
    },
    //添加类别
    addSort:(values)=>{
        let _sql=`insert into category set sort_name=?,sort_image=?,sort_index=?,create_time=?`;
        return query(_sql,values);
    },
    //更新类别
    updateSort:(values,id)=>{
        let _sql=`update category set sort_name=?,sort_image=?,sort_index=?,update_time=? where id=${id}`;
        return query(_sql,values);
    },
    //删除类别
    delSort:(id)=>{
        let _sql=`delete from category where id in (${id})`;
        return query(_sql)
    },
    //查找类别（by id)
    findSortById:(id)=>{
        let _sql=`select * from category where id='${id}'`;
        return query(_sql);
    },
    //查找类别（by name)
    findSortByName:name=>{
        let _sql=`select * from category where sort_name='${name}'`;
        return query(_sql);
    },
    //获取类别数量
    getSortsCounts:()=>{
        let _sql=`select count(*) as total from category`;
        return query(_sql);
    }
}

