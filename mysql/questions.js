
const query=require('./index');

module.exports={
    //获取问题列表
    getQuestions:(values)=>{
        let _sql='select * from questions limit ?,?';
        return query(_sql,values)
    },
    //添加问题
    addQuestion:(values)=>{
        let _sql=`insert into questions set question=?,create_time=?`;
        return query(_sql,values);
    },
    //更新问题
    updateQuestion:(values,id)=>{
        let _sql=`update questions set question=?,update_time=? where id=${id}`;
        return query(_sql,values);
    },
    //查找问题（by id)
    findQuestionById:(id)=>{
        let _sql=`select * from questions where id='${id}'`;
        return query(_sql);
    },
    //查找问题
    findQuestionByName:(question)=>{
        let _sql=`select * from questions where question='${question}'`;
        return query(_sql);
    },
    //删除问题
    delQuestion:(id)=>{
        let _sql=`delete from questions where id in (${id})`;
        return query(_sql)
    },
    //问题总数
    getQuestionCounts:()=>{
        let _sql='select count(*) as total_counts from questions';
        return query(_sql);
    }

}

