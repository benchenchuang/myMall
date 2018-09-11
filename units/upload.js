
const fs=require('fs');
let UnitUpload={
    //生成文件夹名称
    getUploadDirName:()=>{
        const date=new Date();
        let month=Number.parseInt(date.getMonth()+1);
        month=month>9?month:'0'+month;
        const dir=`${date.getFullYear()}${month}${date.getDate()}`
        return dir;
    },
    //检查文件夹是否存在，生成
    checkDirExists:(dir)=>{
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
    },
    //获取文件后缀
    getUploadFileExt:name=>{
        let ext=name.split('.');
        return ext[ext.length-1];
    },
    //文件重命名
    getUploadFileName:ext=>{
        let i=0;
        ++i;
        const date=new Date();
        let getTime=date.getTime();
        return getTime+i+'.'+ext;
    }

}
module.exports=UnitUpload;