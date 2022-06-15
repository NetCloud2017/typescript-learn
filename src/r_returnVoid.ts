// 返回 void  类型
/*
一个具有void返回类型的上下文函数类型（typevf=（）=>void），在实现时，可以返
回任何其他的值，但它会被忽略。


*/
type voidFunc = () => void;
const f1: voidFunc = () => {
    return true;
};
const f2: voidFunc = () => true;
const f3: voidFunc = function () {
    return true;
}; 

const v1: void = f1();

 // 注意: 当一个字面的函数定义有一个void的返回类型时，该函数必须不返回任何东西。
function f4 () :void {
    // return 'st' // 这里报错
}