
module.exports={
    //用户表
    users:`
        create table if not exists users{
            id INT(11) NOT NULL AUTO_INCREAMENT COMMENT '用户表ID',
            username VARCHAR(100) NOT　NULL COMMENT '用户名',
            password VARCHAR(100) NOT NULL COMMENT '用户密码,MD5加密',
            question VARCHAR(100) DEFAULT NULL COMMENT '找回密码问题',
            answer VARCHAR(100) DEFAULT NULL COMMENT '找回密码答案',
            role INT(4) NOT NULL COMMENT '角色0-管理员 1-用户',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '最后更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=11 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //产品分类表
    category:`
        create table if not exists category{
            id INT(11) NOT NULL AUTO_INCREMENT COMMENT '类别ID',
            name VARCHAR(50) DEFAULT NULL COMMENT '类别名称',
            sort_image VARCHAR(500) DEFAULT NULL COMMENT '商品主图',
            sort_id INT(4) DEFAULT NULL COMMENT '类别排序，同值自然排序',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=10000 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //产品表
    product:`
        create table if not exists product{
            id INT(11) NOT NULL AUTO_INCREMENT COMMENT '商品ID',
            category_id INT(11) NOT NULL COMMENT '分类ID,对应category表的主键',
            name VARCHAR(100) NOT NULL COMMENT '商品名称',
            sub_title VARCHAR(200) DEFAULT NULL COMMENT '商品副标题',
            main_image VARCHAR(500) DEFAULT NULL COMMENT '商品主图',
            detail TEXT COMMENT '商品详情',
            price DECIMAL(10,2) NOT NULL COMMENT '商品价格，保留2位小数',
            stock INT(11) NOT NULL COMMENT '库存数量',
            status INT(6) NOT NULL COMMENT '库存状态：1-在售 2-下架 3-删除',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=26 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //购物车表
    cart:`
        create table if not exists cart{
            id INT(11) NOT NULL AUTO_INCREMENT,
            user_id INT(11) NOT NULL COMMENT '用户ID',
            product_id INT(11) NOT NULL COMMENT '商品ID',
            quantity INT(11) DEFAULT NULL COMMENT '商品数量',
            checked INT(11) DEFAULT NULL COMMENT '是否选择 1-已勾选 0 未勾选',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=100 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //支付表
    pay_info:`
        create table if not exists pay_info{
            id INT(11) NOT NULL AUTO_INCREMENT,
            user_id INT(11) DEFAULT NULL COMMENT '用户ID',
            order_no BIGINT(20) DEFAULT NULL COMMENT '订单号',
            pay_platform INT(10) DEFAULT NULL COMMENT '支付平台 1-支付表 2-微信',
            pay_status VARCHAR(20) DEFAULT NULL COMMENT '支付状态',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=50 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //订单表
    orders:`
        create table if not exists orders{
            id varchar(36) NOT NULL AUTO_INCREMENT COMMENT '订单ID',
            order_no BIGINT(20) DEFAULT NULL COMMENT '订单号',
            user_id INT(11) DEFAULT NULL COMMENT '用户ID',
            ship_id INT(11) DEFAULT NULL COMMENT '收货地址ID',
            pay_money DECIMAL(10,2) DEFAULT NULL COMMENT '实际付款金额 单位元 保留2位小数',
            pay_type INT(4) DEFAULT 1 COMMENT '支付类型 1-默认线上支付',
            status INT(10) DEFAULT NULL COMMENT '订单状态：0-已取消 1-未付款 2-已付款 3-已发货 4-交易成功 5-交易关闭',
            payment_time DATATIME DEFAULT NULL COMMENT '支付时间',
            send_time DATATIME DEFAULT NULL COMMENT '发货时间',
            end_time DATATIME DEFAULT NULL COMMENT '交易完成时间',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=100 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //订单明细表
    order_item:`
        create table if not exists order_item{
            id INT(11) NOT NULL AUTO_INCREMENT, 
            user_id INT(11) DEFAULT NULL COMMENT '用户ID',
            order_id varchar(36) DEFAULT NULL COMMENT '关联订单ID', 
            order_no BIGINT(20) DEFAULT NULL COMMENT '订单号',
            product_id INT(11) DEFAULT NULL COMMENT '商品ID',
            product_name VARCHAR(100) DEFAULT NULL COMMENT '商品名称',
            product_image VARCHAR(150) DEFAULT NULL COMMENT '商品图片',
            product_price DECIMAL(10,2) DEFAULT NULL COMMENT '商品单价',
            quantity INT(11) DEFAULT NULL COMMENT '商品数量',
            total_price DECIMAL(10,2) DEFAULT NULL COMMENT '订单总价',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=100 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `,
    //收货地址
    ships:`
        create table if not exists ships{
            id INT(11) NOT NULL AUTO_INCREMENT,
            user_id INT(11) DEFAULT NULL COMMENT '用户ID',
            ship_name VARCHAR(20) DEFAULT NULL COMMENT '收货姓名',
            ship_phone VARCHAR(20) DEFAULT NULL COMMENT '收货电话',
            ship_address VARCHAR(200) DEFAULT NULL COMMENT '收货地址',
            create_time DATETIME NOT NULL COMMENT '创建时间',
            update_time DATETIME NOT NULL COMMENT '更新时间',
            PRIMARY KEY(id)
        }ENGINE=InnoDB AUTO_INCREMENT=30 CHARACTER SET utf8 COLLATE utf8_general_ci;
    `
}