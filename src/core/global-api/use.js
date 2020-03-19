export default function (iCrush) {

    // 补充原型方法
    iCrush.use = function (extend) {
        extend.install.call(extend, iCrush);
    };

};